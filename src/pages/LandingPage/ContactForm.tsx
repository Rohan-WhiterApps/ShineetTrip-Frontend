"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      destination: "",
      message: "",
    })
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Begin Your</h2>
            <p className="text-2xl md:text-3xl text-[#D4A76A] font-light mb-8">Himalayan Journey</p>
            <p className="text-muted-foreground mb-8">
              Let our travel experts guide you through the planning process. Share your preferences and we'll create the
              perfect itinerary for your mountain adventure.
            </p>
            <div className="space-y-6">
              <div>
                <p className="font-bold text-foreground mb-2">Call Us</p>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">Email</p>
                <p className="text-muted-foreground">info@shineetrip.com</p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">Office Hours</p>
                <p className="text-muted-foreground">Monday - Friday: 9AM - 6PM</p>
                <p className="text-muted-foreground">Saturday - Sunday: 10AM - 4PM</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-card border-border"
              />
              <Input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-card border-border"
              />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-card border-border"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-card border-border"
            />
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-card border border-border rounded-md text-foreground"
            >
              <option value="">Select Destination</option>
              <option value="shimla">Shimla & Manali</option>
              <option value="ladakh">Ladakh & Kailash Valley</option>
              <option value="kathmandu">Kathmandu & Pokhara</option>
              <option value="bhutan">Bhutan & Paro Valley</option>
            </select>
            <Textarea
              placeholder="Tell us about your travel preferences..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-card border-border min-h-32"
            />
            <Button className="w-full bg-accent text-header-bg hover:bg-accent/90 py-6 text-lg">Send Inquiry</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
