import { NextResponse } from "next/server";
import { answerCompanyQuestion } from "@/lib/chat";
import { answerWithGemini } from "@/lib/gemini-chat";

type HistoryItem = { role?: unknown; text?: unknown };

function readHistory(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(-8)
    .map((item: HistoryItem) => {
      const role = item.role === "model" || item.role === "bot" ? "model" : "user";
      const text = typeof item.text === "string" ? item.text.trim() : "";
      return { role: role as "user" | "model", text };
    })
    .filter((item) => item.text.length > 0);
}

export async function POST(request: Request) {
  let body: { message?: unknown; history?: unknown };
  try {
    body = (await request.json()) as { message?: unknown; history?: unknown };
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 800) {
    return NextResponse.json({ error: "Escreva uma dúvida mais curta." }, { status: 400 });
  }

  const history = readHistory(body.history);

  try {
    const reply = await answerWithGemini(message, history);
    return NextResponse.json({ ...reply, source: "gemini" });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "falha";
    console.error("Tsuki Gemini:", detail);
    const reply = answerCompanyQuestion(message);
    return NextResponse.json({ ...reply, source: "local" });
  }
}
