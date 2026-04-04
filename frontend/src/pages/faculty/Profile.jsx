import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { Mail, BookOpen, Target, Lock, X } from "lucide-react";

export default function FacultyProfile() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/notes/faculty-profile");
      setData(res.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  const handleChangePassword = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await api.put("/notes/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert("Password changed successfully");
      setShowModal(false);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      alert(
        error.response?.data?.message || "Password change failed"
      );
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
            Loading your profile...
          </motion.p>
        </div>
      </motion.div>
    );

  const initials = data.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

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
      className="space-y-10 p-8 relative min-h-screen bg-transparent"
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
          className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent"
        >
          My Profile
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
          Manage your account information
        </motion.p>
      </motion.div>

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: -5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          rotateX: -2,
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
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-indigo-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Floating Avatar Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-cyan-800/30 dark:to-blue-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
        />

        <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-6">
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0, rotate: -180, y: 20 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{
                scale: 1.1,
                rotate: 10,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                transition: { duration: 0.3 }
              }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              {initials}
            </motion.div>

            <div>
              <div className="flex items-center gap-3">
                <motion.h2
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  }}
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                >
                  {data.name}
                </motion.h2>

                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full font-semibold"
                >
                  {data.role}
                </motion.span>
              </div>

              {data.role === "faculty" && data.facultyId && (
                <motion.div
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.65, type: "spring" }}
                  className="mt-1"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 rounded text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-mono tracking-widest shadow-inner">
                    ID: {data.facultyId}
                  </span>
                </motion.div>
              )}

              <motion.p
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="text-gray-600 dark:text-gray-300 text-lg mt-2"
              >
                {data.email}
              </motion.p>
            </div>
          </div>

          <motion.button
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
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
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
          >
            <Lock size={18} />
            Change Password
          </motion.button>
        </div>
      </motion.div>

      {/* STATS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.4
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <StatCard
          title="Assigned Subjects"
          value={data.totalSubjects}
          icon={<BookOpen size={24} />}
          color="blue"
          delay={0.2}
        />

        <StatCard
          title="Notes Uploaded"
          value={data.totalNotes}
          icon={<Mail size={24} />}
          color="indigo"
          delay={0.3}
        />

        <StatCard
          title="Syllabus Complete"
          value={`${data.syllabusCompletion}%`}
          icon={<Target size={24} />}
          color="cyan"
          delay={0.4}
        />
      </motion.div>

      {/* PASSWORD MODAL */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30, rotateX: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30, rotateX: -10 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl w-[420px] space-y-6 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Background Gradient */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-cyan-50/30 dark:from-blue-900/10 dark:via-indigo-900/5 dark:to-cyan-900/10 opacity-50"
            />
            
            <div className="flex justify-between items-center relative z-10">
              <motion.h2
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Lock className="text-blue-600 dark:text-blue-400" />
                </motion.div>
                Change Password
              </motion.h2>

              <motion.button
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  backgroundColor: "rgba(156, 163, 175, 0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="text-gray-500 dark:text-gray-400" size={20} />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="space-y-4 relative z-10"
            >
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
                type="password"
                placeholder="Current Password"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm focus:shadow-lg"
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              />

              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
                type="password"
                placeholder="New Password"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm focus:shadow-lg"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              />

              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
                type="password"
                placeholder="Confirm New Password"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm focus:shadow-lg"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="flex justify-end gap-4 pt-4 relative z-10"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(156, 163, 175, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08, y: -3, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.96, y: -1 }}
                onClick={handleChangePassword}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Update Password
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

function StatCard({ title, value, icon, color, delay }) {
  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800"
    },
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      icon: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-800"
    },
    cyan: {
      bg: "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20",
      icon: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-200 dark:border-cyan-800"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9, rotateX: -15 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            delay,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }
      }}
      whileHover={{
        y: -12,
        scale: 1.05,
        rotateX: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      className={`bg-white dark:bg-gray-800 border ${colors.border} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${colors.bg} relative overflow-hidden group`}
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
        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Floating Icon Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
        className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${colors.icon.replace('text-', 'from-').replace('dark:text-', 'dark:from-')} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full blur-lg`}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180, y: 10 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          transition={{
            delay: delay + 0.2,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{
            scale: 1.1,
            rotate: 15,
            transition: { duration: 0.3 }
          }}
          className={`p-4 rounded-2xl bg-white dark:bg-gray-700 shadow-lg mb-4 w-fit ${colors.icon} hover:shadow-xl transition-all duration-300`}
        >
          {icon}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.5 }}
          className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight"
        >
          {value}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 font-medium"
        >
          {title}
        </motion.p>
      </div>
    </motion.div>
  );
}