import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { BookOpen, FileText, TrendingUp, Star } from "lucide-react";

export default function Subjects() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/notes/student/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-10 text-gray-500 dark:text-gray-400 flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-lg"
          >
            Loading your subjects...
          </motion.p>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="space-y-8 p-6"
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
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Your Subjects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Explore and master your enrolled subjects with interactive learning
        </motion.p>
      </motion.div>

      {subjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-center py-16"
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
            <BookOpen size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 dark:text-gray-400 text-lg"
          >
            No subjects assigned to your semester yet.
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
                staggerChildren: 0.12,
                delayChildren: 0.3
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >

          {subjects.map((subject, index) => {

            const progressPercent = subject.totalUnits > 0
              ? Math.min(100, Math.round((subject.totalNotes / subject.totalUnits) * 100))
              : 0;

            return (
              <motion.div
                key={subject._id}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                whileHover={{
                  y: -16,
                  scale: 1.05,
                  rotateX: -5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  transition: {
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                whileTap={{
                  scale: 0.96,
                  y: -12,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                onClick={() => navigate(`/student/subject/${subject._id}`)}
                className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >

                {/* Animated Background Gradient */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Gradient Top Line */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-t-3xl" />

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Star size={16} className="text-white" />
                </motion.div>

                <div className="relative z-10">

                  {/* SUBJECT CODE */}
                  <motion.h2
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: 0.2 + index * 0.08,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                  >
                    {subject.code}
                  </motion.h2>

                  {/* SUBJECT NAME */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="text-gray-600 dark:text-gray-300 mb-6 text-lg"
                  >
                    {subject.name}
                  </motion.p>

                  {/* STATS */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.08,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="space-y-4 mb-6"
                  >

                    <StatRow
                      icon={<BookOpen size={18} />}
                      label="Units"
                      value={subject.totalUnits}
                      color="blue"
                    />

                    <StatRow
                      icon={<FileText size={18} />}
                      label="Notes"
                      value={subject.totalNotes}
                      color="green"
                    />

                  </motion.div>

                  {/* PROGRESS BAR */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + index * 0.08,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="mt-6"
                  >

                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-2">
                        <TrendingUp size={16} />
                        Learning Progress
                      </span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.7 + index * 0.08,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full text-xs"
                      >
                        {progressPercent}%
                      </motion.span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden shadow-inner">

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{
                          duration: 2.5,
                          delay: 0.6 + index * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 h-3 rounded-full relative shadow-sm"
                      >
                        <motion.div
                          animate={{
                            x: ["-100%", "100%"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.08 + 1
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </motion.div>

                    </div>

                    {/* Progress Indicator */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 1.2 + index * 0.08,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="mt-3 text-center"
                    >
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {progressPercent >= 100 ? "🎉 Complete!" :
                         progressPercent >= 75 ? "🚀 Almost there!" :
                         progressPercent >= 50 ? "💪 Keep going!" : "📚 Just started!"}
                      </span>
                    </motion.div>

                  </motion.div>

                </div>

              </motion.div>
            );
          })}

        </motion.div>

      )}
    </motion.div>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function StatRow({ icon, label, value, color = "gray" }) {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    gray: "text-gray-600 dark:text-gray-400"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between text-sm p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >

      <div className={`flex items-center gap-3 font-medium ${colorClasses[color]}`}>
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm`}
        >
          {icon}
        </motion.div>
        {label}
      </div>

      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="font-bold text-gray-900 dark:text-white text-lg"
      >
        {value}
      </motion.span>

    </motion.div>
  );
}