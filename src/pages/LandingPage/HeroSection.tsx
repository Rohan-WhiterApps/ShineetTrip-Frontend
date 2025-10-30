"use client"

import { ArrowRight, MapPin, Users, Calendar } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import JourneyPlanner from "../journey_planner"


export function HeroSection() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false)

  return (
    <>
      <section
        className="relative w-full h-[90%] bg-cover bg-center text-white flex flex-col justify-center px-6 md:px-20 py-18"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/majestic-himalayan-mountains-landscape-cUaHbOanUFuXRcleoJ8h7e9WYWDKug.jpg')",
        }}
      >
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content — now aligned left */}
        <div className="relative z-10 text-left max-w-4xl">
          {/* Top Badge */}
          <div className="flex mb-10">
            <div className="flex items-center gap-4 border border-[#C9A961] px-6 py-2">
              <div className="h-px w-10 bg-[#C9A961]" />
              <span className="text-[#C9A961] text-sm font-semibold tracking-widest uppercase">
                Himachal&apos;s Premier Travel Curator
              </span>
              <div className="h-px w-10 bg-[#C9A961]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Experience The Majestic <span className="text-[#C9A961]">Himalayas</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-200 text-lg leading-relaxed mb-10 max-w-2xl">
            Embark on extraordinary journeys across India, Nepal, and Bhutan.
            <br />
            Where luxury meets adventure, and every moment is crafted to perfection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 mb-16">
            <button
              onClick={() => setIsJourneyModalOpen(true)}
              className="bg-gradient-to-r from-[#C9A961] to-[#b99242] text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:from-[#b99242] hover:to-[#C9A961] transition-all flex items-center gap-2"
            >
              Plan Your Journey <ArrowRight size={18} />
            </button>
            <button className="bg-gradient-to-r from-[#C9A961] to-[#b99242] text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:from-[#b99242] hover:to-[#C9A961] transition-all flex items-center gap-2">
              Explore Destinations <ArrowRight size={18} />
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap gap-16 text-left">
            <div className="flex flex-col items-start">
              <div className="bg-[#C9A961]/90 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <MapPin size={22} className="text-white" />
              </div>
              <p className="font-semibold text-lg">50+ DESTINATIONS</p>
              <p className="text-gray-400 text-sm">Curated Experiences</p>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-[#C9A961]/90 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Users size={22} className="text-white" />
              </div>
              <p className="font-semibold text-lg">10,000+ TRAVELERS</p>
              <p className="text-gray-400 text-sm">Satisfied Guests</p>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-[#C9A961]/90 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Calendar size={22} className="text-white" />
              </div>
              <p className="font-semibold text-lg">15+ YEARS</p>
              <p className="text-gray-400 text-sm">Excellence in Service</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator (centered) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 border-2 border-[#C9A961] rounded-full flex items-start justify-center">
            <div className="w-1 h-2 bg-[#C9A961] mt-1 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <Dialog open={isJourneyModalOpen} onOpenChange={setIsJourneyModalOpen}>
        <DialogContent className="max-w-2xl p-0 border-0">
          <JourneyPlanner />
        </DialogContent>
      </Dialog>
    </>
  )
}
