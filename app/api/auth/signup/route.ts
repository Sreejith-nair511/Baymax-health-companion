import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"
import { validateEnvironment } from "@/lib/env-validator"

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    const envValidation = validateEnvironment()
    if (!envValidation.isValid && process.env.NODE_ENV !== 'development') {
      console.warn('Environment validation failed:', envValidation.errors)
      // Don't fail in development, but log the issues
    }

    const { email, password, name } = await req.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { 
          error: "Email, password, and name are required",
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

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { 
          error: "Password must be at least 6 characters long",
          status: "error"
        },
        { status: 400 }
      )
    }

    // Validate name length
    if (name.length < 2) {
      return NextResponse.json(
        { 
          error: "Name must be at least 2 characters long",
          status: "error"
        },
        { status: 400 }
      )
    }

    // Create user
    const user = createUser({ email, password, name })

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the signup if email fails, just log it
    }

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ 
      message: "User created successfully", 
      user: userWithoutPassword,
      status: "success",
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Signup error:", error)
    
    if (error.message === "User with this email already exists") {
      return NextResponse.json(
        { 
          error: "User with this email already exists",
          status: "error"
        },
        { status: 409 }
      )
    }
    
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