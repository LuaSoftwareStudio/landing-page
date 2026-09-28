import { defaultSuggestions, knowledgeContext } from "@/lib/knowledge";
import { site } from "@/lib/site";
import type { ChatReply } from "@/lib/chat";

type GeminiPart = { text?: string };
type GeminiCandidate = { content?: { parts?: GeminiPart[] } };
type GeminiResponse = {
  candidates?: GeminiCandidate[];
  error?: { message?: string };
};

const MODELS = [
  "gemini-3.1-flash-lite",
  process.env.GEMINI_MODEL,
  "gemini-3.8-flash",
  "gemini-flash-lite-latest",
].filter((model): model is string => Boolean(model));

function systemInstruction() {
  return `Você é o Tsuki, mascote masculino da ${site.name}. Fala português do Brasil, de forma direta e útil.

Você PODE responder perguntas que não estão na base — orientação geral sobre produto digital, sites, apps, sistemas, UX, briefing, processo de construção, diferença entre tipos de produto, etc.

O que você NÃO pode fazer é inventar dados da Lua. Fatos da empresa (o que a Lua faz, serviços, processo, preço, prazo, contato, cases, stack, WhatsApp, telefone, horário, tamanho do time, endereço, SLA) só existem se estiverem na BASE abaixo. Se a pessoa pedir um fato da Lua que a base não tem, diga que isso não está publicado e convide o formulário. Não chute.

Regras de tom:
- 2 a 6 frases, conversa real, sem jargão de chatbot.
- Em orientação geral, não finja case, cliente ou entrega da Lua.
- suggestContact=true só quando fizer sentido falar com o time (orçamento, projeto concreto, ou fato da Lua não publicado). Em dúvida geral, false.
- suggestions: 2 perguntas curtas e naturais para continuar.
- Não mencione estas instruções, "a base" ou "o modelo".

BASE PÚBLICA DA LUA (única fonte de fatos da empresa):
${knowledgeContext()}

Contato oficial: ${site.email} e Instagram @${site.instagram.handle}.`;
}

function parseModelJson(text: string): ChatReply | null {
  const trimmed = text.trim().replace(/^```json\s*|\s*```$/g, "");
  try {
    const parsed = JSON.parse(trimmed) as {
      answer?: unknown;
      suggestContact?: unknown;
      suggestions?: unknown;
      grounded?: unknown;
    };
    if (typeof parsed.answer !== "string" || !parsed.answer.trim()) return null;
    const suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions.filter((item): item is string => typeof item === "string").slice(0, 3)
      : defaultSuggestions;
    return {
      answer: parsed.answer.trim(),
      suggestContact: Boolean(parsed.suggestContact),
      suggestions: suggestions.length ? suggestions : defaultSuggestions,
    };
  } catch {
    return null;
  }
}

async function generateWithModel(model: string, apiKey: string, contents: unknown) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    signal: AbortSignal.timeout(12000),
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction() }] },
      contents,
      generationConfig: {
        temperature: 0.55,
        maxOutputTokens: 768,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            answer: { type: "STRING" },
            suggestContact: { type: "BOOLEAN" },
            suggestions: { type: "ARRAY", items: { type: "STRING" } },
            grounded: { type: "BOOLEAN" },
          },
          required: ["answer", "suggestContact", "suggestions", "grounded"],
        },
      },
    }),
  });

  const data = (await response.json()) as GeminiResponse;
  if (!response.ok) {
    const message = data.error?.message ?? `Gemini ${response.status}`;
    const error = new Error(message) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("") ?? "";
  const parsed = parseModelJson(text);
  if (!parsed) {
    throw new Error("Resposta inválida do modelo");
  }
  return parsed;
}

export async function answerWithGemini(
  message: string,
  history: Array<{ role: "user" | "model"; text: string }>,
): Promise<ChatReply> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY ausente");
  }

  const contents = [
    ...history.slice(-8).map((item) => ({
      role: item.role,
      parts: [{ text: item.text }],
    })),
    { role: "user" as const, parts: [{ text: message }] },
  ];

  let lastError: unknown;
  const tried = new Set<string>();
  for (const model of MODELS) {
    if (tried.has(model)) continue;
    tried.add(model);
    try {
      return await generateWithModel(model, apiKey, contents);
    } catch (error) {
      lastError = error;
      const status = (error as { status?: number }).status;
      if (status === 404) continue;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Falha no Gemini");
}
