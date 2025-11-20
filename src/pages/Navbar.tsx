import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import HotelIcon from "../assets/Hotel Streamline Rounded Line - Material Symbols.png";
import FlightIcon from "../assets/Airplane In Flight Bold Streamline Phosphor Bold.png";
import TrainIcon from "../assets/Train Streamline Sharp Line - Material Symbols.png";
import PackageIcon from "../assets/Package Streamline Phosphor Regular.png";
import EventIcon from "../assets/Event Streamline Carbon.png";
import { LoginModal } from "./Login/Loginpage";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleNavClick = (type: string) => {
    navigate(`/?searchWidget=open&type=${type}`);
    scrollToSection("home");
  };

  return (
    <>
      <nav className="fixed w-full bg-white backdrop-blur-md z-50 shadow-sm font-opensans">
        <div className="w-full">
          <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
            {/* Logo - Leftmost */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Shinee Trip" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-[#2C4A5E] font-medium text-2xl tracking-wide border-b-2 border-[#C9A961]">
                  SHINEE <span className="text-[#C9A961]">TRIP</span>
                </span>
              </div>
            </div>

            {/* Desktop Menu - Center */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <button 
                onClick={() => handleNavClick("Hotels")} 
                className="flex items-center gap-2 text-gray-600 font-opensans font-medium text-[18px] leading-[21px] tracking-[0px] hover:text-[#C9A961] transition-colors group"
              >
                <img src={HotelIcon} alt="Hotels" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Hotels
              </button>
              
              <button 
                onClick={() => handleNavClick("Flights")} 
                className="flex items-center gap-2 text-gray-600 font-opensans font-medium text-[18px] leading-[21px] tracking-[0px] hover:text-[#C9A961] transition-colors group"
              >
                <img src={FlightIcon} alt="Flights" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Flights
              </button>

              <button 
                onClick={() => handleNavClick("Trains")} 
                className="flex items-center gap-2 text-gray-600 font-opensans font-medium text-[18px] leading-[21px] tracking-[0px] hover:text-[#C9A961] transition-colors group"
              >
                <img src={TrainIcon} alt="Trains" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Trains
              </button>

              <button 
                onClick={() => handleNavClick("Holiday Packages")} 
                className="flex items-center gap-2 text-gray-600 font-opensans font-medium text-[18px] leading-[21px] tracking-[0px] hover:text-[#C9A961] transition-colors group"
              >
                <img src={EventIcon} alt="Holiday Packages" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Holiday Packages
              </button>

              <button 
                onClick={() => handleNavClick("Events")} 
                className="flex items-center gap-2 text-gray-600 font-opensans font-medium text-[18px] leading-[21px] tracking-[0px] hover:text-[#C9A961] transition-colors group"
              >
                <img src={PackageIcon} alt="Events" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Events
              </button>
            </div>

            {/* Login Button - Rightmost */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-white font-medium hover:opacity-90 transition-opacity text-[17px]"
                style={{
                  width: '162px',
                  height: '42px',
                  borderRadius: '15px',
                  padding: '12px 24px',
                  background: 'linear-gradient(180.95deg, #AB7E29 0.87%, #EFD08D 217.04%)',
                  boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Login/Signup
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#2C4A5E] hover:text-[#C9A961] focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
            <div className="px-4 pt-2 pb-3 space-y-1 shadow-lg">
              {["Hotels", "Flights", "Trains", "Holiday Packages", "Events"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-[#2C4A5E] hover:text-[#C9A961] hover:bg-gray-50 rounded-md"
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 pb-2">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#2C4A5E] text-white px-4 py-2 rounded-full font-medium hover:bg-[#1a2e3b] transition-colors flex items-center justify-center gap-2"
                >
                  <User size={18} />
                  Login / Signup
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};