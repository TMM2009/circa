"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, MessageCircle, Share, Shield, Star } from "lucide-react"
import { format, addDays } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [rentalDuration, setRentalDuration] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Mock item data - in a real app, this would be fetched based on the ID
  const item = {
    id: Number.parseInt(params.id),
    title: "Professional DSLR Camera Kit",
    description:
      "High-quality DSLR camera with multiple lenses, perfect for photography enthusiasts or professionals. Includes a 24-70mm lens, 50mm prime lens, and all necessary accessories.",
    category: "Electronics",
    images: [
      "/placeholder.svg?height=600&width=800&text=Camera+Main",
      "/placeholder.svg?height=600&width=800&text=Camera+Side",
      "/placeholder.svg?height=600&width=800&text=Camera+Accessories",
      "/placeholder.svg?height=600&width=800&text=Camera+Case",
    ],
    price: 35,
    priceUnit: "day",
    deposit: 200,
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 24,
    type: "rent",
    availableFrom: new Date(),
    availableTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    owner: {
      id: "user123",
      name: "Alex Johnson",
      image: "/placeholder.svg?height=100&width=100",
      trustScore: 98,
      memberSince: "Jan 2023",
      responseRate: 95,
      responseTime: "within 1 hour",
    },
    features: [
      "24.2 Megapixel CMOS Sensor",
      "4K Video Recording",
      "Includes 3 Lenses",
      "Carrying Case Included",
      "Extra Battery Pack",
      "64GB Memory Card",
    ],
    rules: [
      "Valid ID required",
      "Security deposit required",
      "No international travel",
      "Return in original condition",
      "Borrower responsible for damage",
    ],
  }

  // Calculate total price
  const calculateTotal = () => {
    const basePrice = item.price * rentalDuration
    const serviceFee = Math.round(basePrice * 0.1)
    return basePrice + item.deposit + serviceFee
  }

  // Calculate return date based on selected date and duration
  const getReturnDate = () => {
    if (!selectedDate) return null
    return addDays(selectedDate, rentalDuration)
  }

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
        <div className="flex items-center mb-6">
          <Link href="/explore" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{item.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Item details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <div className="space-y-2">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={item.images[activeImageIndex] || "/placeholder.svg"}
                  alt={`${item.title} - Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative rounded-md overflow-hidden flex-shrink-0 w-20 h-20 border-2 ${
                      index === activeImageIndex ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Item details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {item.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="pt-4">
                    <p className="text-sm">{item.description}</p>
                    <div className="flex items-center mt-4">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-muted-foreground ml-1">({item.reviews} reviews)</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="pt-4">
                    <ul className="space-y-2">
                      {item.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="rules" className="pt-4">
                    <ul className="space-y-2">
                      {item.rules.map((rule, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">About the Owner</h3>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={item.owner.image} alt={item.owner.name} />
                      <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{item.owner.name}</div>
                      <div className="text-sm text-muted-foreground">Member since {item.owner.memberSince}</div>
                      <div className="flex items-center text-sm mt-1">
                        <Shield className="h-3.5 w-3.5 text-green-600 mr-1" />
                        <span className="text-green-600 font-medium">Trust Score: {item.owner.trustScore}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Response Rate:</span>
                      <div className="font-medium">{item.owner.responseRate}%</div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Response Time:</span>
                      <div className="font-medium">{item.owner.responseTime}</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Owner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reviews section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample reviews - would be dynamically loaded in a real app */}
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>U{review}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">User {review}</div>
                          <div className="text-xs text-muted-foreground">March {review}, 2025</div>
                        </div>
                        <div className="ml-auto flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${i < 5 ? "fill-primary text-primary" : "text-muted"}`}
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        Great camera! Everything was in perfect condition and the owner was very helpful with setup
                        instructions.
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Booking widget */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Book This Item</CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-xl">
                      ${item.price}/{item.priceUnit}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span>
                        {item.rating} ({item.reviews})
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pickup Date</Label>
                  <div className="grid gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {selectedDate && (
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <div className="p-2 border rounded-md bg-muted/50">
                      <div className="font-medium">
                        {getReturnDate() ? format(getReturnDate()!, "PPP") : "Select pickup date first"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {rentalDuration} {rentalDuration === 1 ? "day" : "days"} rental period
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Rental Duration (days)</Label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRentalDuration(Math.max(1, rentalDuration - 1))}
                      disabled={rentalDuration <= 1}
                    >
                      -
                    </Button>
                    <div className="flex-1 text-center font-medium">{rentalDuration}</div>
                    <Button variant="outline" size="icon" onClick={() => setRentalDuration(rentalDuration + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      ${item.price} × {rentalDuration} {rentalDuration === 1 ? "day" : "days"}
                    </span>
                    <span>${item.price * rentalDuration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Security deposit (refundable)</span>
                    <span>${item.deposit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>${Math.round(item.price * rentalDuration * 0.1)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" disabled={!selectedDate}>
                  Request to Book
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Owner
                </Button>
                <div className="text-xs text-center text-muted-foreground mt-2">
                  <div className="flex items-center justify-center mb-1">
                    <Shield className="h-3.5 w-3.5 mr-1 text-green-600" />
                    <span>Secure Transaction</span>
                  </div>
                  <p>Your payment is protected by our secure blockchain escrow system.</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium mb-1.5">{children}</div>
}

