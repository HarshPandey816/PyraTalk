import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-16 pb-20 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Interview Prep Assistant
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Generate tailored interview questions from job descriptions to prepare for your next technical interview.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="px-6 py-3 rounded-md bg-white text-blue-600 font-medium border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2.2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Extract Skills</h3>
              <p className="mt-2 text-gray-500">
                Extract relevant technical skills from job descriptions to focus your interview preparation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Generate Questions</h3>
              <p className="mt-2 text-gray-500">
                Get tailored interview questions based on the specific technical skills in the job description.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Ace Your Interview</h3>
              <p className="mt-2 text-gray-500">
                Practice with realistic technical questions to increase your confidence and success rate.
              </p>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="py-12">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="flex flex-col items-center">
            <ol className="relative border-l border-gray-200">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <div className="text-blue-600 font-bold">1</div>
                </span>
                <h3 className="text-lg font-semibold text-gray-900">Paste Job Description</h3>
                <p className="text-base text-gray-500">
                  Copy a job description from any job board and paste it into our tool.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <div className="text-blue-600 font-bold">2</div>
                </span>
                <h3 className="text-lg font-semibold text-gray-900">Review Extracted Skills</h3>
                <p className="text-base text-gray-500">
                  Our AI analyzes the job description and identifies key technical skills required.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <div className="text-blue-600 font-bold">3</div>
                </span>
                <h3 className="text-lg font-semibold text-gray-900">Get Tailored Questions</h3>
                <p className="text-base text-gray-500">
                  Receive customized interview questions focused on the specific skills you need to showcase.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Interview Prep Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}