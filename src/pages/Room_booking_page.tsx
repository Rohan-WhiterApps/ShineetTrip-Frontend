"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Users, Maximize2 } from "lucide-react"
import { RoomDetailsModal } from "./Rooms_details_page"


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
  images: string[]
  originalPrice: number
  discountedPrice: number
  taxAmount: number
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
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
    ],
    originalPrice: 3690,
    discountedPrice: 2275,
    taxAmount: 14,
    options: [
      {
        title: "Room Only",
        originalPrice: 3790,
        discountedPrice: 2389,
        savingAmount: 1225,
        description: "Standard Rate",
      },
      {
        title: "Bed & Breakfast",
        originalPrice: 4000,
        discountedPrice: 3413,
        savingAmount: 1750,
        description: "Standard Rate",
      },
      {
        title: "Room With Breakfast, Lunch Or Dinner",
        originalPrice: 5850,
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
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
    ],
    originalPrice: 3690,
    discountedPrice: 2275,
    taxAmount: 14,
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
        originalPrice: 5850,
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
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",
    ],
    originalPrice: 3690,
    discountedPrice: 2275,
    taxAmount: 14,
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
        originalPrice: 5850,
        discountedPrice: 3993,
        savingAmount: 2047,
        description: "Standard Rate",
      },
    ],
  },
]

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <img src={images[currentIndex] || "/placeholder.svg"} alt="Room" className="w-full h-full object-cover" />
      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  )
}

interface RoomCardProps {
  room: Room
  onMoreInfo: (room: Room) => void
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onMoreInfo }) => {
  return (
    <div className="bg-white mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_auto] gap-6 mb-6">
        {/* Image Carousel */}
        <div className="h-52">
          <ImageCarousel images={room.images} />
        </div>

        {/* Room Info */}
        <div className="space-y-2">
          <h2 className="text-2xl font-normal text-gray-800">{room.name}</h2>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{room.guests} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4" />
              <span>{room.sqft}sqft</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{room.description}</p>

          <button onClick={() => onMoreInfo(room)} className="text-orange-500 text-sm hover:underline">
            more info
          </button>
        </div>

        {/* Pricing */}
        <div className="text-right space-y-0.5">
          <p className="text-sm text-gray-400 line-through">INR {room.originalPrice.toLocaleString()}</p>
          <p className="text-3xl font-semibold text-green-600">INR {room.discountedPrice.toLocaleString()}</p>
          <p className="text-xs text-gray-600">/Night</p>
          <p className="text-xs text-gray-600">Plus INR {room.taxAmount} in taxes</p>
        </div>
      </div>

      {/* Room Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {room.options.map((option, idx) => (
          <div key={idx} className="border-2 border-orange-400 rounded-md p-4 space-y-3">
            <h3 className="font-medium text-gray-900 text-sm">{option.title}</h3>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-red-500 text-sm">★</span>
                <span className="text-xs text-gray-700">Save INR {option.savingAmount.toLocaleString()}/-</span>
              </div>
              <a href="#" className="text-xs text-orange-500 hover:underline block">
                Inclusions & Policies
              </a>
              <p className="text-xs text-gray-600">{option.description}</p>
            </div>

            <div className="space-y-0.5 pt-1">
              <p className="text-xs text-gray-400 line-through">INR {option.originalPrice.toLocaleString()}</p>
              <p className="text-xl font-semibold text-green-600">INR {option.discountedPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-600">(for 1 night)</p>
              <p className="text-xs text-gray-600">Incl. of taxes & fees</p>
            </div>

            <button className="w-full bg-black text-white font-semibold py-2.5 rounded hover:bg-gray-900 transition text-sm">
              BOOK NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const RoomSelectionPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMoreInfo = (room: Room) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRoom(null)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Progress Steps */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="font-medium text-gray-900">Room 1</span>
              </div>

              <div className="flex-1 max-w-md h-px bg-gray-300 mx-4"></div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-gray-400">Reservation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Room Cards */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onMoreInfo={handleMoreInfo} />
          ))}
        </div>
      </div>

      <RoomDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        roomName={selectedRoom?.name}
        roomImages={selectedRoom?.images}
      />
    </>
  )
}

export default RoomSelectionPage
