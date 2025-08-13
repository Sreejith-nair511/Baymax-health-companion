import ChatBot from "@/components/chat-bot"

export const metadata = {
  title: "Chatbot | Baymax - Your Personal Healthcare Companion",
  description: "Chat with Baymax, your personal healthcare companion.",
}

export default function ChatbotPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-baymax-lightBlue dark:bg-gray-800">
      <div className="baymax-container">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Chat with Baymax</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I am Baymax, your personal healthcare companion. How can I assist you today?
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-slideUp">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">
            <div className="h-[600px]">
              <ChatBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
