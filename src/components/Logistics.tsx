import React from "react";
import { RouteMetrics } from "../types";
import { Navigation, Truck, Zap, Percent, Clock, Route, CheckCircle2 } from "lucide-react";

interface LogisticsProps {
  routes: RouteMetrics[];
}

export default function Logistics({ routes }: LogisticsProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50" id="logistics-section">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reverse Logistics & Consolidation Router</h1>
          <p className="text-slate-500 mt-1">Simulate container pickups. Coordinate high-volume dispatches to reduce transportation fuel emissions.</p>
        </div>

        {/* Global Logistics Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Average Route Efficiency</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">94.2%</span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block font-bold">Optimized Fuel Grid</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Emissions Prevented (Transit)</span>
            <span className="text-3xl font-black text-blue-600 mt-1 block">1,660 kg</span>
            <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-2 inline-block font-bold">CO₂ Equivalents Saved</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Consolidated Mass Today</span>
            <span className="text-3xl font-black text-amber-600 mt-1 block">720 kg</span>
            <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-2 inline-block font-bold">Bulk Shipments Sorted</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-md">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Fleet Deployment</span>
            <span className="text-3.5xl font-black text-white mt-1 block">2 Rigs deployed</span>
            <span className="text-[10px] text-emerald-400 font-bold block mt-2">● Real-time GPS mapping active</span>
          </div>
        </div>

        {/* Dispatch routes grid list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {routes.map((rt) => (
            <div key={rt.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 border border-slate-200">
                      <Truck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{rt.driverName}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Autonomous pickup console code: {rt.id}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${rt.status === "Completed" ? "bg-slate-100 text-slate-400" : rt.status === "In-transit" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                    {rt.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-2 mb-6">
                  <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                    <span className="text-[8px] text-slate-400 uppercase tracking-widest font-black block">Consolidation</span>
                    <span className="text-xs font-bold text-slate-800">{rt.materialsConsolidatedKg} kg</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                    <span className="text-[8px] text-slate-400 uppercase tracking-widest font-black block">Est. Cost</span>
                    <span className="text-xs font-bold text-emerald-600">{rt.estimatedCost}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                    <span className="text-[8px] text-slate-400 uppercase tracking-widest font-black block">Logistics efficiency</span>
                    <span className="text-xs font-bold text-blue-600">{rt.routeEfficiency}%</span>
                  </div>
                </div>

                {/* Vertical Step Timeline representing route stops */}
                <div>
                  <h5 className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mb-3">Waypoint Schedule Sequence</h5>
                  <div className="space-y-4 relative pl-4 border-l border-slate-100 ml-2">
                    {rt.waypoints.map((wp, idx) => (
                      <div key={idx} className="relative text-xs">
                        {/* Dot indicator */}
                        <div className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 ${idx === rt.waypoints.length - 1 ? "bg-emerald-500 border-emerald-300 ring-4 ring-emerald-100" : "bg-slate-300 border-white"}`}></div>
                        <span className="font-bold text-slate-800 block text-xs">{wp}</span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">{idx === 0 ? "Initial Consolidation Loading" : idx === rt.waypoints.length - 1 ? "Drop-off Processing Yard" : `Scheduled Stop - Cargo Load`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer">
                  <Clock className="w-3.5 h-3.5" />
                  <span>View live Rig GPS telemetry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
