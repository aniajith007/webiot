// App.jsx
import React from "react";

import LampCard from "../Components/LampCard";
import BlindsCard from "../Components/BlindsCard";
import ScreenCard from "../Components/ScreenCard";
import EnergyCard from "../Components/EnergyCard";
import SectionHeader from "../Components/SectionHeader";
import DeviceCard from "../Components/Devicecard";
import {
  Lightbulb,
  Highlight,
  Blinds,
  SmartScreen,
  DirectionsCar,
  Bolt,
  ElectricBolt,
  ShowChart,
  Co2,
} from "@mui/icons-material";
import DarkToggle from "../Components/DarkModeToggle";

export default function Controller2() {
  // States
  const [floorLampOn, setFloorLampOn] = React.useState(true);
  const [floorLampBrightness, setFloorLampBrightness] = React.useState(70);

  const [spotlightsOn, setSpotlightsOn] = React.useState(true);
  const [spotlightsBrightness, setSpotlightsBrightness] = React.useState(45);

  const [barLampOn, setBarLampOn] = React.useState(false);

  const [blindsOpen, setBlindsOpen] = React.useState(true);
  const [blindPos, setBlindPos] = React.useState(100);

  const [tvOn, setTvOn] = React.useState(true);

  const [evPlugged, setEvPlugged] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6  mx-auto">
      {/* Living Room */}
      {/* <SectionHeader icon={<h2 className="text-xl font-bold">Living Room</h2>} /> */}
      <SectionHeader
        icon={
          <h2 className="text-xl font-bold dark:text-white">Living Room</h2>
        }
        right={<DarkToggle />}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <LampCard
          title="Floor lamp"
          icon={<Lightbulb />}
          color="orange"
          isOn={floorLampOn}
          brightness={floorLampBrightness}
          onToggle={() => setFloorLampOn(!floorLampOn)}
          onBrightness={setFloorLampBrightness}
        />

        <LampCard
          title="Spotlights"
          icon={<Highlight />}
          color="yellow"
          isOn={spotlightsOn}
          brightness={spotlightsBrightness}
          onToggle={() => setSpotlightsOn(!spotlightsOn)}
          onBrightness={setSpotlightsBrightness}
        />

        <LampCard
          title="Bar lamp"
          icon={<Lightbulb />}
          color="yellow"
          isOn={barLampOn}
          brightness={0}
          onToggle={() => setBarLampOn(!barLampOn)}
          onBrightness={() => {}}
        />

        <BlindsCard
          icon={<Blinds />}
          title="Blinds"
          open={blindsOpen}
          position={blindPos}
          onToggle={() => {
            setBlindsOpen(!blindsOpen);
            setBlindPos(blindsOpen ? 0 : 100);
          }}
        />

        <ScreenCard
          icon={<SmartScreen />}
          isOn={tvOn}
          onToggle={() => setTvOn(!tvOn)}
        />
      </div>

      {/* Energy section */}
      <SectionHeader
        icon={<h2 className="text-xl font-bold mt-10">Energy</h2>}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
        <DeviceCard
          title="EV"
          subtitle={evPlugged ? "Charging" : "Unplugged"}
          icon={<DirectionsCar />}
          color="green"
          active={evPlugged}
          onClick={() => setEvPlugged(!evPlugged)}
        />

        <EnergyCard
          icon={<Bolt />}
          title="Last charge"
          value="16.3"
          unit="kWh"
          color="green"
        />
        <EnergyCard
          icon={<ElectricBolt />}
          title="Home power"
          value="797.86"
          unit="W"
          color="orange"
        />
        <EnergyCard
          icon={<ShowChart />}
          title="Voltage"
          value="232.19"
          unit="V"
          color="orange"
        />
        <EnergyCard
          icon={<span>⛽</span>}
          title="Fossil fuel"
          value="9.84"
          unit="%"
          color="amber"
        />
        <EnergyCard
          icon={<Co2 />}
          title="CO₂ Intensity"
          value="62"
          unit="gCO2/kWh"
          color="gray"
        />
      </div>
    </div>
  );
}
