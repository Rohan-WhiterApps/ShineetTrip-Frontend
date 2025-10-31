import { Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import Footer from "./pages/LandingPage/Footer";

import DiscoverAdventure from "./pages/LandingPage/Dsicoveradventure";
import Difference from "./pages/LandingPage/Differene";

import Testimonials from "./pages/LandingPage/Testimonials";
import ContactForm from "./pages/LandingPage/ContactForm";
import RoomBookingPage from "./pages/Room_booking_page";

import { HeroSection } from "./pages/LandingPage/HeroSection";
import BookingPage from "./pages/Payment_Page";

// import { RoomDetailsModal } from "./pages/Rooms_details_page";




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
          <DiscoverAdventure />
        </section>

        <section id="difference">
          <Difference />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="contact">
          <ContactForm />
        </section>
      </>
    }
  /> 
  <Route path="/room-booking" element={<RoomBookingPage />} />
  <Route path="/booking" element={<BookingPage />} />
  {/* <Route path="/roomdetails" element={<RoomDetailsModal/>} /> */}
  </Routes>

      <Footer />
      
  </>
  );
};

export default App;
