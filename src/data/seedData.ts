import { 
  UserProfile, 
  MarketplaceListing, 
  IndustryRequirement, 
  MapPin, 
  CommunityPool, 
  RouteMetrics, 
  Badge,
  NotificationItem
} from "../types";

export const SEED_BADGES: Badge[] = [
  {
    id: "b1",
    title: "First Life",
    description: "Scan your first material using ReLoop AI.",
    iconName: "Maximize2",
    unlockedAt: "2026-05-12",
    progressPercentage: 100
  },
  {
    id: "b2",
    title: "Carbon Guardian",
    description: "Save over 100kg of CO₂ from landfills.",
    iconName: "ShieldAlert",
    unlockedAt: "2026-05-28",
    progressPercentage: 100
  },
  {
    id: "b3",
    title: "Gold Metalist",
    description: "Recirculate 50kg of metal structural resources.",
    iconName: "CircleDollarSign",
    progressPercentage: 64
  },
  {
    id: "b4",
    title: "Bulk Aggregator",
    description: "Contribute to a community collection pool over 5 times.",
    iconName: "Building2",
    progressPercentage: 80
  },
  {
    id: "b5",
    title: "Circular Citizen",
    description: "Reach a personal Circularity Score of 90 or more.",
    iconName: "Sun",
    unlockedAt: "2026-06-02",
    progressPercentage: 100
  },
  {
    id: "b6",
    title: "Eco Capitalist",
    description: "Generate ₹5,000 in revenue from circular resources.",
    iconName: "TrendingUp",
    progressPercentage: 35
  }
];

export const SEED_USERS: Record<string, UserProfile> = {
  individual: {
    id: "u_ind",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    type: "individual",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    location: "Bandra West, Mumbai",
    circularityScore: 88,
    level: 4,
    joinedDate: "Feb 2026",
    contributionsCount: 42,
    carbonSavedTotal: 154.5,
    moneyEarnedTotal: 3450,
    impactBadges: SEED_BADGES.filter(b => b.unlockedAt)
  },
  apartment: {
    id: "u_apt",
    name: "Greenwood Sanctuary Apartments",
    email: "greenwood.trust@gmail.com",
    type: "apartment",
    avatar: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=200",
    location: "Powai, Mumbai",
    circularityScore: 94,
    level: 7,
    joinedDate: "Jan 2026",
    contributionsCount: 380,
    carbonSavedTotal: 1240.2,
    moneyEarnedTotal: 22800,
    impactBadges: SEED_BADGES
  },
  school: {
    id: "u_sch",
    name: "Oakridge International School",
    email: "sustainability@oakridge.edu",
    type: "school",
    avatar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200",
    location: "Gachibowli, Hyderabad",
    circularityScore: 91,
    level: 5,
    joinedDate: "Mar 2026",
    contributionsCount: 195,
    carbonSavedTotal: 630.4,
    moneyEarnedTotal: 9200,
    impactBadges: SEED_BADGES.slice(0, 4)
  },
  business: {
    id: "u_biz",
    name: "SustainaCafe Bandra",
    email: "hello@sustainacafe.com",
    type: "business",
    avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=200",
    location: "Bandra, Mumbai",
    circularityScore: 89,
    level: 3,
    joinedDate: "Apr 2026",
    contributionsCount: 88,
    carbonSavedTotal: 310.8,
    moneyEarnedTotal: 6200,
    impactBadges: SEED_BADGES.slice(0, 3)
  },
  recycler: {
    id: "u_rec",
    name: "Apex Plastics & Metals Recycling",
    email: "operations@apexrecycling.co.in",
    type: "recycler",
    avatar: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=200",
    location: "Dharavi Industrial Area, Mumbai",
    circularityScore: 96,
    level: 9,
    joinedDate: "Nov 2025",
    contributionsCount: 1420,
    carbonSavedTotal: 5820.0,
    moneyEarnedTotal: 178000,
    impactBadges: SEED_BADGES
  },
  ngo: {
    id: "u_ngo",
    name: "EarthSustain Foundation",
    email: "contact@earthsustain.org",
    type: "ngo",
    avatar: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=200",
    location: "Andheri East, Mumbai",
    circularityScore: 95,
    level: 6,
    joinedDate: "Dec 2025",
    contributionsCount: 820,
    carbonSavedTotal: 2950.5,
    moneyEarnedTotal: 12000,
    impactBadges: SEED_BADGES.slice(0, 5)
  },
  industry: {
    id: "u_indus",
    name: "Novatex Polyester Industries",
    email: "sourcing@novatex.com",
    type: "industry",
    avatar: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=200",
    location: "Thane Industrial Estate, Thane",
    circularityScore: 92,
    level: 8,
    joinedDate: "Oct 2025",
    contributionsCount: 4500,
    carbonSavedTotal: 18450.0,
    moneyEarnedTotal: 0,
    impactBadges: SEED_BADGES
  }
};

