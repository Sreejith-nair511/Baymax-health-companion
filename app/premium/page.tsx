"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, Star, Shield, Heart, Activity, Users, Clock, Award } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { useToast } from "@/hooks/use-toast"
import ParticleBackground from "@/components/particle-background"
import InteractiveGif from "@/components/interactive-gif"

export default function PremiumPage() {
  const { user, login } = usePremium()
  const { toast } = useToast()
  const [isAnnual, setIsAnnual] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Essential healthcare features",
      features: [
        "Basic health monitoring",
        "General health advice",
        "Limited chat with Tadashi AI",
        "Basic wellness tracking"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      price: isAnnual ? "₹490" : "₹49",
      description: isAnnual ? "Billed annually (Save ₹98)" : "Billed monthly",
      features: [
        "Unlimited chat with Tadashi AI",
        "Advanced health monitoring",
        "Personalized health recommendations",
        "Priority health advice",
        "Comprehensive wellness tracking",
        "Early access to new features",
        "24/7 healthcare support",
        "Text-to-Speech (TTS) capabilities",
        "Speech-to-Text (STT) capabilities",
        "AI-powered health check assessments"
      ],
      cta: "Get Premium",
      popular: true
    }
  ]

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upgrade to Premium",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/premium/upgrade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update the user in context
        login(data.user)
        
        toast({
          title: "Upgrade successful!",
          description: "You now have access to all Premium features",
        })
      } else {
        toast({
          title: "Upgrade failed",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-tadashi-lightBlue to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      <ParticleBackground />
      <div className="tadashi-container py-8 relative z-10">
        <Link href="/" className="inline-flex items-center text-tadashi-darkBlue dark:text-tadashi-blue hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Upgrade to <span className="text-tadashi-darkBlue dark:text-tadashi-blue">Tadashi AI Premium</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Unlock the full potential of your personal healthcare companion with advanced features designed to improve your health and wellbeing.
          </p>
          <div className="flex justify-center mt-6">
            <div className="relative w-32 h-32">
              <InteractiveGif
                src="/images/tadashi-thumbs-up.gif"
                alt="Tadashi AI giving thumbs up"
                width={128}
                height={128}
                floating={true}
                pulsing={true}
              />
            </div>
          </div>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-3 font-medium ${!isAnnual ? 'text-tadashi-darkBlue dark:text-tadashi-blue' : 'text-gray-500'}`}>Monthly</span>
          <Button
            variant="outline"
            className="relative rounded-full w-14 h-7"
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <span className={`absolute inset-y-0 left-0 w-7 h-7 rounded-full bg-tadashi-blue transition-transform ${isAnnual ? 'transform translate-x-7' : ''}`}></span>
          </Button>
          <span className={`ml-3 font-medium ${isAnnual ? 'text-tadashi-darkBlue dark:text-tadashi-blue' : 'text-gray-500'}`}>
            Annual <span className="text-sm bg-tadashi-blue/20 text-tadashi-darkBlue dark:text-tadashi-blue px-2 py-1 rounded-full ml-1">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden ${plan.popular ? 'border-2 border-tadashi-blue shadow-xl scale-105' : 'border-gray-200 dark:border-gray-700'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-tadashi-blue text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{plan.price}</span>
                  {plan.name === "Premium" && (
                    <span className="text-gray-500 dark:text-gray-400">/{isAnnual ? "year" : "month"}</span>
                  )}
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{plan.description}</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-tadashi-blue hover:bg-tadashi-darkBlue text-white' : 'border border-gray-300 dark:border-gray-600'}`}
                  onClick={() => {
                    if (plan.name === "Premium") {
                      handleSubscribe()
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? "Processing..." : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="tadashi-heading text-center dark:text-gray-100 mb-12">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="tadashi-card text-center dark:bg-gray-800 dark:border-gray-700">
              <div className="rounded-full bg-tadashi-lightBlue dark:bg-tadashi-blue/20 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-subheading dark:text-gray-200 mb-3">Advanced AI Analysis</h3>
              <p className="tadashi-text dark:text-gray-300">
                Get deeper insights from your health data with our enhanced AI algorithms.
              </p>
            </div>

            <div className="tadashi-card text-center dark:bg-gray-800 dark:border-gray-700">
              <div className="rounded-full bg-tadashi-lightBlue dark:bg-tadashi-blue/20 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-subheading dark:text-gray-200 mb-3">Priority Support</h3>
              <p className="tadashi-text dark:text-gray-300">
                Receive faster responses and dedicated healthcare support when you need it most.
              </p>
            </div>

            <div className="tadashi-card text-center dark:bg-gray-800 dark:border-gray-700">
              <div className="rounded-full bg-tadashi-lightBlue dark:bg-tadashi-blue/20 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-subheading dark:text-gray-200 mb-3">Personalized Care</h3>
              <p className="tadashi-text dark:text-gray-300">
                Receive customized health recommendations based on your unique health profile.
              </p>
            </div>

            <div className="tadashi-card text-center dark:bg-gray-800 dark:border-gray-700">
              <div className="rounded-full bg-tadashi-lightBlue dark:bg-tadashi-blue/20 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-subheading dark:text-gray-200 mb-3">Comprehensive Tracking</h3>
              <p className="tadashi-text dark:text-gray-300">
                Monitor all aspects of your health with our advanced tracking capabilities.
              </p>
            </div>

            <div className="tadashi-card text-center dark:bg-gray-800 dark:border-gray-700">
              <div className="rounded-full bg-tadashi-lightBlue dark:bg-tadashi-blue/20 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-subheading dark:text-gray-200 mb-3">Family Health</h3>
              <p className="tadashi-text dark:text-gray-300">
                Extend premium benefits to your entire family for comprehensive care.
              </p>
            </div>

            <div className="tadashi-card text-center dark:bg-gray-800 dark:border-gray-700">
              <div className="rounded-full bg-tadashi-lightBlue dark:bg-tadashi-blue/20 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-subheading dark:text-gray-200 mb-3">Exclusive Content</h3>
              <p className="tadashi-text dark:text-gray-300">
                Access premium health content and resources not available to basic users.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="tadashi-heading text-center dark:text-gray-100 mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="tadashi-card dark:bg-gray-800 dark:border-gray-700">
              <h3 className="tadashi-subheading dark:text-gray-200 mb-2">How do I cancel my subscription?</h3>
              <p className="tadashi-text dark:text-gray-300">
                You can cancel your subscription at any time from your account settings. Your premium access will continue until the end of your billing period.
              </p>
            </div>
            <div className="tadashi-card dark:bg-gray-800 dark:border-gray-700">
              <h3 className="tadashi-subheading dark:text-gray-200 mb-2">Can I switch between monthly and annual plans?</h3>
              <p className="tadashi-text dark:text-gray-300">
                Yes, you can switch between monthly and annual plans at any time. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
            <div className="tadashi-card dark:bg-gray-800 dark:border-gray-700">
              <h3 className="tadashi-subheading dark:text-gray-200 mb-2">Is there a free trial for Premium?</h3>
              <p className="tadashi-text dark:text-gray-300">
                We offer a 7-day free trial for new Premium subscribers. You can cancel anytime during the trial period without being charged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}