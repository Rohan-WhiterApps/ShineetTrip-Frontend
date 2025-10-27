import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=majestic himalayan mountains sunset)",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">Experience The Majestic</h1>
        <h2 className="text-4xl md:text-6xl font-light mb-8 text-accent">Himalayas</h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Embark on extraordinary journeys across India, Nepal, and Bhutan. Discover the beauty of mountains and create
          unforgettable memories.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button className="bg-accent text-header-bg hover:bg-accent/90 px-8 py-6 text-lg">Explore Now</Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
