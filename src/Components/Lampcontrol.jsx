// LampControl.js
import React from 'react';
import { Lightbulb, Highlight, SmartScreen } from '@mui/icons-material';
import { Slider } from '@mui/material';

const LampControl = ({ label, isOn, brightness, onToggle, onBrightnessChange, icon }) => {
  return (
    <div
      className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer transition-all ${
        isOn ? 'bg-white' : 'bg-gray-100'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
            isOn ? 'bg-yellow-100' : 'bg-gray-200'
          }`}
        >
          {icon && <icon.type className={isOn ? 'text-yellow-500' : 'text-gray-400'} sx={{ fontSize: { xs: 18, sm: 20 } }} />}
        </div>
        <div>
          <h3 className="text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">{label}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">{isOn ? `${brightness}%` : 'Off'}</p>
        </div>
      </div>
      {isOn && (
        <div className="mt-2 sm:mt-3" onClick={(e) => e.stopPropagation()}>
          <Slider
            value={brightness}
            onChange={(_, value) => onBrightnessChange(value)}
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
  );
};

export default LampControl;
