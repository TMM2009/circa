import { NextResponse } from "next/server"
import { blockchainService } from "@/lib/blockchain-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    // Get trust score for the specified user
    const trustScore = blockchainService.getTrustScore(userId)

    return NextResponse.json({
      success: true,
      data: { userId, score: trustScore },
    })
  } catch (error) {
    console.error("Error fetching trust score:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch trust score" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    // Verify user identity to increase trust score
    const success = blockchainService.verifyUserIdentity(userId)

    if (success) {
      const updatedScore = blockchainService.getTrustScore(userId)
      return NextResponse.json({
        success: true,
        data: { userId, score: updatedScore },
      })
    } else {
      return NextResponse.json({ success: false, error: "Failed to verify identity" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying identity:", error)
    return NextResponse.json({ success: false, error: "Failed to verify identity" }, { status: 500 })
  }
}

