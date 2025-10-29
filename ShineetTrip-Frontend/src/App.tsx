import { Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import Footer from "./pages/LandingPage/Footer";

import DiscoverAdventure from "./pages/LandingPage/Dsicoveradventure";
import Difference from "./pages/LandingPage/Differene";

import Testimonials from "./pages/LandingPage/Testimonials";
import ContactForm from "./pages/LandingPage/ContactForm";
import RoomBookingPage from "./pages/Room_booking_page";
import JourneyPlanner from "./pages/journey_planner";
import LoginModal from "./pages/Login/Loginpage";
import { HeroSection } from "./pages/LandingPage/HeroSection";


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <DiscoverAdventure />
              <Difference />
              <Testimonials />
              <ContactForm />
            </>
          }
        />
        <Route path="/room-booking" element={<RoomBookingPage />} />
        <Route path="/journey-planner" element={<JourneyPlanner />} />
        <Route path="/login" element={<LoginModal />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
