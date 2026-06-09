import React, { useState } from "react";
import { UserProfile, NotificationItem, ResourcePassport, MarketplaceListing } from "../types";
import { TRANSLATIONS, translatePostText, LanguageCode } from "../lib/translations";
import {
  Sprout, Award, HelpCircle, ShieldAlert, CheckCircle, TrendingUp,
  LineChart, Sparkles, User, Settings, AlertTriangle, ArrowRight,
  TrendingDown, Navigation, Calendar, Users, Briefcase, Upload,
  Search, Filter, Tag, Phone, Mail, Coins, Check, Receipt, Heart
} from "lucide-react";

interface DashboardProps {
  user: UserProfile;
  notifications: NotificationItem[];
  savedPassports: ResourcePassport[];
  onStartScanning: () => void;
  onNavigateToTab: (tab: string) => void;
  onClearNotifications: () => void;
  onUpdateUserProfile: (profile: UserProfile) => void;
  listings?: MarketplaceListing[];
  onAcceptOffer?: (listingId: string) => void;
  onSubmitProffer?: (listingId: string) => void;
  onMakeCustomOffer?: (listingId: string, offerValue: number, isPoints: boolean) => void;
  lang?: LanguageCode;
}

export default function Dashboard({
  user,
  notifications,
  savedPassports,
  onStartScanning,
  onNavigateToTab,
  onClearNotifications,
  onUpdateUserProfile,
  listings = [],
  onAcceptOffer,
  onSubmitProffer,
  onMakeCustomOffer,
  lang = "en"
}: DashboardProps) {
  const t = TRANSLATIONS[lang];
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  // Editable profile Form states
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editLocation, setEditLocation] = useState(user.location);
  const [editType, setEditType] = useState(user.type);
  const [editAvatar, setEditAvatar] = useState(user.avatar);
  const [editCustomUrl, setEditCustomUrl] = useState("");
  const [editUploadedBase64, setEditUploadedBase64] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Receiver-specific states
  const [selectedDashboardCategory, setSelectedDashboardCategory] = useState<string>("All");
  const [selectedDashboardAction, setSelectedDashboardAction] = useState<string>("All");
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState<string>("");
  const [selectedListingDetail, setSelectedListingDetail] = useState<MarketplaceListing | null>(null);
  const [dashboardCustomAmount, setDashboardCustomAmount] = useState<string>("500");
  const [dashboardIsPointsReward, setDashboardIsPointsReward] = useState<boolean>(false);
  const [dashboardRewardSuccess, setDashboardRewardSuccess] = useState<string>("");

  // Preset Avatars same as registration gateway
  const AVATAR_PRESETS = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  ];

  const handleOpenEdit = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditLocation(user.location);
    setEditType(user.type);
    setEditAvatar(user.avatar);
    setEditCustomUrl("");
    setEditUploadedBase64("");
    setUploadError("");
    setIsEditingProfile(true);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload image files only.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image size must be less than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setEditUploadedBase64(reader.result);
        setEditCustomUrl("");
        setUploadError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setUploadError("Name cannot be empty");
      return;
    }
    if (!editEmail.trim() || !editEmail.includes("@")) {
      setUploadError("Please provide a valid email");
      return;
    }
    if (!editLocation.trim()) {
      setUploadError("Location cannot be empty");
      return;
    }

    const finalAvatar = editUploadedBase64 || editCustomUrl.trim() || editAvatar;

    onUpdateUserProfile({
      ...user,
      name: editName.trim(),
      email: editEmail.trim(),
      location: editLocation.trim(),
      type: editType,
      avatar: finalAvatar
    });

    setIsEditingProfile(false);
  };

  // Math totals
  const treesSaved = Math.round(user.carbonSavedTotal / 22); // ~22kg of CO2 per year is absorbed by an adult tree
  const waterSavedLiters = Math.round(user.carbonSavedTotal * 4.5); // Simulating 4.5 liters of water saved per kg recycled

  // Identify if NGO / Recycler / Sourcing Industry
  const isReceiver = user.type === "ngo" || user.type === "recycler" || user.type === "industry";

  // Filter listings for the receiver dashboard sourcing grid
  const activeListings = listings || [];
  const filteredDashboardListings = activeListings.filter((item) => {
    // Only active listings
    if (item.status !== "Active") return false;

    // Filter by Category
    if (selectedDashboardCategory !== "All" && item.category !== selectedDashboardCategory) {
      return false;
    }

    // Filter by Action: Donations vs Sells
    if (selectedDashboardAction !== "All") {
      if (selectedDashboardAction === "Donations" && (item.action !== "Donate" && item.action !== "Free Pickup")) {
        return false;
      }
      if (selectedDashboardAction === "Commercial" && (item.action !== "Sell" && item.action !== "Exchange")) {
        return false;
      }
    }

    // Filter by Search Query
    if (dashboardSearchQuery.trim()) {
      const q = dashboardSearchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q) || item.material.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      const matchUser = item.listedBy.name.toLowerCase().includes(q);
      return matchTitle || matchLocation || matchUser;
    }

    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50" id="dashboard-section">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Block / Profile Level up status */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500 p-0.5 shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">{t.userTier}: {user.type}</span>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase rounded-lg">
                  {t.levelLabel} {user.level}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h2>
                <button
                  onClick={handleOpenEdit}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-extrabold uppercase rounded-lg border border-slate-250 transition-all cursor-pointer flex items-center gap-1 hover:shadow-xs"
                >
                  <Settings className="w-3.5 h-3.5 text-emerald-650" />
                  <span>{t.editProfile}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{user.location} • {t.activelyRecirculating}</p>
            </div>
          </div>

          <div className="flex gap-4 self-stretch md:self-auto justify-between md:justify-end">
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center flex-1 md:flex-none md:w-32">
              <span className="text-[9px] text-slate-400 uppercase font-black block">{t.circularityScore}</span>
              <span className="text-2xl font-black text-emerald-600 tracking-tight">{user.circularityScore}<span className="text-xs font-normal text-slate-500">/100</span></span>
            </div>

            {!isReceiver ? (
              <button
                onClick={onStartScanning}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{t.initiateScan}</span>
              </button>
            ) : (
              <a
                href="#receiver-sourcing-desk"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("receiver-sourcing-desk")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 text-emerald-150" />
                <span>{t.browseLivePostings}</span>
              </a>
            )}
          </div>
        </div>

        {/* Dynamic Sustainability Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">{t.carbonSalvaged}</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-3.5xl font-black text-slate-900">{user.carbonSavedTotal.toFixed(1)}</span>
                <span className="text-xs font-bold text-slate-400">kg CO₂</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-4 leading-normal bg-slate-50 p-2 rounded-lg border border-slate-100/50">
              {t.equivalentTo} <span className="font-bold text-emerald-700 font-mono">-{user.carbonSavedTotal.toFixed(1)}kg {t.greenhouseGas}</span> emission offsets.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">{t.forestGrowth}</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-3.5xl font-black text-emerald-600">🌳 {treesSaved}</span>
                <span className="text-xs font-bold text-slate-400">{t.adultTrees}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-4 leading-normal bg-slate-50 p-2 rounded-lg border border-slate-100/50">
              Represents mature oxygen production absorbency thresholds over 12 months.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">{t.waterSaved}</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-3.5xl font-black text-blue-600">🚰 {waterSavedLiters.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-400">{t.litersFresh}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-4 leading-normal bg-slate-50 p-2 rounded-lg border border-slate-100/50">
              Hydraulic conservation achieved by substituting virgin extraction steps.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">{t.revenueGenerated}</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-3.5xl font-black text-slate-900">₹{user.moneyEarnedTotal.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-400">{t.rupeesCash}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-4 leading-normal bg-slate-50 p-2 rounded-lg border border-slate-100/50 flex justify-between items-center">
              <span>Earnings secured from resource exchange listings.</span>
            </p>
          </div>
        </div>

        {/* Grid: Charts & Notifications alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Hand-crafted SVG charts (100% bulletproof compilation) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* SVG Cumulative Carbon Saved Line Chart */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">Cumulative Greenhouse Gas (CO₂) Saved</h3>
                  <p className="text-xs text-slate-400 leading-normal">Monthly metric reporting representing structural land conservation</p>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Continuous telemetry</span>
              </div>

              {/* Hand-drawn inline SVG Line Chart */}
              <div className="w-full h-[180px] bg-slate-50 rounded-2xl relative p-4 flex flex-col justify-between">
                <div className="absolute inset-x-4 top-1/2 h-px border-t border-dashed border-slate-200/80"></div>
                
                {/* SVG Polyline with filled gradient */}
                <svg className="w-full h-[120px] overflow-visible" strokeWidth="3" fill="none">
                  {/* Grid lines */}
                  <line x1="0" y1="120" x2="100%" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="80" x2="100%" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="40" x2="100%" y2="40" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.25)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <path d="M 0,110 L 100,100 L 200,80 L 300,55 L 400,30 L 500,18 L 500,120 L 0,120 Z" fill="url(#chartGrad)" />
                  {/* Main stroke */}
                  <path d="M 0,110 Q 50,105 100,100 Q 150,90 200,80 Q 250,67 300,55 Q 350,42 400,30 Q 450,24 500,18" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Points */}
                  <circle cx="100" cy="100" r="4" fill="#10b981" />
                  <circle cx="200" cy="80" r="4" fill="#10b981" />
                  <circle cx="300" cy="55" r="4" fill="#10b981" />
                  <circle cx="400" cy="30" r="4" fill="#10b981" />
                  <circle cx="500" cy="18" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                </svg>

                {/* X Axis monthly coordinates */}
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-2 mt-2">
                  <span>Jan (350kg)</span>
                  <span>Feb (512kg)</span>
                  <span>Mar (780kg)</span>
                  <span>Apr (1040kg)</span>
                  <span>May (1560kg)</span>
                  <span>Jun (1945kg)</span>
                </div>
              </div>
            </div>

            {/* Material breakdown list styled like elegant horizontal percentage bars */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">Active Material Stream Index</h3>
                  <p className="text-xs text-slate-400 leading-normal">Percentage distribution of materials diverted from incineration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Segment bars */}
                <div className="space-y-4">
                  {[
                    { label: "Plastic (PET-1 / HDPE)", value: "38%", mass: "345 kg", color: "bg-emerald-500" },
                    { label: "Corrugated Cardboard", value: "31%", mass: "280 kg", color: "bg-sky-500" },
                    { label: "Ferrous & Aluminium", value: "19%", mass: "195 kg", color: "bg-amber-500" },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1 font-semibold text-slate-700">
                        <span>{item.label}</span>
                        <span>{item.mass} ({item.value})</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Office Paper packaging", value: "12%", mass: "120 kg", color: "bg-indigo-500" },
                    { label: "E-Waste / Compute chips", value: "8%", mass: "85 kg", color: "bg-red-500" },
                    { label: "Cotton Canvas textiles", value: "6%", mass: "65 kg", color: "bg-yellow-500" },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1 font-semibold text-slate-700">
                        <span>{item.label}</span>
                        <span>{item.mass} ({item.value})</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Notifications & Badges progression */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Realtime Actionable notifications */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Stream Updates</h3>
                  {notifications.length > 0 && (
                    <button onClick={onClearNotifications} className="text-[10px] text-zinc-400 hover:text-emerald-600 font-bold hover:underline">
                      Mark read
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {notifications.map((not) => (
                    <div key={not.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 animate-pulse"></div>
                      <div className="leading-relaxed">
                        <p className="font-extrabold text-slate-800 leading-snug">{not.title}</p>
                        <p className="text-slate-500 mt-0.5 leading-normal text-[11px]">{not.message}</p>
                        <span className="text-[9px] text-slate-400 font-mono block mt-1">{not.time}</span>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-slate-400 text-xs italic text-center py-4">All alerts verified and read.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Badges and Milestones progressions */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Circular Milestones</h3>
              <div className="space-y-4">
                {user.impactBadges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex gap-3 hover:bg-slate-50 p-2.5 rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center border border-emerald-100 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="truncate flex-1">
                      <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase block">Earned Certificate</span>
                      <h4 className="font-bold text-sm text-slate-900 tracking-tight leading-none mt-0.5">{badge.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-1 truncate">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NGO & Waste Receiver Tailored Sourcing Desk */}
        {isReceiver && (
          <div id="receiver-sourcing-desk" className="bg-white border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden ring-4 ring-emerald-500/5 scroll-mt-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase rounded-full mb-2 border border-emerald-200">
                  <Receipt className="w-3 h-3 text-emerald-600" />
                  <span>{t.receiverSourcingHub}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.activeCircularPostings}</h3>
                <p className="text-xs text-slate-450 mt-0.5">{t.activeCircularPostingsDesc}</p>
              </div>

              {/* Quick stats on matched lots */}
              <div className="flex gap-4">
                <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-black block">{t.availableBatches}</span>
                  <span className="text-lg font-black text-slate-800">{activeListings.filter(l => l.status === "Active").length} {t.liveLots}</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl text-center">
                  <span className="text-[9px] text-emerald-600 uppercase font-black block">{t.freeDonations}</span>
                  <span className="text-lg font-black text-emerald-700">{activeListings.filter(l => l.status === "Active" && (l.action === "Donate" || l.action === "Free Pickup")).length} {t.free}</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                
                {/* Search Input */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={dashboardSearchQuery}
                    onChange={(e) => setDashboardSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 focus:outline-emerald-500"
                  />
                </div>

                {/* Contribution Type Filter Selector */}
                <div className="md:col-span-3">
                  <select
                    value={selectedDashboardAction}
                    onChange={(e) => setSelectedDashboardAction(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl text-slate-700 text-xs focus:outline-emerald-500 bg-white shadow-xs"
                  >
                    <option value="All">{t.allTransactionTypes}</option>
                    <option value="Donations">{t.donationsAndFree}</option>
                    <option value="Commercial">{t.commercialSourcing}</option>
                  </select>
                </div>

                {/* Category filters inside selection */}
                <div className="md:col-span-4 flex gap-1 bg-slate-250 p-1 rounded-xl">
                  {["All", "Plastic", "Paper", "Metal", "Glass", "E-Waste"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedDashboardCategory(cat)}
                      className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                        selectedDashboardCategory === cat ? "bg-emerald-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {cat === "All" ? (lang === "ta" ? "அனைத்தும்" : lang === "hi" ? "सभी" : lang === "te" ? "అన్నీ" : "All") : translatePostText(cat, lang)}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Postings Grid */}
            {filteredDashboardListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDashboardListings.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500/55 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Photo Header */}
                      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                        <img
                          src={item.photos && item.photos[0] ? item.photos[0] : "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=400"}
                          alt={translatePostText(item.title, lang)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-800 border border-slate-100 shadow-sm flex items-center gap-1">
                          <Tag className="w-3 h-3 text-emerald-500" />
                          <span className="capitalize">{translatePostText(item.category, lang)}</span>
                        </div>
                        <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-xl text-[10px] font-mono font-black text-white border border-white/10 shadow-sm">
                          {item.price === "Free" || item.price === "Free Donation" ? (lang === "ta" ? "🎁 இலவச நன்கொடை" : lang === "hi" ? "🎁 मुफ्त दान" : lang === "te" ? "🎁 ఉచిత విరాళం" : "🎁 FREE DONATION") : `${translatePostText(item.price, lang)}`}
                        </div>
                      </div>

                      <div className="p-5">
                        {/* Owner / Actor Row */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded-full overflow-hidden border border-emerald-500 p-0.2 shrink-0">
                            <img src={item.listedBy.avatar} alt={item.listedBy.name} className="w-full h-full object-cover rounded-full" />
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold truncate max-w-[130px]">{item.listedBy.name}</span>
                          <span className="text-[9px] text-emerald-600 tracking-wider font-extrabold uppercase bg-emerald-50 px-1.5 py-0.2 rounded-md">{item.listedBy.type}</span>
                        </div>

                        <h4 className="font-extrabold text-slate-900 tracking-tight text-base leading-tight mt-1 group-hover:text-emerald-700 transition-colors">
                          {translatePostText(item.title, lang)}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 font-mono italic">
                          {t.primaryMaterial}: {translatePostText(item.material, lang)}
                        </p>

                        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 font-sans">
                          <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                            <span className="text-[8px] text-slate-400 uppercase font-bold block">{t.lotQuantity}</span>
                            <span className="text-xs font-black text-slate-700">{translatePostText(item.quantity, lang)}</span>
                          </div>
                          <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                            <span className="text-[8px] text-slate-400 uppercase font-bold block">{t.nodeLocation}</span>
                            <span className="text-xs font-black text-slate-700 truncate block">{translatePostText(item.location, lang)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedListingDetail(item);
                          setDashboardRewardSuccess("");
                        }}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current text-white/90" />
                        <span>{t.inspectAndClaimLot}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center text-slate-500 font-medium">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-extrabold text-slate-705">{t.noMatchingPostings}</p>
                <p className="text-xs text-slate-400 mt-1">{t.trySelectingDifferent}</p>
              </div>
            )}
          </div>
        )}

        {/* ADMIN/METRICS CONTROL PANEL (Enterprise & Platform Analytics) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-slate-900">ReLoop Circular OS Metrics</h3>
              <p className="text-xs text-slate-400">Platform operational telemetry, actor validation, and network volume metrics.</p>
            </div>
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="text-xs font-bold text-emerald-700 hover:underline px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl cursor-pointer"
            >
              {showAdminPanel ? "Hide Operating Telemetry" : "Display Core Platform Metrics"}
            </button>
          </div>

          {showAdminPanel && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 animate-fade-in text-xs">
              <div className="space-y-2">
                <span className="font-extrabold text-slate-400 uppercase text-[10px] block">Network Participants & Actors</span>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-indigo-500" /> Individual citizens</span>
                    <span className="font-mono font-bold">142,400</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Apartment Societies</span>
                    <span className="font-mono font-bold">1,822</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-emerald-500" /> Decarbonizing Factories</span>
                    <span className="font-mono font-bold">482 partner buyers</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-extrabold text-slate-400 uppercase text-[10px] block">Global Diverted Tonnage</span>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl relative h-[78px] flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-xl font-black text-slate-800">12,410,250 kg</span>
                    <p className="text-[10px] text-emerald-600 mt-1">✓ Verified land diverts</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-extrabold text-slate-400 uppercase text-[10px] block">Intelligent Matching efficiency</span>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-center flex items-center justify-center h-[78px]">
                  <div>
                    <span className="text-2xl font-black text-emerald-600">97.8%</span>
                    <p className="text-[10px] text-slate-400">Match score precision average</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Node Profile Editing Settings Hand-drawn Overlay Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-[32px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 text-white relative shadow-2xl">
            
            {/* Close Button Button */}
            <button 
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full cursor-pointer transition-all"
            >
              <span className="text-sm font-bold">✕</span>
            </button>

            <div className="mb-6 mr-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold rounded-full mb-2 uppercase tracking-wider border border-emerald-500/20">
                <Settings className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>Configure Node Settings</span>
              </div>
              <h3 className="text-xl font-black text-slate-100 tracking-tight">Edit Circular Identity Node</h3>
              <p className="text-xs text-slate-400 mt-1">Refine your municipal operational parameter values on the ReLoop supply grid.</p>
            </div>

            {uploadError && (
              <div className="mb-4 p-3 bg-red-950/80 border border-red-500/35 text-rose-300 rounded-xl text-xs font-semibold">
                ⚠️ {uploadError}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-emerald-450 uppercase tracking-widest mb-1.5">Representative Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => { setEditName(e.target.value); setUploadError(""); }}
                  className="w-full p-3 border border-emerald-505/10 rounded-xl bg-white/5 text-white text-xs focus:outline-none focus:border-emerald-500 transition-all font-medium font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-emerald-450 uppercase tracking-widest mb-1.5">Administrative Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => { setEditEmail(e.target.value); setUploadError(""); }}
                  className="w-full p-3 border border-emerald-505/10 rounded-xl bg-white/5 text-white text-xs focus:outline-none focus:border-emerald-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-emerald-450 uppercase tracking-widest mb-1.5">Municipal Location Address</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => { setEditLocation(e.target.value); setUploadError(""); }}
                  className="w-full p-3 border border-emerald-505/10 rounded-xl bg-white/5 text-white text-xs focus:outline-none focus:border-emerald-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-emerald-450 uppercase tracking-widest mb-2">Circular Role Classification</label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as any)}
                  className="w-full p-3 border border-white/10 rounded-xl bg-slate-950 text-white text-xs focus:outline-none focus:border-emerald-500 transition-all font-medium"
                >
                  <option value="individual">Individual Resident (🏠)</option>
                  <option value="apartment">Apartment Society (🏢)</option>
                  <option value="school">Educational Campus / School (🎓)</option>
                  <option value="business">Local Business / Shop (☕)</option>
                  <option value="recycler">Certified Recycler & Collector (🌀)</option>
                  <option value="ngo">Ecological NGO (🌱)</option>
                  <option value="industry">Industrial Sourcing Buyer (🏭)</option>
                </select>
              </div>

              {/* Photo settings with device upload */}
              <div className="pt-3 border-t border-white/5">
                <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Upload Custom Avatar or Logo</label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f); }}
                    onClick={() => document.getElementById("edit-file-input")?.click()}
                    className={`border border-dashed rounded-xl p-3 text-center cursor-pointer transition-all flex flex-col items-center justify-center bg-white/5 ${
                      isDragging ? "border-emerald-400 bg-emerald-500/10" : "border-white/10 hover:border-emerald-500/30"
                    }`}
                  >
                    <input 
                      type="file" 
                      id="edit-file-input" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} 
                    />
                    {editUploadedBase64 ? (
                      <div className="flex flex-col items-center gap-1.5">
                        <img src={editUploadedBase64} alt="Pre" className="w-10 h-10 rounded-full object-cover border border-emerald-500" />
                        <span className="text-[9px] text-emerald-300 font-bold">Device Image Loaded OK</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-4 h-4 mx-auto text-emerald-500 animate-bounce" />
                        <span className="text-slate-200 text-[11px] font-bold block">Drag file or Click</span>
                        <span className="text-[9px] text-slate-500 block">PNG, JPG (Max 2MB)</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[9px] text-slate-500 font-bold mb-1">OR Paste Image Link</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={editCustomUrl}
                        onChange={(e) => { setEditCustomUrl(e.target.value); setEditUploadedBase64(""); }}
                        className="w-full p-2 border border-emerald-500/10 rounded-lg bg-white/5 text-white text-[11px] focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Preset visual selector buttons */}
                    <div className="flex gap-2 items-center justify-center">
                      {AVATAR_PRESETS.map((p, idx) => {
                        const isSelected = editAvatar === p && !editUploadedBase64 && !editCustomUrl;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => { setEditAvatar(p); setEditUploadedBase64(""); setEditCustomUrl(""); }}
                            className={`w-8 h-8 rounded-full overflow-hidden p-0.5 border transition-all cursor-pointer ${
                              isSelected ? "border-emerald-500 scale-105" : "border-white/10 hover:border-emerald-500"
                            }`}
                          >
                            <img src={p} alt="Preset avatar" className="w-full h-full object-cover rounded-full pointer-events-none" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Handlers */}
              <div className="pt-4 border-t border-white/5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-bold rounded-xl cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-all text-center"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sourcing Modal for Receiver claims */}
      {selectedListingDetail && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-[32px] max-w-2xl w-full max-h-[92vh] overflow-y-auto text-white shadow-2xl relative flex flex-col">
            
            {/* Banner of Sourcing Resource */}
            <div className="relative h-44 w-full bg-slate-100/10 shrink-0">
              <img 
                src={selectedListingDetail.photos && selectedListingDetail.photos[0] ? selectedListingDetail.photos[0] : "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=400"} 
                alt={translatePostText(selectedListingDetail.title, lang)} 
                className="w-full h-full object-cover opacity-75" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedListingDetail(null)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white p-2 md:p-2.5 rounded-full cursor-pointer transition-all border border-white/10 z-10"
              >
                <span className="text-sm font-bold block leading-none px-1">✕</span>
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-[9px] font-black uppercase rounded-lg tracking-wide inline-block">
                  {translatePostText(selectedListingDetail.category, lang)}
                </span>
                <h3 className="text-2xl font-black text-white mt-1.5 tracking-tight">{translatePostText(selectedListingDetail.title, lang)}</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              {dashboardRewardSuccess && (
                <div className="bg-emerald-950/95 border-2 border-emerald-500 text-emerald-300 p-4 rounded-2xl text-xs font-bold flex flex-col gap-1.5 leading-relaxed">
                  <span className="flex items-center gap-1.5 text-base">💚 {dashboardRewardSuccess}</span>
                  <p className="text-[11px] text-emerald-200 font-normal">Your circular claim interest has been registered immediately. The Giver will be notified to begin the handover dispatch. Contact them directly to coordinate transport!</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Giver profile info */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block mb-1">{t.sourceGiverNode}</span>
                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
                      <img src={selectedListingDetail.listedBy.avatar} alt="Giver avatar" className="w-12 h-12 rounded-full object-cover border border-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-extrabold text-sm truncate text-white">{selectedListingDetail.listedBy.name}</p>
                        <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 bg-white/5 rounded-md inline-block uppercase mt-0.5">
                          {selectedListingDetail.listedBy.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[9px] text-slate-500 font-bold block uppercase">{t.batchWeight}</span>
                      <p className="text-sm font-black text-emerald-450 mt-1">{translatePostText(selectedListingDetail.quantity, lang)}</p>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[9px] text-slate-500 font-bold block uppercase">{t.listedValue}</span>
                      <p className="text-sm font-black text-indigo-400 mt-1">
                        {selectedListingDetail.price === "Free" || selectedListingDetail.price === "Free Donation" 
                          ? (lang === "ta" ? "இலவச நன்கொடை" : lang === "hi" ? "मुफ्त दान" : lang === "te" ? "ఉచిత విరాళం" : "Free Donation") 
                          : translatePostText(selectedListingDetail.price, lang)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/25">
                    <span className="text-[9px] text-emerald-400 font-black block uppercase tracking-widest">{t.expectedProcurementOutcome}</span>
                    <h4 className="text-sm font-black text-emerald-300 mt-1 flex items-center gap-1.5">
                      <Sprout className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>{translatePostText(selectedListingDetail.material, lang)} {t.loopSourcing}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                      {t.expectedProcurementDesc}
                    </p>
                  </div>
                </div>

                {/* Logistics Guidelines and contact detail column */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest block mb-1">{t.instructionsGuidelines}</span>
                    <div className="p-3 bg-slate-950 border border-white/5 rounded-xl text-[11px] text-slate-300 leading-relaxed font-mono whitespace-pre-line max-h-36 overflow-y-auto">
                      {translatePostText(selectedListingDetail.instructions || "1. Clean thoroughly before handover.\n2. Do not stack with humid organic waste.\n3. Arrange direct pickup or request municipal courier drop-off.", lang)}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block mb-1.5 font-mono">{t.logisticsContact}</span>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-200">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono font-bold tracking-tight">{selectedListingDetail.contactInfo || "+91 91764 21890 (Direct Line)"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-300">
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="underline truncate select-all">{selectedListingDetail.listedBy.name.toLowerCase().replace(/\s+/g, '')}@reloopgrid.org</span>
                      </div>
                      <div className="py-1 px-2.5 bg-white/5 rounded-lg text-slate-450 text-[10px]">
                        📍 {t.nodeLocation}: {translatePostText(selectedListingDetail.location, lang)}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Reward and Procurement actions */}
              <div className="pt-6 border-t border-white/10">
                <div className="bg-slate-950 p-5 rounded-[24px] border border-emerald-500/20 relative overflow-hidden">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h4 className="text-base font-black text-slate-100 tracking-tight">{t.expressClaimInterest}</h4>
                      <p className="text-[11.5px] text-slate-400">{t.offerCompensationPoints}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl shrink-0">
                      <button
                        type="button"
                        onClick={() => setDashboardIsPointsReward(false)}
                        className={`px-3 py-1 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all ${!dashboardIsPointsReward ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        {t.payoutCash}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDashboardIsPointsReward(true)}
                        className={`px-3 py-1 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all ${dashboardIsPointsReward ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        {t.payoutPoints}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-black mb-1.5">{t.payoutAmount}</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2 text-sm font-bold text-emerald-400">
                          {dashboardIsPointsReward ? "🪙" : "₹"}
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={dashboardCustomAmount}
                          onChange={(e) => setDashboardCustomAmount(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-black text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Quick values presets */}
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase font-bold text-left mb-1.5">{t.quickValues}</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {(dashboardIsPointsReward ? ["50", "150", "300", "500"] : ["100", "300", "500", "1000"]).map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setDashboardCustomAmount(v)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${dashboardCustomAmount === v ? "bg-emerald-500 text-white" : "bg-white/5 hover:bg-white/10 text-slate-350"}`}
                          >
                            {dashboardIsPointsReward ? `${v} RP` : `₹${v}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button button */}
                  <div className="mt-4 flex gap-3">
                    {onMakeCustomOffer && (
                      <button
                        type="button"
                        onClick={() => {
                          const val = parseInt(dashboardCustomAmount) || 0;
                          onMakeCustomOffer(selectedListingDetail.id, val, dashboardIsPointsReward);
                          setDashboardRewardSuccess(
                            dashboardIsPointsReward 
                              ? `Offered +${val} Circular Reward Points to Giver!` 
                              : `Sent ₹${val} INR compensation offer down the grid!`
                          );
                        }}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
                      >
                        <Coins className="w-4 h-4 text-emerald-200" />
                        <span>{t.compensationPayout}</span>
                      </button>
                    )}

                    {onAcceptOffer && (
                      <button
                        type="button"
                        onClick={() => {
                          onAcceptOffer(selectedListingDetail.id);
                          setDashboardRewardSuccess("Claim successful! Resource lot is now secured & marked closed.");
                          setTimeout(() => {
                            setSelectedListingDetail(null);
                          }, 2000);
                        }}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
                      >
                        <Check className="w-4 h-4 text-indigo-200 animate-bounce" />
                        <span>{t.claimAndSecureLot}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Close controls */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedListingDetail(null)}
                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 text-slate-400 text-xs font-bold rounded-xl cursor-pointer transition-all"
                >
                  {t.closeSourcingView}
                </button>
                {onSubmitProffer && selectedListingDetail.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() => {
                      onSubmitProffer(selectedListingDetail.id);
                      setDashboardRewardSuccess("Quick Procurement Proffer catalogued!");
                    }}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl cursor-pointer transition-all text-center"
                  >
                    {t.quickProfferPinned}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
