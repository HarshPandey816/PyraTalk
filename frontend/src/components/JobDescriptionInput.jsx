// src/components/JobDescriptionInput.jsx
import { FaSearch, FaSpinner } from 'react-icons/fa'

const JobDescriptionInput = ({ 
  jobDescription, 
  setJobDescription, 
  numQuestions,
  setNumQuestions,
  onAnalyze, 
  isLoading 
}) => {
  return (
    <div className="card">
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block text-gray-700 font-medium mb-2">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          rows="8"
          className="input"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={isLoading}
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label htmlFor="numQuestions" className="block text-gray-700 font-medium mb-2">
          Number of Questions
        </label>
        <div className="flex items-center">
          <input
            type="range"
            id="numQuestions"
            min="1"
            max="10"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="w-full max-w-xs mr-4"
            disabled={isLoading}
          />
          <span className="text-gray-700 font-medium">{numQuestions}</span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="btn btn-primary flex items-center"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <FaSearch className="mr-2" />
              Analyze Job Description
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default JobDescriptionInput