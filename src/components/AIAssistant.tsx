import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Sparkles, Send, Bot, User, Trash2, HelpCircle } from "lucide-react";

interface AIAssistantProps {
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearHistory: () => void;
  isGenerating: boolean;
}

export default function AIAssistant({
  chatHistory,
  onSendMessage,
  onClearHistory,
  isGenerating
}: AIAssistantProps) {
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const presets = [
    "I have 15kg cardboard box bulk. Best circular action?",
    "Where is the most sustainable option to send dead batteries?",
    "Can you clarify the chemical composition of PET-1 Plastic?",
    "How do communities coordinate a bulk collection pool?"
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50" id="ai-assistant-section">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-6 overflow-hidden">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Bot className="w-8 h-8 text-emerald-600" />
              <span>AI Circular Advisor</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Circular Systems Analyst • Empowered by Gemini-3.5-flash</p>
          </div>
          {chatHistory.length > 0 && (
            <button
              onClick={onClearHistory}
              className="p-2 border border-slate-200 hover:border-red-300 hover:text-red-700 hover:bg-red-50 text-slate-500 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Chat History Canvas */}
        <div className="flex-1 overflow-y-auto bg-white border border-slate-200 rounded-3xl p-4 md:p-6 mb-4 space-y-4 shadow-xs">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">ReLoop AI Knowledge Assistant</h3>
              <p className="text-slate-500 text-sm max-w-sm mt-1">
                Ask about composting criteria, current metal procurement levels, logistics parameters, or general circular economy guidelines.
              </p>

              {/* Sample preset buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(p)}
                    className="p-3 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-[11px] font-bold text-slate-700 text-left rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((m) => {
                const isAI = m.role === "assistant";
                return (
                  <div
                    key={m.id}
                    className={`flex gap-4 p-4 rounded-3xl leading-relaxed text-sm ${isAI ? "bg-slate-50 border border-slate-100 mr-8" : "bg-emerald-500/10 ml-8 border border-emerald-500/20"}`}
                  >
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${isAI ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"}`}>
                      {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase font-mono">{isAI ? "ReLoop Expert Core" : "You - Citizen Scout"}</p>
                      <p className="text-slate-800 leading-relaxed font-sans">{m.content}</p>
                    </div>
                  </div>
                );
              })}

              {isGenerating && (
                <div className="flex gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 mr-8 animate-pulse text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-slate-400 italic">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase font-mono">ReLoop Expert Core</p>
                    <span className="inline-flex gap-1 mt-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="flex gap-2 shrink-0">
          <input
            type="text"
            placeholder="Formulate circular question..."
            className="flex-1 p-4 border border-slate-200 rounded-2xl bg-white text-slate-800 text-sm focus:outline-emerald-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
          />
          <button
            type="submit"
            className="p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl cursor-pointer flex items-center justify-center aspect-square transition-all"
            disabled={isGenerating}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
