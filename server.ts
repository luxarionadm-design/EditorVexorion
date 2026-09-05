import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// AI Assistant endpoint for editor tools
app.post("/api/ai/assist", async (req, res) => {
  try {
    const { action, text, instructions, targetLanguage } = req.body;

    if (!text && action !== "generate") {
      return res.status(400).json({ error: "Teks tidak boleh kosong" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Local fallback heuristics when no API key is provided
      let fallbackResult = "";
      switch (action) {
        case "summarize":
          fallbackResult = text
            .split(/(?<=[.?!])\s+/)
            .slice(0, 3)
            .join(" ");
          break;
        case "fix_grammar":
          // Clean common typos and punctuation spacing
          fallbackResult = text
            .replace(/\s+([.,!?:;])/g, "$1")
            .replace(/([.,!?:;])(?=[^\s])/g, "$1 ")
            .replace(/\s+/g, " ")
            .trim();
          break;
        case "expand":
          fallbackResult = `${text}\n\nSelain poin-poin yang telah diuraikan di atas, penting untuk mempertimbangkan implementasi teknis, efisiensi alur kerja, dan dampak jangka panjang terhadap hasil akhir. Setiap detail berkontribusi pada pencapaian standar profesional yang diharapkan.`;
          break;
        case "formal_tone":
          fallbackResult = text
            .replace(/\bgue\b/gi, "saya")
            .replace(/\blo\b/gi, "Anda")
            .replace(/\bgak\b/gi, "tidak")
            .replace(/\bbanget\b/gi, "sangat")
            .replace(/\byg\b/gi, "yang")
            .replace(/\bdgn\b/gi, "dengan")
            .replace(/\butk\b/gi, "untuk");
          break;
        case "bullet_points":
          fallbackResult = text
            .split(/(?<=[.?!])\s+/)
            .filter(Boolean)
            .map((s: string) => `• ${s.trim()}`)
            .join("\n");
          break;
        case "translate":
          fallbackResult = `[Terjemahan (${targetLanguage || "English"})]: ${text}`;
          break;
        default:
          fallbackResult = text;
      }
      return res.json({
        result: fallbackResult,
        mode: "local-fallback",
        note: "Menggunakan pemrosesan cepat lokal. Hubungkan GEMINI_API_KEY untuk hasil kecerdasan buatan penuh.",
      });
    }

    let systemPrompt = "Anda adalah asisten editor dokumen profesional. Berikan respons HANYA berupa teks hasil yang diminta tanpa pengantar, tanpa tanda kutip pembungkus yang tidak perlu, dan pertahankan format struktur dokumen.";
    let prompt = "";

    switch (action) {
      case "fix_grammar":
        prompt = `Perbaiki tata bahasa, ejaan (PUEBI/EYD bila bahasa Indonesia), kapitalisasi, dan tanda baca dari teks berikut tanpa mengubah makna intinya:\n\n${text}`;
        break;
      case "summarize":
        prompt = `Ringkaslah dokumen/teks berikut secara padat, jelas, dan profesional dalam 2-3 paragraf atau daftar ringkas:\n\n${text}`;
        break;
      case "expand":
        prompt = `Kembangkan dan elaborasi teks berikut dengan argumen yang relevan, detail berbobot, dan susunan paragraf yang profesional:\n\n${text}`;
        break;
      case "formal_tone":
        prompt = `Ubah nada penulisan teks berikut menjadi formal, diplomatis, dan standar bisnis eksekutif:\n\n${text}`;
        break;
      case "bullet_points":
        prompt = `Ekstrak dan rangkum poin-poin utama dari teks berikut ke dalam daftar bullet points yang terstruktur dan mudah dipindai:\n\n${text}`;
        break;
      case "translate":
        prompt = `Terjemahkan teks berikut ke bahasa ${targetLanguage || "Inggris"} dengan gaya bahasa alami dan tata bahasa yang sempurna:\n\n${text}`;
        break;
      case "custom":
        prompt = `Instruksi editor: ${instructions || "Perbaiki teks"}\n\nTeks sumber:\n${text}`;
        break;
      case "generate":
        prompt = `Tuliskan draf dokumen profesional berdasarkan instruksi berikut:\n${instructions}`;
        break;
      default:
        prompt = `Sempurnakan teks berikut secara profesional:\n\n${text}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      },
    });

    const outputText = response.text?.trim() || "";
    return res.json({
      result: outputText,
      mode: "gemini-ai",
    });
  } catch (error: any) {
    console.error("AI Assist error:", error);
    return res.status(500).json({
      error: error?.message || "Terjadi kesalahan saat memproses permintaan AI",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
