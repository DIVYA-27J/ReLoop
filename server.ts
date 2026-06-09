import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit to handle image uploads (base64)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize the Google Gen AI client safely
// The key process.env.GEMINI_API_KEY is available at runtime
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// AI Resource Scanner Endpoint
app.post("/api/scan", async (req, res) => {
  try {
    const { image, mimeType } = req.body;

    if (!image || !mimeType) {
      return res.status(400).json({ error: "Missing image data or mimeType" });
    }

    if (!apiKey) {
      // Return beautiful demo response if API key is not configured yet
      return res.json({
        success: true,
        demoMode: true,
        data: getDemoScanResponse()
      });
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: image,
      },
    };

    const promptText = `Analyze this discarded item and generate a detailed Circular Economy Resource Passport. 
We never refer to items as "waste" or "garbage" — they are "valuable resources".
Return the output strictly in JSON format matching this schema:
{
  "material": "General material classification (e.g. PET Plastic, Aluminium, Cardboard, Glass, Metal, E-Waste)",
  "objectType": "Specific object name (e.g. Water bottle, Beverage can, Packaging box)",
  "quantity": "Estimated weight or quantity with unit (e.g., 0.5 kg, 5 pieces)",
  "condition": "Condition estimate (e.g., Good, Fair, Damaged)",
  "marketDemand": "High, Medium, or Low",
  "estimatedValue": "Estimated market value in INR (e.g., ₹25)",
  "circularityScore": 85 (integer out of 100 representing how circular/recyclable it is),
  "carbonSavings": "Estimated numeric carbon saved in kg CO2 if successfully recycled (e.g. 1.2 kg CO2 Saved)",
  "recommendedAction": "Primary, highest-value recommendation (e.g. Sell to Recycler, Donate, Upcycle)",
  "alternativeAction": "Secondary recommendation (e.g. Repurpose, Donate to Community Hub)",
  "materialComposition": "Detailed description of contents or materials (e.g. 100% High-Density Polyethylene)",
  "recyclingPotential": "Steps or viability for recycling (e.g. Highly recyclable through municipal collection centers)",
  "reusePotential": "Ideas for creative reuse (e.g. Can be washed and utilized as plant organizers or fluid storage)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, { text: promptText }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            material: { type: Type.STRING },
            objectType: { type: Type.STRING },
            quantity: { type: Type.STRING },
            condition: { type: Type.STRING },
            marketDemand: { type: Type.STRING },
            estimatedValue: { type: Type.STRING },
            circularityScore: { type: Type.INTEGER },
            carbonSavings: { type: Type.STRING },
            recommendedAction: { type: Type.STRING },
            alternativeAction: { type: Type.STRING },
            materialComposition: { type: Type.STRING },
            recyclingPotential: { type: Type.STRING },
            reusePotential: { type: Type.STRING },
          },
          required: [
            "material",
            "objectType",
            "quantity",
            "condition",
            "marketDemand",
            "estimatedValue",
            "circularityScore",
            "carbonSavings",
            "recommendedAction",
            "alternativeAction",
            "materialComposition",
            "recyclingPotential",
            "reusePotential"
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("AI Scanner Error:", error);
    // Since upstream AI may experience high demand (503), we gracefully fall back to our rich local circular database response with a 200 OK
    res.json({
      success: true,
      fallbackUsed: true,
      errorInfo: error.message,
      data: getDemoScanResponse(), // Fallback to demo response so UI remains functional
    });
  }
});

// AI Assistant Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body; // Array of { role: 'user'|'model', content: string }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    if (!apiKey) {
      return res.json({
        text: "Reloop AI Assistant is currently running in trial mode. I can certainly help guide your circular choices! If you have cardboard, plastics, metal, or complex e-waste, let me know. To recycle 15kg of cardboard, aggregate it in our Community Collection Pool or post it on the circular marketplace to get free logistics pickups! What else can I assist with?"
      });
    }

    // Map roles: 'user' to 'user' and 'assistant'/'model' to 'model'
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content }],
    }));

    const systemInstruction = `You are the ReLoop AI Circular Economy Expert Assistant.
Your core goal is to guide citizens, communities, and businesses to manage resources and see value in materials, never waste.
Never make users feel they are handling dirty scrap or waste. You are guiding them to steward valuable resources.
Keep your answers highly practical, clean, and positive. Recommend specific circular pathways, selling to local scrap dealers/recyclers, donating to NGOs, or setting up reverse logistics pooling.
Give actionable metrics where possible (e.g. water saved, CO2 avoided, earnings).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    // Return 200 OK with the helpful fallback response to avoid breaking client-side chat interface under heavy demand
    res.json({
      text: "I apologize, our primary circular intelligence uplink is experiencing high demand. However, as an expert, I can tell you that keeping resources in circulation is always the best path! Let's arrange a collection pool, list it on our circular marketplace, or connect with verified municipal partners. Ask me anything more about recycling steps!"
    });
  }
});

