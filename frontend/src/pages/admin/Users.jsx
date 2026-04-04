import { useState, useEffect } from "react";
import { Mail, Calendar, UserCheck, UserX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

// Gradient palette for avatar initials
const avatarGradients = [
  "from-blue-500 to-indigo-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

function getAvatarGradient(name) {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarGradients[hash % avatarGradients.length];
}

export default function Users() {
  const [activeTab, setActiveTab] = useState("pending");
  const [users, setUsers] = useState([]);
  const [pendingFaculty, setPendingFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, pendingRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/pending-faculty"),
      ]);

      setUsers(usersRes.data.users || []);
      setPendingFaculty(pendingRes.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await api.put(`/admin/approve/${userId}`);
      toast.success("Faculty approved successfully!");
      fetchData(); // Refresh both lists
    } catch (error) {
      toast.error("Failed to approve faculty.");
      console.error(error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await api.put(`/admin/reject/${userId}`);
      toast.success("Faculty rejected.");
      fetchData(); // Refresh both lists
    } catch (error) {
      toast.error("Failed to reject faculty.");
      console.error(error);
    }
  };

  const facultyUsers = users.filter((u) => u.role === "faculty");
  const studentUsers = users.filter((u) => u.role === "student");

  const getDisplayedUsers = () => {
    switch (activeTab) {
      case "pending":
        return pendingFaculty;
      case "faculty":
        return facultyUsers;
      case "students":
        return studentUsers;
      default:
        return [];
    }
  };

  const displayedUsers = getDisplayedUsers();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="
        p-6 lg:p-10 space-y-8 min-h-screen
        bg-gray-50 dark:bg-[#020617]
        text-gray-900 dark:text-gray-200
        transition-colors relative overflow-hidden
      "
    >
      {/* GLOW BACKGROUNDS */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full top-[-100px] left-[30%] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 dark:bg-blue-600/10 blur-[100px] rounded-full bottom-[-50px] right-[-50px] pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-gradient mb-1"
          >
            User Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 font-medium text-lg"
          >
            Manage approvals, faculty, and students
          </motion.p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 bg-white dark:bg-[#0f172a] p-1.5 rounded-2xl w-fit relative z-10 shadow-sm border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
        <Tab
          label="Pending"
          count={pendingFaculty.length}
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
          isPending
        />

        <Tab
          label="Faculty"
          count={facultyUsers.length}
          active={activeTab === "faculty"}
          onClick={() => setActiveTab("faculty")}
        />

        <Tab
          label="Students"
          count={studentUsers.length}
          active={activeTab === "students"}
          onClick={() => setActiveTab("students")}
        />
      </div>

      {/* USERS LIST */}
      <div className="relative z-10 space-y-5">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 w-full skeleton-shimmer rounded-2xl"></div>
            ))}
          </div>
        ) : displayedUsers.length > 0 ? (
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={listVariants}
          >
            <AnimatePresence mode="popLayout">
              {displayedUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  showActions={activeTab === "pending"}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center text-gray-500 font-medium tracking-wide bg-white/50 dark:bg-[#0f172a]/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 backdrop-blur-sm"
          >
            No {activeTab} users found.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* TAB */

function Tab({ label, count, active, onClick, isPending }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors outline-none ${
        active ? "text-blue-600 dark:text-cyan-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeTabBadge"
          className="absolute inset-0 bg-blue-50 dark:bg-cyan-900/20 rounded-xl shadow-[0_0_10px_rgba(59,130,246,0.1)] border border-blue-100 dark:border-cyan-800/50"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10 tracking-wide uppercase">
        {label}
      </span>
      {count !== undefined && (
        <span className={`relative z-10 px-2.5 rounded-full text-xs py-0.5 font-extrabold shadow-sm
          ${active 
            ? isPending && count > 0
              ? "bg-amber-500 text-white dark:bg-amber-500 dark:text-gray-900 animate-pulse"
              : "bg-blue-600 text-white dark:bg-cyan-500 dark:text-gray-900"
            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }
        `}>
          {count}
        </span>
      )}
    </button>
  );
}

/* USER CARD */

function UserCard({ user, showActions, onApprove, onReject }) {
  const name = user.name || "Unknown User";
  const initial = name.split(" ")[0][0].toUpperCase();
  const secondInitial = name.split(" ").length > 1 ? name.split(" ")[1][0].toUpperCase() : "";
  const dateStr = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";
  const gradient = getAvatarGradient(name);
  
  // Format Department object if it's populated
  const depName = user.department?.name || user.department || "N/A";

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`
        glass-card !bg-white/80 dark:!bg-[#0f172a]/80
        border border-gray-100 dark:border-gray-800
        rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6
        shadow-xl hover:shadow-2xl transition-all group mb-5 backdrop-blur-xl
        ${showActions ? "hover:border-amber-200 dark:hover:border-amber-700/40" : "hover:border-blue-200 dark:hover:border-blue-800/40"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-start gap-6">
        <div className={`
          w-16 h-16 rounded-2xl flex-shrink-0
          bg-gradient-to-br ${gradient}
          flex items-center justify-center
          text-xl font-black text-white
          shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all
        `}>
          {initial}{secondInitial}
        </div>

        <div className="space-y-2">
          <p className="font-extrabold text-xl md:text-2xl tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
            {name}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-100 dark:border-gray-700/50">
              <Mail size={14} className="text-gray-400" /> {user.email}
            </span>
            {user.role === 'faculty' && (
              <span className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                {depName}
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-100 dark:border-gray-700/50">
              <Calendar size={14} className="text-gray-400" /> {dateStr}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="
              inline-block px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-lg border
              border-gray-200/60 dark:border-gray-700 text-gray-400 dark:text-gray-500 bg-gray-50/50 dark:bg-gray-900/30
            ">
              ID: {user._id?.slice(-6).toUpperCase()}
            </span>
            {showActions && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-lg border border-amber-200 dark:border-amber-700/40 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Pending Review
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      {showActions && (
        <div className="flex gap-3 mt-4 md:mt-0 md:ml-auto">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onApprove(user._id)}
            className="
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white
              bg-gradient-to-r from-emerald-500 to-green-600
              shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
              transition-all
            "
          >
            <UserCheck size={18} />
            Approve
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onReject(user._id)}
            className="
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-700 dark:text-gray-200
              border border-gray-200 dark:border-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200
              dark:hover:bg-rose-500/10 dark:hover:text-rose-400 dark:hover:border-rose-500/30
              transition-all bg-white dark:bg-[#0f172a] shadow-sm hover:shadow-lg hover:shadow-rose-500/10
            "
          >
            <UserX size={18} />
            Reject
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}