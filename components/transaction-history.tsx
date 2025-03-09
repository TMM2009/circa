"use client"

import { useState } from "react"
import { ArrowDownUp, ArrowUpRight, Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  date: string
  type: "borrow" | "lend" | "return" | "deposit" | "withdrawal"
  item: string
  amount: number
  status: "completed" | "pending" | "cancelled"
  counterparty: string
}

interface TransactionHistoryProps {
  limit?: number
}

export function TransactionHistory({ limit }: TransactionHistoryProps) {
  // Mock transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: "tx1",
      date: "2025-03-07",
      type: "borrow",
      item: "Mountain Bike",
      amount: -45.0,
      status: "completed",
      counterparty: "Sarah Miller",
    },
    {
      id: "tx2",
      date: "2025-03-05",
      type: "lend",
      item: "Drone",
      amount: 35.0,
      status: "completed",
      counterparty: "James Wilson",
    },
    {
      id: "tx3",
      date: "2025-03-03",
      type: "return",
      item: "Projector",
      amount: 0,
      status: "completed",
      counterparty: "Michael Brown",
    },
    {
      id: "tx4",
      date: "2025-03-01",
      type: "deposit",
      item: "",
      amount: 100.0,
      status: "completed",
      counterparty: "Wallet",
    },
    {
      id: "tx5",
      date: "2025-02-28",
      type: "lend",
      item: "Power Tools Set",
      amount: 25.0,
      status: "completed",
      counterparty: "Emma Davis",
    },
    {
      id: "tx6",
      date: "2025-02-25",
      type: "borrow",
      item: "DSLR Camera",
      amount: -30.0,
      status: "completed",
      counterparty: "Alex Johnson",
    },
    {
      id: "tx7",
      date: "2025-02-20",
      type: "withdrawal",
      item: "",
      amount: -50.0,
      status: "completed",
      counterparty: "Bank Account",
    },
    {
      id: "tx8",
      date: "2025-02-15",
      type: "lend",
      item: "Camping Tent",
      amount: 40.0,
      status: "completed",
      counterparty: "David Chen",
    },
    {
      id: "tx9",
      date: "2025-02-10",
      type: "borrow",
      item: "Snowboard",
      amount: -25.0,
      status: "completed",
      counterparty: "Olivia Martin",
    },
    {
      id: "tx10",
      date: "2025-02-05",
      type: "return",
      item: "Lawn Mower",
      amount: 0,
      status: "completed",
      counterparty: "Robert Taylor",
    },
  ])

  const displayTransactions = limit ? transactions.slice(0, limit) : transactions

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "borrow":
        return <ArrowDownUp className="h-4 w-4 text-orange-500" />
      case "lend":
        return <ArrowDownUp className="h-4 w-4 text-green-500" />
      case "return":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />
      case "deposit":
        return <ArrowDownUp className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowDownUp className="h-4 w-4 text-red-500" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-200 bg-yellow-50">
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      {displayTransactions.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No transactions found</div>
      ) : (
        <div className="space-y-2">
          {displayTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                  {getTypeIcon(transaction.type)}
                </div>
                <div>
                  <div className="font-medium">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}:{" "}
                    {transaction.item || transaction.counterparty}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)} • {transaction.counterparty}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`text-sm font-medium ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount >= 0 ? "+" : ""}
                  {transaction.amount.toFixed(2)} USD
                </div>
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      )}
      {limit && transactions.length > limit && (
        <Button variant="outline" className="w-full">
          View All Transactions
        </Button>
      )}
    </div>
  )
}

