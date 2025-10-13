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
          <h1 className="tadashi-hero">
            Upgrade to <span className="text-tadashi-darkBlue dark:text-tadashi-blue">Tadashi AI Premium</span>
          </h1>
          <p className="tadashi-tagline">
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
            <div 
              key={plan.name} 
              className={`tadashi-pricing-card ${plan.popular ? 'tadashi-pricing-popular' : ''}`}
            >
              {plan.popular && (
                <div className="tadashi-pricing-badge">
                  MOST POPULAR
                </div>
              )}
              <div className="p-1">
                <div className="tadashi-pricing-title">{plan.name}</div>
                <div className="tadashi-pricing-description">
                  <span className="tadashi-pricing-price">{plan.price}</span>
                  {plan.name === "Premium" && (
                    <span className="text-gray-500 dark:text-gray-400">/{isAnnual ? "year" : "month"}</span>
                  )}
                  <p className="mt-2">{plan.description}</p>
                </div>
              </div>
              <div className="p-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="tadashi-pricing-feature">
                      <Check className="tadashi-pricing-feature-icon" />
                      <span className="tadashi-pricing-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-1 pt-4">
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
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="tadashi-heading text-center dark:text-gray-100 mb-12">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="tadashi-feature-card">
              <div className="tadashi-feature-icon">
                <Star className="h-6 w-6 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-feature-title">Advanced AI Analysis</h3>
              <p className="tadashi-feature-description">
                Get deeper insights from your health data with our enhanced AI algorithms.
              </p>
            </div>

            <div className="tadashi-feature-card">
              <div className="tadashi-feature-icon">
                <Shield className="h-6 w-6 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-feature-title">Priority Support</h3>
              <p className="tadashi-feature-description">
                Receive faster responses and dedicated healthcare support when you need it most.
              </p>
            </div>

            <div className="tadashi-feature-card">
              <div className="tadashi-feature-icon">
                <Heart className="h-6 w-6 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-feature-title">Personalized Care</h3>
              <p className="tadashi-feature-description">
                Receive customized health recommendations based on your unique health profile.
              </p>
            </div>

            <div className="tadashi-feature-card">
              <div className="tadashi-feature-icon">
                <Activity className="h-6 w-6 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-feature-title">Comprehensive Tracking</h3>
              <p className="tadashi-feature-description">
                Monitor all aspects of your health with our advanced tracking capabilities.
              </p>
            </div>

            <div className="tadashi-feature-card">
              <div className="tadashi-feature-icon">
                <Users className="h-6 w-6 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-feature-title">Family Health</h3>
              <p className="tadashi-feature-description">
                Extend premium benefits to your entire family for comprehensive care.
              </p>
            </div>

            <div className="tadashi-feature-card">
              <div className="tadashi-feature-icon">
                <Award className="h-6 w-6 text-tadashi-darkBlue dark:text-tadashi-blue" />
              </div>
              <h3 className="tadashi-feature-title">Exclusive Content</h3>
              <p className="tadashi-feature-description">
                Access premium health content and resources not available to basic users.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="tadashi-heading text-center dark:text-gray-100 mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="tadashi-card">
              <h3 className="tadashi-subheading">How do I cancel my subscription?</h3>
              <p className="tadashi-text">
                You can cancel your subscription at any time from your account settings. Your premium access will continue until the end of your billing period.
              </p>
            </div>
            <div className="tadashi-card">
              <h3 className="tadashi-subheading">Can I switch between monthly and annual plans?</h3>
              <p className="tadashi-text">
                Yes, you can switch between monthly and annual plans at any time. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
            <div className="tadashi-card">
              <h3 className="tadashi-subheading">Is there a free trial for Premium?</h3>
              <p className="tadashi-text">
                We offer a 7-day free trial for new Premium subscribers. You can cancel anytime during the trial period without being charged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}