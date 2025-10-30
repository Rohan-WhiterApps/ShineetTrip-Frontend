"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Amenity {
  category: string
  items: string[]
}

const amenities: Amenity[] = [
  {
    category: "Climate Control",
    items: ["Air-conditioning"],
  },
  {
    category: "Entertainment",
    items: ["TV"],
  },
  {
    category: "General Amenities",
    items: ["Daily Housekeeping", "Phone"],
  },
  {
    category: "Internet",
    items: ["Air-conditioning"],
  },
  {
    category: "Kitchen Features",
    items: ["Free Bottled Water", "Mini Bar", "Tea/coffee Making Facilities"],
  },
  {
    category: "Laundry Facilities",
    items: ["Guest Laundry Facility"],
  },
  {
    category: "Room Features & Facilities",
    items: ["Non Smoking Rooms"],
  },
]

interface RoomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  roomName?: string
  roomImages?: string[]
}

export function RoomDetailsModal({
  isOpen,
  onClose,
  roomName = "Executive King Room",
  roomImages = [
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
  ],
}: RoomDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-50"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>

        <div className="bg-white">
          {/* Main Image Gallery */}
          <div className="relative w-full">
            <div className="relative bg-gray-200 rounded-t-lg overflow-hidden aspect-video">
              <img
                src={roomImages[currentImageIndex] || "/placeholder.svg"}
                alt="Room view"
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 hover:bg-gray-100 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 hover:bg-gray-100 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 p-6 overflow-x-auto bg-white">
              {roomImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? "border-gray-800" : "border-gray-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Room thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Room Description */}
          <div className="px-6 py-8">
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              The {roomName} at Raj Bhavan Clarks Inn are lavish living spaces spanning 270 sq. ft. They are some of the
              best rooms near Velachery, which can accommodate a maximum of 2 adults and 1 child. They come with the
              option of a single bed or a king size bed. These fully air-conditioned rooms are loaded with modern
              amenities such as a workstation with complimentary access to a stable high-speed internet connection, a 32
              flat screen LCD TV, a tea & coffee maker, a hair dryer and an in-room minibar which is stacked with items
              you can purchase. To enhance your stay in these Chennai rooms, we also offer a complimentary breakfast,
              dedicated laundry service and our signature 24-hour room service.
            </p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{amenity.category}</h3>
                  <ul className="space-y-2">
                    {amenity.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
