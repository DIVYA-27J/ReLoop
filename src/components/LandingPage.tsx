import React from "react";
import { ArrowRight, Sparkles, Sprout, Recycle, ShieldCheck, Factory } from "lucide-react";
import { LanguageCode } from "../lib/translations";

interface LandingPageProps {
  onStartScanning: () => void;
  onExploreMarketplace: () => void;
  onEnterApp: () => void;
  lang?: LanguageCode;
}

const LANDING_TRANSLATIONS: Record<LanguageCode, {
  osVersion: string;
  beforeThrow: string;
  nextLife: string;
  heroDesc: string;
  scanBtn: string;
  exploreBtn: string;
  skipToDash: string;
  flowTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  wasteQuote: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
}> = {
  en: {
    osVersion: "V2.0.4 Circular Economy OS",
    beforeThrow: "Before You Throw It Away,",
    nextLife: "Discover Its Next Life.",
    heroDesc: "Transform waste into pristine raw materials. ReLoop AI is a Circular Economy Operating System matching citizens, community pools, and industries to achieve 100% material circulation.",
    scanBtn: "Scan Materials with AI",
    exploreBtn: "Explore Marketplace",
    skipToDash: "Or skip straight to Dashboard",
    flowTitle: "The Flow of Value: ReLoop Resource Circulation",
    step1Title: "1. Citizen Listing",
    step1Desc: "Individual households list packaging bulk, cardboard, or e-waste.",
    step2Title: "2. AI Resource Passport",
    step2Desc: "Computer vision rates circular potential and estimates carbon savings.",
    step3Title: "3. Logistics Pooling",
    step3Desc: "Smart routing consoles communities to build industrial bulk volume.",
    wasteQuote: '"Your waste is someone else\'s raw material." Every single step reduces carbon emissions and builds verifiable circular metrics.',
    pillar1Title: "Pristine Traceability",
    pillar1Desc: "Unlock full materials integrity via our Resource Passports documenting chemical compositions and previous lifecycles.",
    pillar2Title: "Verified Carbon Offsets",
    pillar2Desc: "Automatically measure metrics such as landfill diversion tonnage, water conservation, and greenhouse emissions prevented.",
    pillar3Title: "Industrial Decarbonization",
    pillar3Desc: "Access a resilient local supply of circular materials, keeping logistics localized and shielding procurement from supply line shocks.",
  },
  ta: {
    osVersion: "V2.0.4 வட்ட பொருளாதார செயலி",
    beforeThrow: "இதை நீங்கள் தூக்கி எறியும் முன்,",
    nextLife: "இதன் அடுத்த வாழ்க்கையைக் கண்டறியவும்.",
    heroDesc: "கழிவுப் பொருட்களை அசல் மூலப்பொருட்களாக மாற்றவும். ReLoop AI என்பது 100% பொருள் சுழற்சியை அடைவதற்கு குடிமக்கள், சமூகக் குளங்கள் மற்றும் தொழில்துறைகளை இணைக்கும் ஒரு வட்ட பொருளாதார இயக்க முறைமையாகும்.",
    scanBtn: "AI மூலம் பொருட்களை ஸ்கேன் செய்க",
    exploreBtn: "சந்தைப்பகுதியை ஆராயுங்கள்",
    skipToDash: "அல்லது நேரடியாக டாஷ்போர்டுக்குச் செல்லவும்",
    flowTitle: "மதிப்பின் ஓட்டம்: ReLoop வள சுழற்சி",
    step1Title: "1. குடிமகன் பட்டியல்",
    step1Desc: "தனிநபர் இல்லங்கள் பேக்கேஜிங் கழிவுகள், அட்டை மற்றும் மின்-கழிவுகளை பட்டியலிடுகின்றன.",
    step2Title: "2. AI வள பாஸ்போர்ட்",
    step2Desc: "கணினி பார்வை மூலம் சுழற்சி திறன் மதிப்பிடப்பட்டு கார்பன் சேமிப்புகள் கணக்கிடப்படுகிறது.",
    step3Title: "3. லாஜிஸ்டிக்ஸ் பூலிங்",
    step3Desc: "தொழில்துறை மொத்த அளவை உருவாக்க ஸ்மார்ட் ரூட்டிங் சமூகங்களை ஒருங்கிணைக்கிறது.",
    wasteQuote: '"உங்கள் கழிவு மற்றொருவரின் மூலப்பொருள்." ஒவ்வொரு படியும் கார்பன் உமிழ்வைக் குறைத்து சரிபார்க்கக்கூடிய சுழற்சி அளவீடுகளை உருவாக்குகிறது.',
    pillar1Title: "அசல் கண்டறிதல்",
    pillar1Desc: "வேதியியல் கலவைகள் மற்றும் முந்தைய வாழ்க்கைச் சுழற்சிகளை ஆவணப்படுத்தும் எங்கள் வள பாஸ்போர்ட்கள் மூலம் பொருட்களின் முழுமையான தன்மையைப் பெறுங்கள்.",
    pillar2Title: "சரிபார்க்கப்பட்ட கார்பன் ஆஃப்செட்டுகள்",
    pillar2Desc: "குப்பை கிடங்கு விலகல் டன் அளவு, நீர் பாதுகாப்பு மற்றும் தடுக்கப்பட்ட பசுமை இல்ல உமிழ்வுகள் போன்ற அளவீடுகளை தானாகவே அளவிடவும்.",
    pillar3Title: "தொழில்துறை கார்பன் குறைப்பு",
    pillar3Desc: "சுழற்சி பொருட்களின் நெகிழ்வான உள்ளூர் விநியோகத்தைப் பெறுங்கள், தளவாடங்களை உள்ளூர்மயமாக்குங்கள் மற்றும் விநியோகத் தடையிலிருந்து விடுபடுங்கள்.",
  },
  hi: {
    osVersion: "V2.0.4 सर्कुलर इकोनॉमी ओएस",
    beforeThrow: "इसे फेंकने से पहले,",
    nextLife: "इसके अगले जीवन की खोज करें।",
    heroDesc: "कचरे को अदूषित कच्चे माल में बदलें। ReLoop AI एक सर्कुलर इकोनॉमी ऑपरेटिंग सिस्टम है जो 100% सामग्री सर्कुलेशन प्राप्त करने के लिए नागरिकों, सामुदायिक पूलों और उद्योगों को जोड़ता है।",
    scanBtn: "एआई के साथ सामग्री स्कैन करें",
    exploreBtn: "बाज़ार का अन्वेषण करें",
    skipToDash: "या सीधे डैशबोर्ड पर जाएं",
    flowTitle: "मूल्य का प्रवाह: ReLoop संसाधन संचलन",
    step1Title: "1. नागरिक सूची",
    step1Desc: "व्यक्तिगत परिवार पैकेजिंग थोक, कार्डबोर्ड या ई-कचरा सूचीबद्ध करते हैं।",
    step2Title: "2. एआई संसाधन पासपोर्ट",
    step2Desc: "कंप्यूटर विज़न परिपत्र क्षमता को आंकता है और कार्बन बचत का अनुमान लगाता है।",
    step3Title: "3. लॉजिस्टिक्स पूलिंग",
    step3Desc: "स्मार्ट रूटिंग औद्योगिक थोक मात्रा बनाने के लिए समुदायों को जोड़ती है।",
    wasteQuote: '"आपका कचरा किसी और का कच्चा माल है।" हर एक कदम कार्बन उत्सर्जन को कम करता है और सत्यापन योग्य परिपत्र मेट्रिक्स बनाता है।',
    pillar1Title: "प्राचीन पता लगाने की क्षमता",
    pillar1Desc: "रासायनिक संरचनाओं और पिछले जीवन चक्रों का दस्तावेजीकरण करने वाले हमारे संसाधन पासपोर्ट के माध्यम से पूर्ण सामग्री अखंडता को अनलॉक करें।",
    pillar2Title: "सत्यापित कार्बन ऑफसेट",
    pillar2Desc: "स्वचालित रूप से लैंडफिल डायवर्जन टन भार, जल संरक्षण और रोके गए ग्रीनहाउस उत्सर्जन जैसे मेट्रिक्स को मापें।",
    pillar3Title: "औद्योगिक डीकार्बोनाइजेशन",
    pillar3Desc: "परिपत्र सामग्रियों की एक लचीली स्थानीय आपूर्ति तक पहुँचें, लॉजिस्टिक्स को स्थानीयकृत रखें और आपूर्ति श्रृंखला के झटकों से खरीद को सुरक्षित रखें।",
  },
  te: {
    osVersion: "V2.0.4 సర్క్యులర్ ఎకానమీ ఓఎస్",
    beforeThrow: "మీరు దీనిని పారవేసే ముందు,",
    nextLife: "దీని தదుపరి జీవితాన్ని కనుగొనండి.",
    heroDesc: "వ్యర్థాలను స్వచ్ఛమైన ముడి పదార్థాలుగా మార్చండి. ReLoop AI అనేది 100% మెటీరియల్ సర్క్యులేషన్ సాధించడం కోసం పౌరులు, కమ్యూనిటీ పూల్స్ మరియు పరిశ్రమలను అనుసంధానించే సర్క్యులర్ ఎకానమీ ఆపరేటింగ్ సిస్టమ్.",
    scanBtn: "AI తో మెటీరియల్స్ స్కాన్ చేయండి",
    exploreBtn: "మార్కెట్‌ప్లేస్‌ను అన్వేషించండి",
    skipToDash: "లేదా నేరుగా డాష్‌బోర్డ్‌కు వెళ్లండి",
    flowTitle: "విలువ ప్రవాహం: ReLoop వనరుల సర్క్యులేషన్",
    step1Title: "1. పౌరుల జాబితా",
    step1Desc: "వ్యక్తిగత గృహాలు ప్యాకేజింగ్ బల్క్, కార్డ్‌బోర్డ్ లేదా ఈ-వ్యర్థాలను జాబితా చేస్తాయి.",
    step2Title: "2. AI వనరుల పాస్‌పోర్ట్",
    step2Desc: "కంప్యూటర్ విజన్ సర్క్యులర్ సంభావ్యతను మరియు కార్బన్ పొదుపులను అంచనా వేస్తుంది.",
    step3Title: "3. లాజిస్టిక్స్ పూలింగ్",
    step3Desc: "పారిశ్రామిక బల్క్ వాల్యూమ్‌ను నిర్మించడానికి స్మార్ట్ రూటింగ్ కమ్యూనిటీలను ఏకం చేస్తుంది.",
    wasteQuote: '"మీ వ్యర్థాలు మరొకరి ముడి సరుకు." ప్రతి ఒక్క అడుగు కార్బన్ ఉద్గారాలను తగ్గిస్తుంది మరియు ధృవీకరించదగిన సర్క్యులర్ మెట్రిక్‌లను నిర్మిస్తుంది.',
    pillar1Title: "నిష్కల్మషమైన ట్రేసిబిలిటీ",
    pillar1Desc: "రసాయన కూర్పులు మరియు మునుపటి జీవిత చక్రాలను డాక్యుమెంట్ చేసే మా వనరుల పాస్‌పోర్ట్‌ల ద్వారా పూర్తి మెటీరియల్స్ సమగ్రతను అన్‌లాక్ చేయండి.",
    pillar2Title: "ధృవీకరించబడిన కార్బన్ ఆఫ్‌సెట్‌లు",
    pillar2Desc: "ల్యాండ్‌ఫిల్ డైవర్షన్ టన్నులు, నీటి పరిరక్షణ మరియు నిరోధించబడిన గ్రీన్‌హౌస్ ఉద్గారాల వంటి కొలమానాలను స్వయంచాలకంగా కొలవండి.",
    pillar3Title: "పారిశ్రామిక డీకార్బోనైజేషన్",
    pillar3Desc: "సర్క్యులర్ మెటీరియల్స్ యొక్క స్థానిక సరఫరాను యాక్సెస్ చేయండి, లాజిస్టిక్స్‌ను స్థానికీకరించండి మరియు సరఫరా లైన్ షాక్‌ల నుండి సేకరణను రక్షించండి.",
  }
};

