export default function Statistics() {
  const stats = [
    { number: "50+", label: "Happy Travelers" },
    { number: "10K+", label: "Miles Covered" },
    { number: "15+", label: "Destinations" },
    { number: "100%", label: "Satisfaction Rate" },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
