import React, { useState } from "react";
import { CommunityPool } from "../types";
import { Building2, Award, Zap, ChevronRight, FileSpreadsheet, PlusCircle, ArrowUpRight } from "lucide-react";

interface CommunityPoolsProps {
  pools: CommunityPool[];
  onAddPoolContribution: (poolId: string, kgContribution: number) => void;
}

export default function CommunityPools({ pools, onAddPoolContribution }: CommunityPoolsProps) {
  const [selectedPool, setSelectedPool] = useState<CommunityPool | null>(pools[0] || null);
  const [contribAmount, setContribAmount] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contribAmount || isNaN(Number(contribAmount)) || !selectedPool) return;

    const kg = Number(contribAmount);
    onAddPoolContribution(selectedPool.id, kg);

    // Update local visual state
    setSelectedPool({
      ...selectedPool,
      totalCollectedKg: selectedPool.totalCollectedKg + kg,
      carbonSavedKg: selectedPool.carbonSavedKg + Math.round(kg * 3.2),
      earningsInr: selectedPool.earningsInr + Math.round(kg * 12)
    });

    setSuccessMsg(`Deposited ${kg}kg in pool supply corridor! Circularity scores recalibrated (+15 XP)`);
    setContribAmount("");
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50" id="community-pools-section">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Community Collection Pools</h1>
          <p className="text-slate-500 mt-1">Aggregate localized materials into high-purity industrial supply streams to activate premium bulk rates.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Pools Sidebar Leaderboard */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span>Consolidated Depot Hubs</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </h3>

              <div className="space-y-3">
                {pools.map((p) => {
                  const isSelected = selectedPool?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPool(p);
                        setSuccessMsg(null);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between cursor-pointer transition-all ${isSelected ? "bg-emerald-900 border-emerald-900 text-white shadow-sm" : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"}`}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-emerald-800 text-white" : "bg-emerald-50 text-emerald-600"}`}>
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div className="truncate pr-1">
                          <p className="font-bold text-sm tracking-tight truncate">{p.name}</p>
                          <p className={`text-[10px] mt-0.5 ${isSelected ? "text-emerald-200" : "text-slate-400"} truncate`}>{p.location} • {p.membersCount} members</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700 font-bold"}`}>
                          Rank {p.rank}
                        </span>
                        <p className="text-xs font-black mt-1.5">{p.totalCollectedKg} kg</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* General community advice box */}
            <div className="bg-sky-950 border border-sky-900 rounded-3xl p-6 text-white shadow-lg">
              <span className="px-2 py-0.5 bg-sky-850 border border-sky-800 rounded text-[9px] font-bold uppercase tracking-wider">Circular pooling methodology</span>
              <h4 className="text-lg font-bold text-sky-100 mt-2">Why aggregate with neighbors?</h4>
              <p className="text-sky-200 text-xs mt-1 leading-relaxed">
                Industries procure raw inputs at scale. While a household's 3kg bucket represents small salvage, pooling 1,000kg from a co-op lets ReLoop dispatch an optimized heavy transport rig, unlocking better exchange rates for everyone.
              </p>
            </div>
          </div>

          {/* Active Pool Panel */}
          <div className="lg:col-span-7">
            {selectedPool ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between h-full animate-fade-in">
                <div>
                  <div className="flex justify-between items-start pb-6 border-b border-slate-100 flex-wrap gap-4">
                    <div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded uppercase tracking-wider">
                        {selectedPool.type} Aggregation Hub
                      </span>
                      <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedPool.name}</h2>
                      <p className="text-slate-400 text-xs mt-0.5">{selectedPool.location}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-right">
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black block">Active Yield Shared</span>
                      <span className="text-lg font-black text-emerald-600">₹{selectedPool.earningsInr.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Pool Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Consolidated mass</span>
                      <p className="text-xl font-black text-slate-800 mt-1">{selectedPool.totalCollectedKg} kg</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Atmospheric offset</span>
                      <p className="text-xl font-black text-blue-600 mt-1">{selectedPool.carbonSavedKg} kg CO₂</p>
                    </div>
                    <div className="bg-slate-100 p-4 border border-slate-200 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Leader board MVP</span>
                      <p className="text-[10px] font-bold text-slate-800 truncate mt-1">{selectedPool.topContributor.split(" (")[0]}</p>
                    </div>
                  </div>

                  {/* Material composition Breakdown */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category distribution breakdown</h4>
                    <div className="flex h-5 w-full bg-slate-100 rounded-xl overflow-hidden font-bold">
                      {selectedPool.categoryBreakdown.map((item, idx) => {
                        const colors = ["bg-emerald-500", "bg-sky-500", "bg-amber-500", "bg-purple-500"];
                        return (
                          <div
                            key={idx}
                            className={`${colors[idx % colors.length]} text-white text-[8px] flex items-center justify-center`}
                            style={{ width: `${item.value}%` }}
                            title={`${item.category}: ${item.value}%`}
                          >
                            {item.value > 10 ? `${item.category}` : ""}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contribution Deposit corridor form */}
                  <form onSubmit={handleContribute} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                    <p className="text-xs font-bold text-slate-700">Contribute material to this pool</p>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="number"
                        placeholder="Quantity in kg (e.g. 12)"
                        className="p-2.5 border border-slate-200 rounded-xl text-slate-700 bg-white text-sm focus:outline-emerald-500 flex-1"
                        value={contribAmount}
                        onChange={(e) => setContribAmount(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Log Batch Deposit</span>
                      </button>
                    </div>

                    {successMsg && (
                      <p className="mt-3 text-emerald-800 font-bold text-[11px] animate-pulse bg-emerald-100 p-2 rounded-lg border border-emerald-200">
                        {successMsg}
                      </p>
                    )}
                  </form>

                  {/* Recent pickups history inside this pool */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Validated physical consolidation history</h4>
                    <div className="space-y-2">
                      {selectedPool.recentPickups.map((pick, idx) => (
                        <div key={idx} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-700">
                          <div>
                            <span className="font-bold text-slate-800">{pick.material} ({pick.quantity})</span>
                            <p className="text-[10px] text-slate-400 mt-0.5">Dispatched to: {pick.destination}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono font-bold shrink-0">{pick.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center flex flex-col justify-center items-center h-full min-h-[300px]">
                <p className="text-slate-400 text-sm">Please register or select an active co-op pool network.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