export const SEED_MARKET_LISTINGS: MarketplaceListing[] = [
  {
    id: "list1",
    title: "Flattened Shipping Cardboard Base",
    category: "Cardboard",
    material: "Unbleached Corrugated Board",
    quantity: "45 kg",
    condition: "Good",
    photos: ["https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=500"],
    pickupAvailability: "Weekends, 9 AM - 4 PM",
    location: "Powai, Mumbai (Greenwood Tower A)",
    action: "Sell",
    price: "₹450",
    status: "Active",
    intendedOutcome: "Recycle",
    instructions: "Please bundle using biodegradable jute threads only. Do not contact if boards have caught rain or wetness.",
    contactInfo: "greenwood.trust@gmail.com | +91 98765 00122",
    listedBy: {
      id: "u_apt",
      name: "Greenwood Apartments",
      type: "apartment",
      avatar: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=100"
    },
    createdAt: "2026-06-07T12:00:00Z",
    matchScore: 94,
    offersCount: 2
  },
  {
    id: "list2",
    title: "Double-Sorted PET Beverage Bottles",
    category: "Plastic",
    material: "PET-1 Clear Plastic",
    quantity: "120 kg",
    condition: "New",
    photos: ["https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=500"],
    pickupAvailability: "Any weekday afternoon",
    location: "Gachibowli, Hyderabad",
    action: "Sell",
    price: "₹1,800",
    status: "Active",
    intendedOutcome: "Recycle",
    instructions: "Strictly sorted: caps and rings removed. Bottles are pre-washed and dried. Suitable directly for sorting shredders.",
    contactInfo: "sustainability@oakridge.edu | +91 91122 00445",
    listedBy: {
      id: "u_sch",
      name: "Oakridge School",
      type: "school",
      avatar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=100"
    },
    createdAt: "2026-06-08T09:30:00Z",
    matchScore: 98,
    offersCount: 4
  },
  {
    id: "list3",
    title: "Refurbished Wood Pallets (Standard size)",
    category: "Furniture",
    material: "Hardwood / Pine softwood",
    quantity: "18 pieces",
    condition: "Repurposed",
    photos: ["https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=500"],
    pickupAvailability: "Daily 10 AM - 8 PM",
    location: "Andheri East, Mumbai",
    action: "Exchange",
    price: "Exchange for Metal storage box",
    status: "Active",
    intendedOutcome: "Reuse",
    instructions: "Pallets have been sanded down to avoid wood splinters. Safe for upcycling to garden chairs or bookshelves.",
    contactInfo: "aarav.sharma@gmail.com | +91 99342 12110",
    listedBy: {
      id: "u_ind",
      name: "Aarav Sharma",
      type: "individual",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
    },
    createdAt: "2026-06-06T15:45:00Z",
    matchScore: 82,
    offersCount: 1
  },
  {
    id: "list4",
    title: "Assorted Heavy Metal Castings",
    category: "Metal",
    material: "Structural steel & cast iron scrap",
    quantity: "85 kg",
    condition: "Damaged",
    photos: ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=500"],
    pickupAvailability: "Prior scheduling required",
    location: "Thane Industrial Estate, Thane",
    action: "Sell",
    price: "₹2,500",
    status: "Active",
    intendedOutcome: "Recycle",
    instructions: "Cast iron pieces require mechanical grinding. Heavy vehicle loading docks are accessible directly on premise.",
    contactInfo: "sourcing@novatex.com | +91 88001 22990",
    listedBy: {
      id: "u_indus",
      name: "Novatex Polyester Indus.",
      type: "industry",
      avatar: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=100"
    },
    createdAt: "2026-06-08T16:20:00Z",
    matchScore: 90,
    offersCount: 3
  },
  {
    id: "list5",
    title: "Baled Cotton Canvas Textile Trimmings",
    category: "Textiles",
    material: "100% natural cotton warp/weft scrap",
    quantity: "60 kg",
    condition: "New",
    photos: ["https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=500"],
    pickupAvailability: "Mon-Wed, afternoons only",
    location: "Dharavi Industrial Area, Mumbai",
    action: "Donate",
    price: "Free Donation",
    status: "Active",
    intendedOutcome: "Reuse",
    instructions: "Best for crafting patchwork materials, bags or thermal insulation. Packed tightly inside airtight polymers.",
    contactInfo: "operations@apexrecycling.co.in | +91 77330 99881",
    listedBy: {
      id: "u_rec",
      name: "Apex Plastics & Metals",
      type: "recycler",
      avatar: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=100"
    },
    createdAt: "2026-06-09T05:00:00Z",
    matchScore: 87,
    offersCount: 0
  },
  {
    id: "list6",
    title: "Decommissioned Copper Coaxial Cables",
    category: "E-Waste",
    material: "PVC jacketed high-grade Copper wiring",
    quantity: "15 kg",
    condition: "Damaged",
    photos: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=500"],
    pickupAvailability: "Weekdays 8 AM - 11 AM",
    location: "Andheri West, Mumbai",
    action: "Sell",
    price: "₹3,750",
    status: "Active",
    intendedOutcome: "Recycle",
    instructions: "Do not incinerate jackets outdoors. Must lead to mechanical stripping stations to reclaim pure copper filaments.",
    contactInfo: "hello@sustainacafe.com | +91 99112 33445",
    listedBy: {
      id: "u_biz",
      name: "SustainaCafe Bandra",
      type: "business",
      avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=100"
    },
    createdAt: "2026-06-08T11:00:00Z",
    matchScore: 91,
    offersCount: 2
  }
];

