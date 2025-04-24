# Interview Prep Assistant

Interview Prep Assistant is a full-stack application that helps job seekers prepare for technical interviews by analyzing job descriptions, identifying required skills, and generating relevant interview questions.

## 🚀 Features

- **Skill Extraction**: Automatically extracts technical skills from job descriptions
- **Question Generation**: Creates targeted interview questions based on identified skills
- **User Authentication**: Secure signup and login system
- **Responsive UI**: Modern React frontend with mobile-friendly design
- **API Documentation**: Comprehensive API documentation with Swagger/OpenAPI

## 🏗️ Architecture

The application consists of two main components:

### Backend (FastAPI)

- RESTful API built with FastAPI
- PostgreSQL database for user management
- JWT authentication
- LLM integration for question generation
- Advanced skill extraction algorithm

### Frontend (React)

- Modern UI built with React
- State management with React Context/Redux
- Form handling with React Hook Form
- Styling with Tailwind CSS
- API integration with Axios

## 🛠️ Technology Stack

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) - High-performance API framework
- [SQLAlchemy](https://www.sqlalchemy.org/) - SQL toolkit and ORM
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Pydantic](https://pydantic-docs.helpmanual.io/) - Data validation
- [Groq](https://groq.com/) - LLM API for question generation
- [JWT](https://jwt.io/) - Token-based authentication
- [Passlib](https://passlib.readthedocs.io/) - Password hashing
- [NLTK](https://www.nltk.org/) - Natural language processing

### Frontend
- [React](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client
- [React Router](https://reactrouter.com/) - Navigation and routing
- [React Hook Form](https://react-hook-form.com/) - Form validation

## 📋 Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 13+
- Groq API key

## ⚙️ Installation

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/interview-prep-assistant.git
   cd interview-prep-assistant/backend
   ```

2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost/interviewprep
   SECRET_KEY=your-secure-secret-key
   GROQ_API_KEY=your-groq-api-key
   ```

5. Initialize the database
   ```bash
   python init_db.py
   ```

6. Run the application
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your API base URL:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8000
   ```

4. Start the development server
   ```bash
   npm start
   ```

## 🔍 API Documentation

When the backend is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 📱 API Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/` | GET | Health check | No |
| `/signup` | POST | Register new user | No |
| `/signin` | POST | Authenticate user | No |
| `/users/me` | GET | Get current user info | Yes |
| `/generate` | POST | Process job description | Yes |
| `/skills` | GET | List all recognized skills | No |

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚢 Deployment

### Docker Deployment
We provide Docker support for easy deployment:

```bash
docker-compose up -d
```

### Manual Deployment

#### Backend
```bash
gunicorn -k uvicorn.workers.UvicornWorker main:app --workers 4 --bind 0.0.0.0:8000
```

#### Frontend
```bash
npm run build
# Serve with nginx or similar
```

## 🛡️ Security Considerations

- Use strong, unique values for SECRET_KEY in production
- Enable HTTPS in production environments
- Implement rate limiting to prevent abuse
- Store sensitive credentials in secure environment variables

## 🔄 Continuous Integration

This project uses GitHub Actions for CI/CD:
- Automated testing on push
- Linting and code quality checks
- Build and deployment workflows

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Groq](https://groq.com/) for providing the LLM API
- [FastAPI](https://fastapi.tiangolo.com/) for the powerful API framework
- [React](https://reactjs.org/) for the frontend library
- All other open-source libraries used in this project