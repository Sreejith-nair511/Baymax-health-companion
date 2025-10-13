import TtsSttChatBox from "@/components/tts-stt-chat-box"
import ParticleBackground from "@/components/particle-background"

export const metadata = {
  title: "TTS/STT | Tadashi AI - Your Personal Healthcare Companion",
  description: "Chat with Mistral AI using Text-to-Speech and Speech-to-Text capabilities.",
}

export default function TtsSttPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-tadashi-lightBlue dark:bg-gray-800 theme-aware relative overflow-hidden">
      <ParticleBackground />
      <div className="tadashi-container relative z-10">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">TTS/STT with Mistral AI</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience advanced healthcare assistance with Text-to-Speech and Speech-to-Text capabilities powered by Mistral AI.
          </p>
        </div>

        <div className="animate-slideUp">
          <TtsSttChatBox />
        </div>
      </div>
    </div>
  )
}