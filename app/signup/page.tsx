"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePremium } from "@/contexts/premium-context"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = usePremium()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        login(data.user)
        toast({
          title: "Account created",
          description: "Welcome to Tadashi AI!",
        })
        router.push("/tts-stt")
      } else {
        toast({
          title: "Signup failed",
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
    <div className="min-h-screen bg-tadashi-lightBlue dark:bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="tadashi-heading">Create Account</h1>
              <p className="tadashi-text">
                Join Tadashi AI to access premium healthcare features
              </p>
            </div>

            <form onSubmit={handleSubmit} className="tadashi-form">
              <div className="tadashi-form-group">
                <Label htmlFor="name" className="tadashi-form-label">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="tadashi-form-input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="tadashi-form-group">
                <Label htmlFor="email" className="tadashi-form-label">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="tadashi-form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="tadashi-form-group">
                <Label htmlFor="password" className="tadashi-form-label">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="tadashi-form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="tadashi-form-group">
                <Label htmlFor="confirmPassword" className="tadashi-form-label">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="tadashi-form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                className="tadashi-button w-full mt-6"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="tadashi-text">
                Already have an account?{" "}
                <Link href="/login" className="text-tadashi-blue dark:text-tadashi-darkBlue font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}