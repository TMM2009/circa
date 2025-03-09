import { NextResponse } from "next/server"
import { blockchainService } from "@/lib/blockchain-service"

// Mock user ID for demo purposes
const CURRENT_USER_ID = "user123"

export async function GET() {
  try {
    // Get transactions for the current user
    const transactions = blockchainService.getUserTransactions(CURRENT_USER_ID)

    return NextResponse.json({
      success: true,
      data: transactions,
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { toUserId, type, amount, itemId } = body

    if (!toUserId || !type || amount === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Execute the transaction
    const transaction = blockchainService.executeTransaction(CURRENT_USER_ID, toUserId, type, amount, itemId)

    return NextResponse.json({
      success: true,
      data: transaction,
    })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ success: false, error: "Failed to create transaction" }, { status: 500 })
  }
}

