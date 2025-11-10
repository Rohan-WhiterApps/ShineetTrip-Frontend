import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Maximize2, MapPin, Calendar, X } from 'lucide-react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full rounded overflow-hidden group">
      <img src={images[currentIndex]} alt="Room" className="w-full h-full object-cover" />
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4 text-gray-800" />
      </button>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex gap-4">
        {/* Image Section */}
        <div className="w-44 h-60 flex-shrink-0">
          <ImageCarousel images={room.images} />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{room.name}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{room.guests} Guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{room.sqft}sqft</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-2">{room.description}</p>
            </div>
            
            {/* Price Badge */}
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-0.5">
                ₹ {room.originalPrice.toLocaleString()}
              </div>
              <div className="bg-green-500 text-white px-3 py-1 text-center rounded-md">
                <span className="text-lg font-semibold">₹ {room.discountedPrice.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                + ₹ {room.savings.toLocaleString()} (44 taxes & fees, per night)
              </div>
            </div>
          </div>

          {/* Booking Options */}
          <div className="grid grid-cols-3 gap-3 mt-auto">
            {room.options.map((option, idx) => (
              <div key={idx} className="border border-gray-200 rounded p-2.5">
                <div className="mb-2">
                  <div className="text-xs font-medium text-gray-900 mb-0.5">{option.title}</div>
                  <a href="#" className="text-xs text-blue-600 hover:underline">Inclusions & Policies</a>
                </div>
                <div className="mb-2">
                  <div className="text-xs text-gray-400 line-through">
                    INR {option.originalPrice.toLocaleString()} <span className="text-gray-500">INR {option.strikePrice.toLocaleString()}</span>
                  </div>
                  <div className="text-base font-semibold text-green-600">
                    INR {option.discountedPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    (for 1 night)(Incl. of taxes & fees)
                  </div>
                </div>
                <button className="w-full bg-black text-white text-xs font-medium py-1.5 rounded hover:bg-gray-800 transition">
                  BOOK NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-3">
        {room.images.slice(0, 5).map((img, idx) => (
          <div key={idx} className="w-12 h-12 rounded overflow-hidden border border-gray-200">
            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="border-b border-gray-200 pb-4 mb-4">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="font-medium text-sm">{review.name}</div>
            <div className="text-xs text-gray-500">{review.time}</div>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-green-500 text-sm">★</span>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed">{review.text}</p>
      </div>
    </div>
  </div>
);

export default function HotelRoomSelection() {
  const [sortBy, setSortBy] = useState('Most Popular');

  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      guests: 5,
      sqft: 200,
      description: 'The 12 Standard Rooms in Shimla have a state-of-the-art design, curated to serve the modern traveler. more info',
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      ],
      originalPrice: 4990,
      discountedPrice: 1903,
      savings: 144,
      options: [
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
      ]
    },
    {
      id: 2,
      name: 'Standard Room',
      guests: 5,
      sqft: 200,
      description: 'The 12 Standard Rooms in Shimla have a state-of-the-art design, curated to serve the modern traveler. more info',
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      ],
      originalPrice: 4990,
      discountedPrice: 1903,
      savings: 144,
      options: [
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
      ]
    },
    {
      id: 3,
      name: 'Standard Room',
      guests: 5,
      sqft: 200,
      description: 'The 12 Standard Rooms in Shimla have a state-of-the-art design, curated to serve the modern traveler. more info',
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      ],
      originalPrice: 4990,
      discountedPrice: 1903,
      savings: 144,
      options: [
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
        { title: 'Room Only', originalPrice: 2389, strikePrice: 3990, discountedPrice: 2389 },
      ]
    }
  ];

  const reviews = [
    { name: 'Adeeb Smiths', time: '6 years on ultima sg', text: 'Lorem ipsum irure kaling. Var. Dovis dra åt helvete-kapital nollutväxl bisped lajavlog. Trska ndönt epiront. Yliga viuuksi. Seminde teloss ultraliguuskude yr i sevor. Elgubäl yiling fägephet. Käpar. Prenar tiärrar, att ortad och kaffeflicka nur. Husade kar ac-toxifyking i tetratt. Facebocka posariad, men autosloga.' },
    { name: 'Adeeb Smiths', time: '6 years on ultima sg', text: 'Lorem ipsum irure kaling. Var. Dovis dra åt helvete-kapital nollutväxl bisped lajavlog. Trska ndönt epiront. Yliga viuuksi. Seminde teloss ultraliguuskude yr i sevor. Elgubäl yiling fägephet. Käpar. Prenar tiärrar, att ortad och kaffeflicka nur. Husade kar ac-toxifyking i tetratt. Facebocka posariad, men autosloga.' },
    { name: 'Adeeb Smiths', time: '6 years on ultima sg', text: 'Lorem ipsum irure kaling. Var. Dovis dra åt helvete-kapital nollutväxl bisped lajavlog. Trska ndönt epiront. Yliga viuuksi. Seminde teloss ultraliguuskude yr i sevor. Elgubäl yiling fägephet. Käpar. Prenar tiärrar, att ortad och kaffeflicka nur. Husade kar ac-toxifyking i tetratt. Facebocka posariad, men autosloga.' },
    { name: 'Adeeb Smiths', time: '6 years on ultima sg', text: 'Lorem ipsum irure kaling. Var. Dovis dra åt helvete-kapital nollutväxl bisped lajavlog. Trska ndönt epiront. Yliga viuuksi. Seminde teloss ultraliguuskude yr i sevor. Elgubäl yiling fägephet. Käpar. Prenar tiärrar, att ortad och kaffeflicka nur. Husade kar ac-toxifyking i tetratt. Facebocka posariad, men autosloga.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded border border-orange-200">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span className="text-sm">Goa</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm">11 - 16 Nov</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded border border-gray-200">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm">3 guests</span>
          </div>
          <button className="ml-auto px-4 py-2 bg-black text-white text-sm rounded flex items-center gap-2">
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-white border-b border-gray-200 py-3 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600 mr-2">Sort By:</span>
            {['Most Popular', 'Price: Low to high', 'Price: High to low', 'Best Rated', 'Lowest Price & Best Rated'].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-3 py-1.5 rounded ${
                  sortBy === option
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="font-medium text-sm">Room 1</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-8 max-w-md"></div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-gray-400 text-sm">Reservation</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Room Cards */}
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="grid grid-cols-[200px_1fr_2fr] gap-8 mb-8">
            {/* Rating Score */}
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">5.0</div>
              <div className="text-sm font-semibold text-gray-800 mb-1">Guest Favorite</div>
              <div className="text-xs text-gray-500 leading-relaxed">This hotel is the guests top favorite based on their rating & reviews.</div>
            </div>
            
            {/* Overall Rating Bars */}
            <div>
              <div className="text-sm font-semibold mb-3">Overall Rating</div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-2">{rating}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: rating === 5 ? '100%' : '5%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Cleanliness', score: '5.0', icon: '🧹' },
                { label: 'Accuracy', score: '5.0', icon: '✓' },
                { label: 'Check-In', score: '5.0', icon: '🔑' },
                { label: 'Communication', score: '5.0', icon: '💬' }
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-0.5">{item.score}</div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {['Great Hospitality', 'Clean', 'Great Communication', 'Great Communication', 
              'Great Hospitality', 'Clean', 'Great Communication', 'Great Communication'].map((tag, idx) => (
              <div key={idx} className="text-center py-2 px-3 bg-gray-50 rounded text-xs text-gray-700">
                {tag}
              </div>
            ))}
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              {reviews.slice(0, 2).map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">Show more</button>
            </div>
            <div>
              {reviews.slice(2, 4).map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">Show more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}