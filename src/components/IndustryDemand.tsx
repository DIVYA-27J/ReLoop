import React, { useState } from "react";
import { IndustryRequirement } from "../types";
import { Factory, ShieldCheck, Mail, Pin, HelpCircle, CheckCircle, PlusCircle } from "lucide-react";

interface IndustryHubProps {
  requirements: IndustryRequirement[];
  onAddRequirement: (req: Omit<IndustryRequirement, "id" | "quantityFulfilledKg" | "status" | "postedAt">) => void;
  onFulfillContract: (requirementId: string, kgToFulfill: number) => void;
}

export default function IndustryHub({ requirements, onAddRequirement, onFulfillContract }: IndustryHubProps) {
  const [showForm, setShowForm] = useState(false);
  const [activeFulfillId, setActiveFulfillId] = useState<string | null>(null);
  const [fulfillWeight, setFulfillWeight] = useState<string>("50");
  const [company, setCompany] = useState("");
  const [needed, setNeeded] = useState("");
  const [category, setCategory] = useState("Plastic");
  const [targetMass, setTargetMass] = useState("");
  const [priceKg, setPriceKg] = useState("");
  const [loc, setLoc] = useState("");
  const [radius, setRadius] = useState("50");
  const [descr, setDescr] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !needed || !targetMass) return;

    onAddRequirement({
      companyName: company,
      location: loc || "Thane, Mumbai",
      pickupRadiusKm: Number(radius) || 50,
      materialNeeded: needed,
      category,
      quantityRequiredKg: Number(targetMass) || 1000,
      pricePerKg: `₹${priceKg}/kg`,
      description: descr || "Sourcing post-consumer consolidated circular material batches."
    });

    setCompany("");
    setNeeded("");
    setTargetMass("");
    setPriceKg("");
    setLoc("");
    setDescr("");
    setShowForm(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50" id="industry-hub-section">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Industry Feed & Sourcing Board</h1>
            <p className="text-slate-500 mt-1">Real-time procurement contracts. Discover high-volume material demands and secure bulk pricing agreements.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 bg-slate-900 text-white font-semibold rounded-2xl flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Post Procurement Requirement</span>
          </button>
        </div>

        {/* Post requirement form overlay */}
        {showForm && (
          <form onSubmit={handlePost} className="mb-8 p-6 bg-white border border-slate-200 rounded-3xl shadow-md animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Register Circular Sourcing Order</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Company / Facility Name</label>
                <input
                  type="text"
                  placeholder="e.g. Century Cardboard Mills"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-sm focus:outline-emerald-500"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Exact Material Specification</label>
                <input
                  type="text"
                  placeholder="e.g. Cleared PET-1 shredded flakes"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-sm focus:outline-emerald-500"
                  value={needed}
                  onChange={(e) => setNeeded(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Material Group</label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-sm focus:outline-emerald-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Plastic">Plastic</option>
                  <option value="Cardboard">Cardboard</option>
                  <option value="Metal">Metal</option>
                  <option value="Paper">Paper</option>
                  <option value="E-Waste">E-Waste</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Requested Load (kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-sm focus:outline-emerald-500"
                  value={targetMass}
                  onChange={(e) => setTargetMass(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Offered Base Price (INR/kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 18"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-sm focus:outline-emerald-500"
                  value={priceKg}
                  onChange={(e) => setPriceKg(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Factory Location</label>
                <input
                  type="text"
                  placeholder="e.g. Thane Complex, Mumbai"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-sm focus:outline-emerald-500"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Contract specifications description</label>
                <textarea
                  rows={3}
                  placeholder="Describe sorting criteria, moisture constraints, color sorting preferences, labeled adhesive limits..."
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-sm focus:outline-emerald-500"
                  value={descr}
                  onChange={(e) => setDescr(e.target.value)}
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 cursor-pointer"
                >
                  Publish Sourcing contract
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Industry boards listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {requirements.map((req) => {
            const pct = Math.min(100, Math.round((req.quantityFulfilledKg / req.quantityRequiredKg) * 100));
            return (
              <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 border border-slate-200">
                        <Factory className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base leading-snug">{req.companyName}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{req.category} Sourcing Specification</p>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${req.status === "Fulfilled" ? "bg-slate-100 text-slate-400" : req.status === "In-Progress" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                      {req.status}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-800 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono">
                     Seeking: <span className="text-emerald-700">{req.materialNeeded}</span>
                  </p>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed min-h-[50px] line-clamp-3">
                    {req.description}
                  </p>

                  {/* Supply progress track */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-semibold text-slate-600">
                      <span>Aggregation Progress</span>
                      <span>{req.quantityFulfilledKg.toLocaleString()} / {req.quantityRequiredKg.toLocaleString()} kg ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-4 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-extrabold block">Contract rate</span>
                      <span className="text-base font-black text-emerald-600">{req.pricePerKg}</span>
                    </div>

                    {req.status === "Fulfilled" ? (
                      <span className="text-slate-400 font-bold flex items-center gap-1 bg-slate-100 px-3 py-2 rounded-xl">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Contract Safely Fulfilled</span>
                      </span>
                    ) : activeFulfillId === req.id ? (
                      <button
                        onClick={() => setActiveFulfillId(null)}
                        className="px-3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveFulfillId(req.id);
                          setFulfillWeight("50");
                        }}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Sponsor Supply Dispatch</span>
                      </button>
                    )}
                  </div>

                  {/* Inline cargo dispatch builder form */}
                  {activeFulfillId === req.id && (
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 animate-fade-in space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700">Consolidated weight to dispatch (kg):</span>
                        <input
                          type="number"
                          value={fulfillWeight}
                          onChange={(e) => setFulfillWeight(e.target.value)}
                          className="w-20 p-1.5 border border-slate-200 bg-white rounded-lg text-center font-bold text-slate-800 focus:outline-emerald-500"
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                        <span>Expected Reward Earnings:</span>
                        <span className="font-bold text-emerald-600">
                          ₹{((parseInt(req.pricePerKg.replace(/\D/g, "")) || 18) * (Number(fulfillWeight) || 0)).toLocaleString()} INR
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const w = Number(fulfillWeight);
                          if (w > 0) {
                            onFulfillContract(req.id, w);
                            setActiveFulfillId(null);
                          }
                        }}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Execute Logistics Dispatch</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
