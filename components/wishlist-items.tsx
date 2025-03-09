"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Heart, MapPin, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data for wishlist items
const wishlistItemsData = [
  {
    id: 1,
    title: "DJI Mavic Air 2 Drone",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=400",
    price: 45,
    priceUnit: "day",
    location: "Seattle, WA",
    rating: 4.9,
    reviews: 32,
    availability: "Available Now",
    addedOn: "Feb 28, 2025",
  },
  {
    id: 2,
    title: "Specialized Road Bike",
    category: "Sports & Outdoors",
    image: "/placeholder.svg?height=300&width=400",
    price: 25,
    priceUnit: "day",
    location: "Portland, OR",
    rating: 4.7,
    reviews: 18,
    availability: "Available from Mar 15",
    addedOn: "Mar 2, 2025",
  },
  {
    id: 3,
    title: "Sony A7III Camera Kit",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=400",
    price: 40,
    priceUnit: "day",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 27,
    availability: "Available Now",
    addedOn: "Mar 5, 2025",
  },
  {
    id: 4,
    title: "Camping Set (Tent, Sleeping Bags)",
    category: "Outdoors",
    image: "/placeholder.svg?height=300&width=400",
    price: 30,
    priceUnit: "day",
    location: "Denver, CO",
    rating: 4.6,
    reviews: 14,
    availability: "Available Now",
    addedOn: "Mar 7, 2025",
  },
]

export function WishlistItems() {
  const [wishlistItems, setWishlistItems] = useState(wishlistItemsData)
  const [itemToRemove, setItemToRemove] = useState<number | null>(null)

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
    setItemToRemove(null)
  }

  return (
    <div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="text-lg font-medium mt-4">Your wishlist is empty</h3>
          <p className="text-muted-foreground mt-2">
            Browse items and add them to your wishlist to keep track of things you're interested in
          </p>
          <Link href="/explore">
            <Button className="mt-4">Explore Items</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <Badge className="absolute top-2 right-2">{item.category}</Badge>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 left-2 h-8 w-8 bg-background/80 hover:bg-background text-muted-foreground hover:text-destructive"
                      onClick={() => setItemToRemove(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove from wishlist?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the item from your wishlist. You can always add it back later.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removeFromWishlist(item.id)}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{item.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="mr-1 h-3 w-3" />
                  {item.location}
                </div>
                <div className="flex justify-between items-center mt-2">
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
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{item.availability}</span>
                  <span className="mx-2">•</span>
                  <span>Added: {item.addedOn}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/items/${item.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

