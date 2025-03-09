from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field, validator
from flashtext import KeywordProcessor
import nltk
import uvicorn
import os
import logging
from typing import List, Optional, Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
import json
import time
from fastapi.responses import JSONResponse
import traceback

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    logging.warning("GROQ_API_KEY is not set in the environment variables. Some functionality will be limited.")

# Download NLTK stopwords
try:
    nltk.download("stopwords", quiet=True)
    from nltk.corpus import stopwords
except Exception as e:
    logging.warning(f"Failed to download NLTK stopwords: {e}")

# Initialize logging with a more detailed format
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("app.log")
    ]
)
logger = logging.getLogger("interview-prep-api")

# Initialize FastAPI app
app = FastAPI(
    title="Interview Preparation API",
    description="API for extracting skills from job descriptions and generating interview questions",
    version="1.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load technical skills from a file if it exists, otherwise use default list
def load_technical_skills():
    try:
        if os.path.exists("skills.json"):
            with open("skills.json", "r") as f:
                return json.load(f)
    except Exception as e:
        logger.error(f"Error loading skills from file: {e}")
    
    # Default skills list
    return [
        "Python", "JavaScript", "Java", "C++", "C#", "Ruby", "Go", "Rust", "PHP", "Swift",
        "Kotlin", "TypeScript", "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js",
        "Django", "Flask", "Spring", "ASP.NET", "Ruby on Rails", "Express.js", 
        "Machine Learning", "Deep Learning", "AI", "NLP", "Computer Vision",
        "Data Science", "Data Engineering", "Big Data", "Hadoop", "Spark",
        "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
        "SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Oracle", "SQLite",
        "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Ansible",
        "Git", "REST API", "GraphQL", "Microservices", "CI/CD", "DevOps",
        "Agile", "Scrum", "Blockchain", "IoT", "Cloud Computing", "Serverless",
        # Additional skills
        "Redux", "Next.js", "Tailwind CSS", "SASS/SCSS", "LESS", 
        "Webpack", "Babel", "Vite", "Jest", "Mocha", "Cypress", "Selenium",
        "jQuery", "Bootstrap", "Material UI", "Chakra UI", "Ant Design",
        "Firebase", "Supabase", "Prisma", "TypeORM", "Sequelize", 
        "GraphQL Apollo", "Relay", "RESTful APIs", "OpenAPI", "Swagger",
        "Linux", "Unix", "Bash", "PowerShell", "Shell Scripting",
        "Jenkins", "CircleCI", "GitHub Actions", "GitLab CI", "Travis CI",
        "Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic",
        "Redis", "Elasticsearch", "Cassandra", "DynamoDB", "RabbitMQ", "Kafka",
        "OAuth", "JWT", "SAML", "OpenID Connect", "API Gateway",
        "Networking", "Security", "Cryptography", "Penetration Testing",
        "Web Accessibility", "Responsive Design", "Mobile Development",
        "React Native", "Flutter", "Xamarin", "Cordova", "Electron",
        "WebSockets", "gRPC", "MQTT", "WebRTC", "Server-Sent Events"
    ]

# Initialize keyword processor with technical skills
keyword_processor = KeywordProcessor()
technical_skills = load_technical_skills()
keyword_processor.add_keywords_from_list(technical_skills)

# Request and response models with validation
class JobDescription(BaseModel):
    job_description: str = Field(..., min_length=10, description="The job description to analyze")
    num_questions: int = Field(5, ge=1, le=20, description="Number of questions to generate")
    
    @validator('job_description')
    def validate_job_description(cls, v):
        if len(v.strip()) < 10:
            raise ValueError("Job description is too short")
        return v

class Question(BaseModel):
    skill: str
    question: str

class GeneratedContent(BaseModel):
    skills: List[str]
    questions: List[Question]

class ApiError(BaseModel):
    detail: str

# Set up rate limiting (simple in-memory implementation)
rate_limits = {}

def is_rate_limited(client_ip: str) -> bool:
    current_time = time.time()
    # Clean up old entries
    for ip in list(rate_limits.keys()):
        if current_time - rate_limits[ip]["timestamp"] > 60:  # 1 minute window
            del rate_limits[ip]
    
    # Check if IP exists and has reached limit
    if client_ip in rate_limits:
        if rate_limits[client_ip]["count"] >= 10:  # 10 requests per minute
            return True
        rate_limits[client_ip]["count"] += 1
        return False
    else:
        # New IP
        rate_limits[client_ip] = {"count": 1, "timestamp": current_time}
        return False

# Global error handler
@app.middleware("http")
async def error_handling_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        logger.error(f"Unhandled exception: {e}\n{traceback.format_exc()}")
        return JSONResponse(
            status_code=500,
            content={"detail": "An unexpected error occurred. Please try again later."},
        )

# Rate limiting middleware
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    
    if is_rate_limited(client_ip):
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Please try again later."},
        )
    
    return await call_next(request)

