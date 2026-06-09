/**
 * ReLoop AI - Circular Economy Operating System
 * Shared Type Definitions
 */

export type UserType =
  | "individual"
  | "apartment"
  | "school"
  | "business"
  | "recycler"
  | "ngo"
  | "industry";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar: string;
  location: string;
  circularityScore: number;
  level: number;
  joinedDate: string;
  contributionsCount: number; // number of items recirculated
  carbonSavedTotal: number; // in kg CO2
  moneyEarnedTotal: number; // in INR
  impactBadges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon name
  unlockedAt?: string;
  progressPercentage?: number;
}

export interface ResourcePassport {
  id: string;
  material: string;
  objectType: string;
  quantity: string;
  condition: string;
  marketDemand: "High" | "Medium" | "Low";
  estimatedValue: string;
  circularityScore: number;
  carbonSavings: string;
  recommendedAction: string;
  alternativeAction: string;
  materialComposition: string;
  recyclingPotential: string;
  reusePotential: string;
  scannedAt: string;
  image?: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  category: "Plastic" | "Paper" | "Cardboard" | "Glass" | "Metal" | "E-Waste" | "Furniture" | "Textiles" | "Construction";
  material: string;
  quantity: string;
  condition: "New" | "Good" | "Fair" | "Repurposed" | "Damaged";
  photos: string[];
  pickupAvailability: string;
  location: string;
  action: "Sell" | "Donate" | "Exchange" | "Free Pickup";
  price: string; // in INR, e.g. "₹120" or "Free"
  status: "Active" | "Pending" | "Completed";
  intendedOutcome?: "Sell" | "Reuse" | "Recycle" | "Dispose";
  instructions?: string;
  contactInfo?: string;
  listedBy: {
    id: string;
    name: string;
    type: UserType;
    avatar: string;
  };
  createdAt: string;
  matchScore?: number;
  offersCount: number;
}

export interface IndustryRequirement {
  id: string;
  companyName: string;
  location: string;
  pickupRadiusKm: number;
  materialNeeded: string;
  category: string;
  quantityRequiredKg: number;
  quantityFulfilledKg: number;
  pricePerKg: string; // e.g. "₹18"
  description: string;
  status: "Open" | "In-Progress" | "Fulfilled";
  postedAt: string;
}

export interface MapPin {
  id: string;
  name: string;
  type: "Recycling Center" | "Scrap Shop" | "NGO Drop-off" | "Collection Point" | "Industrial Buyer";
  location: string;
  distanceKm: number;
  rating: number;
  supportedMaterials: string[];
  pickupAvailable: boolean;
  contact: string;
  coordinates: { x: number; y: number }; // Relative percentage coordinates for an SVG map grid
  demandLevel: "Extreme" | "High" | "Moderate";
}

export interface CommunityPool {
  id: string;
  name: string;
  type: "Apartment" | "School" | "College" | "Office";
  location: string;
  totalCollectedKg: number;
  membersCount: number;
  earningsInr: number;
  carbonSavedKg: number;
  rank: number;
  topContributor: string;
  categoryBreakdown: { category: string; value: number }[];
  recentPickups: { date: string; material: string; quantity: string; destination: string }[];
}

export interface RouteMetrics {
  id: string;
  driverName: string;
  stops: number;
  materialsConsolidatedKg: number;
  estimatedCost: string;
  carbonSavingsKg: number;
  routeEfficiency: number; // percentage
  status: "Optimized" | "In-transit" | "Completed";
  waypoints: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "offer" | "achievement" | "alert";
  isRead: boolean;
}

export interface PlatformMetricItem {
  name: string;
  amount: number;
  unit: string;
  changeRate: string; // e.g. "+12.4% this month"
}
