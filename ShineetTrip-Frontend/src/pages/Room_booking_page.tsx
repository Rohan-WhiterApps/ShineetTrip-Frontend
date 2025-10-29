"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Users, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RoomOption {
  title: string
  originalPrice: number
  discountedPrice: number
  savingAmount: number
  description: string
}

interface Room {
  id: string
  name: string
  guests: number
  sqft: number
  description: string
  moreInfo: string
  images: string[]
  originalPrice: number
  discountedPrice: number
  taxInfo: string
  options: RoomOption[]
}

const rooms: Room[] = [
  {
    id: "standard",
    name: "Standard Room",
    guests: 3,
    sqft: 200,
    description:
      "The 12 Standard Rooms in Shimla have a state-of-the-art design, curated to serve the modern traveler.",
    moreInfo: "more info",
    images: ["/standard-room-hotel.jpg", "/luxury-hotel-room.png", "/modern-bedroom.png"],
    originalPrice: 3690,
    discountedPrice: 2275,
    taxInfo: "Plus INR 14 in taxes",
    options: [
      {
        title: "Room Only",
        originalPrice: 3690,
        discountedPrice: 2389,
        savingAmount: 1225,
        description: "Standard Rate",
      },
      {
        title: "Bed & Breakfast",
        originalPrice: 5000,
        discountedPrice: 3413,
        savingAmount: 1750,
        description: "Standard Rate",
      },
      {
        title: "Room With Breakfast, Lunch Or Dinner",
        originalPrice: 5860,
        discountedPrice: 3993,
        savingAmount: 2047,
        description: "Standard Rate",
      },
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    guests: 3,
    sqft: 200,
    description:
      "The 12 Standard Rooms in Shimla have a state-of-the-art design, curated to serve the modern traveler.",
    moreInfo: "more info",
    images: ["/deluxe-room-hotel.jpg", "/luxury-bedroom.png", "/premium-hotel-room.jpg"],
    originalPrice: 3690,
    discountedPrice: 2275,
    taxInfo: "Plus INR 14 in taxes",
    options: [
      {
        title: "Room Only",
        originalPrice: 3690,
        discountedPrice: 2389,
        savingAmount: 1225,
        description: "Standard Rate",
      },
      {
        title: "Bed & Breakfast",
        originalPrice: 5000,
        discountedPrice: 3413,
        savingAmount: 1750,
        description: "Standard Rate",
      },
      {
        title: "Room With Breakfast, Lunch Or Dinner",
        originalPrice: 5860,
        discountedPrice: 3993,
        savingAmount: 2047,
        description: "Standard Rate",
      },
    ],
  },
  {
    id: "super-deluxe",
    name: "Super deluxe Room",
    guests: 3,
    sqft: 200,
    description:
      "The 12 Standard Rooms in Shimla have a state-of-the-art design, curated to serve the modern traveler.",
    moreInfo: "more info",
    images: ["/super-deluxe-room.jpg", "/luxury-suite-hotel.jpg", "/premium-bedroom.jpg"],
    originalPrice: 3690,
    discountedPrice: 2275,
    taxInfo: "Plus INR 14 in taxes",
    options: [
      {
        title: "Room Only",
        originalPrice: 3690,
        discountedPrice: 2389,
        savingAmount: 1225,
        description: "Standard Rate",
      },
      {
        title: "Bed & Breakfast",
        originalPrice: 5000,
        discountedPrice: 3413,
        savingAmount: 1750,
        description: "Standard Rate",
      },
      {
        title: "Room With Breakfast, Lunch Or Dinner",
        originalPrice: 5860,
        discountedPrice: 3993,
        savingAmount: 2047,
        description: "Standard Rate",
      },
    ],
  },
]

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200">
      <img src={images[currentIndex] || "/placeholder.svg"} alt="Room" className="w-full h-full object-cover" />

      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100 transition"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100 transition"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>
    </div>
  )
}

function RoomCard({ room }: { room: Room }) {
  return (
    <div className="space-y-6 py-8 border-b last:border-b-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Image Carousel */}
        <div className="lg:col-span-1">
          <ImageCarousel images={room.images} />
        </div>

        {/* Room Info */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>

          <div className="flex gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span>{room.guests} Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-amber-600" />
              <span>{room.sqft}sqft</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">{room.description}</p>

          <a href="#" className="text-amber-600 text-sm font-medium hover:underline">
            {room.moreInfo}
          </a>
        </div>

        {/* Pricing */}
        <div className="lg:col-span-1 flex flex-col items-end justify-start space-y-2">
          <div className="text-right">
            <p className="text-sm text-gray-500 line-through">INR {room.originalPrice.toLocaleString()}</p>
            <p className="text-3xl font-bold text-green-600">INR {room.discountedPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-600">/Night</p>
            <p className="text-xs text-gray-600">{room.taxInfo}</p>
          </div>
        </div>
      </div>

      {/* Room Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {room.options.map((option, idx) => (
          <div key={idx} className="border-2 border-amber-600 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">{option.title}</h3>

            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-red-500">★</span>
                <span className="text-gray-600">Save INR {option.savingAmount.toLocaleString()}</span>
              </div>
              <a href="#" className="text-amber-600 text-xs hover:underline">
                Inclusions & Policies
              </a>
              <p className="text-gray-600 text-xs">{option.description}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 line-through">INR {option.originalPrice.toLocaleString()}</p>
              <p className="text-lg font-bold text-green-600">INR {option.discountedPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-600">(for 1 night)</p>
              <p className="text-xs text-gray-600">Incl. of taxes & fees</p>
            </div>

            <Button className="w-full bg-black hover:bg-gray-900 text-white font-semibold">BOOK NOW</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RoomBookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <Tabs defaultValue="room1" className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0">
            <TabsTrigger
              value="room1"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <span className="font-semibold">Room 1</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="reservation"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-6 py-3"
            >
              <span className="text-gray-400">Reservation</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="room1" className="space-y-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </TabsContent>

          <TabsContent value="reservation" className="py-8">
            <p className="text-gray-600">Reservation details will appear here</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
