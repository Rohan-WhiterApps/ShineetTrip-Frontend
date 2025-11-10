import { Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import Footer from "./pages/LandingPage/Footer";

import DiscoverAdventure from "./pages/LandingPage/Dsicoveradventure";

import Testimonials from "./pages/LandingPage/Testimonials";
import ContactForm from "./pages/LandingPage/ContactForm";
import RoomBookingPage from "./pages/Properties_details";

import BookingPage from "./pages/Payment_Page";
import HotelListingPage from "./pages/Hotel_listing_page";
import Tourspackages from "./pages/Tour_packages";
import HeroSection from "./pages/LandingPage/HeroSection";
import AboutPage from "./AboutPage";




const App: React.FC = () => {

 
  return (
<>
      <Navbar />
      <Routes>
  <Route
    path="/"
    element={
      <>
        <section id="home">
          <HeroSection />
        </section>

        <section id="adventure">
          {<DiscoverAdventure /> }
        </section>


        <section id="testimonials">
          { <Testimonials /> }
        </section>

        <section id="contact">
          { <ContactForm /> }
        </section>
      </>
    }
  /> 
  <Route path="/room-booking" element={<RoomBookingPage />} />
  <Route path="/booking" element={<BookingPage />} />
  <Route path="/hotellists" element={<HotelListingPage/>} />
  <Route path="/tours" element={<Tourspackages/>}/>
  
    <Route path='/about' element={<AboutPage/>}/>
  </Routes>

      <Footer />
      
  </>
  );
};

export default App;