export const SEED_INDUSTRY_REQUIREMENTS: IndustryRequirement[] = [
  {
    id: "ind_req1",
    companyName: "Novatex Polyester Industries Ltd.",
    location: "Thane Industrial Estate, Thane",
    pickupRadiusKm: 50,
    materialNeeded: "Clean transparent PET Flakes or shredded bottles",
    category: "Plastic",
    quantityRequiredKg: 2500,
    quantityFulfilledKg: 1200,
    pricePerKg: "₹18/kg",
    description: "Sourcing verified post-consumer clean clear PET-1 plastic bottles for our mechanical recycled polyester yarn production line. Must be washed, caps or label adhesives removed.",
    status: "In-Progress",
    postedAt: "2026-06-01"
  },
  {
    id: "ind_req2",
    companyName: "Century Pulp & Cardboard Mills",
    location: "Kalyan Industrial Belt, Mumbai",
    pickupRadiusKm: 75,
    materialNeeded: "Dry unbleached Corrugated Cardboard (OCC 11)",
    category: "Cardboard",
    quantityRequiredKg: 10000,
    quantityFulfilledKg: 4500,
    pricePerKg: "₹11/kg",
    description: "Accepting flattened, un-waxed kraft corrugated cardboard containers. High cellulose fiber strength desired. Minimal humidity (<12% constraint).",
    status: "In-Progress",
    postedAt: "2026-06-03"
  },
  {
    id: "ind_req3",
    companyName: "HindAlco Smelting Corp.",
    location: "Taloja, Navi Mumbai",
    pickupRadiusKm: 100,
    materialNeeded: "Clean UBC Aluminum drink cans",
    category: "Metal",
    quantityRequiredKg: 5000,
    quantityFulfilledKg: 5000,
    pricePerKg: "₹95/kg",
    description: "Post-consumer crushed aluminum beverage can scrap. Density metrics will be assessed upon delivery. Guaranteed infinite closed-loop melt down pricing.",
    status: "Fulfilled",
    postedAt: "2026-05-15"
  },
  {
    id: "ind_req4",
    companyName: "EcoBuild Portland & Concrete",
    location: "Panvel Industrial Complex, Navi Mumbai",
    pickupRadiusKm: 40,
    materialNeeded: "Crushed concrete, glass cullet & fly ash aggregation",
    category: "Construction",
    quantityRequiredKg: 15000,
    quantityFulfilledKg: 3200,
    pricePerKg: "₹4/kg",
    description: "Aggregate sand replacement materials desired. We buy glass cullet sizes between 5-10mm and solid aggregate masonry crushings for green fly-ash binder concrete blend.",
    status: "Open",
    postedAt: "2026-06-05"
  },
  {
    id: "ind_req5",
    companyName: "Bhabha Green Tech Labs",
    location: "Trombay Research Park, Mumbai",
    pickupRadiusKm: 30,
    materialNeeded: "Motherboards, gold-plated connectors & RAM cards",
    category: "E-Waste",
    quantityRequiredKg: 500,
    quantityFulfilledKg: 150,
    pricePerKg: "₹280/kg",
    description: "We source discarded compute components for eco-friendly hydrometallurgical gold/silver leaching at room temperature. We arrange secure data shredding verification certificates.",
    status: "Open",
    postedAt: "2026-06-06"
  }
];

