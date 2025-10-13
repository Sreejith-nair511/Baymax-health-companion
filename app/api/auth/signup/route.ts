import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    // Create user
    const user = createUser({ email, password, name })

    // Send welcome email
    await sendWelcomeEmail(email, name)

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ 
      message: "User created successfully", 
      user: userWithoutPassword 
    })
  } catch (error: any) {
    console.error("Signup error:", error)
    
    if (error.message === "User with this email already exists") {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}