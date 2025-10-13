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
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="tadashi-hero">
            TTS/STT with Mistral AI
          </h1>
          <p className="tadashi-tagline">
            Experience advanced healthcare assistance with Text-to-Speech and Speech-to-Text capabilities powered by Mistral AI.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fadeInUp">
          <TtsSttChatBox />
        </div>
      </div>
    </div>
  )
}