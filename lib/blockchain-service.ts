import { v4 as uuidv4 } from "uuid"

// Types
export interface Transaction {
  id: string
  timestamp: number
  type: "borrow" | "lend" | "return" | "deposit" | "withdrawal"
  fromUserId: string
  toUserId: string
  itemId?: string
  amount: number
  status: "pending" | "completed" | "cancelled"
  contractAddress?: string
}

export interface SmartContract {
  id: string
  contractAddress: string
  type: "rental" | "barter"
  terms: {
    startDate: number
    endDate: number
    price?: number
    deposit?: number
    barterItems?: string[]
    conditions: string[]
  }
  signatures: {
    lender: boolean
    borrower: boolean
  }
  status: "draft" | "active" | "completed" | "disputed" | "cancelled"
}

export interface TrustScore {
  userId: string
  score: number
  factors: {
    successfulTransactions: number
    onTimeReturns: number
    itemCondition: number
    userReviews: number
    accountVerification: number
  }
  history: Array<{
    timestamp: number
    score: number
    reason: string
  }>
}

// Simulated blockchain service
class BlockchainService {
  private transactions: Transaction[] = []
  private contracts: SmartContract[] = []
  private trustScores: Record<string, TrustScore> = {}

  // Create a new smart contract for a rental or barter
  createSmartContract(
    lenderId: string,
    borrowerId: string,
    itemId: string,
    type: "rental" | "barter",
    terms: SmartContract["terms"],
  ): SmartContract {
    const contractId = uuidv4()
    const contractAddress = `0x${Math.random().toString(16).substr(2, 40)}`

    const contract: SmartContract = {
      id: contractId,
      contractAddress,
      type,
      terms,
      signatures: {
        lender: false,
        borrower: false,
      },
      status: "draft",
    }

    this.contracts.push(contract)
    return contract
  }

  // Sign a smart contract
  signContract(contractId: string, userId: string, userType: "lender" | "borrower"): boolean {
    const contract = this.contracts.find((c) => c.id === contractId)
    if (!contract) return false

    contract.signatures[userType] = true

    // If both parties have signed, activate the contract
    if (contract.signatures.lender && contract.signatures.borrower) {
      contract.status = "active"
    }

    return true
  }

  // Execute a transaction
  executeTransaction(
    fromUserId: string,
    toUserId: string,
    type: Transaction["type"],
    amount: number,
    itemId?: string,
  ): Transaction {
    const transaction: Transaction = {
      id: uuidv4(),
      timestamp: Date.now(),
      type,
      fromUserId,
      toUserId,
      itemId,
      amount,
      status: "completed",
    }

    this.transactions.push(transaction)

    // Update trust scores based on transaction
    this.updateTrustScore(fromUserId, type)
    this.updateTrustScore(toUserId, type)

    return transaction
  }

  // Complete a rental contract (item returned)
  completeRental(contractId: string): boolean {
    const contract = this.contracts.find((c) => c.id === contractId)
    if (!contract || contract.status !== "active") return false

    contract.status = "completed"
    return true
  }

  // Get user's trust score
  getTrustScore(userId: string): number {
    if (!this.trustScores[userId]) {
      // Initialize trust score for new users
      this.trustScores[userId] = {
        userId,
        score: 70, // Starting score
        factors: {
          successfulTransactions: 0,
          onTimeReturns: 0,
          itemCondition: 0,
          userReviews: 0,
          accountVerification: 0,
        },
        history: [
          {
            timestamp: Date.now(),
            score: 70,
            reason: "Account created",
          },
        ],
      }
    }

    return this.trustScores[userId].score
  }

  // Update user's trust score based on activity
  private updateTrustScore(userId: string, transactionType: Transaction["type"]): void {
    const currentScore = this.getTrustScore(userId)
    let scoreChange = 0
    let reason = ""

    switch (transactionType) {
      case "borrow":
        scoreChange = 0 // No change when borrowing
        reason = "New borrowing transaction"
        break
      case "lend":
        scoreChange = 0 // No change when lending
        reason = "New lending transaction"
        break
      case "return":
        scoreChange = 1 // Positive change for returning items
        reason = "Successful item return"
        this.trustScores[userId].factors.onTimeReturns++
        break
      default:
        return
    }

    this.trustScores[userId].factors.successfulTransactions++
    this.trustScores[userId].score = Math.min(100, currentScore + scoreChange)

    this.trustScores[userId].history.push({
      timestamp: Date.now(),
      score: this.trustScores[userId].score,
      reason,
    })
  }

  // Verify a user's identity (simulated KYC)
  verifyUserIdentity(userId: string): boolean {
    if (!this.trustScores[userId]) {
      this.getTrustScore(userId) // Initialize if not exists
    }

    this.trustScores[userId].factors.accountVerification = 1
    this.trustScores[userId].score = Math.min(100, this.trustScores[userId].score + 5)

    this.trustScores[userId].history.push({
      timestamp: Date.now(),
      score: this.trustScores[userId].score,
      reason: "Identity verified",
    })

    return true
  }

  // Get transaction history for a user
  getUserTransactions(userId: string): Transaction[] {
    return this.transactions
      .filter((t) => t.fromUserId === userId || t.toUserId === userId)
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  // Get active contracts for a user
  getUserContracts(userId: string): SmartContract[] {
    return this.contracts.filter((c) => c.id.includes(userId) && c.status === "active")
  }
}

// Export singleton instance
export const blockchainService = new BlockchainService()

