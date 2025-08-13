import Link from "next/link"
import { Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-baymax-gray dark:bg-gray-800 py-12">
      <div className="baymax-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-baymax-darkBlue dark:text-baymax-blue">Baymax</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md">
              Your personal healthcare companion, inspired by Disney's lovable robot. We're here to help you stay
              healthy and happy.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-baymax-darkBlue dark:hover:text-baymax-blue transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-gray-600 dark:text-gray-400 hover:text-baymax-darkBlue dark:hover:text-baymax-blue transition-colors duration-200"
                >
                  Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/health-check"
                  className="text-gray-600 dark:text-gray-400 hover:text-baymax-darkBlue dark:hover:text-baymax-blue transition-colors duration-200"
                >
                  Health Check
                </Link>
              </li>
              <li>
                <Link
                  href="/gemini"
                  className="text-gray-600 dark:text-gray-400 hover:text-baymax-darkBlue dark:hover:text-baymax-blue transition-colors duration-200"
                >
                  Gemini AI
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-baymax-darkBlue dark:hover:text-baymax-blue transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-baymax-darkBlue dark:hover:text-baymax-blue transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">San Fransokyo Institute of Technology</li>
              <li className="text-gray-600 dark:text-gray-400">contact@baymax-health.com</li>
              <li className="text-gray-600 dark:text-gray-400"></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 inline" /> by Baymax Health Team
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
