import { useState } from "react";
import { Send, Bot, User, Sparkles, BookOpen, FileText, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 15
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      }}
      className="flex flex-col h-[calc(100vh-160px)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative group"
    >

      {/* Animated Background Elements */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-indigo-50/30 dark:from-purple-900/10 dark:via-blue-900/5 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-800/30 dark:to-blue-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
          y: [0, 10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-800/30 dark:to-indigo-800/30 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          y: -4,
          transition: { duration: 0.3 }
        }}
        className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 relative z-10"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(147, 51, 234, 0.3)",
                "0 0 30px rgba(147, 51, 234, 0.5)",
                "0 0 20px rgba(147, 51, 234, 0.3)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.15,
              rotate: 20,
              transition: { duration: 0.3 }
            }}
            className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="text-white" size={24} />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              AI Academic Assistant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-sm text-gray-600 dark:text-gray-400 mt-1"
            >
              Answers are generated only from your notes
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* CHAT WINDOW */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50 dark:bg-gray-900/50 relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={messageVariants}
              layout
              className={`flex ${
                msg.role === "student"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                whileTap={{
                  scale: 0.98,
                  y: -2,
                  transition: { duration: 0.15 }
                }}
                className={`max-w-lg p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                  msg.role === "student"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 10,
                      transition: { duration: 0.2 }
                    }}
                    className={`p-2 rounded-xl ${
                      msg.role === "student"
                        ? "bg-white/20"
                        : "bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50"
                    }`}
                  >
                    {msg.role === "student" ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1
                        }}
                      >
                        <Bot size={16} className="text-purple-600 dark:text-purple-400" />
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2 + i * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                    className={`text-sm font-semibold ${
                      msg.role === "student"
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {msg.role === "student" ? "You" : "AI Assistant"}
                  </motion.span>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.05,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className={`text-sm leading-relaxed ${
                    msg.role === "student"
                      ? "text-white/90"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {msg.text}
                </motion.p>

                {/* AI REFERENCES */}
                {msg.reference && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.05,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{
                          rotate: [0, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2
                        }}
                      >
                        <BookOpen size={14} className="text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Reference</span>
                    </div>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="text-xs text-gray-500 dark:text-gray-400 mb-1"
                    >
                      📘 {msg.reference}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"
                    >
                      <FileText size={12} />
                      Source: {msg.file}
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* INPUT */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="p-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative z-10"
      >
        <div className="flex gap-4">
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
              transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question from this unit..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 text-lg shadow-lg hover:shadow-xl focus:shadow-2xl"
          />
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            whileHover={{
              scale: 1.08,
              y: -4,
              boxShadow: "0 15px 30px rgba(147, 51, 234, 0.3)",
              transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }}
            whileTap={{
              scale: 0.96,
              y: -2,
              transition: { duration: 0.15 }
            }}
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl disabled:shadow-lg"
          >
            <Send size={18} />
            Send
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MessageCircle size={12} />
          </motion.div>
          <span>Powered by your notes • Responses are context-aware</span>
        </motion.div>
      </motion.div>

    </motion.div>
  );
}
