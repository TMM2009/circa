"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for featured items
const featuredItems = [
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
    owner: {
      name: "Alex Johnson",
      trustScore: 98,
    },
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
    owner: {
      name: "Sarah Miller",
      trustScore: 95,
    },
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
    owner: {
      name: "David Chen",
      trustScore: 97,
    },
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
    owner: {
      name: "Emma Wilson",
      trustScore: 94,
    },
  },
]

export default function FeaturedItems() {
  const [items] = useState(featuredItems)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
            <Badge className="absolute top-2 right-2">{item.category}</Badge>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {item.location}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex justify-between items-center">
              <div className="font-medium">
                ${item.price}/{item.priceUnit}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span className="text-sm">
                  {item.rating} ({item.reviews})
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Available Now</span>
              <span className="mx-2">•</span>
              <span className="font-medium text-green-600">Trust Score: {item.owner.trustScore}%</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/items/${item.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

