/**
 * ReLoop AI - Multi-Language Localization System
 * English (en), Tamil (ta), Hindi (hi), and Telugu (te)
 */

export type LanguageCode = "en" | "ta" | "hi" | "te";

export interface TranslationSchema {
  appTitle: string;
  dashboard: string;
  scanner: string;
  marketplace: string;
  circularMap: string;
  communityPools: string;
  industryHub: string;
  logistics: string;
  aiSpecialist: string;
  circularityScore: string;
  carbonSaved: string;
  moneyEarned: string;
  contributions: string;
  level: string;
  logOut: string;
  selectLanguage: string;
  welcomeBack: string;
  joined: string;
  registerHeader: string;
  registerDesc: string;
  loginHeader: string;
  loginDesc: string;
  nodeName: string;
  adminEmail: string;
  municipalLocation: string;
  circularRole: string;
  initializeNode: string;
  backToLogin: string;
  goToRegister: string;
  goToLogin: string;
  uploadAvatar: string;
  dragOrClick: string;
  pasteUrl: string;
  selectPreset: string;
  enterValidEmail: string;
  enterLocation: string;
  enterName: string;
  telemetryStatus: string;
  interactiveSimulation: string;
  totalNodesOperating: string;
  tonsDiverted: string;
  registerCustomProfile: string;

