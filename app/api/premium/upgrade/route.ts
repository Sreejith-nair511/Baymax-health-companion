import { type NextRequest, NextResponse } from "next/server"
import { updateUserPremiumStatus } from "@/lib/db"
import { sendPremiumUpgradeEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { 
          error: "User ID is required",
          status: "error"
        },
        { status: 400 }
      )
    }

    // Update user premium status
    const updatedUser = updateUserPremiumStatus(userId, true)
    
    if (!updatedUser) {
      return NextResponse.json(
        { 
          error: "User not found",
          status: "error"
        },
        { status: 404 }
      )
    }

    // Send premium upgrade email
    try {
      await sendPremiumUpgradeEmail(updatedUser.email, updatedUser.name)
    } catch (emailError) {
      console.error("Failed to send premium upgrade email:", emailError)
      // Don't fail the upgrade if email fails, just log it
    }

    // Return success response (without password)
    const { password, ...userWithoutPassword } = updatedUser
    return NextResponse.json({ 
      message: "Premium upgrade successful", 
      user: userWithoutPassword,
      status: "success",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Premium upgrade error:", error)
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