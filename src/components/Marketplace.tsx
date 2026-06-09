import React, { useState } from "react";
import { Search, Plus, Filter, Tag, Navigation, ShieldCheck, Heart, Trash2, ArrowRight, CheckCircle, Award, Volume2, Coins, Phone, Mail } from "lucide-react";
import { MarketplaceListing, UserType } from "../types";

interface MarketplaceProps {
  listings: MarketplaceListing[];
  onAddListing: (listing: Omit<MarketplaceListing, "id" | "listedBy" | "createdAt" | "status" | "offersCount"> & {
    intendedOutcome?: string;
    instructions?: string;
    contactInfo?: string;
  }) => void;
  currentUserType: UserType;
  currentUserName: string;
  currentUserProfileId: string;
  onAcceptOffer: (listingId: string) => void;
  onSubmitProffer: (listingId: string) => void;
  onDeleteListing: (listingId: string) => void;
  onMakeCustomOffer: (listingId: string, offerValue: number, isPoints: boolean) => void;
}

const CATEGORIES = [
  "Plastic", "Paper", "Cardboard", "Glass", "Metal", "E-Waste", "Furniture", "Textiles", "Construction"
];

export default function Marketplace({
  listings,
  onAddListing,
  currentUserType,
  currentUserName,
  currentUserProfileId,
  onAcceptOffer,
  onSubmitProffer,
  onDeleteListing,
  onMakeCustomOffer
}: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedAction, setSelectedAction] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Detail Modal view and payout state
  const [selectedItem, setSelectedItem] = useState<MarketplaceListing | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("500");
  const [isPointsReward, setIsPointsReward] = useState<boolean>(false);
  const [rewardSuccessMsg, setRewardSuccessMsg] = useState<string>("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("Plastic");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState<any>("Good");
  const [pickupAvailability, setPickupAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [action, setAction] = useState<any>("Sell");
  const [price, setPrice] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  // Target Giver-Buyer Fields
  const [intendedOutcome, setIntendedOutcome] = useState<any>("Recycle");
  const [instructions, setInstructions] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !quantity || !location) return;

    onAddListing({
      title,
      category,
      material: `${category} resource base`,
      quantity,
      condition,
      photos: [photoUrl || "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=300"],
      pickupAvailability,
      location,
      action,
      price: action === "Donate" || action === "Free Pickup" ? "Free" : price || "₹100",
      intendedOutcome: intendedOutcome || "Recycle",
      instructions: instructions || "Sort at source properly",
      contactInfo: contactInfo || "Direct Chat Node Contact",
    });

    // Reset Form
    setTitle("");
    setQuantity("");
    setPickupAvailability("");
    setLocation("");
    setPrice("");
    setPhotoUrl("");
    setIntendedOutcome("Recycle");
    setInstructions("");
    setContactInfo("");
    setShowAddForm(false);
  };

  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesAction = selectedAction === "All" || item.action === selectedAction;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAction && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50" id="marketplace-section">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Circular Resource Marketplace</h1>
            <p className="text-slate-500 mt-1">Safeguard value. Circulate sorted materials to trusted recyclers, manufacturers, and NGOs.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-3 bg-slate-900 text-white font-semibold rounded-2xl flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>List New Material</span>
          </button>
        </div>

        {/* Add Listing Modal Form overlay */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-white border border-slate-200 rounded-3xl shadow-md animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Plus className="text-emerald-500" />
              <span>Register Material Batch on the Supply Grid</span>
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Resource Name</label>
                <input
                  type="text"
                  placeholder="e.g. Flattened Cardboard OCC 11 Bundle"
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Resource Category</label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Estimated Weight / Volume</label>
                <input
                  type="text"
                  placeholder="e.g. 15 kg, 40 meters, 120 Units"
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 font-semibold">Quality Condition</label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                >
                  <option value="New">Pristine / Unused</option>
                  <option value="Good">Sorted / High Integrity</option>
                  <option value="Fair">Mixed Sort / Average</option>
                  <option value="Repurposed">Repurposed</option>
                  <option value="Damaged">Damaged / High Refining Required</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Intended Exchange Method</label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={action}
                  onChange={(e) => setAction(e.target.value as any)}
                >
                  <option value="Sell">Sell (Market Rate/Bulk Offer)</option>
                  <option value="Donate">NGO Donation</option>
                  <option value="Exchange">Material Exchange Agreement</option>
                  <option value="Free Pickup">Free Logistics Pickup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Exchange Price / Terms</label>
                <input
                  type="text"
                  placeholder="e.g. ₹15/kg, or Free"
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={action === "Donate" || action === "Free Pickup"}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Location Details</label>
                <input
                  type="text"
                  placeholder="e.g. Bandra West, Mumbai"
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Logistics Pickup availability</label>
                <input
                  type="text"
                  placeholder="e.g. Weekends 10 AM - 5 PM"
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={pickupAvailability}
                  onChange={(e) => setPickupAvailability(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 font-sans">Representative Photo (Unsplash link / Empty)</label>
                <input
                  type="text"
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Intended Circular Outcome</label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={intendedOutcome}
                  onChange={(e) => setIntendedOutcome(e.target.value as any)}
                >
                  <option value="Sell">Sell / Commercial Payout</option>
                  <option value="Reuse">Reuse directly (Closed loop)</option>
                  <option value="Recycle">Recycle & Melt down</option>
                  <option value="Dispose">Eco-friendly disposal lookup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Direct Contact Information</label>
                <input
                  type="text"
                  placeholder="e.g. email@domain.com or +91 98765 43210"
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Circular Processing / Storage Instructions</label>
                <textarea
                  placeholder="Specify exactly how the buyer should collect, transport, or melt down this waste. E.g. Keep dry, stack horizontally, do not pack in synthetic ties."
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-emerald-500 bg-slate-50/50 h-20 resize-none"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 cursor-pointer animate-pulse"
                >
                  Publish to Grid
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between text-sm shadow-xs">
          <div className="flex items-center gap-2 w-full md:w-1/3 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/30">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search circular materials..."
              className="w-full bg-transparent border-none text-slate-700 focus:outline-hidden"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Sort:</span>
            </span>
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedCategory === "All" ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-slate-50 hover:bg-slate-100 border-slate-200"} border transition-all cursor-pointer`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedCategory === cat ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-slate-50 hover:bg-slate-100 border-slate-200"} border transition-all cursor-pointer`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
            {["All", "Sell", "Donate", "Exchange", "Free Pickup"].map((act) => (
              <button
                key={act}
                onClick={() => setSelectedAction(act)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${selectedAction === act ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group">
                {/* Clicking on upper part reveals detailed circular protocol */}
                <div onClick={() => { setSelectedItem(item); setRewardSuccessMsg(""); }} className="cursor-pointer flex-1">
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <img
                      src={item.photos[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-800 border border-slate-100 shadow-sm flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-emerald-500" />
                      <span>{item.category}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase text-white ${item.action === "Sell" ? "bg-emerald-600" : item.action === "Donate" ? "bg-indigo-600" : item.action === "Exchange" ? "bg-amber-600" : "bg-teal-600"}`}>
                        {item.action}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-slate-950 text-white">
                        {item.price}
                      </span>
                    </div>

                    {item.matchScore && (
                      <div className="absolute top-3 right-3 bg-emerald-600 font-bold text-white text-[10px] py-1 px-2.5 rounded-xl shadow-xs">
                        {item.matchScore}% Circular Match
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-emerald-500 p-0.2 shrink-0">
                        <img src={item.listedBy.avatar} alt={item.listedBy.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold truncate max-w-[130px]">{item.listedBy.name}</span>
                      <span className="text-[9px] text-emerald-600 tracking-wider font-extrabold uppercase bg-emerald-50 px-1.5 py-0.2 rounded-md">{item.listedBy.type}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 tracking-tight text-base leading-tight mt-1 hover:text-emerald-700 transition-colors">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono italic">Primary Compound: {item.material}</p>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-50">
                      <div>
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">Aggregate mass</span>
                        <p className="text-xs font-bold text-slate-800">{item.quantity}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">Sort integrity</span>
                        <p className="text-xs font-bold text-amber-700">{item.condition} Rank</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <Navigation className="w-3 h-3 text-emerald-500" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Card Action Footer */}
                <div className="p-5 pt-0 mt-auto">
                  <div className="flex justify-between items-center bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100 mb-4 text-xs">
                    <span className="text-slate-400">Logistics Availability</span>
                    <span className="font-bold text-slate-700 truncate max-w-[120px]">{item.pickupAvailability || "Upon Arrangement"}</span>
                  </div>

                  {item.status === "Completed" ? (
                    <div className="w-full py-2.5 bg-emerald-50 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                      <CheckCircle className="w-4 h-4 text-emerald-600 animate-bounce" />
                      <span>Material Transacted ✓ (Closed)</span>
                    </div>
                  ) : item.listedBy.id === currentUserProfileId ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onAcceptOffer(item.id)}
                        className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>Transact & Close Lot</span>
                      </button>
                      <button
                        onClick={() => onDeleteListing(item.id)}
                        className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setSelectedItem(item); setRewardSuccessMsg(""); }}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wide flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                      >
                        <span>Inspect circular guidelines</span>
                      </button>
                      <button
                        onClick={() => onSubmitProffer(item.id)}
                        className="px-2.5 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-850 text-[10px] font-bold rounded-xl transition-all cursor-pointer"
                        title="Quick Bid / Proffer"
                      >
                        Proffer ({item.offersCount})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-slate-400 font-medium">No material batches list found matching current filter context.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSelectedAction("All"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-200 cursor-pointer"
            >
              Clear Filtering
            </button>
          </div>
        )}

        {/* Circular Protocol & Handover Reward Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-[32px] max-w-2xl w-full max-h-[92vh] overflow-y-auto text-white shadow-2xl relative flex flex-col">
              
              {/* Image banner of resource */}
              <div className="relative h-44 w-full bg-slate-950 shrink-0">
                <img src={selectedItem.photos[0]} alt={selectedItem.title} className="w-full h-full object-cover opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-905 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white p-2.5 rounded-full cursor-pointer transition-all border border-white/10"
                >
                  <span className="text-sm font-bold">✕</span>
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-[9px] font-black uppercase rounded-lg tracking-wide">
                    {selectedItem.category} resource
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1.5 tracking-tight">{selectedItem.title}</h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                {rewardSuccessMsg && (
                  <div className="bg-emerald-950/90 border-2 border-emerald-500 text-emerald-300 p-4 rounded-2xl text-xs font-bold flex flex-col gap-1.5 animate-bounce">
                    <span className="flex items-center gap-1.5 text-base">💚 {rewardSuccessMsg}</span>
                    <p className="text-[11px] text-slate-300 font-normal">Congratulations! Your reward deposit contribution has been securely logged on the municipal ledger, and the Giver has been notified.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Giver info column */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block mb-2">Node Waste Giver</span>
                      <div className="bg-slate-950 p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
                        <img src={selectedItem.listedBy.avatar} alt="Giver logo" className="w-12 h-12 rounded-full object-cover border border-emerald-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-extrabold text-sm truncate">{selectedItem.listedBy.name}</p>
                          <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 bg-white/5 rounded-md inline-block uppercase mt-0.5">
                            {selectedItem.listedBy.type || "Citizen"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                        <span className="text-[9px] text-slate-550 font-bold block uppercase">Est. Batch Weight</span>
                        <p className="text-sm font-black text-emerald-450 mt-1">{selectedItem.quantity}</p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                        <span className="text-[9px] text-slate-550 font-bold block uppercase">Sort Reputation</span>
                        <p className="text-sm font-black text-indigo-400 mt-1">{selectedItem.condition} Integrity</p>
                      </div>
                    </div>

                    {/* Intended Outcome / Method */}
                    <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                      <span className="text-[9px] text-emerald-400 font-black block uppercase tracking-widest">Intended Process Pathway</span>
                      <h4 className="text-base font-black text-emerald-300 mt-1 flex items-center gap-2">
                        <Award className="w-4.5 h-4.5 text-emerald-400 animate-spin" />
                        <span>How waste must be treated: {selectedItem.intendedOutcome || "Recycled / Repurposed"}</span>
                      </h4>
                      <p className="text-[11px] text-slate-350 mt-1.5 leading-relaxed">
                        The Giver specifically demands that this batch of materials remains within the circular path to prevent landfill contamination.
                      </p>
                    </div>
                  </div>

                  {/* Instructions and contacts column */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] text-indigo-450 font-bold uppercase tracking-widest block mb-1">Giver Handling Instructions</span>
                      <div className="p-3.5 bg-slate-950 border border-white/5 rounded-2xl text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line max-h-36 overflow-y-auto">
                        {selectedItem.instructions || "1. Clean thoroughly at source.\n2. Keep away from water moisture.\n3. Wrap securely during municipal transport."}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block mb-2 font-mono">Handover Logistics Contact</span>
                      <div className="bg-slate-950 p-3.5 rounded-2xl border border-white/5 space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-mono font-bold tracking-tight">{selectedItem.contactInfo || "Direct Dial: +91 91234 56780"} [Giver Node]</span>
                        </div>
                        <div className="flex items-center gap-2 text-indigo-300">
                          <Mail className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="underline truncate select-all">{selectedItem.listedBy.name.toLowerCase().replace(/\s+/g, '')}@reloopgrid.org</span>
                        </div>
                        <div className="py-1 px-2.5 bg-white/5 rounded-lg text-slate-450 text-[10px]">
                          📍 Listed Node Location: {selectedItem.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monetary Cash or Reward Point Incentives Console block */}
                <div className="pt-6 border-t border-white/10">
                  <div className="bg-slate-950 p-5 rounded-[24px] border-2 border-emerald-500/25 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-100 tracking-tight">Proffer Rewards / Financial Compensation</h4>
                        <p className="text-[11.5px] text-slate-450 mt-0.5">If this waste batch is valuable for your operations, reward the Giver node.</p>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl shrink-0">
                        <button
                          type="button"
                          onClick={() => setIsPointsReward(false)}
                          className={`px-3 py-1 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all ${!isPointsReward ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                          ₹ Cash (INR)
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPointsReward(true)}
                          className={`px-3 py-1 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all ${isPointsReward ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                          RP (Points)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-black mb-1.5">Enter Compensating Amount</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-base font-bold text-emerald-400">
                            {isPointsReward ? "🪙" : "₹"}
                          </span>
                          <input
                            type="number"
                            min="1"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm font-black text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Presets */}
                      <div>
                        <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1.5">Quick values</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {(isPointsReward ? ["50", "150", "300", "500"] : ["100", "300", "500", "1000"]).map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setCustomAmount(v)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${customAmount === v ? "bg-emerald-500 text-white border-emerald-400" : "bg-white/5 hover:bg-white/10 text-slate-350"}`}
                            >
                              {isPointsReward ? `${v} RP` : `₹${v}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Authorize button */}
                    <button
                      type="button"
                      onClick={() => {
                        const val = parseInt(customAmount) || 0;
                        if (val <= 0) return;
                        onMakeCustomOffer(selectedItem.id, val, isPointsReward);
                        setRewardSuccessMsg(isPointsReward ? `Successfully transferred +${val} Circular Reward Points!` : `Successfully sent ₹${val} INR Monetary compensation offer!`);
                        setCustomAmount("500");
                      }}
                      className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                    >
                      <Coins className="w-4 h-4 text-yellow-350 animate-bounce" />
                      <span>Authorize circular payout & Commit handover</span>
                    </button>
                  </div>
                </div>

                {/* Submitting Proffer or Closing */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 py-3 border border-white/10 hover:bg-white/5 text-slate-350 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Close Protocol View
                  </button>
                  {selectedItem.status !== "Completed" && (
                    <button
                      type="button"
                      onClick={() => {
                        onSubmitProffer(selectedItem.id);
                        setRewardSuccessMsg("Quick proffer bid submitted cleanly!");
                      }}
                      className="flex-1 py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Quick Submit Proffer Bids
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
