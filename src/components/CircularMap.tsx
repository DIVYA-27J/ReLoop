import React, { useState } from "react";
import { MapPin } from "../types";
import { Map, Phone, Navigation, Star, Heart, Pin, CheckCircle, Calendar, ShieldAlert } from "lucide-react";

interface CircularMapProps {
  pins: MapPin[];
}

export default function CircularMap({ pins }: CircularMapProps) {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(pins[0] || null);
  const [filterType, setFilterType] = useState<string>("All");
  const [scheduledSuccess, setScheduledSuccess] = useState<boolean>(false);

  const filteredPins = pins.filter((p) => {
    if (filterType === "All") return true;
    return p.type === filterType;
  });

  const handleSchedulePickup = () => {
    setScheduledSuccess(true);
    setTimeout(() => {
      setScheduledSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50" id="map-section">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Interactive Circular Economy Map</h1>
          <p className="text-slate-500 mt-1">Locate industrial buyers, NGOs, chemical sorting hubs, and decentralized community deposit lockers.</p>
        </div>

        {/* Map Filters toolbar */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-3 border border-slate-200 rounded-2xl shadow-xs">
          {["All", "Recycling Center", "Scrap Shop", "NGO Drop-off", "Collection Point", "Industrial Buyer"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterType(type);
                // Reset selection if current selection is filtered away
                const stillValid = pins.find((p) => (type === "All" || p.type === type) && p.id === selectedPin?.id);
                if (!stillValid) {
                  const firstMatch = pins.find((p) => type === "All" || p.type === type);
                  setSelectedPin(firstMatch || null);
                }
              }}
              className={`p-2 px-3 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${filterType === type ? "bg-slate-900 text-white border-slate-900" : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-transparent"}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Spatial Grid Map Panel */}
          <div className="lg:col-span-7 bg-indigo-950 border-4 border-slate-900 rounded-3xl p-4 md:p-6 shadow-md relative min-h-[420px] flex flex-col justify-between overflow-hidden">
            {/* Ambient grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span>Autonomous Route Grid Map</span>
              </span>
              <span className="text-slate-400 font-mono">Bandra-Andheri Local Mesh</span>
            </div>

            {/* SVG Grid Map Visualizer simulating local geographical nodes */}
            <div className="relative w-full h-[320px] flex items-center justify-center my-4 z-10">
              {/* Fake roads */}
              <svg className="absolute inset-0 w-full h-full opacity-20 stroke-white/40 fill-none" strokeWidth="2">
                <path d="M 50,0 Q 150,150 250,300 M 0,100 L 500,100 M 100,320 L 400,0 M 450,320 Q 300,150 150,0" />
                <circle cx="250" cy="160" r="120" stroke="rgba(16, 185, 129, 0.4)" strokeDasharray="4,4" />
                <circle cx="250" cy="160" r="70" stroke="rgba(14, 165, 233, 0.4)" strokeDasharray="4,4" />
              </svg>

              {/* Pulsing home location indicator */}
              <div
                className="absolute w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"
                style={{ left: "44%", top: "48%" }}
              >
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-md whitespace-nowrap">Your Node</span>
              </div>

              {/* Render Filtered active pins on the grid coordinates */}
              {filteredPins.map((p) => {
                const isSelected = selectedPin?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPin(p)}
                    className="absolute group transition-transform hover:scale-115 active:scale-95 cursor-pointer"
                    style={{ left: `${p.coordinates.x}%`, top: `${p.coordinates.y}%` }}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className={`p-2.5 rounded-full shadow-lg ${isSelected ? "bg-emerald-500 text-white scale-110 pulse-glow ring-4 ring-emerald-300" : "bg-white text-slate-800 border-2 border-slate-800 hover:border-emerald-500 hover:text-emerald-500"}`}>
                        <Pin className="w-4 h-4 shrink-0" />
                      </div>
                      <span className={`mt-1.5 px-2 py-0.5 rounded text-[8px] font-extrabold whitespace-nowrap ${isSelected ? "bg-emerald-500 text-white" : "bg-slate-900 text-slate-200 bg-opacity-90"} shadow-sm`}>
                        {p.name.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative z-10 text-slate-400 text-[10px] text-center italic bg-slate-950 bg-opacity-40 p-2 rounded-xl">
              💡 Drag-free SVG coordinate mesh representing live telemetry tags. Click on any pin to view route efficiencies.
            </div>
          </div>

          {/* Map Node Detail Card */}
          <div className="lg:col-span-5">
            {selectedPin ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between h-full animate-fade-in">
                <div>
                  <div className="flex gap-2 items-center flex-wrap mb-4">
                    <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-[9px] font-black uppercase rounded-lg">
                      {selectedPin.type}
                    </span>
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedPin.distanceKm} km away</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedPin.name}</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase max-w-sm">{selectedPin.location}</p>

                  <div className="flex items-center gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < Math.floor(selectedPin.rating) ? "text-orange-400 fill-orange-400" : "text-slate-200"}`}
                      />
                    ))}
                    <span className="text-xs text-slate-500 font-bold ml-1">({selectedPin.rating}) trust factor</span>
                  </div>

                  {/* Materials Supported */}
                  <div className="mt-6">
                    <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Materials accepted for consolidation</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPin.supportedMaterials.map((mat) => (
                        <span key={mat} className="p-1 px-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200/50">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Demand telemetry</span>
                      <span className={`text-sm font-extrabold ${selectedPin.demandLevel === "Extreme" ? "text-red-600" : selectedPin.demandLevel === "High" ? "text-orange-600" : "text-emerald-600"}`}>
                        🔥 {selectedPin.demandLevel} Category
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Reverse logistics</span>
                      <span className="text-sm font-extrabold text-slate-800">
                        {selectedPin.pickupAvailable ? "📦 Arranges Pickup" : "🏦 Dropoff only"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold">Hotline routing code</span>
                    <span className="font-mono text-slate-900 font-black">{selectedPin.contact}</span>
                  </div>

                  {scheduledSuccess ? (
                    <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-850 text-xs font-bold rounded-2xl text-center">
                      ✓ Instant Route schedules mapped to dispatch dashboard.
                    </div>
                  ) : (
                    <button
                      onClick={handleSchedulePickup}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs shadow-emerald-500/10"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Initiate Scheduled Drop-off Route</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center flex flex-col justify-center items-center h-full min-h-[300px]">
                <ShieldAlert className="w-10 h-10 text-slate-300 mb-3" />
                <h3 className="font-bold text-slate-800 text-base">Node Unmapped</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">Please select an operating pin on the spatial routing grid to view full physical details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