  // Added Dashboard & Post translation keys
  userTier: string;
  levelCitizen: string;
  editProfile: string;
  activelyRecirculating: string;
  initiateScan: string;
  browseLivePostings: string;
  carbonSalvaged: string;
  forestGrowth: string;
  waterSaved: string;
  revenueGenerated: string;
  adultTrees: string;
  litersFresh: string;
  rupeesCash: string;
  equivalentTo: string;
  greenhouseGas: string;
  co2Absorbed: string;
  divertedIndustrial: string;
  circularEconomyPayout: string;
  activeCircularPostings: string;
  receiverSourcingHub: string;
  activeCircularPostingsDesc: string;
  availableBatches: string;
  liveLots: string;
  freeDonations: string;
  free: string;
  searchPlaceholder: string;
  allTransactionTypes: string;
  donationsAndFree: string;
  commercialSourcing: string;
  primaryMaterial: string;
  lotQuantity: string;
  nodeLocation: string;
  inspectAndClaimLot: string;
  noMatchingPostings: string;
  trySelectingDifferent: string;
  closeSourcingView: string;
  quickProfferPinned: string;
  compensationPayout: string;
  claimAndSecureLot: string;
  sourceGiverNode: string;
  batchWeight: string;
  listedValue: string;
  expectedProcurementOutcome: string;
  loopSourcing: string;
  expectedProcurementDesc: string;
  instructionsGuidelines: string;
  logisticsContact: string;
  expressClaimInterest: string;
  offerCompensationPoints: string;
  payoutAmount: string;
  quickValues: string;
  payoutPoints: string;
  payoutCash: string;
  levelLabel: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  en: {
    appTitle: "ReLoop AI",
    dashboard: "Dashboard",
    scanner: "AI Scanner",
    marketplace: "Marketplace",
    circularMap: "Circular Map",
    communityPools: "Community Pools",
    industryHub: "Industry Hub",
    logistics: "Logistics Routing",
    aiSpecialist: "AI Specialist",
    circularityScore: "Circularity Score",
    carbonSaved: "Carbon Saved",
    moneyEarned: "Money Earned",
    contributions: "Contributions",
    level: "Level",
    logOut: "Log Out",
    selectLanguage: "Language",
    welcomeBack: "Welcome back",
    joined: "Joined",
    registerHeader: "Register Your Circular Node",
    registerDesc: "ReLoop AI functions on active nodes. Define your unique identity below to publish materials, coordinate reverse shipping, and track real carbon offsets.",
    loginHeader: "Access Circular Node Portal",
    loginDesc: "Authenticate with your administrator email to manage your localized clean materials passport log, trade assets, and retrieve telemetry routing.",
    nodeName: "Representative Name",
    adminEmail: "Administrator Email",
    municipalLocation: "Municipal Node Location",
    circularRole: "Circular Role Type",
    initializeNode: "Initialize Circular Node",
    backToLogin: "Back to Login",
    goToRegister: "Don't have an account? Register Node",
    goToLogin: "Already registered? Login Here",
    uploadAvatar: "Upload Avatar Icon from Device",
    dragOrClick: "Drag & drop or click to choose an image file (PNG/JPG)",
    pasteUrl: "Or paste custom image URL reference",
    selectPreset: "Select Preset Profile Photo",
    enterValidEmail: "Please enter a valid administrator email address.",
    enterLocation: "Please enter a relative municipal location (e.g. Bandra West, Mumbai).",
    enterName: "Please provide a valid display name for your node.",
    telemetryStatus: "Real-time Circular OS Telemetry Node",
    interactiveSimulation: "Interactive Simulation Mode Active",
    totalNodesOperating: "Circular Nodes Operating",
    tonsDiverted: "Tons Diverted Globally",
    registerCustomProfile: "Register Custom Profile",

    userTier: "User Tier",
    levelCitizen: "Level {level} Citizen",
    editProfile: "Edit Profile",
    activelyRecirculating: "Actively recirculating since February 2026",
    initiateScan: "Initiate Scan",
    browseLivePostings: "Browse Live Sourcing Postings",
    carbonSalvaged: "Carbon Salvaged",
    forestGrowth: "Equivalent Forest Growth",
    waterSaved: "Water Resource Saved",
    revenueGenerated: "Revenue Generated",
    adultTrees: "Adult Trees",
    litersFresh: "Liters Fresh",
    rupeesCash: "Rupees Cash",
    equivalentTo: "Equivalent to",
    greenhouseGas: "greenhouse gas",
    co2Absorbed: "CO₂ absorbed annually by adult trees.",
    divertedIndustrial: "diverted from industrial drainages.",
    circularEconomyPayout: "circular economy payout.",
    activeCircularPostings: "Active Circular Postings Ready for Receipt",
    receiverSourcingHub: "Receiver Sourcing Hub",
    activeCircularPostingsDesc: "Below are real waste materials, donations, and products catalogued by citizen/business givers. Inspect their circular handling guidelines and claim lots instantly.",
    availableBatches: "Available Batches",
    liveLots: "Live Lots",
    freeDonations: "Free Donations",
    free: "Free",
    searchPlaceholder: "Search by material compound, title, or borough location...",
    allTransactionTypes: "All Transaction Types",
    donationsAndFree: "🎁 Donations & Free Pickups",
    commercialSourcing: "💼 Commercial Sourcing (Payout)",
    primaryMaterial: "Primary Material",
    lotQuantity: "Lot Quantity",
    nodeLocation: "Node Location",
    inspectAndClaimLot: "Inspect & Claim Lot",
    noMatchingPostings: "No matching circular postings found.",
    trySelectingDifferent: "Try selecting different filtering criteria or refine your search input query.",
    closeSourcingView: "Close Sourcing View",
    quickProfferPinned: "Quick procurement proffer pinned",
    compensationPayout: "Authorize compensation payout",
    claimAndSecureLot: "Claim & Secure Lot",
    sourceGiverNode: "Source Giver Node",
    batchWeight: "Batch Weight",
    listedValue: "Listed Value",
    expectedProcurementOutcome: "Expected Process Outcome",
    loopSourcing: "Loop Sourcing",
    expectedProcurementDesc: "This contributor has requested direct support for municipal recycling networks. Handle with diligence.",
    instructionsGuidelines: "Giver Handling & Collection Rules",
    logisticsContact: "Immediate Logistics Contact",
    expressClaimInterest: "Express Claim Interest & Payout",
    offerCompensationPoints: "Offer compensation points or INR payments to secure this resource lot.",
    payoutAmount: "Payout Amount",
    quickValues: "Quick values",
    payoutPoints: "RP (Points)",
    payoutCash: "₹ Cash (INR)",
    levelLabel: "Level",
  },
  ta: {
    appTitle: "ReLoop AI",
    dashboard: "டாஷ்போர்டு",
    scanner: "AI ஸ்கேனர்",
    marketplace: "சந்தைப்பகுதி",
    circularMap: "வட்ட வரைபடம்",
    communityPools: "சமூகக் குளங்கள்",
    industryHub: "தொழில்துறை மையம்",
    logistics: "லாஜிஸ்டிக்ஸ் ரூட்டிங்",
    aiSpecialist: "AI நிபுணர்",
    circularityScore: "சுழற்சி மதிப்பெண்",
    carbonSaved: "சேமிக்கப்பட்ட கார்பன்",
    moneyEarned: "ஈட்டிய பணம்",
    contributions: "பங்களிப்புகள்",
    level: "நிலை",
    logOut: "வெளியேறு",
    selectLanguage: "மொழி",
    welcomeBack: "மீண்டும் வருக",
    joined: "இணைந்தது",
    registerHeader: "வட்ட முனையத்தை பதிவு செய்க",
    registerDesc: "ReLoop AI செயலில் உள்ள முனையங்களில் செயல்படுகிறது. பொருட்களைப் பகிரவும், கார்பன் சேமிப்பைக் கண்காணிக்கவும் கீழே உங்கள் தனித்துவமான அடையாளத்தை வரையறுக்கவும்.",
    loginHeader: "வட்ட முனையத்தில் உள்நுழைக",
    loginDesc: "உங்கள் தூய்மையான உள்கட்டமைப்பை நிர்வகிக்க, சொத்துக்களை வர்த்தகம் செய்ய மற்றும் தகவல்களைப் பெற உங்கள் நிர்வாகி மின்னஞ்சலுடன் உள்நுழையவும்.",
    nodeName: "பிரதிநிதி பெயர்",
    adminEmail: "நிர்வாக மின்னஞ்சல்",
    municipalLocation: "நகராட்சி முனையத்தின் இடம்",
    circularRole: "வட்ட பாத்திர வகை",
    initializeNode: "வட்ட முனையத்தைத் தொடங்கு",
    backToLogin: "உள்நுழைவுக்குத் திரும்பு",
    goToRegister: "கணக்கு இல்லையா? புதிய முனையத்தை பதிவு செய்க",
    goToLogin: "ஏற்கனவே பதிவு செய்துள்ளீர்களா? இங்கே உள்நுழைக",
    uploadAvatar: "சாதனத்திலிருந்து அவதாரைப் பதிவேற்றவும்",
    dragOrClick: "படக் கோப்பைத் தேர்ந்தெடுக்க இழுத்து விடவும் அல்லது கிளிக் செய்யவும் (PNG/JPG)",
    pasteUrl: "அல்லது தனிப்பயன் பட URL ஐ ஒட்டவும்",
    selectPreset: "தயாராக இருக்கும் அவதார் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்",
    enterValidEmail: "தயவுசெய்து சரியான நிர்வாகி மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
    enterLocation: "தயவுசெய்து சரியான இடத்தை உள்ளிடவும் (உதாரணமாக: அடையாறு, சென்னை).",
    enterName: "உங்கள் முனையத்திற்கு செல்லுபடியாகும் காட்சி பெயரை வழங்கவும்.",
    telemetryStatus: "நிகழ்நேர வட்ட OS தொலைத்தொடர்பு முனை",
    interactiveSimulation: "ஊடாடும் உருவகப்படுத்துதல் பயன்முறை செயலில் உள்ளது",
    totalNodesOperating: "செயல்பாட்டில் உள்ள வட்ட முனைகள்",
    tonsDiverted: "உலகளவில் மாற்றப்பட்ட டன் அளவுகள்",
    registerCustomProfile: "தனிப்பயன் தயாரிப்பை பதிவுசெய்க",

    userTier: "பயனர் அடுக்கு",
    levelCitizen: "நிலை {level} குடிமகன்",
    editProfile: "விவரத்தைத் திருத்து",
    activelyRecirculating: "பிப்ரவரி 2026 முதல் சுழற்சியில் தீவிரமாகப் பங்கேற்கிறது",
    initiateScan: "ஸ்கேன் தொடங்கு",
    browseLivePostings: "நேரடி ஆதாரப் பதிவுகளைப் பார்க்கவும்",
    carbonSalvaged: "மீட்டெடுக்கப்பட்ட கார்பன்",
    forestGrowth: "சமமான காடு வளர்ச்சி",
    waterSaved: "சேமிக்கப்பட்ட நீர் வளம்",
    revenueGenerated: "ஈட்டிய வருவாய்",
    adultTrees: "வளர்ந்த மரங்கள்",
    litersFresh: "லிட்டர் நன்னீர்",
    rupeesCash: "ரூபாய் பணம்",
    equivalentTo: "இதற்குச் சமம்",
    greenhouseGas: "பசுமை இல்ல வாயு",
    co2Absorbed: "வருடாந்திர அளவில் மரங்களால் உறிஞ்சப்படும் கார்பன்.",
    divertedIndustrial: "தொழில்துறை கழிவுகளிலிருந்து திசைதிருப்பப்பட்டது.",
    circularEconomyPayout: "சுழற்சி பொருளாதார பலன்.",
    activeCircularPostings: "பெறுவதற்கு தயாராக உள்ள நேரடி சுழற்சி பதிவுகள்",
    receiverSourcingHub: "பெறுநர் ஆதார மையம்",
    activeCircularPostingsDesc: "குடிமக்கள் மற்றும் வணிகக் கொடையாளர்களால் பட்டியலிடப்பட்ட உண்மையான கழிவுப் பொருட்கள், நன்கொடைகள் கீழே உள்ளன. அவற்றின் சுழற்சி வழிகாட்டுதல்களை ஆராய்ந்து உடனடியாகப் பெற்றிடுங்கள்.",
    availableBatches: "கிடைக்கக்கூடிய தொகுப்புகள்",
    liveLots: "நேரடி தொகுப்புகள்",
    freeDonations: "இலவச நன்கொடைகள்",
    free: "இலவச",
    searchPlaceholder: "பொருள், தலைப்பு அல்லது இருப்பிடத்தின் அடிப்படையில் தேடுக...",
    allTransactionTypes: "அனைத்து பரிவர்த்தனை வகைகள்",
    donationsAndFree: "🎁 நன்கொடைகள் & இலவச பிக்கப்",
    commercialSourcing: "💼 வணிக ஆதாரங்கள்",
    primaryMaterial: "முதன்மையான பொருள்",
    lotQuantity: "தொகுப்பு அளவு",
    nodeLocation: "முனைய இருப்பிடம்",
    inspectAndClaimLot: "பரிசோதித்துத் தொகுப்பைப் பெறு",
    noMatchingPostings: "பொருந்தக்கூடிய பதிவுகள் எதுவும் இல்லை.",
    trySelectingDifferent: "முடிவுகளை வடிகட்ட வேறு தேடல் அளவுகோல்களைத் தேர்ந்தெடுக்கவும்.",
    closeSourcingView: "ஆதாரக் காட்சியினை மூடு",
    quickProfferPinned: "விரைவான கொள்முதல் சலுகை குறிக்கப்பட்டது",
    compensationPayout: "இழப்பீட்டுத் தொகையை அங்கீகரி",
    claimAndSecureLot: "தொகுப்பைப் பெற்றுப் பாதுகாத்திடு",
    sourceGiverNode: "கொடையாளர் முனையம்",
    batchWeight: "தொகுப்பு எடை",
    listedValue: "பட்டியலிடப்பட்ட மதிப்பு",
    expectedProcurementOutcome: "எதிர்பார்க்கப்படும் செயல்முறை முடிவு",
    loopSourcing: "சுழற்சி ஆதாரம்",
    expectedProcurementDesc: "இந்த பங்களிப்பாளர் நகராட்சி மறுசுழற்சி நெட்வொர்க்குகளுக்கு நேரடி ஆதரவைக் கோரியுள்ளார். கவனத்துடன் கையாளவும்.",
    instructionsGuidelines: "கொடையாளரின் கையாளுதல் மற்றும் சேகரிப்பு விதிகள்",
    logisticsContact: "உடனடி லாஜிஸ்டிக்ஸ் தொடர்பு",
    expressClaimInterest: "விருப்பம் மற்றும் கட்டணத்தை வெளிப்படுத்து",
    offerCompensationPoints: "இந்த வளத்தைப் பெற இழப்பீட்டு புள்ளிகள் அல்லது ரூபாய் செலுத்துங்கள்.",
    payoutAmount: "செலுத்தும் தொகை",
    quickValues: "விரைவான மதிப்புகள்",
    payoutPoints: "புள்ளிகள் (RP)",
    payoutCash: "ரூபாய் (INR)",
    levelLabel: "நிலை",
  },
  hi: {
    appTitle: "ReLoop AI",
    dashboard: "डैशबोर्ड",
    scanner: "एआई स्कैनर",
    marketplace: "बाज़ार",
    circularMap: "परिपत्र नक्शा",
    communityPools: "सामुदायिक पूल",
    industryHub: "उद्योग हब",
    logistics: "लॉजिस्टिक्स रूटिंग",
    aiSpecialist: "एआई विशेषज्ञ",
    circularityScore: "परिपत्रता स्तर स्कोर",
    carbonSaved: "कार्बन की बचत",
    moneyEarned: "अर्जित धन राशि",
    contributions: "कुल योगदान",
    level: "स्तर",
    logOut: "लॉग आउट",
    selectLanguage: "भाषा",
    welcomeBack: "आपका स्वागत है",
    joined: "शामिल हुए",
    registerHeader: "अपने परिपत्र नोड को पंजीकृत करें",
    registerDesc: "ReLoop AI सक्रिय नोड्स पर कार्य करता है। सामग्री प्रकाशित करने, रिवर्स शिपिंग का समन्वय करने और वास्तविक कार्बन ऑफसेट को ट्रैक करने के लिए नीचे अपनी अनूठी पहचान परिभाषित करें।",
    loginHeader: "परिपत्र नोड पोर्टल पर लॉगिन करें",
    loginDesc: "अपने स्थानीयकृत स्वच्छ सामग्री पासपोर्ड लॉग को प्रबंधित करने, व्यापार करने और रूटिंग पुनः प्राप्त करने के लिए अपने व्यवस्थापक ईमेल से लॉगिन करें।",
    nodeName: "प्रतिनिधि का नाम",
    adminEmail: "प्रशासक ईमेल आईडी",
    municipalLocation: "नगरपालिका नोड स्थान",
    circularRole: "परिपत्र भूमिका प्रकार",
    initializeNode: "परिपत्र नोड प्रारंभ करें",
    backToLogin: "लॉगिन पर वापस जाएं",
    goToRegister: "खाता नहीं है? नोड पंजीकृत करें",
    goToLogin: "पहले से पंजीकृत हैं? यहाँ लॉगिन करें",
    uploadAvatar: "उपकरण से अवतार फोटो अपलोड करें",
    dragOrClick: "छवि फ़ाइल को खींचें और छोड़ें या चुनने के लिए क्लिक करें (PNG/JPG)",
    pasteUrl: "या कस्टम छवि यूआरएल लिंक पेस्ट करें",
    selectPreset: "प्रीसेट प्रोफाइल फोटो चुनें",
    enterValidEmail: "कृपया एक वैध व्यवस्थापक ईमेल दर्ज करें।",
    enterLocation: "कृपया एक प्रासंगिक नगर स्थान दर्ज करें (जैसे कि बांद्रा पश्चिम, मुंबई)।",
    enterName: "कृपया अपने नोड के लिए एक वैध नाम प्रदान करें।",
    telemetryStatus: "वास्तविक समय परिपत्र ओएस टेलीमेट्री नोड",
    interactiveSimulation: "इंटरएक्टिव सिमुलेशन मोड सक्रिय है",
    totalNodesOperating: "सक्रिय परिपत्र नोड्स",
    tonsDiverted: "विश्व स्तर पर डाइवर्ट किया गया टन",
    registerCustomProfile: "कस्टम प्रोफाइल पंजीकृत करें",

    userTier: "उपयोगकर्ता श्रेणी",
    levelCitizen: "स्तर {level} नागरिक",
    editProfile: "प्रोफ़ाइल संपादित करें",
    activelyRecirculating: "फरवरी 2026 से सर्कुलर ग्रिड पर सक्रिय रूप से कार्यरत",
    initiateScan: "स्कैन शुरू करें",
    browseLivePostings: "लाइव सोर्सिंग पोस्टिंग देखें",
    carbonSalvaged: "बचाया गया कार्बन",
    forestGrowth: "समतुल्य वन विकास",
    waterSaved: "बचाया गया जल संसाधन",
    revenueGenerated: "अर्जित राजस्व",
    adultTrees: "वयस्क पेड़",
    litersFresh: "लीटर ताज़ा जल",
    rupeesCash: "रुपये नकद",
    equivalentTo: "के बराबर",
    greenhouseGas: "ग्रीनहाउस गैस",
    co2Absorbed: "वयस्क पेड़ों द्वारा प्रतिवर्ष अवशोषित CO₂।",
    divertedIndustrial: "औद्योगिक अपशिष्ट जल नालियों से डाइवर्ट किया गया।",
    circularEconomyPayout: "सर्कुलर इकोनॉमी पेआउट।",
    activeCircularPostings: "प्राप्ति के लिए सक्रिय परिपत्र पोस्टिंग तैयार हैं",
    receiverSourcingHub: "प्राप्तकर्ता सोर्सिंग हब",
    activeCircularPostingsDesc: "नागरिकों और व्यवसाय दाताओं द्वारा सूचीबद्ध वास्तविक अपशिष्ट सामग्री, दान नीचे दिए गए हैं। उनके दिशानिर्देशों का निरीक्षण करें और तुरंत लॉट पर दावा करें।",
    availableBatches: "उपलब्ध बैच",
    liveLots: "लाइव लॉट",
    freeDonations: "निःशुल्क दान",
    free: "मुफ़्त",
    searchPlaceholder: "सामग्री मिश्रण, शीर्षक या स्थान द्वारा खोजें...",
    allTransactionTypes: "सभी लेनदेन प्रकार",
    donationsAndFree: "🎁 दान और निःशुल्क पिकअप",
    commercialSourcing: "💼 व्यावसायिक सोर्सिंग (भुगतान)",
    primaryMaterial: "प्राथमिक सामग्री",
    lotQuantity: "लॉट मात्रा",
    nodeLocation: "नोड स्थान",
    inspectAndClaimLot: "निरीक्षण करें और दावा करें",
    noMatchingPostings: "कोई मेल खाने वाली परिपत्र पोस्टिंग नहीं मिली।",
    trySelectingDifferent: "विभिन्न फ़िल्टरिंग मानदंडों का चयन करने का प्रयास करें या खोज को परिशोधित करें।",
    closeSourcingView: "सोर्सिंग दृश्य बंद करें",
    quickProfferPinned: "त्वरित खरीद प्रस्ताव प्रेषित किया गया",
    compensationPayout: "मुआवजा भुगतान अधिकृत करें",
    claimAndSecureLot: "दावा करें और लॉट सुरक्षित करें",
    sourceGiverNode: "स्रोत दाता नोड",
    batchWeight: "बैच वजन",
    listedValue: "सूचीबद्ध मान",
    expectedProcurementOutcome: "अपेक्षित प्रक्रिया परिणाम",
    loopSourcing: "लूप सोर्सिंग",
    expectedProcurementDesc: "दाता ने नगरपालिका पुनर्चक्रण नेटवर्क के लिए सीधे समर्थन का अनुरोध किया है। सावधानी से संभालें।",
    instructionsGuidelines: "दाता हैंडलिंग और संग्रह नियम",
    logisticsContact: "तत्काल रसद संपर्क",
    expressClaimInterest: "दावा रुचि और भुगतान व्यक्त करें",
    offerCompensationPoints: "इस संसाधन लॉट को सुरक्षित करने के लिए मुआवजा अंक या नकद भुगतान की पेशकश करें।",
    payoutAmount: "भुगतान राशि",
    quickValues: "त्वरित मूल्य",
    payoutPoints: "अंक (RP)",
    payoutCash: "रुपये (INR)",
    levelLabel: "स्तर",
  },
  te: {
    appTitle: "ReLoop AI",
    dashboard: "డాష్‌బోర్డ్",
    scanner: "AI స్కానర్",
    marketplace: "మార్కెట్‌ప్లేస్",
    circularMap: "సర్క్యులర్ మ్యాప్",
    communityPools: "కమ్యూనిటీ పూల్స్",
    industryHub: "పరిశ్రమ హబ్",
    logistics: "లాజిస్టిక్స్ రూటింగ్",
    aiSpecialist: "AI నిపుణుడు",
    circularityScore: "సర్క్యులారిటీ స్కోర్",
    carbonSaved: "పొదుపు చేసిన కార్బన్",
    moneyEarned: "ఆర్జించిన డబ్బు",
    contributions: "మొత్తం సహకారాలు",
    level: "స్థాయి",
    logOut: "లాగ్ అవుట్",
    selectLanguage: "భాష",
    welcomeBack: "స్వాగతం",
    joined: "చేరిన తేదీ",
    registerHeader: "మీ సర్క్యులర్ నోడ్‌ను నమోదు చేయండి",
    registerDesc: "ReLoop AI క్రియాశీల నోడ్లలో పనిచేస్తుంది. పదార్థాలను ప్రచురించడానికి, రివర్స్ షిప్పింగ్‌ను సమన్వయం చేయడానికి మరియు కార్బన్ పొదుపులను ట్రాక్ చేయడానికి మీ ప్రత్యేక గుర్తింపును నమోదు చేయండి.",
    loginHeader: "సర్క్యులర్ నోడ్ పోర్టల్‌లోకి లాగిన్ అవ్వండి",
    loginDesc: "మీ స్వచ్ఛమైన మెటీరియల్స్ పాస్‌పోర్ట్ లాగ్‌ను నిర్వహించడానికి మరియు సమాచారాన్ని తిరిగి పొందడానికి మీ నిర్వాహక ఇమెయిల్‌తో లాగిన్ అవ్వండి.",
    nodeName: "ప్రతినిధి పేరు",
    adminEmail: "అడ్మినిస్ట్రేటర్ ఇమెయిల్ ఐడి",
    municipalLocation: "మున్సిపల్ నోడ్ స్థానం",
    circularRole: "సర్క్యులర్ రోల్ రకం",
    initializeNode: "సర్క్యులర్ నోడ్‌ను ప్రారంభించండి",
    backToLogin: "లాగిన్‌కి తిరిగి వెళ్లు",
    goToRegister: "ఖాతా లేదా? నోడ్‌ను నమోదు చేయండి",
    goToLogin: "ఇప్పటికే నమోదు చేసుకున్నారా? ఇక్కడ లాగిన్ అవ్వండి",
    uploadAvatar: "పరికరం నుండి అవతార్ ఫోటోను అప్‌లోడ్ చేయండి",
    dragOrClick: "చిత్ర ఫైల్‌ను లాగండి లేదా ఎంచుకోవడానికి క్లిక్ చేయండి (PNG/JPG)",
    pasteUrl: "లేదా కస్టమ్ ఇమేజ్ URL లింక్‌ను పేస్ట్ చేయండి",
    selectPreset: "ప్రీసెట్ ప్రొఫైల్ ఫోటో ఎంచుకోండి",
    enterValidEmail: "దయచేసి సరైన నిర్వాహక ఇమెయిల్ నమోదు చేయండి.",
    enterLocation: "దయచేసి సరైన మున్సిపల్ స్థానాన్ని నమోదు చేయండి (उदा. బాంద్రా వెస్ట్, ముంబై).",
    enterName: "దయచేసి మీ నోడ్ కోసం చెల్లుబాటు అయ్యే పేరును అందించండి.",
    telemetryStatus: "రియల్ టైమ్ సర్క్యులర్ OS టెలిమెట్రీ నోడ్",
    interactiveSimulation: "ఇంటరాక్టివ్ సిమ్యులేషన్ మోడ్ యాక్టివ్‌లో ఉంది",
    totalNodesOperating: "సక్రియ సర్క్యులర్ నోడ్స్",
    tonsDiverted: "ప్రపంచవ్యాప్తంగా దారి మళ్లించిన టన్నులు",
    registerCustomProfile: "కస్టమ్ ప్రొఫైల్ నమోదు చేయండి",

    userTier: "వినియోగదారు శ్రేణి",
    levelCitizen: "స్థాయి {level} పౌరుడు",
    editProfile: "ప్రొఫైల్ సవరించు",
    activelyRecirculating: "ఫిబ్రవరి 2026 నుండి సర్క్యులర్ గ్రిడ్‌లో చురుకుగా పనిచేస్తున్నారు",
    initiateScan: "స్కాన్ ప్రారంభించు",
    browseLivePostings: "లైవ్ సోర్సింగ్ పోస్టింగ్‌లను బ్రౌజ్ చేయండి",
    carbonSalvaged: "పొదుపు చేసిన కార్बన్",
    forestGrowth: "సమానమైన అడవి పెరుగుదల",
    waterSaved: "పొదుపు చేసిన నీటి వనరులు",
    revenueGenerated: "ఆర్జించిన ఆదాయం",
    adultTrees: "పెద్ద వృక్షాలు",
    litersFresh: "లీటర్ల మంచినీరు",
    rupeesCash: "రూపాయల నగదు",
    equivalentTo: "దీనితో సమానం",
    greenhouseGas: "గ్రీన్‌హౌస్ వాయువు",
    co2Absorbed: "చెట్లు ప్రతి సంవత్సరం గ్రహించే CO₂.",
    divertedIndustrial: "పారిశ్రామిక వ్యర్థాల నుండి దారి మళ్లించబడింది.",
    circularEconomyPayout: "సర్క్యులర్ ఎకానమీ చెల్లింపు.",
    activeCircularPostings: "స్వీకరించడానికి సిద్ధంగా ఉన్న సక్రియ సర్క్యులర్ పోస్టింగ్‌లు",
    receiverSourcingHub: "స్వీకర్త సోర్సింగ్ హబ్",
    activeCircularPostingsDesc: "పౌరులు మరియు వ్యాపార దాతలు జాబితా చేసిన నిజమైన వ్యర్థ పదార్థాలు, విరాళాలు క్రింద ఉన్నాయి. వాటి మార్గదర్శకాలను తనిఖీ చేసి, వెంటనే లాట్‌ను క్లెయిమ్ చేయండి.",
    availableBatches: "అందుబాటులో ఉన్న బ్యాచ్‌లు",
    liveLots: "లైవ్ లాట్లు",
    freeDonations: "ఉచిత విరాళాలు",
    free: "ఉచితం",
    searchPlaceholder: "మెటీరియల్స్, శీర్షిక లేదా స్థానం ఆధారంగా వెతకండి...",
    allTransactionTypes: "అన్ని లావాదేవీ రకాలు",
    donationsAndFree: "🎁 విరాళాలు & ఉచిత పికప్",
    commercialSourcing: "💼 వాణిజ్య సోర్సింగ్ (చెల్లింపు)",
    primaryMaterial: "ప్రాథమిక మెటీరియల్",
    lotQuantity: "లాట్ పరిమాణం",
    nodeLocation: "నోడ్ స్థానం",
    inspectAndClaimLot: "తనిఖీ చేసి లాట్‌ను క్లెయిమ్ చేయండి",
    noMatchingPostings: "సరిపోలే సర్క్యులర్ పోస్టింగ్‌లు ఏవీ లభించలేదు.",
    trySelectingDifferent: "వేరే ఫిల్టర్ ఎంపికలను ప్రయత్నించండి లేదా శోధనను మార్చండి.",
    closeSourcingView: "సోర్సింగ్ వీక్షణను మూసివేయి",
    quickProfferPinned: "త్వరిత సేకరణ ప్రతిపాదన పిన్ చేయబడింది",
    compensationPayout: "పరిహారం చెల్లింపును ప్రాధికారీకరించు",
    claimAndSecureLot: "క్లెయిమ్ చేసి లాట్‌ను భద్రపరచండి",
    sourceGiverNode: "దాత నోడ్",
    batchWeight: "బ్యాచ్ బరువు",
    listedValue: "జాబितా విలువ",
    expectedProcurementOutcome: "ఎదురుచూస్తున్న ప్రక్రియ ఫలితం",
    loopSourcing: "లూప్ సోర్సింగ్",
    expectedProcurementDesc: "దాత మునిసిపల్ రీసైక్లింగ్ నెట్‌వర్క్‌ల కోసం ప్రత్యక్ష మద్దతును కోరారు. జాగ్రత్తగా వ్యవహరించండి.",
    instructionsGuidelines: "దాత నిర్వహణ & సేకరణ నియమాలు",
    logisticsContact: "తక్షణ రसद సంప్రదింపు",
    expressClaimInterest: "క్లెయిమ్ ఆసక్తి మరియు చెల్లింపును వ్యక్తపరచండి",
    offerCompensationPoints: "ఈ వనరుల లాట్‌ను దక్కించుకోవడానికి పరిహార పాయింట్లు లేదా నగదు చెల్లింపును ఆఫర్ చేయండి.",
    payoutAmount: "చెల్లింపు మొత్తం",
    quickValues: "త్వరిత విలువలు",
    payoutPoints: "పాయింట్లు (RP)",
    payoutCash: "రూపాయలు (INR)",
    levelLabel: "స్థాయి",
  }
};

