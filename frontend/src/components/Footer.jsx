// src/components/Footer.jsx
const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return (
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {currentYear} Interview Prep. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-light transition-colors duration-200">
                About
              </a>
              <a href="#" className="hover:text-primary-light transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="hover:text-primary-light transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer