"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import { useContact } from "@/components/contact-dialog";
import { answerCompanyQuestion, chatWelcome, type ChatReply } from "@/lib/chat";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  suggestContact?: boolean;
  suggestions?: string[];
  topicId?: string;
};

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function botMessage(reply: ChatReply): Message {
  return {
    id: nextId(),
    role: "bot",
    text: reply.answer,
    suggestContact: reply.suggestContact,
    suggestions: reply.suggestions,
    topicId: reply.topicId,
  };
}

function TsukiAvatar({ size }: { size: "sm" | "lg" }) {
  const frame =
    size === "lg"
      ? "h-[4.75rem] w-[4.75rem] p-[3px]"
      : "h-10 w-10 p-[2px]";

  return (
    <span className={`relative block rounded-full bg-ink ${frame}`}>
      <span className="relative block h-full w-full overflow-hidden rounded-full bg-white p-[3px]">
        <span className="relative block h-full w-full overflow-hidden rounded-full bg-white">
          <Image
            src="/brand/tsuki-chat.png"
            alt=""
            width={160}
            height={160}
            className="h-full w-full object-contain p-[2px]"
          />
        </span>
      </span>
    </span>
  );
}

export function SiteChat() {
  const { openContact } = useContact();
  const titleId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(true);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const lastTopicId = useRef<string | undefined>(chatWelcome.topicId);
  const [messages, setMessages] = useState<Message[]>(() => [botMessage(chatWelcome)]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, pending, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        openerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function replyTo(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const history = messages.map((message) => ({
      role: message.role === "bot" ? ("model" as const) : ("user" as const),
      text: message.text,
    }));

    setInput("");
    setMessages((current) => [
      ...current,
      { id: nextId(), role: "user", text: trimmed },
    ]);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const payload = (await response.json()) as ChatReply & { error?: string };
      const reply: ChatReply = payload.answer
        ? {
            answer: payload.answer,
            suggestContact: Boolean(payload.suggestContact),
            suggestions: payload.suggestions ?? [],
            topicId: payload.topicId,
          }
        : answerCompanyQuestion(trimmed, { lastTopicId: lastTopicId.current });
      lastTopicId.current = reply.topicId ?? lastTopicId.current;
      setMessages((current) => [...current, botMessage(reply)]);
    } catch {
      const reply = answerCompanyQuestion(trimmed, {
        lastTopicId: lastTopicId.current,
      });
      lastTopicId.current = reply.topicId ?? lastTopicId.current;
      setMessages((current) => [...current, botMessage(reply)]);
    } finally {
      setPending(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    replyTo(input);
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-80 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="pointer-events-auto flex h-[min(32rem,calc(100dvh-7.5rem))] w-[min(100vw-2rem,22.5rem)] flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-bg shadow-[0_20px_50px_rgba(23,23,23,0.18)]"
        >
          <header className="flex items-center justify-between gap-3 bg-hero px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <TsukiAvatar size="sm" />
              <div className="min-w-0">
                <p id={titleId} className="text-sm font-medium">
                  Tsuki
                </p>
                <p className="text-xs text-white/65">online</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openerRef.current?.focus();
              }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-white transition-opacity duration-200 hover:opacity-80"
            >
              <span className="sr-only">Fechar chat</span>
              <X size={18} weight="regular" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-ink text-white"
                      : "rounded-bl-md bg-bg-white text-ink"
                  }`}
                >
                  <div className="space-y-2">
                    {message.text.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {message.role === "bot" && message.suggestContact ? (
                    <button
                      type="button"
                      onClick={openContact}
                      className="mt-3 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-xs text-white transition-opacity duration-200 hover:opacity-80"
                    >
                      Começar um projeto
                    </button>
                  ) : null}
                  {message.role === "bot" && message.suggestions?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => replyTo(suggestion)}
                          className="inline-flex min-h-9 items-center rounded-full border border-ink/10 bg-bg px-3 text-xs text-ink transition-opacity duration-200 hover:opacity-70"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {pending ? (
              <p className="text-xs text-ink-soft">Tsuki está escrevendo…</p>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-ink/8 bg-bg-white p-3"
          >
            <label htmlFor="lua-chat-input" className="sr-only">
              Escreva sua dúvida
            </label>
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                id="lua-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Pergunte ao Tsuki"
                autoComplete="off"
                className="min-h-11 min-w-0 flex-1 rounded-full border border-ink/10 bg-bg px-4 text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink/40 focus:border-ink"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink text-white transition-opacity duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="sr-only">Enviar</span>
                <PaperPlaneTilt size={18} weight="regular" aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <div className="flex flex-col items-end gap-2">
        {!open && greeting ? (
          <div className="pointer-events-auto relative mr-2 max-w-[16.5rem]">
            <div className="flex items-center gap-2 rounded-2xl border border-ink bg-white px-3 py-2 text-sm text-ink shadow-[0_8px_24px_rgba(23,23,23,0.12)]">
              <button
                type="button"
                className="text-left leading-5"
                onClick={() => setOpen(true)}
              >
                Oi! Posso te ajudar?
              </button>
              <button
                type="button"
                className="inline-flex min-h-7 min-w-7 items-center justify-center rounded-full text-ink-soft transition-opacity duration-200 hover:text-ink"
                onClick={() => setGreeting(false)}
              >
                <span className="sr-only">Fechar mensagem do Tsuki</span>
                <X size={14} weight="bold" aria-hidden="true" />
              </button>
            </div>
            <span
              className="absolute -bottom-[6px] right-6 h-3 w-3 rotate-45 border-r border-b border-ink bg-white"
              aria-hidden="true"
            />
          </div>
        ) : null}

        <button
          ref={openerRef}
          type="button"
          aria-expanded={open}
          onClick={() => {
            if (open) {
              setOpen(false);
              return;
            }
            setOpen(true);
            setGreeting(false);
          }}
          className="pointer-events-auto rounded-full shadow-[0_10px_28px_rgba(23,23,23,0.28)] transition-transform duration-200 motion-safe:hover:scale-[1.04]"
        >
          <span className="sr-only">
            {open ? "Fechar chat do Tsuki" : "Abrir chat do Tsuki"}
          </span>
          <span className="relative block">
            <TsukiAvatar size="lg" />
            {open ? (
              <span className="absolute inset-[6px] flex items-center justify-center rounded-full bg-black/50 text-white">
                <X size={22} weight="regular" aria-hidden="true" />
              </span>
            ) : null}
          </span>
        </button>
      </div>
    </div>
  );
}
