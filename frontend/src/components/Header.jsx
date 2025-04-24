// src/components/Header.jsx
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
              IP
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">
              Interview Prep
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/HarshPandey816/HCI-Project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header