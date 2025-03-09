import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
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
            <Link href="/how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Circa</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Revolutionizing peer-to-peer lending with blockchain technology
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At Circa, we believe in the power of community and shared resources. Our mission is to create a world
                  where access trumps ownership, where people can easily share items they rarely use, and where trust is
                  built through technology.
                </p>
                <p className="text-muted-foreground mb-4">
                  We're committed to reducing waste, promoting sustainability, and helping people save money while
                  building stronger communities. By leveraging blockchain technology, we've created a platform that
                  makes lending and borrowing safe, transparent, and accessible to everyone.
                </p>
                <div className="space-y-3 mt-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Sustainable Consumption</h3>
                      <p className="text-sm text-muted-foreground">
                        Reducing waste by maximizing the utility of existing items.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Community Building</h3>
                      <p className="text-sm text-muted-foreground">
                        Creating connections between neighbors and strengthening local communities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Financial Accessibility</h3>
                      <p className="text-sm text-muted-foreground">
                        Making high-quality items accessible without the burden of ownership.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=600&width=800&text=Circa+Team"
                  alt="Circa Team"
                  className="rounded-lg object-cover w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From a simple idea to a revolutionary platform
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>The Beginning</CardTitle>
                  <CardDescription>2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Circa began when our founders, frustrated with the waste of rarely-used items, envisioned a platform
                    where people could safely lend and borrow from each other. The challenge was building trust in a
                    peer-to-peer system.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Innovation</CardTitle>
                  <CardDescription>2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The breakthrough came with blockchain technology. By creating smart contracts and a decentralized
                    trust system, we solved the trust problem. Our beta platform launched with overwhelming positive
                    feedback.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Growing Community</CardTitle>
                  <CardDescription>2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Today, Circa is growing rapidly across major cities. Our community of lenders and borrowers is
                    building a new economy based on trust, sustainability, and shared resources. And we're just getting
                    started.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">10K+</div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">25K+</div>
                    <p className="text-sm text-muted-foreground">Items Listed</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">15K+</div>
                    <p className="text-sm text-muted-foreground">Successful Transactions</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">12</div>
                    <p className="text-sm text-muted-foreground">Cities and Growing</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Join Our Community</h2>
                <p className="text-muted-foreground mb-4">
                  Circa is more than a platform—it's a community of like-minded individuals who believe in sharing
                  resources, reducing waste, and building trust. Whether you have items to lend or need to borrow
                  something, you'll find a welcoming community ready to help.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our blockchain-powered trust system ensures that every transaction is secure, transparent, and fair
                  for everyone involved. Join thousands of users already experiencing the benefits of our sharing
                  economy.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/login">
                    <Button size="lg" className="gap-1.5">
                      Join Circa Today
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button size="lg" variant="outline">
                      Explore Items
                    </Button>
                  </Link>
                </div>
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

