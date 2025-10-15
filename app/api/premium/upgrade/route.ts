import { type NextRequest, NextResponse } from "next/server"
import { updateUserPremiumStatus, findUserById } from "@/lib/db"
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

    // Check if database is enabled
    const isDatabaseEnabled = process.env.ENABLE_DATABASE !== 'false'
    if (!isDatabaseEnabled) {
      console.log('Database is disabled, using temporary premium upgrade')
      // In temporary mode, we'll simulate a successful upgrade
      const tempUser = {
        id: userId,
        email: `user-${userId}@example.com`,
        password: 'temp-password',
        name: 'Temporary User',
        isPremium: true, // Set to premium
        createdAt: new Date().toISOString()
      }
      
      // Send premium upgrade email
      try {
        await sendPremiumUpgradeEmail(tempUser.email, tempUser.name)
      } catch (emailError) {
        console.error("Failed to send premium upgrade email:", emailError)
        // Don't fail the upgrade if email fails, just log it
      }
      
      // Return success response (without password)
      const { password, ...userWithoutPassword } = tempUser
      return NextResponse.json({ 
        message: "Premium upgrade successful (temporary mode)", 
        user: userWithoutPassword,
        status: "success",
        timestamp: new Date().toISOString()
      })
    }

    // Find user first to get email and name
    const user = findUserById(userId)
    if (!user) {
      return NextResponse.json(
        { 
          error: "User not found",
          status: "error"
        },
        { status: 404 }
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