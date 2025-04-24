// import { useState } from "react";
// import axios from "axios";
// import { FaLightbulb, FaCode, FaSpinner } from "react-icons/fa";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // API configuration with environment variable support
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// function Dashboard() {
//   const [jobDescription, setJobDescription] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [numQuestions, setNumQuestions] = useState(5);
//   const [success, setSuccess] = useState(false);

//   const handleNumQuestionsChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value >= 1 && value <= 20) {
//       setNumQuestions(value);
//     }
//   };

//   const analyzeJobDescription = async () => {
//     if (!jobDescription.trim()) {
//       setError("Please enter a job description");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await axios.post(`${API_URL}/generate`, {
//         job_description: jobDescription,
//         num_questions: numQuestions,
//       });

//       setSkills(response.data.skills);
//       setQuestions(response.data.questions);
//       setSuccess(true);
      
//       // Scroll to results
//       setTimeout(() => {
//         document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     } catch (err) {
//       console.error("Error:", err);
//       setError(
//         err.response?.data?.detail ||
//           "Failed to analyze job description. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle keyboard submission
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && e.ctrlKey) {
//       analyzeJobDescription();
//     }
//   };

//   // Sample job descriptions for users to try
//   const sampleDescriptions = [
//     "Senior React Developer needed with 5+ years of experience in building responsive web applications. Proficiency in React, TypeScript, and modern JavaScript frameworks required. Experience with Redux, GraphQL, and testing frameworks like Jest is a plus.",
//     "Data Scientist position available. Requirements include Python, SQL, machine learning experience, and familiarity with data visualization tools. PhD or Master's degree in a quantitative field preferred.",
//     "DevOps Engineer needed to manage our cloud infrastructure on AWS. Experience with Docker, Kubernetes, Terraform, and CI/CD pipelines required. Knowledge of monitoring tools like Prometheus and Grafana is a plus."
//   ];

//   const loadSampleDescription = (index) => {
//     setJobDescription(sampleDescriptions[index]);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />

//       <main className="flex-grow container mx-auto px-4 py-8">
//         <section className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Interview Prep Assistant
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Paste a job description to extract key skills and generate relevant
//             interview questions.
//           </p>
//         </section>

//         <Card className="max-w-3xl mx-auto shadow-md bg-white mb-8">
//           <CardContent className="p-6">
//             <div className="mb-2 flex justify-between items-center">
//               <label className="text-sm font-medium">Job Description</label>
//               <div className="text-xs text-gray-500">
//                 <button 
//                   onClick={() => loadSampleDescription(0)}
//                   className="text-blue-600 hover:underline mr-2"
//                 >
//                   Sample 1
//                 </button>
//                 <button 
//                   onClick={() => loadSampleDescription(1)}
//                   className="text-blue-600 hover:underline mr-2"
//                 >
//                   Sample 2
//                 </button>
//                 <button 
//                   onClick={() => loadSampleDescription(2)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Sample 3
//                 </button>
//               </div>
//             </div>
            
//             <Textarea
//               placeholder="Paste job description here..."
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//               onKeyDown={handleKeyDown}
//               rows={6}
//               className="mb-4 resize-none"
//             />
            
//             <div className="flex items-center gap-4">
//               <div className="flex items-center">
//                 <label className="text-sm mr-2">Questions:</label>
//                 <Input
//                   type="number"
//                   min="1"
//                   max="20"
//                   value={numQuestions}
//                   onChange={handleNumQuestionsChange}
//                   className="w-16"
//                 />
//               </div>
              
//               <Button
//                 onClick={analyzeJobDescription}
//                 disabled={isLoading}
//                 className="flex-1"
//               >
//                 {isLoading ? (
//                   <>
//                     <FaSpinner className="animate-spin mr-2" />
//                     Analyzing...
//                   </>
//                 ) : (
//                   "Generate Questions"
//                 )}
//               </Button>
//             </div>
            
//             {error && (
//               <Alert variant="destructive" className="mt-4">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
            
//             {success && (
//               <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
//                 <AlertDescription>
//                   Analysis complete! Scroll down to see the results.
//                 </AlertDescription>
//               </Alert>
//             )}
//           </CardContent>
//         </Card>

//         {(skills.length > 0 || questions.length > 0) && (
//           <div id="results" className="mt-8">
//             <Tabs defaultValue="all">
//               <TabsList className="mb-4">
//                 <TabsTrigger value="all">All Results</TabsTrigger>
//                 <TabsTrigger value="skills">Skills ({skills.length})</TabsTrigger>
//                 <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="all">
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <Card>
//                     <CardContent className="p-6">
//                       <div className="flex items-center mb-4">
//                         <FaCode className="text-blue-600 mr-2 text-xl" />
//                         <h2 className="text-xl font-semibold">Skills Identified</h2>
//                       </div>
//                       {skills.length > 0 ? (
//                         <div className="flex flex-wrap gap-2">
//                           {skills.map((skill, index) => (
//                             <Badge key={index} variant="outline" className="bg-blue-50">
//                               {skill}
//                             </Badge>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-gray-500">No skills identified</p>
//                       )}
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardContent className="p-6">
//                       <div className="flex items-center mb-4">
//                         <FaLightbulb className="text-amber-500 mr-2 text-xl" />
//                         <h2 className="text-xl font-semibold">Interview Questions</h2>
//                       </div>
//                       {questions.length > 0 ? (
//                         <ul className="space-y-4">
//                           {questions.map((q, index) => (
//                             <li key={index} className="pb-3 border-b border-gray-100 last:border-0">
//                               <Badge variant="secondary" className="mb-1">
//                                 {q.skill}
//                               </Badge>
//                               <p>{q.question}</p>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500">No questions generated</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </div>
//               </TabsContent>
              
//               <TabsContent value="skills">
//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="flex items-center mb-4">
//                       <FaCode className="text-blue-600 mr-2 text-xl" />
//                       <h2 className="text-xl font-semibold">Skills Identified</h2>
//                     </div>
//                     {skills.length > 0 ? (
//                       <div className="flex flex-wrap gap-2">
//                         {skills.map((skill, index) => (
//                           <Badge key={index} variant="outline" className="bg-blue-50">
//                             {skill}
//                           </Badge>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500">No skills identified</p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>
              
//               <TabsContent value="questions">
//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="flex items-center mb-4">
//                       <FaLightbulb className="text-amber-500 mr-2 text-xl" />
//                       <h2 className="text-xl font-semibold">Interview Questions</h2>
//                     </div>
//                     {questions.length > 0 ? (
//                       <ul className="space-y-4">
//                         {questions.map((q, index) => (
//                           <li key={index} className="pb-3 border-b border-gray-100 last:border-0">
//                             <Badge variant="secondary" className="mb-1">
//                               {q.skill}
//                             </Badge>
//                             <p>{q.question}</p>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-500">No questions generated</p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Dashboard;






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLightbulb, FaCode, FaSpinner, FaSignOutAlt } from "react-icons/fa";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// API configuration with environment variable support
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    
    // Redirect to login if not logged in
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleNumQuestionsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 20) {
      setNumQuestions(value);
    }
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/generate`,
        {
          job_description: jobDescription,
          num_questions: numQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkills(response.data.skills);
      setQuestions(response.data.questions);
      setSuccess(true);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("Error:", err);
      
      // Handle unauthorized errors
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(
          err.response?.data?.detail ||
            "Failed to analyze job description. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      analyzeJobDescription();
    }
  };

  // Sample job descriptions for users to try
  const sampleDescriptions = [
    "Senior React Developer needed with 5+ years of experience in building responsive web applications. Proficiency in React, TypeScript, and modern JavaScript frameworks required. Experience with Redux, GraphQL, and testing frameworks like Jest is a plus.",
    "Data Scientist position available. Requirements include Python, SQL, machine learning experience, and familiarity with data visualization tools. PhD or Master's degree in a quantitative field preferred.",
    "DevOps Engineer needed to manage our cloud infrastructure on AWS. Experience with Docker, Kubernetes, Terraform, and CI/CD pipelines required. Knowledge of monitoring tools like Prometheus and Grafana is a plus."
  ];

  const loadSampleDescription = (index) => {
    setJobDescription(sampleDescriptions[index]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">Interview Prep Assistant</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            {isLoggedIn && (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Prep Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste a job description to extract key skills and generate relevant
            interview questions.
          </p>
        </section>

        <Card className="max-w-3xl mx-auto shadow-md bg-white mb-8">
          <CardContent className="p-6">
            <div className="mb-2 flex justify-between items-center">
              <label className="text-sm font-medium">Job Description</label>
              <div className="text-xs text-gray-500">
                <button 
                  onClick={() => loadSampleDescription(0)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Sample 1
                </button>
                <button 
                  onClick={() => loadSampleDescription(1)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Sample 2
                </button>
                <button 
                  onClick={() => loadSampleDescription(2)}
                  className="text-blue-600 hover:underline"
                >
                  Sample 3
                </button>
              </div>
            </div>
            
            <Textarea
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={6}
              className="mb-4 resize-none"
            />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <label className="text-sm mr-2">Questions:</label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={numQuestions}
                  onChange={handleNumQuestionsChange}
                  className="w-16"
                />
              </div>
              
              <Button
                onClick={analyzeJobDescription}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  "Generate Questions"
                )}
              </Button>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>
                  Analysis complete! Scroll down to see the results.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {(skills.length > 0 || questions.length > 0) && (
          <div id="results" className="mt-8">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="skills">Skills ({skills.length})</TabsTrigger>
                <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <FaCode className="text-blue-600 mr-2 text-xl" />
                        <h2 className="text-xl font-semibold">Skills Identified</h2>
                      </div>
                      {skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No skills identified</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <FaLightbulb className="text-amber-500 mr-2 text-xl" />
                        <h2 className="text-xl font-semibold">Interview Questions</h2>
                      </div>
                      {questions.length > 0 ? (
                        <ul className="space-y-4">
                          {questions.map((q, index) => (
                            <li key={index} className="pb-3 border-b border-gray-100 last:border-0">
                              <Badge variant="secondary" className="mb-1">
                                {q.skill}
                              </Badge>
                              <p>{q.question}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No questions generated</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="skills">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <FaCode className="text-blue-600 mr-2 text-xl" />
                      <h2 className="text-xl font-semibold">Skills Identified</h2>
                    </div>
                    {skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No skills identified</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="questions">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <FaLightbulb className="text-amber-500 mr-2 text-xl" />
                      <h2 className="text-xl font-semibold">Interview Questions</h2>
                    </div>
                    {questions.length > 0 ? (
                      <ul className="space-y-4">
                        {questions.map((q, index) => (
                          <li key={index} className="pb-3 border-b border-gray-100 last:border-0">
                            <Badge variant="secondary" className="mb-1">
                              {q.skill}
                            </Badge>
                            <p>{q.question}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No questions generated</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;