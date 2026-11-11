"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ChatAssistantButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load chat history saat komponen mount
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Simpan chat history setiap kali messages berubah
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (msg: string) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setInput("");
    // Kirim pertanyaan ke backend API
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "Maaf, terjadi error pada server." }]);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-20 sm:bottom-36 right-3 sm:right-8 z-[9999] size-12 rounded-full shadow-[var(--shadow-active)] bg-primary text-primary-foreground"
        size="icon"
        aria-label="Open Assistant"
        onClick={() => setOpen(true)}
      >
        <Icons.bot className="size-6" />
      </Button>
      {open &&
        mounted &&
        createPortal(
          <>
            <div className="chat-panel fixed z-[10000] flex flex-col overflow-hidden">
              <div className="chat-header flex shrink-0 items-center justify-between gap-2 px-4 py-3 border-b">
                <div>
                  <p className="eyebrow text-ai mb-1">AI // ASSISTANT</p>
                  <span className="font-display font-semibold">Ask Shendi Assistant</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Hapus History"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Icons.trash className="size-5 text-foreground" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  >
                    <Icons.x className="size-5" />
                  </Button>
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 text-foreground">
                {messages.length === 0 && (
                  <div className="chat-empty">
                    <Icons.bot className="size-10 text-link" aria-hidden="true" />
                    <p className="font-display text-xl text-foreground">Ask Shendi Assistant</p>
                    <p>Silakan tanya apapun tentang Shendi, pengalaman, skills, atau project!</p>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`my-2 ${msg.from === "user" ? "text-right" : "text-left"}`}
                  >
                    <span
                      className={`chat-message inline-block ${
                        msg.from === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="shrink-0 p-4 border-t bg-card">
                <textarea
                  aria-label="Pesan untuk Ask Shendi Assistant"
                  className="w-full min-h-12 max-h-32 border border-input rounded-md bg-background px-3 py-3 text-base resize-y"
                  placeholder="Silakan tanya apapun tentang Shendi, pengalaman, skills, atau project!"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                />
                <Button className="mt-2 w-full" onClick={() => handleSend(input)}>
                  Kirim
                </Button>
              </div>
            </div>
            {showDeleteConfirm && (
              <div className="fixed bottom-4 right-3 sm:right-8 z-[10002] w-[calc(100vw-24px)] max-w-[400px] flex items-end justify-end">
                <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 w-full flex flex-col items-center border">
                  <span className="font-bold mb-4 text-center">
                    Yakin ingin menghapus riwayat chat?
                  </span>
                  <div className="flex gap-3 mt-2">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setMessages([]);
                        localStorage.removeItem("chatHistory");
                        setShowDeleteConfirm(false);
                      }}
                    >
                      Hapus
                    </Button>
                    <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                      Batal
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>,
          document.body,
        )}
    </>
  );
}
