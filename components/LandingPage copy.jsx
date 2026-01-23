import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Start the 2-second timer as soon as the component mounts
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate('/login');
    }, 5000);

    // Clean up the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden">
      {/* Splash Screen Content 
        This is what shows for exactly 2 seconds.
      */}
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="bg-white text-gray-900 p-4 rounded-2xl mb-6 shadow-2xl shadow-blue-500/20">
          <LayoutDashboard className="w-12 h-12" />
        </div>
        
        {/* Replace the URL below with your actual image path */}
        <img 
          src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800" 
          alt="Smart Home" 
          className="w-64 h-64 object-cover rounded-3xl border-4 border-white/10 shadow-2xl mb-8"
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]"></div>
    </div>
  );
};

export default LandingPage;