export default function LandingPage({
  onStartScanning,
  onExploreMarketplace,
  onEnterApp,
  lang = "en",
}: LandingPageProps) {
  const currentLang = lang in LANDING_TRANSLATIONS ? lang : "en";
  const lt = LANDING_TRANSLATIONS[currentLang];

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100 overflow-y-auto" id="landing-page">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lt.osVersion}</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
          {lt.beforeThrow} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
            {lt.nextLife}
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
          {lt.heroDesc}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartScanning}
            id="hero-scan-btn"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white font-semibold rounded-2xl shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5" />
            <span>{lt.scanBtn}</span>
          </button>
          <button
            onClick={onExploreMarketplace}
            id="hero-market-btn"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-semibold rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>{lt.exploreBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onEnterApp}
          className="mt-6 text-sm text-emerald-700 font-medium hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{lt.skipToDash}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Visual Circular Flow Diagram */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-30 -ml-20 -mb-20"></div>

          <h3 className="text-center font-bold text-slate-400 text-xs uppercase tracking-widest mb-10">
            {lt.flowTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 font-bold shadow-xs">
                🏠
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{lt.step1Title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                {lt.step1Desc}
              </p>
            </div>

            <div className="hidden md:flex justify-center text-emerald-500">
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 font-bold shadow-xs">
                ✨
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{lt.step2Title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                {lt.step2Desc}
              </p>
            </div>

            <div className="hidden md:flex justify-center text-sky-500">
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-3 font-bold shadow-xs">
                🔄
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{lt.step3Title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                {lt.step3Desc}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-slate-600">
            {lt.wasteQuote}
          </div>
        </div>
      </div>

      {/* Value Pillars */}
      <div className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">{lt.pillar1Title}</h4>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                {lt.pillar1Desc}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center shrink-0">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">{lt.pillar2Title}</h4>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                {lt.pillar2Desc}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">{lt.pillar3Title}</h4>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                {lt.pillar3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
