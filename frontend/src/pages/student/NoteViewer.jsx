import {
  FileDown,
  Calendar,
  Layers,
  Send,
  Maximize,
  Minimize,
  BookOpen,
  Sparkles,
  Eye,
  Download
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function NoteViewer() {
  const { noteId } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${noteId}`);
        setNote(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load note.");
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleAskAI = () => {
    if (!question.trim()) return;

    setAiResponse("AI feature will be implemented in Phase 4.");
    setQuestion("");
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="flex justify-center items-center h-[400px]"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full mx-auto mb-4 shadow-lg"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-gray-600 dark:text-gray-400 text-lg font-medium"
          >
            Loading your note...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) return (
    <motion.p
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="text-red-500 dark:text-red-400 text-center py-16 text-lg font-medium"
    >
      {error}
    </motion.p>
  );
  if (!note) return (
    <motion.p
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="text-gray-500 dark:text-gray-400 text-center py-16 text-lg font-medium"
    >
      Note not found
    </motion.p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      }}
      className="space-y-8 relative"
    >

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
      >

        {/* Animated Background Elements */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Floating Sparkles */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            y: [0, -8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-6 right-6 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <Sparkles size={12} className="text-white" />
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">

          <div className="flex-1">

            <motion.h1
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            >
              {note.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400"
            >

              <motion.span
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Layers size={16} />
                Version {note.version}
              </motion.span>

              <motion.span
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Calendar size={16} />
                {new Date(note.updatedAt).toLocaleDateString()}
              </motion.span>

              <motion.span
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <BookOpen size={16} />
                {note.subject?.name}
              </motion.span>

            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            className="flex gap-4"
          >

            <motion.a
              whileHover={{
                scale: 1.08,
                y: -4,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)",
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
              href={`http://localhost:5000${note.fileUrl}`}
              download
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Download size={18} />
              Download
            </motion.a>

            <motion.button
              whileHover={{
                scale: 1.08,
                y: -4,
                backgroundColor: "rgba(156, 163, 175, 0.1)",
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
              onClick={() => setFullscreen(!fullscreen)}
              className="p-4 rounded-2xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {fullscreen ? <Minimize size={18} className="text-gray-600 dark:text-gray-400" /> : <Maximize size={18} className="text-gray-600 dark:text-gray-400" />}
            </motion.button>

          </motion.div>

        </div>

      </motion.div>

      {/* PDF VIEWER */}
      <motion.div
        layout
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden ${
          fullscreen ? "fixed inset-8 z-50" : "h-[700px]"
        }`}
      >

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="w-full h-full"
        >
          <iframe
            src={`http://localhost:5000${note.fileUrl}`}
            title="PDF Viewer"
            className="w-full h-full rounded-3xl"
          />
        </motion.div>

      </motion.div>

      {/* AI SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          y: -6,
          scale: 1.01,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
      >

        <motion.h2
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Sparkles className="text-purple-600 dark:text-purple-400" />
          </motion.div>
          Ask AI about this note
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="flex gap-4"
        >

          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
              transition: { duration: 0.2 }
            }}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything from this note..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500 text-lg shadow-sm focus:shadow-lg"
          />

          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.9,
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
            onClick={handleAskAI}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <Send size={18} />
            Ask AI
          </motion.button>

        </motion.div>

        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
              transition: { duration: 0.3 }
            }}
            className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-blue-800 dark:text-blue-200 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Eye className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
              </motion.div>
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold mb-2"
                >
                  AI Response
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm leading-relaxed"
                >
                  {aiResponse}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

      </motion.div>

    </motion.div>
  );
}