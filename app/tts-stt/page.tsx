import TtsSttChatBox from "@/components/tts-stt-chat-box"
import ParticleBackground from "@/components/particle-background"

export const metadata = {
  title: "TTS/STT | Tadashi AI - Open Beta",
  description: "Chat with Mistral AI using Text-to-Speech and Speech-to-Text capabilities. Now in Open Beta for India!",
}

export default function TtsSttPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-tadashi-lightBlue dark:bg-gray-800 theme-aware relative overflow-hidden">
      <ParticleBackground />
      <div className="tadashi-container relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="tadashi-hero">
            TTS/STT with Mistral AI - Open Beta
          </h1>
          <p className="tadashi-tagline">
            Experience advanced healthcare assistance with Text-to-Speech and Speech-to-Text capabilities powered by Mistral AI. 
            Now supporting 13 Indian languages!
          </p>
          <div className="mt-4 p-3 bg-tadashi-blue/10 dark:bg-tadashi-darkBlue/20 rounded-lg inline-block">
            <p className="text-tadashi-darkBlue dark:text-tadashi-blue font-medium">
              🎉 All features unlocked during Open Beta - Free access to premium voice capabilities!
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto animate-fadeInUp">
          <TtsSttChatBox />
        </div>
      </div>
    </div>
  )
}