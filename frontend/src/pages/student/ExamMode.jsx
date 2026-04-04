import { useState, useEffect } from "react";
import { Calendar, CheckCircle, Sparkles, Brain, Target, Zap, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function ExamMode() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [examType, setExamType] = useState("mid");
  const [examDate, setExamDate] = useState("");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/notes/student/subjects");
      setSubjects(res.data);

      if (res.data.length > 0) {
        setSubjectId(res.data[0]._id);
        fetchUnits(res.data[0]._id);
      }
    } catch (error) {
      console.error("Subject fetch error:", error);
    }
  };

  const fetchUnits = async (id) => {
    try {
      const res = await api.get(`/notes/student/subject/${id}`);
      setUnits(res.data.units || []);
    } catch (error) {
      console.error("Unit fetch error:", error);
    }
  };

  const handleSubjectChange = (e) => {
    const id = e.target.value;
    setSubjectId(id);
    fetchUnits(id);
  };

  const handleStartExam = () => {
    if (!subjectId) return;
    navigate(`/student/exam/${subjectId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="space-y-10"
    >

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="flex justify-between items-center"
      >

        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Exam Mode
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            AI-guided preparation for upcoming exams
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 15,
            mass: 0.8
          }}
          whileHover={{
            scale: 1.05,
            rotate: 2,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          whileTap={{
            scale: 0.98,
            rotate: -1,
            transition: {
              duration: 0.15,
              ease: "easeOut"
            }
          }}
          className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain size={20} />
          </motion.div>
          <Sparkles size={18} />
          Smart Revision
        </motion.div>

      </motion.div>


      {/* EXAM SETUP */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{
          y: -8,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16"></div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
        >
          <Target className="text-blue-600 dark:text-blue-400" />
          Configure Your Exam Session
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* SUBJECT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="space-y-3"
          >
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <BookOpen size={16} />
              Subject
            </label>

            <motion.select
              value={subjectId}
              onChange={handleSubjectChange}
              whileFocus={{
                scale: 1.02,
                transition: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.code} - {subject.name}
                </option>
              ))}
            </motion.select>
          </motion.div>


          {/* EXAM TYPE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="space-y-3"
          >
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Zap size={16} />
              Exam Type
            </label>

            <motion.select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              whileFocus={{
                scale: 1.02,
                transition: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <option value="mid">Mid Exam</option>
              <option value="sem">Semester Exam</option>
            </motion.select>
          </motion.div>


          {/* DATE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="space-y-3"
          >
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar size={16} />
              Exam Date
            </label>

            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />

              <motion.input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                whileFocus={{
                  scale: 1.02,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
              />
            </div>
          </motion.div>

        </div>

      </motion.div>


      {/* UNITS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
      >

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2"
        >
          <CheckCircle className="text-green-600 dark:text-green-400" />
          Units Available for Revision
        </motion.h2>

        {units.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-gray-500 dark:text-gray-400 text-center py-8"
          >
            No units available for this subject yet.
          </motion.p>
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
                  delayChildren: 0.2
                }
              }
            }}
            className="grid md:grid-cols-2 gap-4"
          >

            {units.map((unit, index) => (

              <motion.div
                key={unit._id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                className="flex items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800 hover:shadow-xl transition-all duration-500 group"
              >

                <div className="flex items-center gap-4">

                  <motion.div
                    whileHover={{
                      rotate: 15,
                      scale: 1.15,
                      transition: {
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }}
                    className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  >
                    <CheckCircle
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                  </motion.div>

                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                    {unit.title}
                  </span>

                </div>

                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                  className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full shadow-sm"
                >
                  Ready
                </motion.span>

              </motion.div>

            ))}

          </motion.div>

        )}

      </motion.div>


      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="flex justify-end"
      >

        <motion.button
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.8
          }}
          whileHover={{
            scale: 1.08,
            y: -4,
            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          whileTap={{
            scale: 0.96,
            y: -2,
            transition: {
              duration: 0.15,
              ease: "easeOut"
            }
          }}
          onClick={handleStartExam}
          disabled={!subjectId}
          className="px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-500 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain size={20} />
          </motion.div>

          <span className="relative z-10">Start Exam Session</span>

          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Sparkles size={18} />
          </motion.div>
        </motion.button>

      </motion.div>

    </motion.div>
  );
}