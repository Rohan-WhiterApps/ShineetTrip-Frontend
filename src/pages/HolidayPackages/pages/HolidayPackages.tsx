import Footer from "@/pages/LandingPage/Footer";
import { HolidaySearch } from "../components/HolidaySearch"
import { PackageCard } from "../components/PackageCard";
import { Navbar } from "@/pages/Navbar";
import { useState } from "react";
import { PackageSelectionModal } from "../components/PackageSelectionModal";

const HolidayPackages = () => {
  // 1. Data array ko function ke andar rakhein
 const packagesData = [
  {
    id: 1,
    title: "Romantic Beachfront Goa Retreat",
    nights: 4,
    days: 5,
    hero_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    inclusions: ["Airport Pickup & Drop", "Selected Meals", "4 Star Hotel", "2 Activities"],
    highlights: ["Honeymoon Hamper", "North Goa Sightseeing"],
    price: {
      base_fare: 9953,
      flight_price: 41903,
      total_price_per_adult: 19506,
      emi_per_month: 1903
    }
  },
  {
  id: 2,
  title: "Manali Snow & Mountain Escape",
  nights: 5,
  days: 6,
  hero_image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f",
  inclusions: [
    "Volvo Transfers",
    "Breakfast & Dinner",
    "3 Star Hotel",
    "Local Sightseeing"
  ],
  highlights: [
    "Solang Valley",
    "Rohtang Pass",
    "Snow Activities"
  ],
  price: {
    base_fare: 11499,
    flight_price: 41903,
    total_price_per_adult: 22499,
    emi_per_month: 2199
  }
},
{
  id: 3,
  title: "Heavenly Kashmir Luxury Tour",
  nights: 6,
  days: 7,
  hero_image: "https://images.unsplash.com/photo-1566837945700-30057527ade0",
  inclusions: [
    "Airport Transfers",
    "Houseboat Stay",
    "All Meals",
    "Private Cab"
  ],
  highlights: [
    "Dal Lake Shikara Ride",
    "Gulmarg Gondola",
    "Pahalgam Valleys"
  ],
  price: {
    base_fare: 16499,
    flight_price: 41903,
    total_price_per_adult: 31999,
    emi_per_month: 3099
  }
},
{
  id: 4,
  title: "Andaman Island Beach Holiday",
  nights: 5,
  days: 6,
  hero_image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  inclusions: [
    "Airport Pickup & Drop",
    "Breakfast",
    "Beach Resort",
    "Ferry Transfers"
  ],
  highlights: [
    "Radhanagar Beach",
    "Scuba Diving",
    "Cellular Jail Light Show"
  ],
  price: {
    base_fare: 14999,
    flight_price: 41903,
    total_price_per_adult: 28999,
    emi_per_month: 2799
  }
},
{
  id: 5,
  title: "Royal Rajasthan Heritage Tour",
  nights: 6,
  days: 7,
  hero_image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
  inclusions: [
    "Heritage Hotel Stay",
    "Daily Breakfast",
    "Private Cab",
    "Cultural Show"
  ],
  highlights: [
    "Jaipur City Palace",
    "Jaisalmer Desert Safari",
    "Udaipur Lake Tour"
  ],
  price: {
    base_fare: 13999,
    flight_price: 41903,
    total_price_per_adult: 26999,
    emi_per_month: 2599
  }
}

];



  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="h-64 bg-[#263238] flex items-center justify-center pt-20">
        <h1 className="text-white text-3xl font-bold font-opensans">Find Your Perfect Holiday</h1>
      </div>
      <HolidaySearch />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2C4A5E]">Holiday Packages</h2>
          <p className="text-gray-500">Experience Scenic Beauty</p>
        </div>

        {/* Grid setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packagesData.map((pkg) => (
            <PackageCard key={pkg.id} data={pkg} /> 
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default HolidayPackages;