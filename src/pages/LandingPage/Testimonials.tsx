"use client"

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

// Testimonial ka data fetch karne ke liye API URL
const API_URL = 'http://46.62.160.188:3000/testimonials';

// --- TYPE DEFINITIONS (TypeScript ka main part) ---

// 1. API se aane wala Raw Data structure
interface ApiTestimonial {
  id: number;
  rating: number;
  title: string;
  review: string;
  cu_name: string;
  cu_addr: string;
  cu_img: string;
  created_at: string;
  updated_at: string;
}

// 2. Component mein use hone wala Formatted Data structure
interface FormattedTestimonial {
  id: number;
  name: string;
  location: string;
  package: string;
  content: string;
  rating: number;
  image: string;
  number: string;
}

// --- UTILITY FUNCTION ---

// Function to format the index number with a leading zero (e.g., 1 -> "01")
const formatNumber = (index: number): string => {
  return (index + 1).toString().padStart(2, '0');
}

// --- COMPONENT START ---

export default function Testimonials() {
  // 1. State ko FormattedTestimonial type ke saath initialize kiya gaya hai
  const [testimonials, setTestimonials] = useState<FormattedTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error ya toh string hoga ya null

  // 2. useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Return type ko 'void' rakha gaya hai
    const fetchTestimonials = async (): Promise<void> => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Response data ko ApiTestimonial array type diya gaya hai
        const data: ApiTestimonial[] = await response.json();

        // 3. Map the fetched API data to match the required structure
        const formattedTestimonials: FormattedTestimonial[] = data.map((item, index) => ({
          id: item.id,
          name: item.cu_name || "Anonymous Traveler", 
          location: item.cu_addr || "Global", 
          // API mein 'title' ko 'package' mein map kiya
          package: item.title || "TRAVEL PACKAGE", 
          content: item.review || "No review content provided.", 
          rating: item.rating || 5, 
          image: item.cu_img || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80",
          number: formatNumber(index),
        }));

        setTestimonials(formattedTestimonials); // setTestimonials ko FormattedTestimonial[] mil raha hai
        setError(null);

      } catch (err: any) { // Error ko 'any' type de sakte hain ya 'unknown' se handle kar sakte hain
        console.error("Failed to fetch testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Optional: Loading aur Error states ko handle karna
  if (isLoading) {
    return (
      <div className="pt-12 bg-white">
        <section className="py-16 bg-[#2C3C3C] text-white text-center">
          <p className="text-xl">Loading testimonials...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-12 bg-white">
        <section className="py-16 bg-[#2C3C3C] text-white text-center">
          <p className="text-xl text-red-400">Error: {error}</p>
        </section>
      </div>
    );
  }

  // Final Render
  return (
    <div className="pt-12 bg-white">
      <section className="py-16 bg-[#2C3C3C] font-opensans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... (Header component is the same) ... */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex-1 max-w-[180px] h-[1px] bg-[#D4A76A]"></div>
              <p className="text-[#D4A76A] font-medium tracking-[0.2em] text-[11px] uppercase font-opensans">
                CLIENT STORIES
              </p>
              <div className="flex-1 max-w-[180px] h-[1px] bg-[#D4A76A]"></div>
            </div>
            <h2 className="text-5xl font-bold mb-0 text-white leading-tight font-opensans">Traveler</h2>
            <p className="text-5xl text-[#D4A76A] font-light italic mb-5 font-opensans" style={{ fontFamily: 'serif' }}>
              Testimonials
            </p>
            <p className="text-white text-[15px] max-w-2xl mx-auto leading-relaxed font-opensans">
              Discover why thousands of travelers trust us to create their most<br />
              cherished memories across the Himalayas.
            </p>
          </div>

          {/* Testimonials Grid (Mapping is the same, but TypeScript errors are resolved) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="relative bg-[#425656] border-0 p-8 overflow-hidden group hover:shadow-xl transition-shadow duration-300 rounded-none"
                >
                  {/* Background Number */}
                  <div className="absolute top-4 right-6 text-[#4A5E5E] text-[120px] font-bold leading-none pointer-events-none opacity-50 font-opensans">
                    {testimonial.number}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      // rating ek number hai, isliye yahaan error nahi aayega
                      <Star key={i} size={18} className="fill-[#D4A76A] text-[#D4A76A]" />
                    ))}
                  </div>

                  {/* Package Badge */}
                  <div className="bg-[#8B7355] border border-[#A5865F] px-4 py-2 inline-block relative z-10 rounded-sm">
                    <p className="text-[#D4A76A] text-[11px] font-semibold tracking-[0.15em] font-opensans">
                      {testimonial.package}
                    </p>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white mb-2 leading-relaxed relative z-10 text-[14px] font-opensans">
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      {/* Name */}
                      <p className="font-bold text-white text-[13px] leading-tight font-opensans">
                        {testimonial.name}
                      </p>
                      {/* Location */}
                      <p className="text-white text-[12px] mt-0.5 font-opensans">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
                <p className="col-span-3 text-center text-white text-lg">No testimonials found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}