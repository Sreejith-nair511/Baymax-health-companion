import ChatBot from "@/components/chat-bot"
import ParticleBackground from "@/components/particle-background"

export const metadata = {
  title: "Chatbot | Tadashi AI - Your Personal Healthcare Companion",
  description: "Chat with Tadashi AI, your personal healthcare companion.",
}

export default function ChatbotPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-tadashi-lightBlue dark:bg-gray-800 theme-aware relative overflow-hidden">
      <ParticleBackground />
      <div className="tadashi-container relative z-10">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Chat with Tadashi AI</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I am Tadashi AI, your personal healthcare companion. How can I assist you today?
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-slideUp">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">
            <div className="h-[600px]">
              <ChatBot />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block bg-gradient-to-r from-tadashi-blue to-tadashi-darkBlue text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <p className="font-medium">Want even more advanced healthcare features?</p>
            <a href="/premium" className="font-bold underline">Upgrade to Premium for ₹49/month</a>
          </div>
        </div>
      </div>
    </div>
  )
}