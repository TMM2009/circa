"use client"

import { useState } from "react"
import { Info } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TrustScoreIndicatorProps {
  score: number
}

export function TrustScoreIndicator({ score }: TrustScoreIndicatorProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 70) return "bg-green-400"
    if (score >= 50) return "bg-yellow-400"
    if (score >= 30) return "bg-orange-400"
    return "bg-red-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">{score}%</div>
        <TooltipProvider>
          <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
            <TooltipTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Trust Score Info</span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="w-80">
              <div className="space-y-2">
                <p className="font-medium">Trust Score Explained</p>
                <p className="text-sm">Your trust score is calculated based on:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Successful transactions completed</li>
                  <li>On-time returns</li>
                  <li>Item condition upon return</li>
                  <li>User reviews and ratings</li>
                  <li>Account verification level</li>
                </ul>
                <p className="text-sm mt-2">A higher trust score unlocks premium items and better rental rates.</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div className={`h-2 rounded-full ${getColor(score)}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

