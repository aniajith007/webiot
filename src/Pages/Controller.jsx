import React from 'react';
import { Slider } from '@mui/material';
import {
  Lightbulb,
  Highlight,
  Weekend,
  Blinds,
  SmartScreen,
  ElectricBolt,
  Bolt,
  ShowChart,
  Co2,
  Kitchen,
  DirectionsCar,
  MeetingRoom,
  Square,
  FiberManualRecord,
  ArrowLeft,
} from '@mui/icons-material';

export default function App() {
  // Living Room States
  const [floorLampOn, setFloorLampOn] = React.useState(true);
  const [floorLampBrightness, setFloorLampBrightness] = React.useState(70);
  const [spotlightsOn, setSpotlightsOn] = React.useState(true);
  const [spotlightsBrightness, setSpotlightsBrightness] = React.useState(49);
  const [barLampOn, setBarLampOn] = React.useState(true);
  const [livingRoomBlindsOpen, setLivingRoomBlindsOpen] = React.useState(true);
  const [livingRoomBlindsPosition, setLivingRoomBlindsPosition] = React.useState(100);
  const [tvPlaying, setTvPlaying] = React.useState(true);

  // Kitchen States
  const [kitchenShutterOpen, setKitchenShutterOpen] = React.useState(true);
  const [kitchenShutterPosition, setKitchenShutterPosition] = React.useState(100);
  const [kitchenSpotlightsOn, setKitchenSpotlightsOn] = React.useState(false);
  const [worktopLightOn, setWorktopLightOn] = React.useState(false);
  const [fridgeOpen, setFridgeOpen] = React.useState(false);
  const [kitchenScreenOn, setKitchenScreenOn] = React.useState(true);

  // Energy States
  const [evPlugged, setEvPlugged] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto">
        {/* Header with temperature and humidity */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
          <Weekend className="text-gray-800" sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-base sm:text-lg md:text-xl">🌡</span>
              <span className="text-gray-700 text-sm sm:text-base">22.8 °C</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-base sm:text-lg md:text-xl">💧</span>
              <span className="text-gray-700 text-sm sm:text-base">57%</span>
            </div>
          </div>
        </div>

        {/* Living Room Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          {/* Floor lamp */}
          <div 
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
              floorLampOn ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => setFloorLampOn(!floorLampOn)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                floorLampOn ? 'bg-orange-100' : 'bg-gray-200'
              }`}>
                <Lightbulb className={floorLampOn ? 'text-orange-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Floor lamp</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{floorLampOn ? `${floorLampBrightness}%` : 'Off'}</p>
              </div>
            </div>
            {floorLampOn && (
              <div className="mt-2 sm:mt-3" onClick={(e) => e.stopPropagation()}>
                <Slider
                  value={floorLampBrightness}
                  onChange={(_, value) => setFloorLampBrightness(value)}
                  sx={{
                    color: '#f97316',
                    height: 6,
                    '& .MuiSlider-thumb': {
                      width: 18,
                      height: 18,
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Spotlights */}
          <div 
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
              spotlightsOn ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => setSpotlightsOn(!spotlightsOn)}
          >
            <div className="flex items-start gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                spotlightsOn ? 'bg-yellow-100' : 'bg-gray-200'
              }`}>
                <Highlight className={spotlightsOn ? 'text-yellow-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Spotlights</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{spotlightsOn ? `${spotlightsBrightness}%` : 'Off'}</p>
              </div>
            </div>
            {spotlightsOn && (
              <div className="mt-2 sm:mt-3" onClick={(e) => e.stopPropagation()}>
                <div 
                  className="w-full h-8 sm:h-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-50 rounded-full relative overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = Math.round((x / rect.width) * 100);
                    setSpotlightsBrightness(Math.max(0, Math.min(100, percentage)));
                  }}
                >
                  <div className="absolute inset-0 flex items-center px-2">
                    <div 
                      className="h-5 w-5 sm:h-6 sm:w-6 bg-white rounded-full shadow-md cursor-grab active:cursor-grabbing"
                      style={{ 
                        marginLeft: `calc(${spotlightsBrightness}% - 10px)`,
                        transition: 'margin-left 0.1s'
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const slider = e.currentTarget.parentElement?.parentElement;
                        if (!slider) return;
                        
                        const handleMove = (moveEvent) => {
                          const rect = slider.getBoundingClientRect();
                          const x = moveEvent.clientX - rect.left;
                          const percentage = Math.round((x / rect.width) * 100);
                          setSpotlightsBrightness(Math.max(0, Math.min(100, percentage)));
                        };
                        
                        const handleUp = () => {
                          document.removeEventListener('mousemove', handleMove);
                          document.removeEventListener('mouseup', handleUp);
                        };
                        
                        document.addEventListener('mousemove', handleMove);
                        document.addEventListener('mouseup', handleUp);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        const slider = e.currentTarget.parentElement?.parentElement;
                        if (!slider) return;
                        
                        const handleMove = (moveEvent) => {
                          const rect = slider.getBoundingClientRect();
                          const x = moveEvent.touches[0].clientX - rect.left;
                          const percentage = Math.round((x / rect.width) * 100);
                          setSpotlightsBrightness(Math.max(0, Math.min(100, percentage)));
                        };
                        
                        const handleEnd = () => {
                          document.removeEventListener('touchmove', handleMove);
                          document.removeEventListener('touchend', handleEnd);
                        };
                        
                        document.addEventListener('touchmove', handleMove);
                        document.addEventListener('touchend', handleEnd);
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bar lamp */}
          <div 
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
              barLampOn ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => setBarLampOn(!barLampOn)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                barLampOn ? 'bg-yellow-100' : 'bg-gray-200'
              }`}>
                <Lightbulb className={barLampOn ? 'text-yellow-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Bar lamp</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{barLampOn ? 'On' : 'Off'}</p>
              </div>
            </div>
          </div>

          {/* Blinds */}
          <div 
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer"
            onClick={() => {
              setLivingRoomBlindsOpen(!livingRoomBlindsOpen);
              setLivingRoomBlindsPosition(livingRoomBlindsOpen ? 0 : 100);
            }}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Blinds className="text-purple-500" sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Blinds</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {livingRoomBlindsOpen ? 'Open' : 'Closed'} · {livingRoomBlindsPosition}%
                </p>
              </div>
            </div>
          </div>

          {/* Playing */}
          <div 
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
              tvPlaying ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => setTvPlaying(!tvPlaying)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                tvPlaying ? 'bg-cyan-100' : 'bg-gray-200'
              }`}>
                <SmartScreen className={tvPlaying ? 'text-cyan-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 text-sm sm:text-base">{tvPlaying ? 'Playing' : 'Off'}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Kitchen Section */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <MeetingRoom className="text-gray-800" sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
          <ElectricBolt className="text-cyan-400" sx={{ fontSize: { xs: 18, sm: 20 } }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          {/* Shutter */}
          <div 
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer"
            onClick={() => {
              setKitchenShutterOpen(!kitchenShutterOpen);
              setKitchenShutterPosition(kitchenShutterOpen ? 0 : 100);
            }}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Blinds className="text-purple-500" sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Shutter</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {kitchenShutterOpen ? 'Open' : 'Closed'} · {kitchenShutterPosition}%
                </p>
              </div>
            </div>
          </div>

          {/* Spotlights Off */}
          <div 
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
              kitchenSpotlightsOn ? 'bg-white' : 'bg-white'
            }`}
            onClick={() => setKitchenSpotlightsOn(!kitchenSpotlightsOn)}
          >
            <div className="flex items-start gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                kitchenSpotlightsOn ? 'bg-yellow-100' : 'bg-gray-100'
              }`}>
                <Highlight className={kitchenSpotlightsOn ? 'text-yellow-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Spotlights</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{kitchenSpotlightsOn ? 'On' : 'Off'}</p>
              </div>
            </div>
          </div>

          {/* Worktop */}
          <div 
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
              worktopLightOn ? 'bg-white' : 'bg-white'
            }`}
            onClick={() => setWorktopLightOn(!worktopLightOn)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                worktopLightOn ? 'bg-orange-100' : 'bg-gray-100'
              }`}>
                <Kitchen className={worktopLightOn ? 'text-orange-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Worktop</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{worktopLightOn ? 'On' : 'Off'}</p>
              </div>
            </div>
          </div>

          {/* Empty gray box - brightness control for kitchen spotlights */}
          <div className={`bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm ${!kitchenSpotlightsOn && 'opacity-50 pointer-events-none'}`}>
            <div className="w-full h-10 sm:h-12 bg-gray-100 rounded-xl flex items-center px-2 sm:px-3">
              <Slider
                defaultValue={50}
                disabled={!kitchenSpotlightsOn}
                sx={{
                  color: '#eab308',
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                  },
                }}
              />
            </div>
          </div>

          {/* Fridge */}
          <div 
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer"
            onClick={() => setFridgeOpen(!fridgeOpen)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                fridgeOpen ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                <Kitchen className={fridgeOpen ? 'text-red-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Fridge</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{fridgeOpen ? 'Open' : 'Closed'}</p>
              </div>
            </div>
          </div>

          {/* On */}
          <div 
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
              kitchenScreenOn ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => setKitchenScreenOn(!kitchenScreenOn)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                kitchenScreenOn ? 'bg-cyan-100' : 'bg-gray-200'
              }`}>
                <SmartScreen className={kitchenScreenOn ? 'text-cyan-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 text-sm sm:text-base">{kitchenScreenOn ? 'On' : 'Off'}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Section */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl">🚶</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-16 sm:mb-20">
          {/* EV */}
          <div 
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer"
            onClick={() => setEvPlugged(!evPlugged)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                evPlugged ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <DirectionsCar className={evPlugged ? 'text-green-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">EV</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{evPlugged ? 'Charging' : 'Unplugged'}</p>
              </div>
            </div>
          </div>

          {/* Last charge */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <Bolt className="text-green-500" sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Last charge</h3>
                <p className="text-gray-600 text-xs sm:text-sm">16.3 kWh</p>
              </div>
            </div>
          </div>

          {/* Home power */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                <ElectricBolt className="text-orange-500" sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Home power</h3>
                <p className="text-gray-600 text-xs sm:text-sm">797.86 W</p>
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
                <p className="text-gray-600 text-xs sm:text-sm">232.19 V</p>
              </div>
            </div>
          </div>

          {/* Fossil fuel */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-700 text-base sm:text-xl">⛽</span>
              </div>
              <div>
                <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Fossil fuel</h3>
                <p className="text-gray-600 text-xs sm:text-sm">9.84%</p>
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
                <p className="text-gray-600 text-xs sm:text-sm">62.0 gCO2eq/kWh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}