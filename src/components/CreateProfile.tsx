import React, { useState, useRef } from "react";
import { UserType, UserProfile } from "../types";
import { TRANSLATIONS, LanguageCode } from "../lib/translations";
import { 
  User, Mail, Navigation, Sparkles, Sprout, ArrowRight, 
  ShieldCheck, Heart, Upload, Link as LinkIcon, Check, RefreshCw 
} from "lucide-react";

interface CreateProfileProps {
  onProfileCreated: (profile: UserProfile) => void;
  onLoginSuccess: (profile: UserProfile) => void;
  lang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  existingUsers: Record<string, UserProfile>;
}

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
];

const NODE_TYPES: { type: UserType; label: string; descEn: string; descTa: string; descHi: string; icon: string }[] = [
  {
    type: "individual",
    label: "Individual Resident",
    descEn: "Single household or steward listing packaging, cardboard, and localized e-waste sorting.",
    descTa: "தனிநபர் இல்லம் அல்லது பிளாஸ்டிக், அட்டைப்பெட்டி மற்றும் மின்-கழிவுகளை பிரிக்கும் பொறுப்பாளர்.",
    descHi: "एकल परिवार या प्रबंधक जो पैकेजिंग, कार्डबोर्ड और ई-कचरे को छांटते हैं।",
    icon: "🏠",
  },
  {
    type: "apartment",
    label: "Apartment / Housing Co-op",
    descEn: "Aggregating community material bins into bulk loads for heavy fleet collection.",
    descTa: "கனரக வாகன சேகரிப்பிற்காக அடுக்குமாடி குடியிருப்பு குப்பைகளை ஒன்றிணைத்தல்.",
    descHi: "बड़े वाहन संग्रह के लिए सामुदायिक सामग्री डिब्बे को एक साथ संकलित करना।",
    icon: "🏢",
  },
  {
    type: "school",
    label: "Educational Campus / School",
    descEn: "Academic institutions running student collection clubs and circular campaigns.",
    descTa: "மாணவர் சேகரிப்பு கிளப்புகள் மற்றும் சுற்றுச்சூழல் பிரச்சாரங்களை நடத்தும் கல்வி நிறுவனங்கள்.",
    descHi: "छात्र संग्रह क्लब और परिपत्र अभियान चलाने वाले शैक्षणिक संस्थान।",
    icon: "🎓",
  },
  {
    type: "business",
    label: "Local Business / Shop",
    descEn: "Eco-friendly retail, cafes, or offices recycling packaging and waste assets.",
    descTa: "பேக்கேஜிங் மற்றும் கழிவு சொத்துக்களை மறுசுழற்சி செய்யும் சுற்றுச்சூழல் நட்பு சில்லறை விற்பனை நிலையங்கள்.",
    descHi: "पैकेजिंग और अपशिष्ट संपत्तियों का पुनर्चक्रण करने वाले पर्यावरण-अनुकूल खुदरा और कार्यालय।",
    icon: "☕",
  },
  {
    type: "recycler",
    label: "Certified Recycler & Collector",
    descEn: "Refining stations sorting plastics, metals, or paper pulp back to raw states.",
    descTa: "பிளாஸ்டிக், உலோகங்கள் அல்லது காகிதங்களை மீண்டும் மூல நிலைக்கு கொண்டு செல்லும் சுத்திகரிப்பு நிலையங்கள்.",
    descHi: "प्लास्टिक, धातु या कागज को कच्चे माल में वापस छांटने वाले प्रमाणित पुनर्चक्रणकर्ता।",
    icon: "🌀",
  },
  {
    type: "ngo",
    label: "Ecological NGO",
    descEn: "Distributing upcycled goods, textile drives, and supporting community drop-offs.",
    descTa: "மேம்படுத்தப்பட்ட பொருட்கள், ஜவுளி உந்துதல்களை விநியோகித்தல் மற்றும் சமூக உதவிகள்.",
    descHi: "अपसाइकिल किए गए सामान, कपड़ा अभियान और सामुदायिक ड्रॉप-ऑफ का समर्थन करना।",
    icon: "🌱",
  },
  {
    type: "industry",
    label: "Industrial Sourcing Buyer",
    descEn: "Large-scale factories procuring high-volume raw feedstock for green production.",
    descTa: "பசுமை உற்பத்திக்காக அதிக அளவிலான மூலப்பொருட்களை வாங்கும் பெருநிறுவன தொழிற்சாலைகள்.",
    descHi: "हरित उत्पादन के लिए उच्च मात्रा में कच्चे माल को खरीदने वाले बड़े पैमाने के कारखाने।",
    icon: "🏭",
  },
];