# Modified LLM query function with better error handling and retries
def query_llm(prompt: str) -> dict:
    """
    Queries the LLM for generating interview questions.
    Includes retry logic and better error handling.
    """
    max_retries = 2
    retry_count = 0
    
    if not GROQ_API_KEY:
        return {"answer": "API key not configured. Please set the GROQ_API_KEY environment variable."}
    
    while retry_count <= max_retries:
        try:
            client = Groq(api_key=GROQ_API_KEY)
            system_prompt = (
                "You are an expert technical interviewer helping generate interview questions. "
                "Respond with concise, specific questions that an interviewer might ask. "
                "Output your response in JSON format exactly like this: {\"answer\": \"Your question here.\"}"
            )
            
            response = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                model="llama-3.3-70b-versatile",
                temperature=0.5,
                max_completion_tokens=1024,
                top_p=1,
                stream=False
            )
            
            response_text = response.choices[0].message.content.strip()
            
            # Try to parse as JSON
            try:
                parsed_response = json.loads(response_text)
                if "answer" in parsed_response:
                    return parsed_response
                else:
                    # Create proper format if JSON but wrong structure
                    return {"answer": str(parsed_response)}
            except json.JSONDecodeError:
                # If not JSON, extract text between curly braces if possible
                if response_text.count('{') >= 1 and response_text.count('}') >= 1:
                    start = response_text.find('{')
                    end = response_text.rfind('}') + 1
                    json_part = response_text[start:end]
                    try:
                        parsed_json = json.loads(json_part)
                        if "answer" in parsed_json:
                            return parsed_json
                    except:
                        pass
                
                # Fall back to raw text
                return {"answer": response_text}
                
        except Exception as e:
            logger.error(f"LLM Query failed (attempt {retry_count+1}/{max_retries+1}): {e}")
            retry_count += 1
            if retry_count <= max_retries:
                time.sleep(1)  # Wait before retrying
            else:
                return {"answer": f"Could you describe your experience with this skill?"}
    
    # Should never reach here, but just in case
    return {"answer": "Could you describe your experience with this skill?"}

# Extract key skills from job description
def extract_skills(job_description: str) -> List[str]:
    """Extract technical skills from job description using FlashText."""
    # Get keywords from the keyword processor
    skills = list(set(keyword_processor.extract_keywords(job_description)))
    
    # Sort skills by their length (longer keywords usually more specific)
    skills.sort(key=len, reverse=True)
    
    return skills

# Generate interview questions with better prompt engineering
def generate_questions(skills: List[str], num_questions: int) -> List[Question]:
    """
    Generates interview questions focused on technical interview scenarios.
    Improves prompt engineering for better questions.
    """
    questions = []
    
    if not skills:
        return questions
    
    # Ensure we don't request more questions than skills available
    num_to_generate = min(num_questions, len(skills))
    skills_to_use = skills[:num_to_generate]
    
    for skill in skills_to_use:
        prompt = (
            f"Generate a specific technical interview question about {skill} that would "
            f"help evaluate a candidate's knowledge and experience. The question should be "
            f"challenging but appropriate for a technical interview. Don't ask generic questions."
        )
        
        llm_response = query_llm(prompt)
        question_text = llm_response.get("answer", f"Could you explain your experience with {skill}?")
        
        # Clean up response if needed
        if question_text.startswith('"') and question_text.endswith('"'):
            question_text = question_text[1:-1]
            
        questions.append(Question(skill=skill, question=question_text))
    
    return questions

# API endpoint to process job descriptions
@app.post("/generate", response_model=GeneratedContent, responses={400: {"model": ApiError}, 429: {"model": ApiError}, 500: {"model": ApiError}})
async def generate(job: JobDescription):
    """
    Process a job description to extract skills and generate interview questions.
    
    Parameters:
    - job_description: The job description text
    - num_questions: Number of questions to generate (1-20)
    
    Returns:
    - skills: List of identified technical skills
    - questions: List of generated interview questions
    """
    start_time = time.time()
    logger.info(f"Processing job description of length {len(job.job_description)}")
    
    # Extract skills
    skills = extract_skills(job.job_description)
    
    if not skills:
        logger.warning("No skills identified in job description")
        return GeneratedContent(
            skills=[], 
            questions=[Question(skill="General", question="No specific technical skills identified in this job description. Please provide a more detailed job posting with technical requirements.")]
        )
    
    # Generate questions
    logger.info(f"Generating {min(job.num_questions, len(skills))} questions for {len(skills)} identified skills")
    questions = generate_questions(skills, job.num_questions)
    
    logger.info(f"Processing completed in {time.time() - start_time:.2f}s")
    return GeneratedContent(skills=skills, questions=questions)

# Basic health check endpoint
@app.get("/")
def index():
    """API information and health check."""
    return {
        "status": "connected",
        "message": "Interview Preparation Backend API is running",
        "version": "1.1.0",
        "endpoints": {
            "/": "API information and health check",
            "/generate": "POST endpoint to generate skills and questions from job descriptions",
            "/skills": "GET endpoint to list all recognized skills"
        }
    }

# Endpoint to get all skills
@app.get("/skills")
def get_skills():
    """Get the list of all recognized technical skills."""
    return {"skills": technical_skills, "count": len(technical_skills)}

# Run Uvicorn server
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    
    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run(app, host=host, port=port)