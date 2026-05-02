import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import image1 from "../components/Assests/image1.jpeg";
import image2 from "../components/Assests/image2.jpeg";
import image3 from "../components/Assests/image3.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [image1, image2, image3];

  useEffect(() => {
    // Image rotation every 2 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Navigate to login after 5 seconds
    const navigationTimer = setTimeout(() => {
      setShowSplash(false);
      navigate("/login");
    }, 5000);

    // Clean up timers
    return () => {
      clearInterval(imageInterval);
      clearTimeout(navigationTimer);
    };
  }, [navigate, images.length]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden">
      {/* Splash Screen Content */}
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="bg-white text-gray-900 p-4 rounded-2xl mb-6 shadow-2xl shadow-blue-500/20">
          <LayoutDashboard className="w-12 h-12" />
        </div>

        {/* Rotating Images - Increased size */}
        <img
          src={images[currentImageIndex]}
          alt="Smart Home"
          className="w-[800px] h-[450px] object-cover rounded-3xl border-4 border-white/10 shadow-2xl mb-8 transition-opacity duration-500"
        />

        <h2 className="text-white text-2xl font-bold tracking-tight">
          Iot SmartHome
        </h2>
        <div className="mt-4 flex gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        </div>
      </div>

      {/* Subtle background glow for the splash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
    </div>
  );
};

export default LandingPage;
