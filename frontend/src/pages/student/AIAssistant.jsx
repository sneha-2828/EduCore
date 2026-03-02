import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

/* MOCK CONTEXT DATA (FROM NOTES ONLY) */
const NOTE_CONTEXT = {
  subject: "DBMS",
  unit: "Unit 3 – Normalization",
  reference: "Normalization.pdf",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hello 👋 I can help you understand concepts from your notes. Ask me anything from Unit 3.",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "student",
      text: input,
    };

    const aiMessage = {
      role: "ai",
      text:
        "Based on the notes, Unit 3 explains normalization as a process to reduce redundancy and improve data integrity.",
      reference: `${NOTE_CONTEXT.subject} → ${NOTE_CONTEXT.unit}`,
      file: NOTE_CONTEXT.reference,
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-white border rounded-xl">
      {/* HEADER */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-900">
          AI Academic Assistant
        </h1>
        <p className="text-sm text-gray-500">
          Answers are generated only from your notes
        </p>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "student"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-lg p-4 rounded-xl ${
                msg.role === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.role === "student" ? (
                  <User size={16} />
                ) : (
                  <Bot size={16} />
                )}
                <span className="text-sm font-medium">
                  {msg.role === "student" ? "You" : "AI"}
                </span>
              </div>

              <p className="text-sm">{msg.text}</p>

              {/* AI REFERENCES */}
              {msg.reference && (
                <div className="mt-3 text-xs text-gray-500 border-t pt-2">
                  <p>
                    📘 Reference: {msg.reference}
                  </p>
                  <p>
                    📄 Source File: {msg.file}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question from this unit..."
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
}
