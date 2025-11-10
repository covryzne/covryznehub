"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ChatAssistantButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Maaf, terjadi error pada server." },
      ]);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-20 sm:bottom-36 right-3 sm:right-8 z-[9999] rounded-full shadow-lg bg-primary text-primary-foreground"
        size="icon"
        aria-label="Open Assistant"
        onClick={() => setOpen(true)}
      >
        <Icons.bot className="size-6" />
      </Button>
      {open && (
        <>
          <div className="fixed bottom-4 right-3 sm:right-8 z-[10000] w-[95vw] max-w-sm sm:max-w-sm h-[70vh] bg-background rounded-2xl shadow-2xl border flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-bold text-lg">Ask Shendi Assistant</span>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Hapus History"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Icons.trash className="size-5 text-black dark:text-white" />
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
            <div className="flex-1 overflow-y-auto px-4 py-3 text-sm text-muted-foreground">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`my-2 ${
                    msg.from === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block rounded-lg px-3 py-1 text-sm ${
                      msg.from === "user"
                        ? "bg-gray-400 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-background">
              <textarea
                className="w-full min-h-[48px] max-h-32 border rounded px-2 py-1 text-sm resize-y"
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
            <div className="fixed bottom-4 right-3 sm:right-8 z-[10002] w-[95vw] max-w-sm sm:max-w-sm flex items-end justify-end">
              <div className="bg-background rounded-xl shadow-xl p-6 w-full flex flex-col items-center border">
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
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
