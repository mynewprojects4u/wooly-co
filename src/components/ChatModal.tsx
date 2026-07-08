"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatModal({ 
  isOpen, 
  onClose, 
  productName 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  productName: string 
}) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `Hi! I'm the Wooly AI. What would you like to know about the ${productName}?` }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `That's a great question about the ${productName}! While I'm just a demo AI right now, the owner can easily customize my responses here to answer questions about sizing, custom colors, and yarn materials.` 
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 md:bottom-6 right-0 md:right-6 left-0 md:left-auto md:w-[400px] h-[80vh] md:h-[600px] bg-white md:rounded-3xl shadow-2xl z-[70] overflow-hidden border border-rose/30 flex flex-col"
          >
            {/* Header */}
            <div className="bg-raspberry p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold font-fraunces text-lg leading-tight">Wooly AI</h3>
                  <p className="text-[10px] uppercase tracking-widest font-mono opacity-80">Product Assistant</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                ✕
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-oat/30 flex flex-col gap-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === 'user' 
                      ? 'bg-rose text-ink rounded-br-sm' 
                      : 'bg-white border border-rose/30 text-ink shadow-sm rounded-bl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-line flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-oat border border-line rounded-full px-4 py-2 text-sm outline-none focus:border-raspberry transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-raspberry text-white flex items-center justify-center hover:bg-raspberry-deep disabled:opacity-50 transition-colors"
              >
                ↑
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
