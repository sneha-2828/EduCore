import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { FileText, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function SubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [units, setUnits] = useState([]);
  const [activeUnit, setActiveUnit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/subject/${subjectId}`);
        setNotes(res.data);

        const uniqueUnits = [];
        const unitMap = {};

        res.data.forEach((note) => {
          if (note.unit && !unitMap[note.unit._id]) {
            unitMap[note.unit._id] = true;
            uniqueUnits.push(note.unit);
          }
        });

        setUnits(uniqueUnits);

        if (uniqueUnits.length > 0) {
          setActiveUnit(uniqueUnits[0]._id);
        }

      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [subjectId]);

  const filteredNotes = notes.filter(
    (note) => note.unit?._id === activeUnit
  );

  if (loading)
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
            Loading subject notes...
          </motion.p>
        </div>
      </motion.div>
    );

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
      className="space-y-8"
    >

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
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Subject Notes
        </motion.h1>

        <motion.p
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
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Select a unit to explore available notes and study materials
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >

        {/* LEFT SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.95, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{
            x: -4,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
        >

          {/* Animated Background */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <motion.h3
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
            className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2 relative z-10"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BookOpen className="text-blue-600 dark:text-blue-400" />
            </motion.div>
            Units
          </motion.h3>

          {units.length === 0 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-gray-500 dark:text-gray-400 text-center py-8 relative z-10"
            >
              No units available
            </motion.p>
          )}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.8
                }
              }
            }}
            className="space-y-3 relative z-10"
          >

            {units.map((unit, index) => (

              <motion.button
                key={unit._id}
                variants={{
                  hidden: { opacity: 0, x: -25, scale: 0.9, rotateX: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotateX: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 120,
                      damping: 15
                    }
                  }
                }}
                whileHover={{
                  x: 12,
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                whileTap={{
                  scale: 0.96,
                  x: 8,
                  transition: { duration: 0.15 }
                }}
                onClick={() => setActiveUnit(unit._id)}
                className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-500 font-medium shadow-lg hover:shadow-xl relative overflow-hidden ${
                  activeUnit === unit._id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >

                {/* Active indicator animation */}
                {activeUnit === unit._id && (
                  <motion.div
                    layoutId="activeUnit"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  />
                )}

                <div className="flex items-center justify-between relative z-10">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2 + index * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {unit.title}
                  </motion.span>
                  {activeUnit === unit._id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </motion.button>

            ))}

          </motion.div>

        </motion.div>

        {/* RIGHT NOTES PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{
            x: 4,
            scale: 1.01,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          className="lg:col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
        >

          {/* Animated Background */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-blue-50/20 to-purple-50/30 dark:from-green-900/10 dark:via-blue-900/5 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <motion.h2
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2 relative z-10"
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FileText className="text-green-600 dark:text-green-400" />
            </motion.div>
            Notes
          </motion.h2>

          {filteredNotes.length === 0 ? (

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-center py-16 relative z-10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FileText size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 dark:text-gray-400 text-lg"
              >
                No notes available for this unit yet.
              </motion.p>
            </motion.div>

          ) : (

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.9
                  }
                }
              }}
              className="space-y-6 relative z-10"
            >

              {filteredNotes.map((note, index) => (

                <motion.div
                  key={note._id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9, rotateX: -10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                      transition: {
                        duration: 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }}
                  whileTap={{
                    scale: 0.98,
                    y: -4,
                    transition: { duration: 0.15 }
                  }}
                  onClick={() =>
                    navigate(`/student/notes/${note._id}`)
                  }
                  className="flex items-center justify-between p-6 border border-gray-200 dark:border-gray-600 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-500 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 group relative overflow-hidden"
                >

                  {/* Note card background animation */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.1
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-purple-50/50 to-blue-50/0 dark:from-blue-900/0 dark:via-purple-900/20 dark:to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="flex items-center gap-6 relative z-10">

                    <motion.div
                      whileHover={{
                        rotate: 15,
                        scale: 1.15,
                        transition: { duration: 0.3 }
                      }}
                      className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                    >
                      <FileText className="text-blue-600 dark:text-blue-400" size={24} />
                    </motion.div>

                    <div>

                      <motion.p
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          delay: 0.2 + index * 0.05,
                          duration: 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="font-bold text-xl text-gray-900 dark:text-white mb-1"
                      >
                        {note.title}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.05,
                          duration: 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Uploaded Notes • {new Date(note.createdAt).toLocaleDateString()}
                      </motion.p>

                    </div>

                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: 0.4 + index * 0.05,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{
                      x: 8,
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="flex items-center gap-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative z-10"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="font-medium"
                    >
                      View
                    </motion.span>
                    <motion.div
                      animate={{
                        x: [0, 4, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </motion.div>

                </motion.div>

              ))}

            </motion.div>

          )}

        </motion.div>

      </motion.div>
    </motion.div>
  );
}