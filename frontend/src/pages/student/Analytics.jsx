import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { BarChart3, TrendingUp, Clock, BookOpen, Target, Award, Zap } from "lucide-react";

export default function StudentAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/notes/student/learning-analytics");
      setData(res.data);
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  if (!data)
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
            Analyzing your learning data...
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
      className="space-y-10"
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
          className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Learning Analytics
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
          Track your academic journey with detailed insights and performance metrics
        </motion.p>
      </motion.div>

      {/* STAT CARDS */}
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
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <StatCard
          title="Total Study Time"
          value={`${data.totalStudyHours}h`}
          icon={<Clock size={24} />}
          color="blue"
          delay={0.2}
        />
        <StatCard
          title="Notes Accessed"
          value={data.notesAccessed}
          icon={<BookOpen size={24} />}
          color="green"
          delay={0.3}
        />
        <StatCard
          title="Avg Completion"
          value={`${data.avgCompletion}%`}
          icon={<Target size={24} />}
          color="purple"
          delay={0.4}
        />
      </motion.div>

      {/* WEEKLY ACTIVITY */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95, rotateY: 5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          y: -4,
          scale: 1.01,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
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

        <motion.div
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
          className="flex items-center gap-3 mb-8 relative z-10"
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
            <BarChart3 className="text-blue-600 dark:text-blue-400" size={28} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Weekly Activity
          </h2>
        </motion.div>

        <div className="flex items-end justify-between h-64 gap-4 relative z-10">

          {Object.entries(data.weeklyData).map(([day, value], index) => {

            const maxValue = Math.max(...Object.values(data.weeklyData));
            const height = maxValue > 0 ? (value / maxValue) * 200 : 0;

            return (

              <motion.div
                key={day}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{
                  delay: 0.8 + index * 0.08,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="flex flex-col items-center flex-1 group"
              >

                <motion.div
                  initial={{ height: 0, scaleY: 0 }}
                  animate={{ height, scaleY: 1 }}
                  transition={{
                    delay: 0.9 + index * 0.08,
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }}
                  whileHover={{
                    scale: 1.08,
                    scaleY: 1.1,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }}
                  whileTap={{
                    scale: 0.95,
                    scaleY: 0.9,
                    transition: { duration: 0.15 }
                  }}
                  className="w-12 bg-gradient-to-t from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-500 rounded-xl hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-600 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative overflow-hidden"
                >

                  {/* Shimmer effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.7 + index * 0.08,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                  >
                    {value}
                  </motion.div>

                </motion.div>

                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.08,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="text-sm mt-4 text-gray-600 dark:text-gray-400 font-medium"
                >
                  {day}
                </motion.span>

              </motion.div>

            );
          })}

        </div>

        {/* Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 relative z-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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
                <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
              </motion.div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                This Week's Progress
              </span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                delay: 1.7,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-lg font-bold text-blue-600 dark:text-blue-400"
            >
              {Object.values(data.weeklyData).reduce((a, b) => a + b, 0)} sessions
            </motion.span>
          </div>
        </motion.div>

      </motion.div>

      {/* SUBJECT STATS */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95, rotateY: -5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          y: -4,
          scale: 1.01,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
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
          className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-indigo-50/30 dark:from-purple-900/10 dark:via-pink-900/5 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          className="flex items-center gap-3 mb-8 relative z-10"
        >
          <motion.div
            animate={{
              rotate: [0, 12, -12, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Award className="text-purple-600 dark:text-purple-400" size={28} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subject Performance
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 1
              }
            }
          }}
          className="space-y-6 relative z-10"
        >
          {Object.entries(data.subjectStats).map(
            ([subject, stats], index) => {
              const hours = Math.round(stats.time / 60);
              const progressPercent = Math.min(hours * 10, 100);

              return (
                <motion.div
                  key={subject}
                  variants={{
                    hidden: { opacity: 0, x: -30, scale: 0.9, rotateX: -10 },
                    visible: {
                      opacity: 1,
                      x: 0,
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
                    x: 8,
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }}
                  whileTap={{
                    scale: 0.97,
                    x: 4,
                    transition: { duration: 0.15 }
                  }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800 hover:shadow-lg transition-all duration-500 border border-gray-100 dark:border-gray-600 group relative overflow-hidden"
                >

                  {/* Subject card background animation */}
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
                    className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-pink-50/50 to-purple-50/0 dark:from-purple-900/0 dark:via-pink-900/20 dark:to-purple-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <motion.span
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: 0.2 + index * 0.08,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="font-bold text-lg text-gray-900 dark:text-white"
                    >
                      {subject}
                    </motion.span>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.08,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 150
                      }}
                      className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <motion.span
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                        className="flex items-center gap-1"
                      >
                        <Clock size={16} />
                        {hours}h
                      </motion.span>
                      <motion.span
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                        className="flex items-center gap-1"
                      >
                        <BookOpen size={16} />
                        {stats.notes} notes
                      </motion.span>
                    </motion.div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-600 h-3 rounded-full overflow-hidden shadow-inner relative z-10">

                    <motion.div
                      initial={{ width: 0, scaleX: 0 }}
                      animate={{ width: `${progressPercent}%`, scaleX: 1 }}
                      transition={{
                        delay: 0.6 + index * 0.08,
                        duration: 1.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 80,
                        damping: 20
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full relative shadow-sm"
                    >

                      {/* Progress bar shimmer */}
                      <motion.div
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />

                    </motion.div>

                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 1 + index * 0.08,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="mt-3 flex justify-between items-center relative z-10"
                  >
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Study Progress
                    </span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.2 + index * 0.08,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="text-sm font-bold text-purple-600 dark:text-purple-400"
                    >
                      {progressPercent}%
                    </motion.span>
                  </motion.div>

                </motion.div>
              );
            }
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* STAT CARD */

function StatCard({ title, value, icon, color, delay }) {
  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800"
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      icon: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800"
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{
        y: -8,
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className={`bg-white dark:bg-gray-800 border ${colors.border} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${colors.bg} relative overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
          className={`p-4 rounded-2xl bg-white dark:bg-gray-700 shadow-lg mb-4 w-fit ${colors.icon}`}
        >
          {icon}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2"
        >
          {title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.4, type: "spring" }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
}