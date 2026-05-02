import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Filter } from "lucide-react";

const EnergyGraph = () => {
  const [timeframe, setTimeframe] = useState('1D');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 1. Logic to determine what data to show
  const data = useMemo(() => {
    // If both custom dates are set, we "pretend" to fetch that range
    if (timeframe === "custom" && startDate && endDate) {
      return [
        { name: startDate, usage: Math.floor(Math.random() * 50) + 10 },
        { name: "Middle Point", usage: Math.floor(Math.random() * 50) + 10 },
        { name: endDate, usage: Math.floor(Math.random() * 50) + 10 },
      ];
    }

    // Default mock data for standard buttons
    const points = timeframe === "1D" ? 24 : timeframe === "1W" ? 7 : 30;
    return Array.from({ length: points }, (_, i) => ({
      name: timeframe === "1D" ? `${i}:00` : `Day ${i + 1}`,
      usage: Math.floor(Math.random() * 50) + 10,
    }));
  }, [timeframe, startDate, endDate]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Energy Consumption
          </h3>
          <p className="text-sm text-gray-500">
            Real-time usage across all devices
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
          {["1D", "1W", "1M", "3M"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === t
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}

          {/* Custom Date Selector Trigger */}
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <Calendar className="w-4 h-4" />
            </button>
            {/* Simple Custom Date Popover */}
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-50 bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-2xl shadow-2xl w-64">
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400">
                    From
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-gray-50 dark:bg-gray-700 rounded-lg border-none text-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400">
                    To
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-gray-50 dark:bg-gray-700 rounded-lg border-none text-gray-800 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setTimeframe("custom")}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Apply Range
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
              className="dark:stroke-gray-800"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              minTickGap={30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsage)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Custom Tooltip for that "IoT" look
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-3 rounded-xl border border-gray-700 shadow-xl">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
          {payload[0].payload.name}
        </p>
        <p className="text-lg font-black">
          {payload[0].value} <span className="text-xs font-normal">kWh</span>
        </p>
      </div>
    );
  }
  return null;
};

export default EnergyGraph;
