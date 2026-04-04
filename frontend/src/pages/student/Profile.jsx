import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { User, Mail, Calendar, Award, BookOpen, Target, Lock, X } from "lucide-react";

export default function StudentProfile() {
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
      const res = await api.get("/notes/student/profile");
      setData(res.data);
    } catch (error) {
      console.error("Profile error:", error);
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
      className="space-y-10 p-8 relative"
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
          Manage your account and track your learning journey
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
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
          className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
        />

        <div className="flex justify-between items-center relative z-10">

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
              className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              {data.name.charAt(0).toUpperCase()}
            </motion.div>

            <div>
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
                className="text-gray-600 dark:text-gray-300 text-lg"
              >
                {data.email}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="text-sm text-gray-500 dark:text-gray-400 mt-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full w-fit shadow-sm"
              >
                Semester {data.semester}
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
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
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
          title="Total Exams"
          value={data.totalExams}
          icon={<Target size={24} />}
          color="blue"
          delay={0.2}
        />

        <StatCard
          title="Average Score"
          value={`${data.averageScore}%`}
          icon={<Award size={24} />}
          color="green"
          delay={0.3}
        />

        <StatCard
          title="Notes Viewed"
          value={data.notesViewed}
          icon={<BookOpen size={24} />}
          color="purple"
          delay={0.4}
        />

      </motion.div>


      {/* ACCOUNT DETAILS */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.5,
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

        <motion.h3
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
          className="font-bold text-2xl mb-6 text-gray-900 dark:text-white flex items-center gap-2"
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
            <User className="text-blue-600 dark:text-blue-400" />
          </motion.div>
          Account Details
        </motion.h3>

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
          className="space-y-6"
        >

          <DetailRow label="Full Name" value={data.name} icon={<User size={18} />} delay={0.8} />

          <DetailRow label="Email" value={data.email} icon={<Mail size={18} />} delay={0.9} />

          <DetailRow label="Role" value={data.role} icon={<Award size={18} />} delay={1.0} />

          <DetailRow
            label="Joined"
            value={new Date(data.joined).toLocaleDateString()}
            icon={<Calendar size={18} />}
            delay={1.1}
          />

        </motion.div>

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
              className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-indigo-900/10 opacity-50"
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
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                type="password"
                placeholder="Current Password"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm focus:shadow-lg"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
              />

              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                type="password"
                placeholder="New Password"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm focus:shadow-lg"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />

              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                type="password"
                placeholder="Confirm New Password"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm focus:shadow-lg"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="flex justify-end gap-4 pt-4 relative z-10"
            >

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(156, 163, 175, 0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.08,
                  y: -3,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                whileTap={{
                  scale: 0.96,
                  y: -1,
                  transition: { duration: 0.15 }
                }}
                onClick={handleChangePassword}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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

        <motion.p
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: delay + 0.3,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2"
        >
          {title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: delay + 0.4,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
}


/* DETAIL ROW */

function DetailRow({ label, value, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95, rotateX: -10 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotateX: 0 }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        x: 8,
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-100 dark:border-gray-600 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{
            rotate: 15,
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-400 hover:shadow-md transition-all duration-200"
        >
          {icon}
        </motion.div>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: delay + 0.1,
            type: "spring",
            stiffness: 200
          }}
          className="text-gray-600 dark:text-gray-400 font-medium"
        >
          {label}
        </motion.span>
      </div>

      <motion.span
        initial={{ scale: 0, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          delay: delay + 0.2,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 120,
          damping: 15
        }}
        className="font-bold text-gray-900 dark:text-white text-lg"
      >
        {value}
      </motion.span>
    </motion.div>
  );
}