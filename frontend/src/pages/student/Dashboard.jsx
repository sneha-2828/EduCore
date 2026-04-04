import { BookOpen, FileText, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/notes/student/dashboard");
      setData(res.data);
    } catch (error) {
      console.error("Student dashboard error:", error);
    }
  };

  if (!data)
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
            className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-lg"
          >
            Loading your dashboard...
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
      className="space-y-10"
    >

      {/* WELCOME HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{
          scale: 1.02,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className="rounded-3xl p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-2xl relative overflow-hidden"
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-indigo-500/20"
        />

        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-4xl font-bold mb-2"
          >
            Welcome, {data.studentName} 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-lg opacity-90"
          >
            Here’s a quick overview of your academic activity
          </motion.p>
        </div>
      </motion.div>

      {/* QUICK STATS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard
          icon={<BookOpen />}
          title="Subjects Enrolled"
          value={data.totalSubjects}
          color="blue"
          delay={0.4}
        />

        <StatCard
          icon={<FileText />}
          title="Notes Available"
          value={data.totalNotes}
          color="green"
          delay={0.5}
        />

        <StatCard
          icon={<Clock />}
          title="Most Active Subject"
          value={
            data.mostActiveSubject
              ? data.mostActiveSubject.subjectName
              : "N/A"
          }
          color="orange"
          delay={0.6}
        />
      </motion.div>

      {/* MAIN GRID */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >

        {/* SUBJECT PROGRESS */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.02,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full -translate-y-12 translate-x-12"></div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2"
          >
            <BookOpen className="text-green-600 dark:text-green-400" size={20} />
            Subject Overview
          </motion.h2>

          {data.subjectProgress && data.subjectProgress.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {data.subjectProgress.map((subject, index) => (
                <ProgressRow
                  key={subject.subjectId}
                  subject={subject.subjectName}
                  completed={subject.completedUnits}
                  total={subject.totalUnits}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-gray-500 dark:text-gray-400 text-center py-8"
            >
              No subject data available.
            </motion.p>
          )}
        </motion.div>

        {/* RECENT NOTES */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.02,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full -translate-y-12 translate-x-12"></div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2"
          >
            <FileText className="text-purple-600 dark:text-purple-400" size={20} />
            Recently Added Notes
          </motion.h2>

          {data.recentNotes.length === 0 ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-gray-500 dark:text-gray-400 text-center py-8"
            >
              No recent notes available.
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
                    staggerChildren: 0.06,
                    delayChildren: 0.4
                  }
                }
              }}
            >
              {data.recentNotes.map((note, index) => (
                <RecentNote
                  key={note._id}
                  title={note.title}
                  subject={note.subject?.name}
                  time={new Date(note.createdAt).toLocaleDateString()}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

      </motion.div>
    </motion.div>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ icon, title, value, color, delay }) {

  const colors = {
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    green: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
    orange: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -12,
        scale: 1.08,
        rotateX: -5,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      whileTap={{
        scale: 0.96,
        y: -8,
        transition: {
          duration: 0.15,
          ease: "easeOut"
        }
      }}
      className={`bg-white dark:bg-gray-800 border rounded-3xl p-6 flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all duration-500 ${colors[color]} relative overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

      <motion.div
        whileHover={{
          rotate: [0, -10, 10, 0],
          scale: 1.2,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className={`p-4 rounded-2xl ${colors[color]} shadow-lg relative z-10`}
      >
        {icon}
      </motion.div>

      <div className="relative z-10">
        <motion.h3
          initial={{ scale: 0, rotateY: -90 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{
            delay: delay + 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          {value}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + 0.5,
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-sm text-gray-600 dark:text-gray-300 font-medium"
        >
          {title}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ---------- PROGRESS ROW ---------- */

function ProgressRow({ subject, completed, total, index }) {

  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20, scale: 0.95 },
        visible: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
      transition={{ delay: index * 0.08 }}
      whileHover={{
        scale: 1.02,
        x: 4,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      className="mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
    >

      <div className="flex justify-between text-sm mb-3">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.2 }}
          className="font-semibold text-gray-800 dark:text-gray-200"
        >
          {subject}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.08 + 0.3,
            type: "spring",
            stiffness: 200
          }}
          className="text-gray-600 dark:text-gray-400 font-medium bg-white dark:bg-gray-600 px-2 py-1 rounded-full text-xs"
        >
          {completed}/{total} units
        </motion.span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-600 h-3 rounded-full overflow-hidden shadow-inner">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{
            duration: 2,
            delay: index * 0.08 + 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full shadow-sm relative"
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
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>

      </div>

      <div className="flex justify-between items-center mt-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.6 }}
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          {percent}% Complete
        </motion.span>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.08 + 1.2,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{
            scale: 1.2,
            rotate: 10,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          className="text-sm"
        >
          {percent >= 100 ? "🎉" : percent >= 75 ? "🚀" : percent >= 50 ? "💪" : "📚"}
        </motion.div>
      </div>

    </motion.div>
  );
}

/* ---------- RECENT NOTE ---------- */

function RecentNote({ title, subject, time, index }) {

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
      transition={{ delay: index * 0.06 }}
      whileHover={{
        x: 12,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
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
      className="flex justify-between items-center py-4 px-4 rounded-xl bg-white dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg group relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

      <div className="flex-1 relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06 + 0.2 }}
          className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
        >
          {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06 + 0.3 }}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          {subject}
        </motion.p>
      </div>

      <div className="text-right relative z-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.06 + 0.4,
            type: "spring",
            stiffness: 200
          }}
          className="text-sm text-gray-500 dark:text-gray-400 font-medium block"
        >
          {time}
        </motion.span>
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.06 + 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{
            scale: 1.3,
            rotate: 10,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          className="text-lg text-blue-500 dark:text-blue-400 mt-1"
        >
          📄
        </motion.div>
      </div>

    </motion.div>
  );
}