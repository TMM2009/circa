import { NextResponse } from "next/server"
import { blockchainService } from "@/lib/blockchain-service"

// Mock user ID for demo purposes
const CURRENT_USER_ID = "user123"

export async function GET() {
  try {
    // Get active contracts for the current user
    const contracts = blockchainService.getUserContracts(CURRENT_USER_ID)

    return NextResponse.json({
      success: true,
      data: contracts,
    })
  } catch (error) {
    console.error("Error fetching contracts:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contracts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { lenderId, borrowerId, itemId, type, terms } = body

    if (!lenderId || !borrowerId || !itemId || !type || !terms) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create a new smart contract
    const contract = blockchainService.createSmartContract(lenderId, borrowerId, itemId, type, terms)

    return NextResponse.json({
      success: true,
      data: contract,
    })
  } catch (error) {
    console.error("Error creating contract:", error)
    return NextResponse.json({ success: false, error: "Failed to create contract" }, { status: 500 })
  }
}

