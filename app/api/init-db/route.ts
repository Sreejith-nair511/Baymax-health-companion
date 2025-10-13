import { type NextRequest, NextResponse } from "next/server"
import { initDB } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    initDB()
    return NextResponse.json({ message: "Database initialized successfully" })
  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json(
      { error: "Failed to initialize database" },
      { status: 500 }
    )
  }
}