import React, { useState } from "react";
import { UserType, UserProfile, ResourcePassport, MarketplaceListing, IndustryRequirement, ChatMessage } from "./types";
import { TRANSLATIONS, LanguageCode } from "./lib/translations";
import { 
  SEED_USERS, 
  SEED_MARKET_LISTINGS, 
  SEED_INDUSTRY_REQUIREMENTS, 
  SEED_MAP_PINS, 
  SEED_COMMUNITY_POOLS, 
  SEED_SHIPPING_ROUTES, 
  SEED_NOTIFICATIONS 
} from "./data/seedData";

import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Scanner from "./components/Scanner";
import Marketplace from "./components/Marketplace";
import CircularMap from "./components/CircularMap";
import CommunityPools from "./components/CommunityPools";
import IndustryHub from "./components/IndustryDemand";
import Logistics from "./components/Logistics";
import AIAssistant from "./components/AIAssistant";
import CreateProfile from "./components/CreateProfile";

import { 
  Leaf, User, Database, MessageSquare, MapPin as MapIcon, 
  Users, Factory, Truck, Sparkles, LogOut, Moon, Sun, ShieldAlert, CheckCircle, Globe 
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<LanguageCode>(() => {
    return (localStorage.getItem("reloop_lang") as LanguageCode) || "en";
  });

  const [activeTab, setActiveTab] = useState<string>("landing"); // 'landing' or 'dashboard' or 'scanner' or 'marketplace' or ...
  const [activeUserKey, setActiveUserKey] = useState<string>(() => {
    return localStorage.getItem("reloop_active_user_key") || "individual";
  });
  const [hasCreatedCustomProfile, setHasCreatedCustomProfile] = useState<boolean>(() => {
    return localStorage.getItem("reloop_has_custom_profile") === "true";
  });
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return localStorage.getItem("reloop_is_logged") === "true";
  });

  // Dynamic user profiles dictionary state persisted in localStorage
  const [dynamicUsers, setDynamicUsers] = useState<Record<string, UserProfile>>(() => {
    const saved = localStorage.getItem("reloop_dynamic_users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to default
      }
    }
    return {
      custom: {
        id: "u_custom",
        name: "Your Custom Node",
        email: "steward@reloop.org",
        type: "individual",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        location: "Colaba, Mumbai",
        circularityScore: 0, // Strict 0 initial score prevents duplicate/mock scores
        level: 1,
        joinedDate: "Feb 2026",
        contributionsCount: 0,
        carbonSavedTotal: 0,
        moneyEarnedTotal: 0,
        impactBadges: []
      },
      ...SEED_USERS
    };
  });

  // Derived translation helper
  const t = TRANSLATIONS[lang];

  // Derived user profile from active session key safely
  const userProfile = dynamicUsers[activeUserKey] || dynamicUsers["custom"] || {
    id: "u_fallback",
    name: "Guest Node",
    email: "guest@reloop.org",
    type: "individual",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    location: "Mumbai",
    circularityScore: 0,
    level: 1,
    joinedDate: "Feb 2026",
    contributionsCount: 0,
    carbonSavedTotal: 0,
    moneyEarnedTotal: 0,
    impactBadges: []
  };

  const saveUsersToStorage = (users: Record<string, UserProfile>) => {
    localStorage.setItem("reloop_dynamic_users", JSON.stringify(users));
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    setLang(newLang);
    localStorage.setItem("reloop_lang", newLang);
  };

  const handleProfileCreated = (profile: UserProfile) => {
    // Force strict 0 score and clear initial state for newly registered user to guarantee clean slate
    const pristineProfile: UserProfile = {
      ...profile,
      circularityScore: 0,
      contributionsCount: 0,
      carbonSavedTotal: 0,
      moneyEarnedTotal: 0,
      level: 1,
      impactBadges: []
    };
    const newKey = "custom_" + pristineProfile.id;
    const updatedUsers = {
      ...dynamicUsers,
      [newKey]: pristineProfile,
      custom: pristineProfile // update backup default as well
    };
    
    setDynamicUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);

    setActiveUserKey(newKey);
    localStorage.setItem("reloop_active_user_key", newKey);

    setHasCreatedCustomProfile(true);
    localStorage.setItem("reloop_has_custom_profile", "true");

    setIsLogged(true);
    localStorage.setItem("reloop_is_logged", "true");

    setActiveTab("dashboard");

    // Launch beautiful notification
    const startNotif = {
      id: "n-init-" + Date.now(),
      title: lang === "ta" ? "வட்ட முனை பதிவு செய்யப்பட்டது! 🌐" : lang === "hi" ? "परिपत्र नोड पंजीकृत! 🌐" : "Circular Node Registered! 🌐",
      message: lang === "ta" 
        ? `வெற்றிகரமாக செயல்படுத்தப்பட்டது. உங்கள் கணக்கு "${pristineProfile.location}"-ல் கட்டமைக்கப்பட்டுள்ளது.` 
        : lang === "hi"
          ? `सफलतापूर्वक सक्षम हुआ। नोड "${pristineProfile.location}" पर सक्रिय है।`
          : `Verify protocol success. Custom profile configured at "${pristineProfile.location}". Ready for circular routing.`,
      time: "Just now",
      type: "success" as const,
      isRead: false
    };
    setNotifications((prev) => [startNotif, ...prev]);
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    // Find key of the matched profile in dynamic users
    let matchKey = "custom";
    for (const [key, value] of Object.entries(dynamicUsers)) {
      const uProfile = value as UserProfile;
      if (uProfile.email.toLowerCase() === profile.email.toLowerCase()) {
        matchKey = key;
        break;
      }
    }

    setActiveUserKey(matchKey);
    localStorage.setItem("reloop_active_user_key", matchKey);

    setIsLogged(true);
    localStorage.setItem("reloop_is_logged", "true");

    if (matchKey.startsWith("custom_") || matchKey === "custom") {
      setHasCreatedCustomProfile(true);
      localStorage.setItem("reloop_has_custom_profile", "true");
    }

    setActiveTab("dashboard");

    // Launch welcome notification
    const welcomeNotif = {
      id: "n-login-" + Date.now(),
      title: lang === "ta" ? "மீண்டும் வருக! 👋" : lang === "hi" ? "वापसी पर स्वागत है! 👋" : "Welcome back! 👋",
      message: lang === "ta" 
        ? `${profile.name} முனையத்தின் அணுகல் வெற்றிகரமாக அங்கீகரிக்கப்பட்டது.` 
        : lang === "hi"
          ? `${profile.name} नोड के लिए लॉगिन अधिकार प्रमाणित हो चुके हैं।`
          : `Successfully authenticated portal permissions for ${profile.name} node.`,
      time: "Just now",
      type: "success" as const,
      isRead: false
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);
  };

  const handleLogOut = () => {
    setIsLogged(false);
    localStorage.setItem("reloop_is_logged", "false");
    setActiveTab("landing");
  };

  // Datasets loaded in top-level state for real-time reactivity
  const [listings, setListings] = useState<MarketplaceListing[]>(SEED_MARKET_LISTINGS);
  const [requirements, setRequirements] = useState<IndustryRequirement[]>(SEED_INDUSTRY_REQUIREMENTS);
  const [pools, setPools] = useState(SEED_COMMUNITY_POOLS);
  const [passports, setPassports] = useState<ResourcePassport[]>([]);
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);
  
  // Custom Chat Session
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isGeneratingChat, setIsGeneratingChat] = useState<boolean>(false);

  const handleAddPassport = (newPassport: ResourcePassport) => {
    setPassports((prev) => [newPassport, ...prev]);
    
    const carbonKg = parseFloat(newPassport.carbonSavings.replace(/[^\d.]/g, "")) || 12.4;
    const valueAmt = parseInt(newPassport.estimatedValue.replace(/[^\d.]/g, "")) || 150;

    // Increment active user metrics
    setDynamicUsers((prev) => {
      const u = prev[activeUserKey] || prev["custom"];
      return {
        ...prev,
        [activeUserKey]: {
          ...u,
          contributionsCount: u.contributionsCount + 1,
          carbonSavedTotal: u.carbonSavedTotal + carbonKg,
          circularityScore: Math.min(100, u.circularityScore + 10)
        }
      };
    });

    // Auto-insert a fresh listing in the marketplace to demonstrate circular capability!
    const autoListing: MarketplaceListing = {
      id: "auto-" + Math.floor(1000 + Math.random() * 9000),
      title: `${newPassport.condition} ${newPassport.objectType}`,
      category: (newPassport.material.includes("Plastic") ? "Plastic" : 
                 newPassport.material.includes("Cardboard") ? "Cardboard" : 
                 newPassport.material.includes("E-Waste") ? "E-Waste" : 
                 newPassport.material.includes("Metal") ? "Metal" : "Glass") as any,
      material: newPassport.material,
      quantity: newPassport.quantity,
      condition: "Good",
      photos: [newPassport.image || "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=300"],
      pickupAvailability: "Prior arrangement requested",
      location: userProfile.location,
      action: "Sell",
      price: newPassport.estimatedValue,
      status: "Active",
      listedBy: {
        id: userProfile.id,
        name: userProfile.name,
        type: userProfile.type,
        avatar: userProfile.avatar
      },
      createdAt: new Date().toISOString(),
      matchScore: newPassport.circularityScore,
      offersCount: 0
    };

    setListings((prev) => [autoListing, ...prev]);

    // Push new notification
    const alertNotif = {
      id: "n-alert-" + Date.now(),
      title: "Material Passport Published 🎖️",
      message: `Your ${newPassport.objectType} is mapped on the supply grid. Automatically listed on Circular Marketplace.`,
      time: "Just now",
      type: "success" as const,
      isRead: false
    };
    setNotifications((prev) => [alertNotif, ...prev]);
  };

  const handleAddMarketListing = (fields: any) => {
    const fresh: MarketplaceListing = {
      id: "list-" + Math.floor(1000 + Math.random() * 9000),
      title: fields.title,
      category: fields.category,
      material: fields.material,
      quantity: fields.quantity,
      condition: fields.condition,
      photos: fields.photos,
      pickupAvailability: fields.pickupAvailability || "Upon direct arrangements",
      location: fields.location,
      action: fields.action,
      price: fields.price,
      status: "Active",
      listedBy: {
        id: userProfile.id,
        name: userProfile.name,
        type: userProfile.type,
        avatar: userProfile.avatar
      },
      createdAt: new Date().toISOString(),
      matchScore: 92,
      offersCount: 0
    };

    setListings((prev) => [fresh, ...prev]);

    setDynamicUsers((prev) => {
      const u = prev[activeUserKey] || prev["custom"];
      return {
        ...prev,
        [activeUserKey]: {
          ...u,
          circularityScore: Math.min(100, u.circularityScore + 5)
        }
      };
    });

    const notif = {
      id: "n-list-" + Date.now(),
      title: "Supply Lot Listed 📦",
      message: `Lot "${fields.title}" has been appended to the open circular marketplace cache.`,
      time: "Just now",
      type: "info" as const,
      isRead: false
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAcceptOffer = (listingId: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          return {
            ...item,
            status: "Completed" as const
          };
        }
        return item;
      })
    );

    const matchItem = listings.find((i) => i.id === listingId);
    if (matchItem) {
      const priceVal = parseInt(matchItem.price.replace(/[^\d.]/g, "")) || 350;
      const massVal = parseFloat(matchItem.quantity.replace(/[^\d.]/g, "")) || 25;

      setDynamicUsers((prev) => {
        const u = prev[activeUserKey] || prev["custom"];
        return {
          ...prev,
          [activeUserKey]: {
            ...u,
            moneyEarnedTotal: u.moneyEarnedTotal + priceVal,
            carbonSavedTotal: u.carbonSavedTotal + Math.round(massVal * 3.2),
            circularityScore: Math.min(100, u.circularityScore + 15),
            contributionsCount: u.contributionsCount + 1
          }
        };
      });

      const acceptNotif = {
        id: "n-transact-" + Date.now(),
        title: "Exchange Agreement Completed! 💸",
        message: `Lot "${matchItem.title}" transacted successfully. Earnings ₹${priceVal} credited. Offset emissions mapped!`,
        time: "Just now",
        type: "success" as const,
        isRead: false
      };
      setNotifications((prev) => [acceptNotif, ...prev]);
    }
  };

  const handleSubmitProffer = (listingId: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          return {
            ...item,
            offersCount: item.offersCount + 1
          };
        }
        return item;
      })
    );

    const targetItem = listings.find((i) => i.id === listingId);
    if (targetItem) {
      const bidNotif = {
        id: "n-proffer-" + Date.now(),
        title: "Exchange Proffer Sent 📨",
        message: `Your procurement proffer has been logged for "${targetItem.title}". Lister was pinged.`,
        time: "Just now",
        type: "offer" as const,
        isRead: false
      };
      setNotifications((prev) => [bidNotif, ...prev]);
    }
  };

  const handleDeleteListing = (listingId: string) => {
    setListings((prev) => prev.filter((item) => item.id !== listingId));
    
    const delNotif = {
      id: "n-del-" + Date.now(),
      title: "Listing Withdrawn",
      message: "Resource passport listing was successfully archived and retracted from circular grid.",
      time: "Just now",
      type: "info" as const,
      isRead: false
    };
    setNotifications((prev) => [delNotif, ...prev]);
  };

  const handleUpdateUserProfile = (updatedProfile: UserProfile) => {
    const updatedUsers = {
      ...dynamicUsers,
      [activeUserKey]: updatedProfile
    };
    setDynamicUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
    
    // Launch update success notification
    const updateNotif = {
      id: "n-update-" + Date.now(),
      title: lang === "ta" ? "சுயவிவரம் புதுப்பிக்கப்பட்டது! ⚙️" : lang === "hi" ? "प्रोफ़ाइल अपडेट की गई! ⚙️" : "Profile Updated! ⚙️",
      message: lang === "ta" 
        ? "உங்கள் கணக்குத் தரவு வெற்றிகரமாக மாற்றப்பட்டது." 
        : lang === "hi"
          ? "आपका नोड डेटा सफलतापूर्वक अनुकूलित किया गया है।"
          : "Successfully updated profile node configurations on the circular grid.",
      time: "Just now",
      type: "success" as const,
      isRead: false
    };
    setNotifications((prev) => [updateNotif, ...prev]);
  };

  const handleMakeCustomOffer = (listingId: string, offerValue: number, isPoints: boolean) => {
    const targetItem = listings.find((item) => item.id === listingId);
    if (!targetItem) return;

    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          return {
            ...item,
            offersCount: item.offersCount + 1
          };
        }
        return item;
      })
    );

    const giverId = targetItem.listedBy.id;
    setDynamicUsers((prev) => {
      const matchedUserKey = Object.keys(prev).find(
        (key) => prev[key].id === giverId
      );
      if (!matchedUserKey) return prev;
      
      const userObj = prev[matchedUserKey];
      return {
        ...prev,
        [matchedUserKey]: {
          ...userObj,
          moneyEarnedTotal: isPoints ? userObj.moneyEarnedTotal : userObj.moneyEarnedTotal + offerValue,
          circularityScore: Math.min(100, userObj.circularityScore + 5),
          contributionsCount: userObj.contributionsCount + 1
        }
      };
    });

    setDynamicUsers((prev) => {
      const u = prev[activeUserKey] || prev["custom"];
      return {
        ...prev,
        [activeUserKey]: {
          ...u,
          circularityScore: Math.min(100, u.circularityScore + 8)
        }
      };
    });

    const giftUnit = isPoints ? "RP (Points)" : "₹ (INR)";
    const customNotif = {
      id: "n-custom-offer-" + Date.now(),
      title: "Waste Compensation Proferred! 💰",
      message: `Buyer "${userProfile.name}" offered ${isPoints ? "" : "₹"}${offerValue} ${giftUnit} for "${targetItem.title}". Contact Giver at: ${targetItem.contactInfo || "listed contact"}`,
      time: "Just now",
      type: "offer" as const,
      isRead: false
    };
    setNotifications((prev) => [customNotif, ...prev]);
  };

  const handleAddIndustryRequirement = (fields: any) => {
    const fresh: IndustryRequirement = {
      id: "ind-req-" + Math.floor(1000 + Math.random() * 9000),
      companyName: fields.companyName,
      location: fields.location,
      pickupRadiusKm: fields.pickupRadiusKm,
      materialNeeded: fields.materialNeeded,
      category: fields.category,
      quantityRequiredKg: fields.quantityRequiredKg,
      quantityFulfilledKg: 0,
      pricePerKg: fields.pricePerKg,
      description: fields.description,
      status: "Open",
      postedAt: new Date().toISOString().split("T")[0]
    };

    setRequirements((prev) => [fresh, ...prev]);
  };

  const handleFulfillContract = (reqId: string, kgToFulfill: number) => {
    setRequirements((prev) =>
      prev.map((req) => {
        if (req.id === reqId) {
          const newFulfill = req.quantityFulfilledKg + kgToFulfill;
          const isFull = newFulfill >= req.quantityRequiredKg;
          return {
            ...req,
            quantityFulfilledKg: newFulfill,
            status: (isFull ? "Fulfilled" : "In-Progress") as any
          };
        }
        return req;
      })
    );

    const targetReq = requirements.find((r) => r.id === reqId);
    if (targetReq) {
      const pricePerKgVal = parseInt(targetReq.pricePerKg.replace(/[^\d.]/g, "")) || 18;
      const earnings = pricePerKgVal * kgToFulfill;
      const carbonOffset = Math.round(kgToFulfill * 3.2);

      setDynamicUsers((prev) => {
        const u = prev[activeUserKey] || prev["custom"];
        return {
          ...prev,
          [activeUserKey]: {
            ...u,
            moneyEarnedTotal: u.moneyEarnedTotal + earnings,
            carbonSavedTotal: u.carbonSavedTotal + carbonOffset,
            circularityScore: Math.min(100, u.circularityScore + 15),
            contributionsCount: u.contributionsCount + 1
          }
        };
      });

      const fillNotif = {
        id: "n-fill-" + Date.now(),
        title: "Consignment Dispatched! 🚚",
        message: `Sourced ${kgToFulfill}kg consolidated chemical/material batch for ${targetReq.companyName}. Credited reward of ₹${earnings}!`,
        time: "Just now",
        type: "success" as const,
        isRead: false
      };
      setNotifications((prev) => [fillNotif, ...prev]);
    }
  };

  const handleAddPoolContribution = (poolId: string, kg: number) => {
    setPools((prev) =>
      prev.map((p) => {
        if (p.id === poolId) {
          return {
            ...p,
            totalCollectedKg: p.totalCollectedKg + kg,
            carbonSavedKg: p.carbonSavedKg + Math.round(kg * 3.2),
            earningsInr: p.earningsInr + Math.round(kg * 12)
          };
        }
        return p;
      })
    );

    const carbonSaved = Math.round(kg * 3.2);
    const earnings = Math.round(kg * 12);

    setDynamicUsers((prev) => {
      const u = prev[activeUserKey] || prev["custom"];
      return {
        ...prev,
        [activeUserKey]: {
          ...u,
          contributionsCount: u.contributionsCount + 1,
          carbonSavedTotal: u.carbonSavedTotal + carbonSaved,
          moneyEarnedTotal: u.moneyEarnedTotal + earnings,
          circularityScore: Math.min(100, u.circularityScore + 8)
        }
      };
    });

    const targetPool = pools.find((p) => p.id === poolId);
    const poolNotif = {
      id: "n-pool-" + Date.now(),
      title: "Co-op Consolidate Deposited 🏢",
      message: `Deposited ${kg}kg circular material into "${targetPool?.name || "Community Pool"}". Received ₹${earnings} node credit.`,
      time: "Just now",
      type: "success" as const,
      isRead: false
    };
    setNotifications((prev) => [poolNotif, ...prev]);
  };

  // AI assistant chat callback
  const handleSendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setIsGeneratingChat(true);

    try {
      const payloadMessages = [...chatHistory, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!response.ok) throw new Error("API prompt error");
      const result = await response.json();

      const modelMsg: ChatMessage = {
        id: "msg-" + (Date.now() + 1),
        role: "assistant",
        content: result.text || "Pardon, failed to generate details.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: "msg-err",
        role: "assistant",
        content: "I recommend pooling your local plastics, metals, or paper cardboard. Would you like me to map them on our supply grid or arrange reverse logistics?",
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory((prev) => [...prev, errMsg]);
    } finally {
      setIsGeneratingChat(false);
    }
  };

  // Permit guest users to view Landing Home, otherwise enforce role-gated access
  const handleTabClick = (tabId: string) => {
    if (!isLogged && tabId !== "landing" && tabId !== "register-profile") {
      // Redirect to authorization portal and launch explanatory notification
      setActiveTab("register-profile");
      const authNotif = {
        id: "n-auth-" + Date.now(),
        title: lang === "ta" ? "அங்கீகாரம் தேவை 🔒" : lang === "hi" ? "प्रमाणीकरण आवश्यक 🔒" : "Authentication Required 🔒",
        message: lang === "ta" 
          ? "தயவுசெய்து உங்கள் முனையப் பாத்திரத்தைத் தேர்ந்தெடுத்து நுழையவும்." 
          : lang === "hi" 
            ? "विविध श्रेणियों का उपयोग करने के लिए कृपया अपनी नोड भूमिका दर्ज करें।" 
            : "Role-based authorization required. Please authenticate or select your circular node role to proceed.",
        time: "Just now",
        type: "alert" as const,
        isRead: false
      };
      setNotifications((prev) => [authNotif, ...prev]);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 scroll-smooth">
      
      {/* Dynamic Telemetry Status Ribbon with Language selection & Active account info */}
      <div className="bg-slate-900 text-[11px] text-slate-300 px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-3 border-b border-white/10 z-25 shrink-0 select-none">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-emerald-400 font-mono flex items-center gap-1.5 uppercase text-[9.5px] tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            <span>{t.telemetryStatus}</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-medium col-span-2">
            {isLogged ? (
              <>
                {lang === "ta" ? "செயலில் உள்ள முனை:" : lang === "hi" ? "सक्रिय नोड:" : lang === "te" ? "క్రియాశీల నోడ్:" : "Active Node:"} <strong className="text-white">{userProfile.email}</strong> ({userProfile.name})
              </>
            ) : (
              <span className="text-amber-400 font-bold tracking-wide flex items-center gap-1 animate-pulse">
                <span>⚠️</span>
                <span>{lang === "ta" ? "விருந்தினர் பயன்முறை - உள்நுழையவும்" : lang === "hi" ? "अतिथि मोड - कृपया लॉगिन करें" : lang === "te" ? "అతిథి మోడ్ - దయచేసి లాగిన్ అవ్వండి" : "Guest Mode - Authentication Required"}</span>
              </span>
            )}
          </span>
        </div>
        
        <div className="flex gap-4 items-center flex-wrap">
          {/* Quick Language Switcher */}
          <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            <Globe className="w-3 h-3 text-emerald-400 mr-1" />
            <button 
              onClick={() => handleLanguageChange("en")} 
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${lang === "en" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              EN
            </button>
            <button 
              onClick={() => handleLanguageChange("ta")} 
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${lang === "ta" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              தமிழ்
            </button>
            <button 
              onClick={() => handleLanguageChange("hi")} 
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${lang === "hi" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              हिन्दी
            </button>
            <button 
              onClick={() => handleLanguageChange("te")} 
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${lang === "te" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              తెలుగు
            </button>
          </div>

          {isLogged && (
            <button
              onClick={() => {
                setHasCreatedCustomProfile(false);
                localStorage.removeItem("reloop_has_custom_profile");
                setActiveTab("register-profile");
              }}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded font-extrabold text-[9px] uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              <span>📝 {t.registerCustomProfile}</span>
            </button>
          )}

          {isLogged ? (
            <button
              onClick={handleLogOut}
              className="px-2.5 py-1 bg-rose-600/90 hover:bg-rose-700 text-white rounded font-extrabold text-[9px] uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="w-3 h-3" />
              <span>{t.logOut}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("register-profile")}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-extrabold text-[9px] uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              <span>🔑 {lang === "ta" ? "உள்நுழைக" : lang === "hi" ? "लॉगिन करें" : "Sign In Portal"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Banner Navigation matching "Clean Minimalism" blueprint perfectly */}
      <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 z-20 shrink-0 sticky top-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-black tracking-tight cursor-pointer" onClick={() => setActiveTab("landing")}>
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transition-all hover:scale-105 shadow-xs">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-emerald-950 tracking-tight">
              ReLoop <span className="text-emerald-500 font-bold">AI</span>
            </span>
          </div>

          <div className="hidden lg:flex gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest pl-4">
            {[
              { id: "dashboard", label: t.dashboard, icon: Database, secure: true },
              { id: "scanner", label: t.scanner, icon: Sparkles, secure: true },
              { id: "marketplace", label: t.marketplace, icon: Leaf, secure: true },
              { id: "map", label: t.circularMap, icon: MapIcon, secure: true },
              { id: "pools", label: t.communityPools, icon: Users, secure: true },
              { id: "industry", label: t.industryHub, icon: Factory, secure: true },
              { id: "logistics", label: t.logistics, icon: Truck, secure: true },
              { id: "chat", label: t.aiSpecialist, icon: MessageSquare, secure: true }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected ? "text-slate-900 bg-slate-100" : "hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-600" : "text-slate-400"}`} />
                  <span className="flex items-center gap-1">
                    <span>{tab.label}</span>
                    {!isLogged && tab.secure && <span className="text-[9px] opacity-60">🔒</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Navigation Profile */}
        <div className="flex items-center gap-3">
          {isLogged ? (
            <>
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{t.circularityScore}</span>
                <span className="text-xs font-extrabold text-emerald-600 font-mono flex items-center gap-1">
                  <span>{userProfile.circularityScore}/100</span>
                </span>
              </div>

              <div className="w-9 h-9 rounded-full border-2 border-emerald-500 p-0.5 shrink-0 shadow-xs cursor-pointer" onClick={() => setActiveTab("dashboard")}>
                <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover rounded-full" />
              </div>
            </>
          ) : (
            <button
              onClick={() => setActiveTab("register-profile")}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase rounded-xl transition-all cursor-pointer shadow-xs"
            >
              {lang === "ta" ? "நுழைவு" : lang === "hi" ? "लॉगिन" : "Sign In"}
            </button>
          )}
        </div>
      </nav>

      {/* Main Panel Frame Controller */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50 relative">
        {activeTab === "landing" && (
          <LandingPage
            onStartScanning={() => handleTabClick("scanner")}
            onExploreMarketplace={() => handleTabClick("marketplace")}
            onEnterApp={() => handleTabClick("dashboard")}
            lang={lang}
          />
        )}

        {activeTab === "register-profile" && (
          <CreateProfile
            onProfileCreated={handleProfileCreated}
            onLoginSuccess={handleLoginSuccess}
            lang={lang}
            onLanguageChange={handleLanguageChange}
            existingUsers={dynamicUsers}
          />
        )}

        {activeTab === "dashboard" && (
          <Dashboard
            user={userProfile}
            notifications={notifications}
            savedPassports={passports}
            onStartScanning={() => setActiveTab("scanner")}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onClearNotifications={() => setNotifications([])}
            onUpdateUserProfile={handleUpdateUserProfile}
            listings={listings}
            onAcceptOffer={handleAcceptOffer}
            onSubmitProffer={handleSubmitProffer}
            onMakeCustomOffer={handleMakeCustomOffer}
            lang={lang}
          />
        )}

        {activeTab === "scanner" && (
          <Scanner
            onAddPassport={handleAddPassport}
            onNavigateToMarketplace={() => setActiveTab("marketplace")}
          />
        )}

        {activeTab === "marketplace" && (
          <Marketplace
            listings={listings}
            onAddListing={handleAddMarketListing}
            currentUserType={userProfile.type}
            currentUserName={userProfile.name}
            currentUserProfileId={userProfile.id}
            onAcceptOffer={handleAcceptOffer}
            onSubmitProffer={handleSubmitProffer}
            onDeleteListing={handleDeleteListing}
            onMakeCustomOffer={handleMakeCustomOffer}
          />
        )}
        {activeTab === "map" && (
          <CircularMap pins={SEED_MAP_PINS} />
        )}

        {activeTab === "pools" && (
          <CommunityPools
            pools={pools}
            onAddPoolContribution={handleAddPoolContribution}
          />
        )}

        {activeTab === "industry" && (
          <IndustryHub
            requirements={requirements}
            onAddRequirement={handleAddIndustryRequirement}
            onFulfillContract={handleFulfillContract}
          />
        )}

        {activeTab === "logistics" && (
          <Logistics routes={SEED_SHIPPING_ROUTES} />
        )}

        {activeTab === "chat" && (
          <AIAssistant
            chatHistory={chatHistory}
            onSendMessage={handleSendChatMessage}
            onClearHistory={() => setChatHistory([])}
            isGenerating={isGeneratingChat}
          />
        )}
      </main>

      {/* Bottom status metrics bar */}
      <footer className="h-14 bg-white border-t border-slate-200 flex flex-col md:flex-row items-center justify-between px-6 text-xs text-slate-400 shrink-0 select-none py-2 gap-2">
        <div className="flex items-center gap-4 flex-wrap justify-center font-semibold">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>1,429 {t.totalNodesOperating}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
            <span>12.4M {t.tonsDiverted}</span>
          </span>
        </div>
        <div className="flex gap-4 font-semibold text-slate-400 flex-wrap justify-center">
          <span>Enterprise Circularity Model v2.0.4</span>
          <span>Help Desk</span>
          <span className="text-emerald-600">ReLoop AI Network</span>
        </div>
      </footer>
    </div>
  );
}