export const SEED_MAP_PINS: MapPin[] = [
  {
    id: "pin1",
    name: "Mahim Circular Sorting Station (Apex)",
    type: "Recycling Center",
    location: "Express Highway, Mahim West, Mumbai",
    distanceKm: 4.2,
    rating: 4.8,
    supportedMaterials: ["Plastic", "Paper", "Cardboard", "Metal", "Glass"],
    pickupAvailable: true,
    contact: "+91 98334 11220",
    coordinates: { x: 35, y: 48 },
    demandLevel: "Extreme"
  },
  {
    id: "pin2",
    name: "Vora & Sons Precious Metals scrap",
    type: "Scrap Shop",
    location: "S.V. Road, Bandra West, Mumbai",
    distanceKm: 1.8,
    rating: 4.5,
    supportedMaterials: ["Metal", "E-Waste", "Batteries"],
    pickupAvailable: true,
    contact: "+91 22 2644 1009",
    coordinates: { x: 28, y: 32 },
    demandLevel: "High"
  },
  {
    id: "pin3",
    name: "Goonj Community Hub NGO",
    type: "NGO Drop-off",
    location: "Andheri Kurla Road, SAF Complex, Mumbai",
    distanceKm: 6.5,
    rating: 4.9,
    supportedMaterials: ["Textiles", "Furniture", "Books", "Kitchenware"],
    pickupAvailable: false,
    contact: "+91 99100 88776",
    coordinates: { x: 55, y: 25 },
    demandLevel: "Moderate"
  },
  {
    id: "pin4",
    name: "Co-op Housing Aggregation Depot",
    type: "Collection Point",
    location: "Central Avenue, Hiranandani, Powai",
    distanceKm: 8.1,
    rating: 4.2,
    supportedMaterials: ["Plastic", "Cardboard", "E-Waste"],
    pickupAvailable: true,
    contact: "+91 22 2570 4400",
    coordinates: { x: 72, y: 42 },
    demandLevel: "High"
  },
  {
    id: "pin5",
    name: "Novatex Refining & Shredding Hub",
    type: "Industrial Buyer",
    location: "Wagle Estate, Sector 5, Thane",
    distanceKm: 12.4,
    rating: 4.6,
    supportedMaterials: ["Plastic", "Cardboard", "Textiles"],
    pickupAvailable: true,
    contact: "sourcing@novatex.com",
    coordinates: { x: 85, y: 15 },
    demandLevel: "Extreme"
  }
];

export const SEED_COMMUNITY_POOLS: CommunityPool[] = [
  {
    id: "pool1",
    name: "Greenwood Sanctuary Apartments",
    type: "Apartment",
    location: "Powai, Mumbai",
    totalCollectedKg: 2840,
    membersCount: 420,
    earningsInr: 32400,
    carbonSavedKg: 9088,
    rank: 1,
    topContributor: "Anjali Gupta (Apt 501 - 128kg PET)",
    categoryBreakdown: [
      { category: "Plastic", value: 40 },
      { category: "Cardboard", value: 35 },
      { category: "Paper", value: 15 },
      { category: "Metal", value: 10 }
    ],
    recentPickups: [
      { date: "2026-06-05", material: "PET Plastics", quantity: "220 kg", destination: "Novatex Industrial Hub" },
      { date: "2026-05-28", material: "Corrugated Cardboard", quantity: "450 kg", destination: "Century Pulp Mills" }
    ]
  },
  {
    id: "pool2",
    name: "Future Minds Campus Hub",
    type: "School",
    location: "Gachibowli, Hyderabad",
    totalCollectedKg: 1420,
    membersCount: 1250,
    earningsInr: 15200,
    carbonSavedKg: 4544,
    rank: 3,
    topContributor: "Grade 9 Eco-Club (310kg paper books)",
    categoryBreakdown: [
      { category: "Paper", value: 50 },
      { category: "Plastic", value: 25 },
      { category: "E-Waste", value: 15 },
      { category: "Metal", value: 10 }
    ],
    recentPickups: [
      { date: "2026-06-01", material: "Pre-Sorted Office Paper", quantity: "380 kg", destination: "Apex Station" },
      { date: "2026-05-18", material: "Assorted E-waste keyboard kits", quantity: "75 kg", destination: "Bhabha Green Tech Labs" }
    ]
  }
];

