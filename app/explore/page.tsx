"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, MapPin, Search, SlidersHorizontal, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for items
const mockItems = [
  {
    id: 1,
    title: "Professional DSLR Camera",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=400",
    price: 25,
    priceUnit: "day",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 24,
    trustScore: 98,
    type: "rent",
  },
  {
    id: 2,
    title: "Mountain Bike (Trek X-Caliber)",
    category: "Sports & Outdoors",
    image: "/placeholder.svg?height=300&width=400",
    price: 15,
    priceUnit: "day",
    location: "Portland, OR",
    rating: 4.9,
    reviews: 37,
    trustScore: 95,
    type: "rent",
  },
  {
    id: 3,
    title: "Portable Generator",
    category: "Tools & Equipment",
    image: "/placeholder.svg?height=300&width=400",
    price: 40,
    priceUnit: "day",
    location: "Austin, TX",
    rating: 4.7,
    reviews: 19,
    trustScore: 97,
    type: "rent",
  },
  {
    id: 4,
    title: "Camping Tent (4-Person)",
    category: "Outdoors",
    image: "/placeholder.svg?height=300&width=400",
    price: 20,
    priceUnit: "day",
    location: "Denver, CO",
    rating: 4.6,
    reviews: 28,
    trustScore: 94,
    type: "rent",
  },
  {
    id: 5,
    title: "Drone with 4K Camera",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=400",
    price: 35,
    priceUnit: "day",
    location: "Seattle, WA",
    rating: 4.5,
    reviews: 15,
    trustScore: 92,
    type: "rent",
  },
  {
    id: 6,
    title: "Snowboard with Bindings",
    category: "Sports & Outdoors",
    image: "/placeholder.svg?height=300&width=400",
    price: 30,
    priceUnit: "day",
    location: "Boulder, CO",
    rating: 4.7,
    reviews: 22,
    trustScore: 96,
    type: "rent",
  },
  {
    id: 7,
    title: "Power Tools Set",
    category: "Tools & Equipment",
    image: "/placeholder.svg?height=300&width=400",
    price: 0,
    priceUnit: "barter",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 31,
    trustScore: 98,
    type: "barter",
    barterFor: "Lawn Mower or Garden Equipment",
  },
  {
    id: 8,
    title: "Projector (1080p)",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=400",
    price: 0,
    priceUnit: "barter",
    location: "Miami, FL",
    rating: 4.6,
    reviews: 17,
    trustScore: 93,
    type: "barter",
    barterFor: "Bluetooth Speaker or Audio Equipment",
  },
]

export default function ExplorePage() {
  const [items] = useState(mockItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter items based on search query and active tab
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "rent") return matchesSearch && item.type === "rent"
    if (activeTab === "barter") return matchesSearch && item.type === "barter"

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl">
              Circa
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/list-item">
              <Button>List an Item</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items, categories, or locations..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="sports">Sports & Outdoors</SelectItem>
                <SelectItem value="tools">Tools & Equipment</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="sf">San Francisco, CA</SelectItem>
                <SelectItem value="portland">Portland, OR</SelectItem>
                <SelectItem value="austin">Austin, TX</SelectItem>
                <SelectItem value="denver">Denver, CO</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="rent">For Rent</TabsTrigger>
              <TabsTrigger value="barter">For Barter</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No items found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems
                .filter((item) => item.type === "rent")
                .map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
            </div>
            {filteredItems.filter((item) => item.type === "rent").length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No rental items found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="barter" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems
                .filter((item) => item.type === "barter")
                .map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
            </div>
            {filteredItems.filter((item) => item.type === "barter").length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No barter items found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ItemCardProps {
  item: any
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2">{item.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{item.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="mr-1 h-3 w-3" />
          {item.location}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="font-medium">
            {item.type === "rent" ? (
              <>
                ${item.price}/{item.priceUnit}
              </>
            ) : (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                For Barter
              </Badge>
            )}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
            <span className="text-sm">{item.rating}</span>
          </div>
        </div>
        {item.type === "barter" && item.barterFor && (
          <p className="text-xs text-muted-foreground mt-2">Looking for: {item.barterFor}</p>
        )}
        <div className="mt-2 text-xs flex items-center">
          <span className="font-medium text-green-600">Trust Score: {item.trustScore}%</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/items/${item.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

