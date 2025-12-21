import { useState } from "react";
import { PackageGallery } from "../components/PackageGallery";
import { PricingSidebar } from "../components/PricingSidebar";
import { PackageTabs } from "../components/PackageTabs";
import { HolidaySearch } from "../components/HolidaySearch";
import { ItinerarySection } from "../components/ItinerarySection";
import { SummarySection } from "../components/SummarySection"; // Summary component
import { GalleryModal } from "../components/GalleryModal";
import { Navbar } from "@/pages/Navbar";
import Footer from "@/pages/LandingPage/Footer";

const PackageDetailsPage = () => {
  // activeTab state control karti hai ki kaunsa component dikhega
  const [activeTab, setActiveTab] = useState('itineraries');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const pkgData = {
    title: "Romantic Beachfront Goa Retreat",
    hero_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: {
      base_fare: 662,
      tax: 53,
      reservation_charge: 40,
      superfast_charge: 45,
      tatkal_fare: 300,
      total_price_per_adult: 1100
    }
  };


  return (
    <div className="min-h-screen bg-[#FDFDFD] font-opensans">
      {/* <Navbar /> */}

      {/* Search bar section */}
      <div className="pt-30"> 
        <HolidaySearch isDetailsPage={true} />
      </div>

      <PackageGallery 
        heroImage={pkgData.hero_image}
        onOpenGallery={() => setIsGalleryOpen(true)} title={""}    />

    {/* Gallery Modal rendering */}
    <GalleryModal 
      isOpen={isGalleryOpen} 
      onClose={() => setIsGalleryOpen(false)} 
      title="Most Wanted Kerala Package" 
    />
      
      {/* Tabs section: setActiveTab pass kiya hai click handling ke liye */}
      <PackageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Side: Dynamic Content based on activeTab */}
          <div className="lg:col-span-8">
            {/* Conditional Rendering Logic */}
            {activeTab === 'itineraries' && <ItinerarySection />}
            
            {activeTab === 'summary' && <SummarySection />}
            
            {activeTab === 'policies' && (
              <div className="p-8 bg-white rounded-[30px] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-[#2C4A5E] mb-6 border-b pb-4">Policies & Cancellation</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Cancellation Policy</h4>
                    <p className="text-sm text-gray-500 leading-relaxed italic">
                      "Cancellation made 15 days prior to departure will incur a 10% charge. No refunds for cancellations within 7 days of departure."
                    </p>
                  </div>
                  <hr className="border-gray-50" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Terms & Conditions</h4>
                    <ul className="text-sm text-gray-500 list-disc pl-5 space-y-2">
                      <li>Standard check-in time is 12:00 PM and check-out is 11:00 AM.</li>
                      <li>Government ID is mandatory for all guests.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Sticky Pricing Sidebar */}
          <div className="lg:col-span-4">
            <PricingSidebar priceData={pkgData.price} />
          </div>

        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default PackageDetailsPage;