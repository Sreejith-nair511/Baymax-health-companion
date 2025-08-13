import GeminiChatBox from "@/components/gemini-chat-box"

export const metadata = {
  title: "Gemini AI | Baymax - Your Personal Healthcare Companion",
  description: "Chat with Google's Gemini AI through Baymax.",
}

export default function GeminiPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-baymax-lightBlue dark:bg-gray-800">
      <div className="baymax-container">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Gemini AI Assistant</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ask questions and get answers from Google's advanced Gemini AI model.
          </p>
        </div>

        <div className="animate-slideUp">
          <GeminiChatBox />
        </div>
      </div>
    </div>
  )
}
