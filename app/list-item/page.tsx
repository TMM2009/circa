"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

export default function ListItemPage() {
  const [images, setImages] = useState<string[]>([])
  const [listingType, setListingType] = useState("rent")
  const [barterPreference, setBarterPreference] = useState("any")

  // Simulate adding images
  const addImage = () => {
    if (images.length < 5) {
      setImages([...images, `/placeholder.svg?height=300&width=400&text=Image+${images.length + 1}`])
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">List an Item</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
          <CardDescription>Provide detailed information about the item you want to list</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Item Title</Label>
            <Input id="title" placeholder="e.g., Professional DSLR Camera, Mountain Bike, etc." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                  <SelectItem value="tools">Tools & Equipment</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                  <SelectItem value="clothing">Clothing & Accessories</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New / Like New</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your item in detail. Include features, specifications, and any other relevant information."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Item Photos</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Item photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {images.length < 5 && (
                <button
                  onClick={addImage}
                  className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Camera className="h-8 w-8 mb-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Add Photo</span>
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Add up to 5 photos. First photo will be the cover image.
            </p>
          </div>

          <div className="space-y-4">
            <Label>Listing Type</Label>
            <Tabs defaultValue="rent" className="w-full" onValueChange={setListingType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rent">Rent Out</TabsTrigger>
                <TabsTrigger value="barter">Barter / Exchange</TabsTrigger>
              </TabsList>
              <TabsContent value="rent" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        $
                      </span>
                      <Input id="price" type="number" className="rounded-l-none" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-per">Per</Label>
                    <Select defaultValue="day">
                      <SelectTrigger id="price-per">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">Hour</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit (Optional)</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      $
                    </span>
                    <Input id="deposit" type="number" className="rounded-l-none" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="min-rental">Minimum Rental Period</Label>
                    <span className="text-sm text-muted-foreground">1 day</span>
                  </div>
                  <Slider defaultValue={[1]} max={30} step={1} />
                </div>
              </TabsContent>
              <TabsContent value="barter" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Barter Preference</Label>
                  <RadioGroup defaultValue="any" onValueChange={setBarterPreference}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label htmlFor="any">Open to any offers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific" id="specific" />
                      <Label htmlFor="specific">Looking for specific items</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid">Hybrid (item + cash)</Label>
                    </div>
                  </RadioGroup>
                </div>
                {barterPreference !== "any" && (
                  <div className="space-y-2">
                    <Label htmlFor="barter-details">Barter Details</Label>
                    <Textarea
                      id="barter-details"
                      placeholder="Describe what you're looking for in exchange for your item."
                      rows={3}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Pickup/Delivery Location</Label>
            <Input id="location" placeholder="Enter your address or general area" />
            <div className="flex items-center mt-2">
              <input type="checkbox" id="hide-exact-location" className="mr-2" />
              <Label htmlFor="hide-exact-location" className="text-sm font-normal">
                Hide exact location (show only neighborhood/area)
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Listing</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

