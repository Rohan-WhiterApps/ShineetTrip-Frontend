"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import toast, { Toaster } from 'react-hot-toast'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      // Create FormData for multipart/form-data request
      const formDataToSend = new FormData();
      
      // Combine first and last name for the 'name' field
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      formDataToSend.append('name', fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('title', formData.destination || 'General Inquiry');
      formDataToSend.append('message', formData.message);
      formDataToSend.append('status', 'pending');
      
      console.log("Sending contact form data:", {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        title: formData.destination || 'General Inquiry',
        message: formData.message,
        status: 'pending'
      });

      const response = await fetch('http://46.62.160.188:3000/contact-us', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("Contact form API response:", result);

      if (response.ok) {
        toast.success("Thank you! Your message has been sent successfully. Our team will contact you within 2 hours.", {
          duration: 5000,
          position: 'top-center',
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          destination: "",
          message: "",
        });
      } else {
        console.error("API Error:", result);
        toast.error("Sorry, there was an error sending your message. Please try again or contact us directly.", {
          duration: 5000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Sorry, there was an error sending your message. Please try again or contact us directly.", {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster />
      <section className="py-24 bg-white font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C9B86A]"></div>
                <span className="text-[#C9A86A] text-sm tracking-widest uppercase">Get in Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 text-[#2C3C3C]">Begin Your</h2>
              <p className="text-4xl md:text-5xl text-[#C9A86A] font-light italic">Himalayan Journey</p>
            </div>
            
            <p className="text-gray-600 text-[15px] leading-[36.91px] font-normal tracking-[0px] font-opensans mb-[15px]">
              Let our travel curators design your perfect escape. Whether it's a romantic getaway, family adventure, or spiritual journey, we craft experiences that resonate with your soul.
            </p>

            {/* Contact Info Boxes */}
            <div className="space-y-[30px]">
              {/* Call Us */}
              <div className="bg-white p-4 rounded-sm border-l-4 border-[#C9A86A]">
                <div className="flex items-start gap-4">
                  <div className="bg-[#C9A86A] p-3 rounded-full">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Call Us</p>
                    <p className="text-[#2C3C3C] text-xl font-semibold mb-1">+91 98765 43210</p>
                    <p className="text-gray-500  font-normal  text-sm">Available 24/7</p>
                  </div>
                </div>
              </div>

              {/* Email Us */}
              <div className="bg-white p-4 rounded-sm border-l-4 border-[#C9A86A]">
                <div className="flex items-start gap-4">
                  <div className="bg-[#C9A86A] p-3 rounded-full">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Email Us</p>
                    <p className="text-[#2C3C3C] text-xl font-semibold mb-1">info@shineetrip.com</p>
                    <p className="text-gray-500  font-normal  text-sm">Response within 2 hours</p>
                  </div>
                </div>
              </div>

              {/* Our Offices */}
              <div className="bg-white p-4 rounded-sm border-l-4 border-[#C9A86A]">
                <div className="flex items-start gap-4">
                  <div className="bg-[#C9A86A] p-3 rounded-full">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Our Offices</p>
                    <p className="text-[#2C3C3C] text-xl font-semibold mb-1">Himachal | Mumbai</p>
                    <p className="text-gray-500  font-normal  text-sm">Chandigarh | Kathmandu</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Write a Review Button */}
            <button 
              className="w-full bg-black text-white py-4 mt-[30px] rounded-md font-semibold text-base hover:bg-black transition-colors"
              onClick={() => window.open('https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review', '_blank')}
            >
              Write a Review
            </button>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            {/* Golden corner decorations */}
            <div className="absolute -top-4 -right-1.5 w-20 h-20 border-t-4 border-r-4 border-[#C9A86A]"></div>
            <div className="absolute bottom-0 -left-2 w-20 h-20 border-b-4 border-l-4 border-[#C9A86A]"></div>
            
            <form onSubmit={handleSubmit} className="bg-white px-6 py-9 shadow-lg relative">
              <div className="space-y-[30px]">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2 uppercase tracking-wide">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] focus:bg-white transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2 uppercase tracking-wide">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2 uppercase tracking-wide">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] focus:bg-white transition"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2 uppercase tracking-wide">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] focus:bg-white transition"
                    required
                  />
                </div>

                {/* Preferred Destination */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2 uppercase tracking-wide">
                    Preferred Destination
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Shimla, Manali, Nepal, Bhutan"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] focus:bg-white transition"
                  />
                </div>

                {/* Your Message */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2 uppercase tracking-wide">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Tell us about your dream journey..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] focus:bg-white transition resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white py-3 text-base font-medium transition flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(90deg, #C9A86A 0%, #E8C78A 100%)',
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  <Send size={20} />
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  Our travel experts will respond within 2 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}