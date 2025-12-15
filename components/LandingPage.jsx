import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Smartphone, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-500 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-2 rounded-lg">
             <LayoutDashboard className="w-5 h-5" />
           </div>
           <span className="font-bold text-xl tracking-tight">Iot SmartHome</span>
        </div>
        <button 
          onClick={() => navigate('/login')} 
          className="text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Sign In
        </button>
      </header>

      {/* Hero */}
      <main className="relative z-10 container mx-auto px-6 pt-12 md:pt-24 pb-12 flex flex-col items-center text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center">
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 border border-blue-200 dark:border-blue-800">
            Next Gen Living
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Control your home<br/> with elegance.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Experience the future of home automation. Seamlessly manage lighting, climate, energy, and security from one beautiful interface.
          </p>
          
          <button 
            onClick={() => navigate('/login')}
            className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 dark:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-amber-500" />}
            title="Energy Insights"
            desc="Monitor your consumption in real-time and save on energy bills."
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-blue-500" />}
            title="Remote Access"
            desc="Control your entire home from anywhere in the world, securely."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-green-500" />}
            title="Secure & Private"
            desc="Enterprise-grade encryption keeps your home data private."
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm mt-auto">
        © 2024 Mohana-Ajith. All rights reserved.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-white/20 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 text-left">
    <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 w-12 h-12 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;