import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail } from "@/lib/db"
import { validateEnvironment } from "@/lib/env-validator"

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    const envValidation = validateEnvironment()
    if (!envValidation.isValid && process.env.NODE_ENV !== 'development') {
      console.warn('Environment validation failed:', envValidation.errors)
      // Don't fail in development, but log the issues
    }

    const { email, password } = await req.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { 
          error: "Email and password are required",
          status: "error"
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          error: "Invalid email format",
          status: "error"
        },
        { status: 400 }
      )
    }

    // Find user
    const user = findUserByEmail(email)
    
    if (!user) {
      // Use generic message to prevent user enumeration
      return NextResponse.json(
        { 
          error: "Invalid credentials",
          status: "error"
        },
        { status: 401 }
      )
    }

    // Check password (in a real app, you should hash passwords)
    if (user.password !== password) {
      return NextResponse.json(
        { 
          error: "Invalid credentials",
          status: "error"
        },
        { status: 401 }
      )
    }

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ 
      message: "Login successful", 
      user: userWithoutPassword,
      status: "success",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        status: "error"
      },
      { status: 500 }
    )
  }
}