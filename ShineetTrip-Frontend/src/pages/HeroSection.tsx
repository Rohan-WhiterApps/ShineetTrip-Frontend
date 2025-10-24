import { MapPin, Users, Calendar, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url(/placeholder.svg?height=1080&width=1920&query=majestic himalayan mountains misty landscape sunset)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 py-12">
        {/* Top Badge */}
        <div className="flex justify-center">
          <div className="border border-[#C9A961] px-6 py-3 flex items-center gap-4">
            <div className="h-px w-8 bg-[#C9A961]"></div>
            <span className="text-[#C9A961] text-sm font-semibold tracking-widest">
              HIMACHAL'S PREMIER TRAVEL CURATOR
            </span>
            <div className="h-px w-8 bg-[#C9A961]"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl">
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">Experience The Majestic</h1>
          <h2 className="text-5xl md:text-6xl font-bold text-[#C9A961] mb-6">Himalayas</h2>

          {/* Description */}
          <p className="text-white text-lg leading-relaxed mb-8 max-w-xl">
            Embark on extraordinary journeys across India, Nepal, and Bhutan. Where luxury meets adventure, and every
            moment is crafted to perfection.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mb-16">
            <button className="bg-[#C9A961] hover:bg-[#B8985A] text-white px-6 py-3 font-semibold flex items-center gap-2 transition-colors">
              Plan Your Journey →
            </button>
            <button className="bg-[#C9A961] hover:bg-[#B8985A] text-white px-6 py-3 font-semibold flex items-center gap-2 transition-colors">
              Explore Destinations →
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Stat 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#C9A961]/20 p-3 rounded">
                <MapPin className="w-6 h-6 text-[#C9A961]" />
              </div>
              <div>
                <p className="text-[#C9A961] font-bold text-sm">50+ DESTINATIONS</p>
                <p className="text-white/80 text-sm">Curated Experiences</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#C9A961]/20 p-3 rounded">
                <Users className="w-6 h-6 text-[#C9A961]" />
              </div>
              <div>
                <p className="text-[#C9A961] font-bold text-sm">10,000+ TRAVELERS</p>
                <p className="text-white/80 text-sm">Satisfied Guests</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#C9A961]/20 p-3 rounded">
                <Calendar className="w-6 h-6 text-[#C9A961]" />
              </div>
              <div>
                <p className="text-[#C9A961] font-bold text-sm">15+ YEARS</p>
                <p className="text-white/80 text-sm">Excellence in Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center">
          <div className="border-2 border-white/50 rounded-full p-3 animate-bounce">
            <ChevronDown className="w-5 h-5 text-white/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
