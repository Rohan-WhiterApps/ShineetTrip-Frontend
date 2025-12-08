"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Check, Users, Maximize2, Bed } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog" 

// Static amenity categories (as per requirement)
const staticAmenities = [
  { category: "Climate Control", items: ["Air-conditioning"] },
  { category: "Entertainment", items: ["TV"] },
  { category: "General Amenities", items: ["Daily Housekeeping", "Phone"] },
  { category: "Internet", items: ["High-speed Wi-Fi"] },
  { category: "Kitchen Features", items: ["Free Bottled Water", "Mini Bar", "Tea/coffee Making Facilities"] },
  { category: "Laundry Facilities", items: ["Guest Laundry Facility"] },
  { category: "Room Features & Facilities", items: ["Non Smoking Rooms"] },
]

interface RoomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  roomName: string
  roomImages: string[]
  roomData: any
}

export function RoomDetailsModal({
  isOpen,
  onClose,
  roomName = "Standard Room",
  roomImages = [],
  roomData
}: RoomDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Dynamic data extraction
  const description = roomData?.description || roomData?.short_description || "Enjoy a luxurious stay with modern amenities and high-speed internet connection.";
  const dynamicAmenities = roomData?.serviceProdInfos || [];
  const roomSize = roomData?.size || roomData?.roomSize;
  const bedType = roomData?.bedType || roomData?.bed_type;
  const occupancy = roomData?.occupancy || roomData?.max_guests;
  const price = roomData?.price || roomData?.rate;

  // Fallback images
  const safeRoomImages = roomImages.length > 0 ? roomImages : [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w-1200&h=600&fit=crop"
  ];

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
    }
  }, [isOpen])

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? safeRoomImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === safeRoomImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0 bg-white rounded-lg shadow-2xl">



        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white sticky top-0 z-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{roomName}</h2>
            <div className="flex items-center gap-4 mt-2">
              {roomSize && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Maximize2 className="w-4 h-4" />
                  <span>{roomSize} sq.ft.</span>
                </div>
              )}
              {bedType && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Bed className="w-4 h-4" />
                  <span>{bedType}</span>
                </div>
              )}
              {occupancy && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Max {occupancy} guests</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {price && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="text-xl font-bold text-blue-600">₹{price.toLocaleString()}</div>
              </div>
            )}
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          
          {/* Image Section */}
          <div className="relative bg-gray-100">
            <div className="relative h-96 overflow-hidden">
              <img
                src={safeRoomImages[currentImageIndex]}
                alt="Room View"
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons */}
              {safeRoomImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {safeRoomImages.length}
              </div>
            </div>

            {/* Thumbnails */}
            {safeRoomImages.length > 1 && (
              <div className="p-4 bg-white border-t">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {safeRoomImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`flex-shrink-0 w-24 h-16 rounded overflow-hidden border-2 ${
                        i === currentImageIndex 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${i + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Dynamic Services */}
            {dynamicAmenities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dynamicAmenities.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item.name || item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staticAmenities.map((amenity, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-gray-900">{amenity.category}</h4>
                    <ul className="space-y-1">
                      {amenity.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-3 h-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            {/* <div className="pt-6 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            </div> */}
            
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}