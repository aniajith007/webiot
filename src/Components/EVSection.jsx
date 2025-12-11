// EnergySection.js (Add this file for modularity)
import React from 'react';
import { DirectionsCar, Bolt, ElectricBolt, ShowChart, Co2, FiberManualRecord } from '@mui/icons-material';

const EnergySection = ({
  evPlugged,
  lastCharge,
  homePower,
  voltage,
  fossilFuel,
  co2Intensity,
  onEvToggle,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 mb-16 sm:mb-20">
      {/* EV */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer" onClick={onEvToggle}>
        <div className="flex items-start gap-2 sm:gap-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${evPlugged ? 'bg-green-100' : 'bg-gray-100'}`}>
            <DirectionsCar className={evPlugged ? 'text-green-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </div>
          <div>
            <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">EV</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{evPlugged ? 'Charging' : 'Unplugged'}</p>
          </div>
        </div>
      </div>

      {/* Last Charge */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <Bolt className="text-green-500" sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </div>
          <div>
            <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Last charge</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{lastCharge} kWh</p>
          </div>
        </div>
      </div>

      {/* Home Power */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <ElectricBolt className="text-orange-500" sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </div>
          <div>
            <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Home power</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{homePower} W</p>
          </div>
        </div>
      </div>

      {/* Voltage */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <ShowChart className="text-orange-500" sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </div>
          <div>
            <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Voltage</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{voltage} V</p>
          </div>
        </div>
      </div>

      {/* Fossil Fuel */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-700 text-base sm:text-xl">⛽</span>
          </div>
          <div>
            <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Fossil fuel</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{fossilFuel}%</p>
          </div>
        </div>
      </div>

      {/* CO2 Intensity */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Co2 className="text-gray-400" sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </div>
          <div>
            <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">CO2 Intensity</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{co2Intensity} gCO2eq/kWh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergySection;