/**
 * Robust dynamic post/text translation helper designed for ReLoop AI dashboard postings
 */
export function translatePostText(text: string, lang: LanguageCode): string {
  if (!text) return "";
  
  const dict: Record<string, Record<LanguageCode, string>> = {
    // 1. Post Titles
    "Flattened Shipping Cardboard Base": {
      en: "Flattened Shipping Cardboard Base",
      ta: "தட்டையான ஷிப்பிங் அட்டைப் பெட்டித் தொகுப்பு",
      hi: "चपटा शिपिंग कार्डबोर्ड बेस",
      te: "ఫ్లాట్ షిప్పింగ్ కార్డ్‌బోర్డ్ బేస్"
    },
    "Double-Sorted PET Beverage Bottles": {
      en: "Double-Sorted PET Beverage Bottles",
      ta: "இரண்டு முறை தரம் பிரிக்கப்பட்ட பிஇடி பாட்டில்கள்",
      hi: "डबल-वर्गीकृत पीईटी पेय की बोतलें",
      te: "డబుల్-సార్టెడ్ పిఇటి పానీయాల సీసాలు"
    },
    "Refurbished Wood Pallets (Standard size)": {
      en: "Refurbished Wood Pallets (Standard size)",
      ta: "புதுப்பிக்கப்பட்ட மரத்தாலான பேலட்டுகள்",
      hi: "नवीनीकृत लकड़ी के पैलेट (मानक आकार)",
      te: "పునరుద్ధరించిన చెక్క ప్యాలెట్లు (ప్రామాణిక పరిమాణం)"
    },
    "Assorted Heavy Metal Castings": {
      en: "Assorted Heavy Metal Castings",
      ta: "கனரக உலோக வார்ப்புகள்",
      hi: "मिश्रित भारी धातु के टुकड़े",
      te: "భారీ లోహపు ముక్కలు"
    },
    "Baled Cotton Canvas Textile Trimmings": {
      en: "Baled Cotton Canvas Textile Trimmings",
      ta: "பருத்தி துணி கழிவு மூட்டைகள்",
      hi: "बेल सूती कैनवास कपड़ा ट्रिमिंग्स",
      te: "హత్తి కాన్వాస్ వస్త్రాల ముక్కలు"
    },
    "Decommissioned Copper Coaxial Cables": {
      en: "Decommissioned Copper Coaxial Cables",
      ta: "பயன்படுத்தப்படாத செப்பு கோஆக்சியல் கேபிள்கள்",
      hi: "डीकमीशन किए गए कॉपर समाक्षीय केबल",
      te: "పనిచేయని రాగి కోయాక్సియల్ కేబుల్స్"
    },

    // 2. Materials
    "Unbleached Corrugated Board": {
      en: "Unbleached Corrugated Board",
      ta: "அட்டை காகிதப் பலகை",
      hi: "बिना ब्लीच किया हुआ संरेखित कार्डबोर्ड",
      te: "బ్లీచ్ చేయని ముడతల బోర్డు"
    },
    "PET-1 Clear Plastic": {
      en: "PET-1 Clear Plastic",
      ta: "PET-1 தெளிவான பிளாஸ்டிக்",
      hi: "पीईटी-1 पारदर्शी प्लास्टिक",
      te: "PET-1 స్పష్టమైన ప్లాస్టిక్"
    },
    "Hardwood / Pine softwood": {
      en: "Hardwood / Pine softwood",
      ta: "கடின மரம் / பைன் மென்மரம்",
      hi: "दृढ़ लकड़ी / देवदार की नरम लकड़ी",
      te: "గట్టి కలప / పైన్ సాఫ్ట్‌వుడ్"
    },
    "Structural steel & cast iron scrap": {
      en: "Structural steel & cast iron scrap",
      ta: "கட்டமைப்பு எஃகு மற்றும் வார்ப்பிரும்பு கழிவுகள்",
      hi: "संरचनात्मक स्टील और कच्चा लोहा स्क्रैप",
      te: "స్ట్రక్చరల్ స్టీల్ & కాస్ట్ ఐరన్ స్క్రాప్"
    },
    "100% natural cotton warp/weft scrap": {
      en: "100% natural cotton warp/weft scrap",
      ta: "100% இயற்கை பருத்தி கழிவு",
      hi: "100% प्राकृतिक कपास बार्प / वेफ्ट स्क्रैप",
      te: "100% సహజ పత్తి వస్త్ర వ్యర్థాలు"
    },
    "PVC jacketed high-grade Copper wiring": {
      en: "PVC jacketed high-grade Copper wiring",
      ta: "பிவிசி பூசப்பட்ட உயர்தர செப்பு கம்பிகள்",
      hi: "पीवीसी जैकेट वाले उच्च श्रेणी के तांबे के तार",
      te: "PVC కోటింగ్ ఉన్న రాగి తీగలు"
    },

    // 3. Categories
    "Plastic": { en: "Plastic", ta: "பிளாஸ்டிக்", hi: "प्लास्टिक", te: "ప్లాస్టిక్" },
    "Paper": { en: "Paper", ta: "காகிதம்", hi: "कागज", te: "కాగితం" },
    "Cardboard": { en: "Cardboard", ta: "அட்டை", hi: "कार्डबोर्ड", te: "కార్డ్‌బోర్డ్" },
    "Glass": { en: "Glass", ta: "கண்ணாடி", hi: "कांच", te: "గాజు" },
    "Metal": { en: "Metal", ta: "உலோகம்", hi: "धातु", te: "లోహం" },
    "E-Waste": { en: "E-Waste", ta: "மின்னணுக் கழிவு", hi: "ई-कचरा", te: "ఈ-వ్యర్థాలు" },
    "Furniture": { en: "Furniture", ta: "மரச்சாமான்கள்", hi: "फर्नीचर", te: "ఫర్నిచర్" },
    "Textiles": { en: "Textiles", ta: "ஜவுளி", hi: "कपड़ा", te: "వస్త్రాలు" },
    "Construction": { en: "Construction", ta: "கட்டுமானம்", hi: "निर्माण", te: "నిర్మాణం" },

    // 4. Conditions
    "New": { en: "New", ta: "புதியது", hi: "नया", te: "కొత్తది" },
    "Good": { en: "Good", ta: "நல்லது", hi: "अच्छा", te: "మంచిది" },
    "Fair": { en: "Fair", ta: "சாதாரணமானது", hi: "मध्यम", te: "నాయంగా ఉంది" },
    "Repurposed": { en: "Repurposed", ta: "மறுபயன்படுத்தப்பட்டது", hi: "पुनर्निर्मित", te: "మళ్లీ ఉపయోగించబడింది" },
    "Damaged": { en: "Damaged", ta: "சேதமடைந்தது", hi: "क्षतिग्रस्त", te: "పాడైపోయింది" },

    // 5. Locations
    "Bandra West, Mumbai": { en: "Bandra West, Mumbai", ta: "பாந்த்ரா வெஸ்ட், மும்பை", hi: "बांद्रा पश्चिम, मुंबई", te: "బాంద్రా వెస్ట్, ముంబై" },
    "Powai, Mumbai": { en: "Powai, Mumbai", ta: "பொவாய், மும்பை", hi: "पवई, मुंबई", te: "పవాయ్, ముంబై" },
    "Gachibowli, Hyderabad": { en: "Gachibowli, Hyderabad", ta: "கச்சிபௌலி, ஹைதராபாத்", hi: "गाचीबोवली, हैदराबाद", te: "గచ్చిబౌలి, హైదరాబాద్" },
    "Andheri East, Mumbai": { en: "Andheri East, Mumbai", ta: "அந்தேரி ஈஸ்ட், மும்பை", hi: "अंधेरी पूर्व, मुंबई", te: "అంధేరి ఈస్ట్, ముంబై" },
    "Dharavi Industrial Area, Mumbai": { en: "Dharavi Industrial Area, Mumbai", ta: "தாராவி தொழில்துறை பகுதி, மும்பை", hi: "धारावी औद्योगिक क्षेत्र, मुंबई", te: "ధారవి ఇండస్ట్రియల్ ఏరియా, ముంబై" },
    "Thane Industrial Estate, Thane": { en: "Thane Industrial Estate, Thane", ta: "தானே தொழில்துறை பகுதி, தானே", hi: "ठाणे औद्योगिक क्षेत्र, ठाणे", te: "ఠాణే ఇండస్ట్రియల్ ఎస్టేట్, ఠాణే" },
    "Kalyan Industrial Belt, Mumbai": { en: "Kalyan Industrial Belt, Mumbai", ta: "கல்யாண் தொழில்துறை மண்டலம், மும்பை", hi: "कल्याण औद्योगिक क्षेत्र, मुंबई", te: "కళ్యాణ్ ఇండస్ట్రియల్ బెల్ట్, ముంబై" },
    "Taloja, Navi Mumbai": { en: "Taloja, Navi Mumbai", ta: "தலோஜா, நவி மும்பை", hi: "तलोद, नवी मुंबई", te: "తలోజా, నవీ ముంబై" },
    "Panvel Industrial Complex, Navi Mumbai": { en: "Panvel Industrial Complex, Navi Mumbai", ta: "பன்வெல் தொழில்துறை வளாகம், நவி மும்பை", hi: "पनवेल औद्योगिक परिसर, नवी मुंबई", te: "పన్వేల్ ఇండస్ట్రియల్ కాంప్లెక్స్, నవీ ముంబై" },
    "Colaba, Mumbai": { en: "Colaba, Mumbai", ta: "கொலாபா, மும்பை", hi: "कोलाबा, मुंबई", te: "కొలాబా, ముంబై" },

    // 6. Intended outcomes
    "Recycle": { en: "Recycle", ta: "மறுசுழற்சி", hi: "रीसायकल", te: "రీసైకిల్" },
    "Reuse": { en: "Reuse", ta: "மறுபயன்பாடு", hi: "पुनः उपयोग", te: "తిరిగి వాడకం" },
    "Dispose": { en: "Dispose", ta: "அகற்று", hi: "निपटान", te: "పారవేయడం" },
    "Sell": { en: "Sell", ta: "விற்க", hi: "बेचना", te: "అమ్మకం" },

    // 7. Handover instruction guidelines
    "Please bundle using biodegradable jute threads only. Do not contact if boards have caught rain or wetness.": {
      en: "Please bundle using biodegradable jute threads only. Do not contact if boards have caught rain or wetness.",
      ta: "மக்கும் சணல் கயிறுகளை மட்டுமே கொண்டு கட்டவும். பலகைகள் மழையில் நனைந்திருந்தால் தொடர்பு கொள்ள வேண்டாம்.",
      hi: "कृपया केवल बायोडिग्रेडेबल जूट के धागों का उपयोग करके बंडल बनाएं। यदि बोर्ड आदि गीले हो गए हों तो संपर्क न करें।",
      te: "దయచేసి బయోడిగ్రేడబుల్ జూట్ తాడులతో మాత్రమే బండిల్స్ కట్టండి. బోర్డులు తడిగా ఉంటే దయచేసి సంప్రదించవద్దు."
    },
    "Strictly sorted: caps and rings removed. Bottles are pre-washed and dried. Suitable directly for sorting shredders.": {
      en: "Strictly sorted: caps and rings removed. Bottles are pre-washed and dried. Suitable directly for sorting shredders.",
      ta: "கண்டிப்பாக வகைப்படுத்தப்பட்டுள்ளது: மூடிகளும் வளையங்களும் அகற்றப்பட்டன. பாட்டில்கள் முன்கூட்டியே கழுவப்பட்டு உலர்த்தப்படுகின்றன.",
      hi: "सख्ती से छाँटा गया: कैप और रिंग हटा दिए गए। बोतलें पहले से धोई और सुखाई गई हैं। कतरन मशीनों के लिए सीधे उपयुक्त।",
      te: "ఖచ్చితంగా వర్గీకరించబడింది: మూతలు మరియు రింగులు తొలగించబడ్డాయి. సీసాలు ముందుగానే కడిగి ఆరబెట్టబడ్డాయి."
    },
    "Pallets have been sanded down to avoid wood splinters. Safe for upcycling to garden chairs or bookshelves.": {
      en: "Pallets have been sanded down to avoid wood splinters. Safe for upcycling to garden chairs or bookshelves.",
      ta: "காயங்களை தவிர்க்க பேலட்டுகள் நன்கு தேய்க்கப்பட்டு தயார் செய்யப்பட்டுள்ளன. பூந்தோட்ட நாற்காலிகள் செய்ய உகந்தது.",
      hi: "लकड़ी की छीलन से बचने के लिए पैलेटों को रेत कर समतल किया गया है। बगीचे की कुर्सियों या किताबों की अलमारियों में बदलने के लिए सुरक्षित।",
      te: "చెక్క ముక్కల బారిన పడకుండా ప్యాలెట్లు మెరుగుపరచబడ్డాయి. తోట కుర్చీలు లేదా బుక్‌షెల్ఫ్‌ల తయారీకి సురక్షితం."
    },
    "Cast iron pieces require mechanical grinding. Heavy vehicle loading docks are accessible directly on premise.": {
      en: "Cast iron pieces require mechanical grinding. Heavy vehicle loading docks are accessible directly on premise.",
      ta: "வார்ப்பிரும்பு துண்டுகளுக்கு அரைத்தல் தேவைப்படுகிறது. ஏற்றுவதற்கான கனரக வாகன வசதிகள் நேரடியாக வளாகத்தில் உள்ளன.",
      hi: "कच्चा लोहा के टुकड़ों को यांत्रिक ग्राइंडिंग की आवश्यकता होती है। भारी वाहन लोडिंग डॉक सीधे परिसर में उपलब्ध हैं।",
      te: "కాస్ట్ ఐరన్ ముక్కలకు గ్రైండింగ్ అవసరం. భారీ వాహనాల లోడింగ్ సదుపాయం నేరుగా సంస్థ ఆవరణలోనే లభిస్తుంది."
    },
    "Best for crafting patchwork materials, bags or thermal insulation. Packed tightly inside airtight polymers.": {
      en: "Best for crafting patchwork materials, bags or thermal insulation. Packed tightly inside airtight polymers.",
      ta: "பேட்ச்வொர்க் பொருட்கள், பைகள் அல்லது வெப்ப காப்பு செய்ய சிறந்தது. காற்று புகாதவாறு இறுக்கமாக பேக் செய்யப்பட்டுள்ளது.",
      hi: "पैचवर्क सामग्री, बैग या थर्मल इन्सुलेशन बनाने के लिए सबसे अच्छा। एयरटाइट पॉलीमर के अंदर कसकर पैक किया गया।",
      te: "వస్త్రాల తయారీకి, బ్యాగులకు లేదా ఇన్సులేషన్‌కు ఉత్తమమైనవి. గాలి చొరబడని విధంగా గట్టిగా ప్యాక్ చేయబడింది."
    },
    "Do not incinerate jackets outdoors. Must lead to mechanical stripping stations to reclaim pure copper filaments.": {
      en: "Do not incinerate jackets outdoors. Must lead to mechanical stripping stations to reclaim pure copper filaments.",
      ta: "வெளியே எரிக்க வேண்டாம். தூய செப்பு இழைகளை மீட்டெடுக்க இயந்திர உதிரிப்பகுதி நிலையங்களுக்கு கொண்டு செல்லப்பட வேண்டும்.",
      hi: "बाहर प्लास्टिक को न जलाएं। शुद्ध तांबे के फिलामेंट्स को पुनः प्राप्त करने के लिए इसे यांत्रिक स्ट्रिपिंग स्टेशनों पर भेजना होगा।",
      te: "బహిరంగంగా వైర్లను కాల్చవద్దు. రాగిని సురక్షితంగా వేరుచేసే కేంద్రాలకు పంపాల్సి ఉంటుంది."
    },

    // 8. Industry Requirements Sourcing titles & descriptions
    "Clean transparent PET Flakes or shredded bottles": {
      en: "Clean transparent PET Flakes or shredded bottles",
      ta: "சுத்தமான வெளிப்படையான PET துகள்கள் அல்லது தூளாக்கப்பட்ட பாட்டில்கள்",
      hi: "साफ पारदर्शी पीईटी फ्लेक्स या कतरे हुए प्लास्टिक की बोतलें",
      te: "శుభ్రమైన పారదర్శక PET ముక్కలు లేదా నలిపిన బాటిళ్లు"
    },
    "Sourcing verified post-consumer clean clear PET-1 plastic bottles for our mechanical recycled polyester yarn production line. Must be washed, caps or label adhesives removed.": {
      en: "Sourcing verified post-consumer clean clear PET-1 plastic bottles for our mechanical recycled polyester yarn production line. Must be washed, caps or label adhesives removed.",
      ta: "எங்கள் மறுசுழற்சி செய்யப்பட்ட பாலியஸ்டர் நூல் உற்பத்தி வரிசைக்காக சரிபார்க்கப்பட்ட சுத்தமான PET-1 பிளாஸ்டிக் பாட்டில்களை கொள்முதல் செய்கிறோம். கழுவப்பட்டு மூடி அல்லது ஒட்டிகள் நீக்கப்பட வேண்டும்.",
      hi: "हमारे यांत्रिक पुनर्चक्रित पॉलिएस्टर यार्न उत्पादन लाइन के लिए सत्यापित स्वच्छ पारदर्शी पीईटी -1 प्लास्टिक बोतलों की सोर्सिंग। धुली हुई होनी चाहिए, कैप्स या लेबल चिपकने वाले पदार्थ हटा दिए जाने चाहिए।",
      te: "మా రీసైకిల్ పాలిస్టర్ దారం ఉత్పత్తి మార్గం కోసం ధృవీకరించబడిన శుభ్రమైన PET-1 ప్లాస్టిక్ సీసాలను సేకరిస్తున్నాము. కడిగి, మూతలు మరియు లేబుల్‌లు తొలగించబడాలి."
    },
    "Dry unbleached Corrugated Cardboard (OCC 11)": {
      en: "Dry unbleached Corrugated Cardboard (OCC 11)",
      ta: "உலர்ந்த அட்டை பெட்டிகள் (OCC 11)",
      hi: "सूखा बिना ब्लीच किया हुआ नालीदार कार्डबोर्ड (ओसीसी 11)",
      te: "పొడి మరియు బ్లీచ్ చేయని ముడతల కార్డ్‌బోర్డ్ (OCC 11)"
    },
    "Accepting flattened, un-waxed kraft corrugated cardboard containers. High cellulose fiber strength desired. Minimal humidity (<12% constraint).": {
      en: "Accepting flattened, un-waxed kraft corrugated cardboard containers. High cellulose fiber strength desired. Minimal humidity (<12% constraint).",
      ta: "தட்டையான, மெழுகு பூசப்படாத கிராஃப்ட் அட்டை பெட்டிகளை ஏற்றுக்கொள்கிறோம். அதிக செல்லுலோஸ் நார் வலிமை விரும்பப்படுகிறது. குறைந்த ஈரப்பதம் இருக்க வேண்டும் (<12%).",
      hi: "चपटे, बिना मोम वाले क्राफ्ट नालीदार कार्डबोर्ड कंटेनरों की स्वीकृति। उच्च सेल्यूलोज फाइबर शक्ति वांछित। न्यूनतम आर्द्रता (<12% कसौटी)।",
      te: "ఫ్లాట్ చేయబడిన ముడతల అట్టపెట్టెలను అంగీకరిస్తున్నాము. అధిక సెల్యులోజ్ ఫైబర్ బలం అవసరం. తక్కువ తేమ ఉండాలి (<12%)."
    },
    "Clean UBC Aluminum drink cans": {
      en: "Clean UBC Aluminum drink cans",
      ta: "சுத்தமான அலுமினிய பான கேன்கள்",
      hi: "साफ यूबीसी एल्युमीनियम कैन",
      te: "శుభ్రమైన అల్యూమినియం డ్రింక్ క్యాన్లు"
    },
    "Post-consumer crushed aluminum beverage can scrap. Density metrics will be assessed upon delivery. Guaranteed infinite closed-loop melt down pricing.": {
      en: "Post-consumer crushed aluminum beverage can scrap. Density metrics will be assessed upon delivery. Guaranteed infinite closed-loop melt down pricing.",
      ta: "நுகர்வோருக்குப் பிந்தைய நசுக்கப்பட்ட அலுமினிய பான கேன் குப்பைகள். அடர்த்தி அளவீடுகள் விநியோகத்தின் போது மதிப்பிடப்படும்.",
      hi: "उपभोक्ता द्वारा उपयोग किए गए कुचले हुए एल्युमीनियम कैन स्क्रैप। घनत्व मेट्रिक्स का आकलन डिलीवरी पर किया जाएगा।",
      te: "పానీయాల కోసం ఉపయోగించిన అల్యూమినియం క్యాన్ల వ్యర్థం. అప్పగింత సమయములో సాంద్రత కొలిచబడును."
    },
    "Crushed concrete, glass cullet & fly ash aggregation": {
      en: "Crushed concrete, glass cullet & fly ash aggregation",
      ta: "நொறுக்கப்பட்ட கான்கிரீட், கண்ணாடித் துகள்கள் மற்றும் பறக்கும் சாம்பல்",
      hi: "कुचला हुआ कंक्रीट, कांच के टुकड़े और फ्लाई ऐश एकत्रीकरण",
      te: "కూల్చిన కాంక్రీటు, గాజు ముక్కలు మరియు ఫ్లై యాష్ సేకరణ"
    },
    "Aggregate sand replacement materials desired. We buy glass cullet sizes between 5-10mm and solid aggregate masonry crushings for green fly-ash binder concrete blend.": {
      en: "Aggregate sand replacement materials desired. We buy glass cullet sizes between 5-10mm and solid aggregate masonry crushings for green fly-ash binder concrete blend.",
      ta: "மாற்று மணல் பொருட்கள் தேவை. பசுமை கான்கிரீட் கலவைக்கு 5-10 மிமீ கண்ணாடி துண்டுகள் மற்றும் திடமான கான்கிரீட் நொறுக்கல்களை வாங்குகிறோம்.",
      hi: "सैंड रिप्लेसमेंट सामग्री वांछित। हम पर्यावरण-अनुकूल कंक्रीट मिश्रण के लिए 5-10 मिमी के बीच के कांच के टुकड़े और ठोस चिनाई की पिसाई खरीदते हैं।",
      te: "ఇసుకకు ప్రత్యామ్నాయంగా ఉపయోగపడే మెటీరియల్స్ కావలెను. పర్యావరణ అనుకూల కంకర తయారీ కోసం 5-10 ఎంఎం సైజు గాజు ముక్కలను కొనుగోలు చేస్తాము."
    }
  };

  // Check matching dictionary
  const match = dict[text];
  if (match && match[lang]) {
    return match[lang];
  }

  // Fallback translators for location patterns or quantities or words on-the-fly
  let parsedText = text;
  if (lang === "ta") {
    parsedText = parsedText
      .replace(/free/gi, "இலவச")
      .replace(/kg/gi, "கிலோ")
      .replace(/pieces/gi, "துண்டுகள்")
      .replace(/pieces/gi, "துண்டுகள்")
      .replace(/Weekends/gi, "வார இறுதிநாட்கள்")
      .replace(/Weekdays/gi, "வாரநாட்கள்")
      .replace(/Mumbai/gi, "மும்பை")
      .replace(/Hyderabad/gi, "ஹைதராபாத்")
      .replace(/Thane/gi, "தானே");
  } else if (lang === "hi") {
    parsedText = parsedText
      .replace(/free/gi, "मुफ़्त")
      .replace(/kg/gi, "किग्रा")
      .replace(/pieces/gi, "टुकड़े")
      .replace(/Weekends/gi, "सप्ताहांत")
      .replace(/Weekdays/gi, "सप्ताह के दिन")
      .replace(/Mumbai/gi, "मुंबई")
      .replace(/Hyderabad/gi, "हैदराबाद")
      .replace(/Thane/gi, "ठाणे");
  } else if (lang === "te") {
    parsedText = parsedText
      .replace(/free/gi, "ఉచితం")
      .replace(/kg/gi, "కిలో")
      .replace(/pieces/gi, "ముక్కలు")
      .replace(/Weekends/gi, "వారాంతాలు")
      .replace(/Weekdays/gi, "వారపు రోజులు")
      .replace(/Mumbai/gi, "ముంబై")
      .replace(/Hyderabad/gi, "హైదరాబాదు")
      .replace(/Thane/gi, "ఠాణే");
  }

  return parsedText;
}
