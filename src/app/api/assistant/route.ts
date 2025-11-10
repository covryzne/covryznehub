import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import ragProfile from "@/lib/rag-profile.json";

/* ======================================================
   ✅ HELPER: dapatkan context relevan berdasarkan pertanyaan
   ====================================================== */
async function getRelevantContext(question: string): Promise<string> {
  const q = question.toLowerCase();

  /* === 1. IDENTITAS DASAR === */
  if (
    q.includes("siapa shendi") ||
    (q.includes("siapa") && q.includes("shendi"))
  ) {
    return `Shendi Teuku Maulana Efendi adalah seorang AI Engineer asal Madiun, Jawa Timur, Indonesia, dengan fokus utama pada Artificial Intelligence, Machine Learning, dan MLOps. Untuk detail pengalaman, skills, atau project, silakan tanya lebih spesifik.`;
  }

  if (q.includes("nama")) return `Nama lengkap: ${ragProfile.name}`;
  if (q.includes("asal") || q.includes("dari mana") || q.includes("lokasi"))
    return `Shendi berasal dari ${ragProfile.location}.`;
  if (q.includes("role") || q.includes("profesi") || q.includes("pekerjaan"))
    return `Role: ${ragProfile.role}.`;
  if (q.includes("tentang") || q.includes("about"))
    return `Tentang Shendi: ${ragProfile.about}`;

  /* === 2. CONTACT INFO === */
  if (
    q.includes("kontak") ||
    q.includes("email") ||
    q.includes("telepon") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    const { email, phone, linkedin, github } = ragProfile.contact;
    return `Berikut kontak Shendi:\n- Email: ${email}\n- Telepon: ${phone}\n- LinkedIn: ${linkedin}\n- GitHub: ${github}`;
  }

  /* === 3. SKILLS === */
  if (
    q.includes("skill") ||
    q.includes("keahlian") ||
    q.includes("kemampuan") ||
    q.includes("teknologi")
  ) {
    const skills = [
      ...(ragProfile.skills.core || []),
      ...(ragProfile.skills.technical || []),
      ...(ragProfile.skills.soft || []),
    ].join(", ");
    return `Beberapa skill yang dikuasai Shendi meliputi: ${skills}`;
  }

  /* === 4. PENGALAMAN === */
  if (
    q.includes("pengalaman") ||
    q.includes("experience") ||
    q.includes("magang") ||
    q.includes("kerja")
  ) {
    if (q.includes("terakhir") || q.includes("latest")) {
      const latest = ragProfile.experience?.[0];
      if (latest)
        return `Pengalaman terbaru: ${latest.title} di ${latest.company} (${latest.period}) — ${latest.description}`;
    }
    return (
      "Beberapa pengalaman Shendi:\n" +
      ragProfile.experience
        .map(
          (e: any) =>
            `- ${e.title} di ${e.company} (${e.period}): ${e.description}`
        )
        .join("\n")
    );
  }

  /* === 5. PROJECTS === */
  // Specific projects by keyword
  if (q.includes("tbc") || q.includes("tb detector"))
    return `Project TB Detector: ${
      ragProfile.projects.find((p: any) => p.title.toLowerCase().includes("tb"))
        ?.description
    }`;

  if (q.includes("sentimen") || q.includes("sentiment"))
    return `Project Sentiment Analysis: ${
      ragProfile.projects.find(
        (p: any) =>
          p.title.toLowerCase().includes("sentimen") ||
          p.title.toLowerCase().includes("sentiment")
      )?.description
    }`;

  if (q.includes("stunting") || q.includes("serasi"))
    return `Project SERASI Stunting Infant: ${
      ragProfile.projects.find((p: any) =>
        p.title.toLowerCase().includes("stunting")
      )?.description
    }`;

  if (q.includes("netflix") || q.includes("rekomendasi"))
    return `Project Netflix Recommender: ${
      ragProfile.projects.find((p: any) =>
        p.title.toLowerCase().includes("netflix")
      )?.description
    }`;

  // Project terbaru
  if (
    q.includes("project") &&
    (q.includes("terbaru") || q.includes("latest"))
  ) {
    const latest = ragProfile.projects?.[0];
    if (latest)
      return `Project terbaru: ${latest.title} — ${latest.description}`;
  }

  // Semua project
  if (q.includes("project") || q.includes("proyek")) {
    return (
      "Beberapa project yang pernah dikerjakan Shendi:\n" +
      ragProfile.projects
        .map((p: any) => `- ${p.title}: ${p.description}`)
        .join("\n")
    );
  }

  /* === 6. SERTIFIKASI === */
  if (
    q.includes("sertifikat") ||
    q.includes("sertifikasi") ||
    q.includes("certification")
  ) {
    return (
      "Sertifikasi yang dimiliki Shendi:\n" +
      ragProfile.certifications
        .map((c: any) => `- ${c.title} (${c.issuer}): ${c.description}`)
        .join("\n")
    );
  }

  /* === 7. PENDIDIKAN === */
  if (
    q.includes("pendidikan") ||
    q.includes("education") ||
    q.includes("kuliah") ||
    q.includes("sekolah")
  ) {
    return (
      "Riwayat pendidikan Shendi:\n" +
      ragProfile.education
        .map((e: any) => `- ${e.school} (${e.period}): ${e.degree}`)
        .join("\n")
    );
  }

  /* === 8. GREETINGS / SMALL TALK === */
  if (q.includes("halo") || q.includes("hai") || q.includes("hi")) {
    return "Halo juga! 👋 Aku asisten virtual Shendi. Mau tahu tentang project, pengalaman, atau skills-nya?";
  }
  if (q.includes("terima kasih") || q.includes("thanks")) {
    return "Sama-sama cuy 😎 senang bisa bantu!";
  }

  /* === 9. FALLBACK === */
  const summary = `Nama: ${ragProfile.name}\nRole: ${ragProfile.role}\nLokasi: ${ragProfile.location}\nTentang: ${ragProfile.about}`;
  return `Maaf, aku gak nemu info spesifik tentang itu. Tapi berikut ringkasan profil Shendi:\n${summary}`;
}

/* ======================================================
   ✅ HELPER: kirim pertanyaan ke Gemini
   ====================================================== */
async function askGemini(question: string, context: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "API belum di-setup di environment variable.";

  const ai = new GoogleGenAI({ apiKey });

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Context: ${context}
Jawab pertanyaan berikut secara ringkas, informatif, dan sopan dengan gaya percakapan santai. 
Jika ditanya tentang siapa Shendi, cukup berikan deskripsi singkat tanpa detail teknis.
Pertanyaan: ${question}`,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // bisa juga pakai gemini-1.5-pro buat hasil lebih stabil
      contents,
    });

    return response.text || "Tidak ada jawaban yang ditemukan.";
  } catch (err) {
    console.error("Error Gemini:", err);
    return "Gagal terhubung ke Gemini API.";
  }
}

/* ======================================================
   ✅ ROUTE HANDLER
   ====================================================== */
export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json({ answer: "Pertanyaannya kosong cuy 😅" });
    }

    const context = await getRelevantContext(question);
    const answer = await askGemini(question, context);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error API:", error);
    return NextResponse.json({
      answer: "Terjadi kesalahan internal di server.",
    });
  }
}
