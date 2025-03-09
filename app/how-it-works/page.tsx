import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, CreditCard, Search, Shield, Truck, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl">
              Circa
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="text-sm font-medium">
              Explore
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-primary">
              How It Works
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">How Circa Works</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A step-by-step guide to our blockchain-powered lending platform
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">1. Find What You Need</h2>
                <p className="text-muted-foreground">
                  Browse thousands of items available in your area. Our advanced search and filtering options help you
                  find exactly what you're looking for, whether it's a camera for your vacation or tools for a home
                  project.
                </p>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Search by category, location, or keyword</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Filter by availability dates</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">View detailed item descriptions and photos</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">2. Secure Transactions</h2>
                <p className="text-muted-foreground">
                  Our blockchain technology creates smart contracts for every transaction, ensuring both lenders and
                  borrowers are protected. Security deposits, payment processing, and dispute resolution are all handled
                  securely.
                </p>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Smart contracts protect both parties</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Secure payment processing</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Transparent security deposit handling</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">3. Build Trust</h2>
                <p className="text-muted-foreground">
                  Every successful transaction builds your trust score on the blockchain. A higher score unlocks premium
                  items, better rates, and builds your reputation in the community. Reviews and ratings help everyone
                  make informed decisions.
                </p>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Blockchain-verified trust scores</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Review and rating system</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Unlock premium features with higher scores</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">The Borrowing Process</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  How to borrow items on Circa in 4 simple steps
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <Search className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Find & Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Browse items and send a request to the owner with your desired dates. Include a brief message about
                    how you'll use the item.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CreditCard className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Confirm & Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Once approved, confirm the booking and pay through our secure system. Your payment is held in escrow
                    until pickup.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Truck className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Pickup & Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Meet the owner to pick up the item. Verify its condition together and enjoy using it for your rental
                    period.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Return & Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Return the item on time and in good condition. Leave a review and receive your security deposit
                    back.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Blockchain Technology</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  How we use blockchain to create a secure and trustworthy platform
                </p>
              </div>
            </div>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600&text=Blockchain+Technology"
                  alt="Blockchain Technology"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Smart Contracts</h3>
                  <p className="text-muted-foreground">
                    Every transaction on Circa is backed by a smart contract that automatically enforces the terms
                    agreed upon by both parties. This eliminates the need for intermediaries and ensures transparency.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Trust Scores</h3>
                  <p className="text-muted-foreground">
                    Your reputation is stored on the blockchain, making it immutable and verifiable. Trust scores are
                    calculated based on transaction history, reviews, and verification status.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                  <p className="text-muted-foreground">
                    Our escrow system holds payments securely until transactions are completed successfully. This
                    protects both lenders and borrowers from fraud.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Dispute Resolution</h3>
                  <p className="text-muted-foreground">
                    In case of disputes, our blockchain records provide an immutable history of the transaction, making
                    resolution fair and transparent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of users already sharing and borrowing on Circa
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/login">
                  <Button size="lg" className="gap-1.5">
                    Create an Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline">
                    Browse Items
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Circa. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