function getDemoScanResponse() {
  const materials = [
    {
      material: "PET Plastic",
      objectType: "Clear Beverage Bottle Bundle",
      quantity: "3.5 kg (~80 bottles)",
      condition: "Clean & Pressed",
      marketDemand: "High",
      estimatedValue: "₹105",
      circularityScore: 92,
      carbonSavings: "11.2 kg CO₂ Saved",
      recommendedAction: "Sell to Plastic Recycler",
      alternativeAction: "Offer free collection in Community Pool",
      materialComposition: "Polyethylene Terephthalate (Molded PET-1 Plastic)",
      recyclingPotential: "Extremely high. Can be shredded, pelletized, and spun into textile fibers or food-grade containers.",
      reusePotential: "Can be repurposed as self-watering seed starters or protective dome structures for saplings."
    },
    {
      material: "Cardboard",
      objectType: "Double-walled shipping cartons",
      quantity: "12 kg (15 medium boxes)",
      condition: "Dry & Flattened",
      marketDemand: "Medium",
      estimatedValue: "₹180",
      circularityScore: 88,
      carbonSavings: "41.6 kg CO₂ Saved",
      recommendedAction: "Consolidate into community pool for bulk pricing",
      alternativeAction: "Exchange with local E-commerce shipper",
      materialComposition: "Kraft unbleached wood pulp cellulose fibers",
      recyclingPotential: "High recycling potential. Pulping fibers can be recycled back into secondary packing paper up to 7 times.",
      reusePotential: "Ideal storage containers, flat-pack toy furniture, sheet mulching for compost beds."
    },
    {
      material: "E-Waste",
      objectType: "Legacy laptop & power bricks",
      quantity: "2.8 kg (1 unit)",
      condition: "Non-functional",
      marketDemand: "High",
      estimatedValue: "₹450",
      circularityScore: 78,
      carbonSavings: "28.0 kg CO₂ Saved",
      recommendedAction: "Sell to certified e-waste processor",
      alternativeAction: "Donate to NGO hardware repair lab",
      materialComposition: "Silicon wafer, copper wire coils, precious metals (Au, Ag), epoxy resins",
      recyclingPotential: "Moderate. Requires specialized pyrometallurgical processing to retrieve rare metals and secure chemical disposal.",
      reusePotential: "Parts reclamation (RAM, cooling fans, storage drive enclosure) for custom IoT builds."
    },
    {
      material: "Aluminium",
      objectType: "Crushed beverage cans",
      quantity: "1.5 kg (~65 cans)",
      condition: "Flattened & Rinsed",
      marketDemand: "Very High",
      estimatedValue: "₹140",
      circularityScore: 98,
      carbonSavings: "14.2 kg CO₂ Saved",
      recommendedAction: "Sell to Metal scrap collector",
      alternativeAction: "Donate to NGO community fund drive",
      materialComposition: "Aluminium Alloy 3004 / 3104",
      recyclingPotential: "Infinite recyclability. Requires only 5% of original smelting energy to melt back to pure ingot form.",
      reusePotential: "Upcyclable for wire sculpture, structural shims, or solar-air heater DIY projects."
    }
  ];

  // Pick one at random for a satisfying interactive feel
  return materials[Math.floor(Math.random() * materials.length)];
}

// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ReLoop AI full-stack server operating at http://localhost:${PORT}`);
  });
}

startServer();