export const SEED_SHIPPING_ROUTES: RouteMetrics[] = [
  {
    id: "route1",
    driverName: "Karan Singh (ReLoop Rig-A1)",
    stops: 4,
    materialsConsolidatedKg: 480,
    estimatedCost: "₹2,100",
    carbonSavingsKg: 1140,
    routeEfficiency: 96,
    status: "Optimized",
    waypoints: ["SustainaCafe", "Bandra Society", "Greenwood", "Mahim Station"]
  },
  {
    id: "route2",
    driverName: "Vinay Patil (Green Van-B3)",
    stops: 3,
    materialsConsolidatedKg: 240,
    estimatedCost: "₹1,450",
    carbonSavingsKg: 520,
    routeEfficiency: 88,
    status: "In-transit",
    waypoints: ["Andheri Hub", "Juhu Eco Club", "Novatex Thane"]
  }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "High Industrial Demand Alert 🚀",
    message: "Novatex added 1000kg to their PET plastic request. Value increased to ₹18/kg!",
    time: "4 mins ago",
    type: "alert",
    isRead: false
  },
  {
    id: "n2",
    title: "Buyer Interest in Cardboard",
    message: "Apex Recyclers requested details for 'Flattened Shipping Cardboard Base'. Check your offers.",
    time: "1 hour ago",
    type: "offer",
    isRead: false
  },
  {
    id: "n3",
    title: "Badge Unlocked: Carbon Guardian 🎖️",
    message: "Congratulations! You saved over 100kg of carbon emissions this quarter.",
    time: "2 days ago",
    type: "achievement",
    isRead: true
  },
  {
    id: "n4",
    title: "Pickup Confirmed for Greenwood Apartments",
    message: "ReLoop Logistics Rig-A1 driver Karan Singh is scheduled for tomorrow at 10 AM.",
    time: "1 day ago",
    type: "success",
    isRead: true
  }
];

// Rich dashboard analytics datasets
export const STATS_MONTH_TRENDS = [
  { month: "Jan", individual: 12, community: 40, industry: 120, carbon: 350 },
  { month: "Feb", individual: 15, community: 52, industry: 145, carbon: 512 },
  { month: "Mar", individual: 25, community: 78, industry: 210, carbon: 780 },
  { month: "Apr", individual: 34, community: 110, industry: 285, carbon: 1040 },
  { month: "May", individual: 42, community: 165, industry: 390, carbon: 1560 },
  { month: "Jun", individual: 55, community: 240, industry: 480, carbon: 1945 }
];

export const STATS_MATERIAL_BREAKDOWN = [
  { name: "Plastic (PET/HDPE)", value: 345, color: "#10b981" },
  { name: "Cardboard & Kraft", value: 280, color: "#0ea5e9" },
  { name: "Metals (Al/Steel)", value: 195, color: "#f97316" },
  { name: "Paper & Packaging", value: 120, color: "#a855f7" },
  { name: "Electronic Waste", value: 85, color: "#ef4444" },
  { name: "Textiles & Cotton", value: 65, color: "#eab308" }
];

export const STATS_REVENUE_TRENDS = [
  { month: "Jan", citizenRewards: 15000, industrySpend: 45000 },
  { month: "Feb", citizenRewards: 19500, industrySpend: 62000 },
  { month: "Mar", citizenRewards: 28000, industrySpend: 89000 },
  { month: "Apr", citizenRewards: 38500, industrySpend: 115000 },
  { month: "May", citizenRewards: 51000, industrySpend: 168000 },
  { month: "Jun", citizenRewards: 68000, industrySpend: 224000 }
];

export const STATS_CIRCULARITY_INDEX = [
  { month: "Jan", activeRate: 45, sortingAccuracy: 72 },
  { month: "Feb", activeRate: 52, sortingAccuracy: 76 },
  { month: "Mar", activeRate: 64, sortingAccuracy: 81 },
  { month: "Apr", activeRate: 75, sortingAccuracy: 88 },
  { month: "May", activeRate: 84, sortingAccuracy: 92 },
  { month: "Jun", activeRate: 91, sortingAccuracy: 95 }
];