export default function CreateProfile({ 
  onProfileCreated, 
  onLoginSuccess,
  lang, 
  onLanguageChange,
  existingUsers 
}: CreateProfileProps) {
  // Toggle between "register" and "login" mode
  const [authMode, setAuthMode] = useState<"register" | "login">("login");
  
  // Registration States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<UserType>("individual");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [uploadedBase64, setUploadedBase64] = useState<string>("");
  
  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[lang];

  // File Upload Handlers (Device Upload)
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg(lang === "ta" ? "தயவுசெய்து படக் கோப்பை மட்டும் பதிவேற்றவும்." : "Please upload image files only.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg(lang === "ta" ? "படக் அளவு 2MB க்கும் குறைவாக இருக்க வேண்டும்." : "Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedBase64(reader.result);
        setCustomAvatarUrl(""); // Reset custom URL since file is prioritized
        setErrorMsg("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg(t.enterName);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg(t.enterValidEmail);
      return;
    }
    if (!location.trim()) {
      setErrorMsg(t.enterLocation);
      return;
    }

    const finalAvatar = uploadedBase64 || customAvatarUrl.trim() || avatar;

    // Create pristine custom profile with STRICT 0 SCORES before user scans anything
    const newProfile: UserProfile = {
      id: "u_custom_" + Math.floor(10000 + Math.random() * 90000),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      type: type,
      avatar: finalAvatar,
      location: location.trim(),
      circularityScore: 0, // strict 0 score initial state
      level: 1, // Start at level 1
      joinedDate: new Date().toLocaleDateString(lang === "en" ? "en-US" : lang === "ta" ? "ta-IN" : "hi-IN", { month: "short", year: "numeric" }),
      contributionsCount: 0, // strict 0 score initial state
      carbonSavedTotal: 0, // strict 0 score initial state
      moneyEarnedTotal: 0, // strict 0 score initial state
      impactBadges: [],
    };

    onProfileCreated(newProfile);
    setSuccessMsg(lang === "ta" ? "சுழற்சி முனை வெற்றிகரமாக பதிவு செய்யப்பட்டது!" : lang === "hi" ? "परिपत्र नोड सफलतापूर्वक पंजीकृत किया गया!" : "Circular Node registered successfully!");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = loginEmail.trim().toLowerCase();
    
    if (!targetEmail || !targetEmail.includes("@")) {
      setErrorMsg(t.enterValidEmail);
      return;
    }

    // Check if the user exists in existing dynamic users
    const matchedProfile = Object.values(existingUsers).find(
      (u) => u.email.toLowerCase() === targetEmail
    );

    if (matchedProfile) {
      onLoginSuccess(matchedProfile);
      setSuccessMsg(lang === "ta" ? "வெற்றிகரமாக உள்நுழைந்தது!" : lang === "hi" ? "सफलतापूर्वक लॉगिन किया गया!" : "Successfully logged in!");
      setErrorMsg("");
    } else {
      setErrorMsg(
        lang === "ta" 
          ? "இந்த மின்னஞ்சல் முகவரி பதிவு செய்யப்படவில்லை. புதிய முனையத்தை உருவாக்கவும்." 
          : lang === "hi" 
            ? "यह ईमेल पता पंजीकृत नहीं है। कृपया नोड पंजीकृत करें।" 
            : "This email address is not registered. Please create a new node."
      );
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 overflow-y-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center min-h-screen" id="authentication-panel">
      
      {/* Absolute Language Switcher at Top Right */}
      <div className="absolute top-4 right-4 z-40 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 border border-white/20 shadow-lg">
        <span className="text-[10px] text-emerald-300 font-extrabold uppercase mr-1.5">{t.selectLanguage}:</span>
        <button 
          onClick={() => onLanguageChange("en")} 
          className={`px-2 py-0.5 rounded text-xs font-black transition-all ${lang === "en" ? "bg-emerald-600 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
        >
          EN
        </button>
        <button 
          onClick={() => onLanguageChange("ta")} 
          className={`px-2 py-0.5 rounded text-xs font-black transition-all ${lang === "ta" ? "bg-emerald-600 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
        >
          தமிழ்
        </button>
        <button 
          onClick={() => onLanguageChange("hi")} 
          className={`px-2 py-0.5 rounded text-xs font-black transition-all ${lang === "hi" ? "bg-emerald-600 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
        >
          हिन्दी
        </button>
      </div>

      <div className="max-w-xl w-full bg-slate-900/90 border border-emerald-500/20 rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-hidden text-white backdrop-blur-xl">
        
        {/* Glow Spheres */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.appTitle} Secure Gateway</span>
          </div>
          
          <h1 className="text-3xl font-black text-slate-100 tracking-tight leading-tight">
            {authMode === "register" ? t.registerHeader : t.loginHeader}
          </h1>
          <p className="mt-2 text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
            {authMode === "register" ? t.registerDesc : t.loginDesc}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-500/30 text-rose-300 rounded-2xl text-xs font-semibold animate-shake">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-semibold">
            ✓ {successMsg}
          </div>
        )}

        {/* Auth Forms */}
        {authMode === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{t.adminEmail}</span>
              </label>
              <input
                type="email"
                placeholder="e.g. coordinator@bandragreen.org"
                value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setErrorMsg(""); }}
                className="w-full p-4 border border-emerald-500/20 rounded-2xl bg-white/5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all font-medium"
                required
              />
              <span className="text-[10px] text-slate-500 mt-2 block">
                {lang === "ta" 
                  ? "பூட்ஸ்மாப் கணக்குகளான aarav.sharma@gmail.com, hello@sustainacafe.com போன்றவற்றை பயன்படுத்தலாம்." 
                  : lang === "hi"
                    ? "सिमुलेशन के लिए aarav.sharma@gmail.com या hello@sustainacafe.com का उपयोग कर सकते हैं।"
                    : "You can use simulation seed accounts like aarav.sharma@gmail.com or hello@sustainacafe.com to explore demo statistics."}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25"
            >
              <span>{lang === "ta" ? "முனையத்திற்குள் நுழையவும்" : lang === "hi" ? "नोड पोर्टल एक्सेस करें" : "Access Circular Node"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-slate-800/60 text-center">
              <button
                type="button"
                onClick={() => { setAuthMode("register"); setErrorMsg(""); }}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-all cursor-pointer"
              >
                {t.goToRegister}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-6 relative z-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Step 1: Info Box */}
            <div className="grid grid-cols-1 gap-5 pb-5 border-b border-white/5">
              <div>
                <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{t.nodeName}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bandra Green Co-Op"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrorMsg(""); }}
                  className="w-full p-3.5 border border-emerald-500/10 rounded-xl bg-white/5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.adminEmail}</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. coordinator@bandragreen.org"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
                  className="w-full p-3.5 border border-emerald-500/10 rounded-xl bg-white/5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.municipalLocation}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bandra West, Mumbai, Maharashtra"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setErrorMsg(""); }}
                  className="w-full p-3.5 border border-emerald-500/10 rounded-xl bg-white/5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Step 2: Role Selection */}
            <div>
              <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
                {t.circularRole}
              </label>
              <div className="grid grid-cols-1 gap-2.5 max-h-40 overflow-y-auto pr-1">
                {NODE_TYPES.map((node) => {
                  const isSelected = type === node.type;
                  const localizedDesc = lang === "ta" ? node.descTa : lang === "hi" ? node.descHi : node.descEn;
                  return (
                    <button
                      key={node.type}
                      type="button"
                      onClick={() => setType(node.type)}
                      className={`p-3 rounded-xl border text-left flex gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-500 text-white shadow-md"
                          : "bg-white/5 hover:bg-white/10 border-white/5 text-slate-300"
                      }`}
                    >
                      <span className="text-xl">{node.icon}</span>
                      <div>
                        <p className="font-extrabold text-xs tracking-tight">{node.label}</p>
                        <p className={`text-[10px] mt-0.5 leading-normal ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>
                          {localizedDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Device upload & Drag and Drop for Avatar */}
            <div className="pt-5 border-t border-white/5">
              <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
                {t.uploadAvatar}
              </label>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? "border-emerald-400 bg-emerald-500/10" 
                    : "border-slate-750 hover:border-emerald-500/30 bg-white/5 hover:bg-white/10"
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {uploadedBase64 ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={uploadedBase64} alt="Uploaded logo" className="w-16 h-16 rounded-full object-cover border border-emerald-500" />
                    <span className="text-[10px] text-emerald-400 font-extrabold">✓ Image Loaded from Device</span>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setUploadedBase64(""); }}
                      className="text-[9px] underline text-rose-400 hover:text-rose-300 font-medium"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-emerald-500 animate-bounce" />
                    <p className="text-xs font-bold text-slate-200">{t.dragOrClick}</p>
                    <span className="text-[10px] text-slate-500">Supports PNG, JPG, JPEG (Max 2MB)</span>
                  </div>
                )}
              </div>

              {/* URL option or preset */}
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                  <div className="h-px bg-white/5 flex-1"></div>
                  <span>OR</span>
                  <div className="h-px bg-white/5 flex-1"></div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 mb-1 font-bold">{t.pasteUrl}</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={customAvatarUrl}
                    onChange={(e) => {
                      setCustomAvatarUrl(e.target.value);
                      setUploadedBase64(""); // Prioritize custom URL if user is pasting one
                    }}
                    className="w-full p-2.5 border border-emerald-500/10 rounded-xl bg-white/5 text-white text-xs focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>

                {!uploadedBase64 && !customAvatarUrl && (
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-2 font-bold">{t.selectPreset}</label>
                    <div className="flex gap-4 items-center justify-center">
                      {AVATAR_PRESETS.map((p, idx) => {
                        const isSelected = avatar === p;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setAvatar(p);
                            }}
                            className={`w-11 h-11 rounded-full overflow-hidden p-0.5 border-2 transition-all cursor-pointer ${
                              isSelected ? "border-emerald-500 scale-105" : "border-white/10 hover:border-emerald-500"
                            }`}
                          >
                            <img src={p} alt="Preset avatar" className="w-full h-full object-cover rounded-full" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit actions */}
            <div className="pt-5 border-t border-white/5 flex gap-3">
              <button
                type="button"
                onClick={() => { setAuthMode("login"); setErrorMsg(""); }}
                className="flex-1 py-3.5 border border-white/10 text-slate-350 font-bold rounded-xl text-xs hover:bg-white/5 transition-all cursor-pointer"
              >
                {t.backToLogin}
              </button>
              
              <button
                type="submit"
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <span>{t.initializeNode}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
