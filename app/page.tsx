import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Activity } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-b from-baymax-lightBlue to-white dark:from-gray-800 dark:to-gray-900">
        <div className="baymax-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Hello. I am <span className="text-baymax-darkBlue dark:text-baymax-blue">Baymax</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Your personal healthcare companion, here to help you stay healthy and happy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chatbot">
                  <Button className="baymax-button w-full sm:w-auto dark:bg-baymax-blue dark:hover:bg-baymax-darkBlue">
                    Chat with Baymax <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/health-check">
                  <Button
                    variant="outline"
                    className="baymax-button-secondary w-full sm:w-auto dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Health Check
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image src="/images/baymax-hello.gif" alt="Baymax Character" fill className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="baymax-section bg-white dark:bg-gray-900">
        <div className="baymax-container">
          <h2 className="baymax-heading text-center dark:text-gray-100">How Baymax Can Help You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="baymax-card animate-slideUp dark:bg-gray-800 dark:border-gray-700">
              <div className="rounded-full bg-baymax-lightBlue dark:bg-baymax-blue/20 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-baymax-darkBlue dark:text-baymax-blue" />
              </div>
              <h3 className="baymax-subheading dark:text-gray-200">Health Monitoring</h3>
              <p className="baymax-text dark:text-gray-300">
                Track your health metrics and get personalized recommendations to improve your wellbeing.
              </p>
            </div>

            <div
              className="baymax-card animate-slideUp dark:bg-gray-800 dark:border-gray-700"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="rounded-full bg-baymax-lightBlue dark:bg-baymax-blue/20 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-baymax-darkBlue dark:text-baymax-blue" />
              </div>
              <h3 className="baymax-subheading dark:text-gray-200">Health Advice</h3>
              <p className="baymax-text dark:text-gray-300">
                Get evidence-based health advice and tips to maintain a healthy lifestyle and prevent illness.
              </p>
            </div>

            <div
              className="baymax-card animate-slideUp dark:bg-gray-800 dark:border-gray-700"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="rounded-full bg-baymax-lightBlue dark:bg-baymax-blue/20 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Activity className="h-8 w-8 text-baymax-darkBlue dark:text-baymax-blue" />
              </div>
              <h3 className="baymax-subheading dark:text-gray-200">Wellness Tracking</h3>
              <p className="baymax-text dark:text-gray-300">
                Monitor your mental and physical wellness with regular check-ins and personalized insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="baymax-section bg-baymax-gray dark:bg-gray-800">
        <div className="baymax-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40">
                <Image
                  src="/images/baymax-thumbs-up.gif"
                  alt="Baymax giving thumbs up"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="baymax-heading dark:text-gray-100">Ready to Improve Your Health?</h2>
            <p className="baymax-text dark:text-gray-300 mb-8">
              Start your journey to better health with Baymax today. Our AI-powered healthcare companion is here to help
              you every step of the way.
            </p>
            <Link href="/chatbot">
              <Button className="baymax-button dark:bg-baymax-blue dark:hover:bg-baymax-darkBlue">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
