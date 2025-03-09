"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login - would connect to authentication service in a real app
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col space-y-6">
          <div>
            <Link href="/" className="font-bold text-3xl">
              Circa
            </Link>
            <h1 className="text-2xl font-bold mt-6">Join the trusted lending & borrowing community</h1>
            <p className="text-muted-foreground mt-2">
              Connect with neighbors and friends to share resources securely through our blockchain-powered platform.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Secure Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Smart contracts ensure safe exchanges and protect both parties.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Build Trust Score</h3>
                <p className="text-sm text-muted-foreground">
                  Every successful transaction improves your blockchain-verified reputation.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Save Money & Resources</h3>
                <p className="text-sm text-muted-foreground">Access items you need without the cost of ownership.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your data is secured with blockchain encryption</span>
          </div>
        </div>

        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">Welcome to Circa</CardTitle>
              <CardDescription>Sign in to your account or create a new one</CardDescription>
            </CardHeader>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                      <span className="text-muted-foreground">Don't have an account? </span>
                      <Link href="/auth/register" className="text-primary hover:underline">
                        Sign up
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
          <div className="mt-4 text-center text-sm text-muted-foreground md:hidden">
            <Link href="/" className="hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

