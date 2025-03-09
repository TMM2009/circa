"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Calendar, Clock, Filter, Heart, Plus, Search, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { TrustScoreIndicator } from "@/components/trust-score-indicator"
import { TransactionHistory } from "@/components/transaction-history"
import { WishlistItems } from "@/components/wishlist-items"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl">
              Circa
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <form className="hidden lg:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search items..." className="w-[300px] pl-8" />
            </form>
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/list-item">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                List New Item
              </Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-items">My Items</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <TrustScoreIndicator score={87} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Your trust score is above average. Complete 3 more transactions to reach the next level.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Items Borrowed</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground mt-1">2 active, 1 pending return</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$215.50</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 mr-1">+$45.00</span> from rentals this month
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionHistory limit={5} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>Your scheduled pickups and returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">Return: Mountain Bike</p>
                        <p className="text-xs text-muted-foreground">Tomorrow, 5:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">Pickup: Camping Tent</p>
                        <p className="text-xs text-muted-foreground">Mar 12, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">Pending: Camera Lens</p>
                        <p className="text-xs text-muted-foreground">Awaiting lender approval</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Calendar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="my-items" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>My Listed Items</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ArrowUpDown className="h-3.5 w-3.5" />
                      <span>Sort</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Sample items - would be dynamically loaded in a real app */}
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src="/placeholder.svg?height=200&width=300"
                          alt="Item preview"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Active
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">Item Name #{item}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm">$20/day</div>
                          <div className="text-xs text-muted-foreground">Listed 2 weeks ago</div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Manage
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="borrowed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Currently Borrowed Items</CardTitle>
                <CardDescription>Items you are currently borrowing from other users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* This would be dynamically loaded in a real app */}
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Mountain Bike"
                      className="rounded-md object-cover w-20 h-20"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">Mountain Bike (Trek X-Caliber)</h4>
                      <p className="text-sm text-muted-foreground">Borrowed from: Sarah Miller</p>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Return by: Mar 9, 2025</span>
                      </div>
                    </div>
                    <Button variant="outline">Extend</Button>
                    <Button>Return</Button>
                  </div>
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Projector"
                      className="rounded-md object-cover w-20 h-20"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">HD Projector</h4>
                      <p className="text-sm text-muted-foreground">Borrowed from: Michael Brown</p>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Return by: Mar 15, 2025</span>
                      </div>
                    </div>
                    <Button variant="outline">Extend</Button>
                    <Button>Return</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="wishlist" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>Items you've saved for later</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    <span>Add from Explore</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <WishlistItems />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your complete lending and borrowing history</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory limit={10} />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Export Transaction History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

