import {
  Upload,
  FileText,
  Clock,
  Users,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";

export default function FacultyDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/notes/faculty-dashboard");
        setData(res.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="p-6 md:p-10 space-y-10 min-h-screen bg-gray-50 dark:bg-[#020617]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 w-full skeleton-shimmer rounded-3xl"></div>
          ))}
        </div>
        <div className="h-48 w-full skeleton-shimmer rounded-3xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 w-full skeleton-shimmer rounded-3xl"></div>
          <div className="h-96 w-full skeleton-shimmer rounded-3xl"></div>
        </div>
      </div>
    );
  }

  const pendingUnits = data.pendingUnits || [];
  const recentUploads = data.recentUploads || [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 20 }}
      className="
        p-6 md:p-10 space-y-10 min-h-screen 
        bg-gray-50 dark:bg-[#020617] 
        text-gray-900 dark:text-gray-200
        transition-colors relative overflow-hidden
      "
    >
      {/* GLOW BACKGROUNDS */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-cyan-500/10 dark:to-blue-600/10 blur-[120px] rounded-full top-[-100px] left-[30%] -z-10"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] h-[400px] bg-purple-500/10 dark:bg-indigo-500/10 blur-[100px] rounded-full bottom-[-100px] left-[-50px] -z-10"
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, x: -30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], type: "spring", stiffness: 100 }}
        className="relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          className="text-5xl font-extrabold tracking-tight"
        >
          Welcome,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
            {data.facultyName}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl text-gray-500 dark:text-gray-400 mt-2 font-medium"
        >
          Manage your notes, track syllabus progress, and view analytics.
        </motion.p>
      </motion.div>

      {/* STATS ROW */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        <StatCard
          icon={<FileText size={24} />}
          label="Notes Uploaded"
          value={data.totalNotes || 0}
          color="blue"
        />

        <StatCard
          icon={<Clock size={24} />}
          label="Pending Units"
          value={pendingUnits.length}
          color="orange"
        />

        <StatCard
          icon={<BookOpen size={24} />}
          label="Subjects"
          value={data.totalSubjects || 0}
          color="indigo"
        />

        <StatCard
          icon={<Upload size={24} />}
          label="Recent Uploads"
          value={recentUploads.length}
          color="green"
        />
      </motion.div>

      {/* SYLLABUS PROGRESS */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
        whileHover={{ y: -4 }}
        className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl relative z-10 overflow-hidden group transition-all duration-300"
      >
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-indigo-50/20 dark:from-cyan-900/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <TrendingUp className="text-blue-500" />
            Overall Syllabus Completion
          </h3>
          <span className="text-2xl font-black text-blue-600 dark:text-cyan-400">
            {data.syllabusCompletion || 0}%
          </span>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-800 h-4 rounded-full overflow-hidden relative z-10 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.syllabusCompletion || 0}%` }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 relative"
          >
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* GRID FOR UNITS AND UPLOADS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* PENDING UNITS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          className="glass-card !bg-orange-50/80 dark:!bg-orange-900/10 border border-orange-200/50 dark:border-orange-800/50 rounded-3xl p-8 shadow-lg group hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="p-4 bg-orange-100 dark:bg-orange-900/40 rounded-2xl shadow-sm text-orange-600 dark:text-orange-400"
            >
              <AlertTriangle size={28} />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                Pending Units
              </h3>
              <p className="text-orange-700/80 dark:text-orange-300/80 font-medium">
                Units awaiting your notes
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {pendingUnits.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-green-600 dark:text-green-400 font-semibold p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800/50"
                >
                  <CheckCircle size={20} />
                  All units completed 🎉
                </motion.div>
              ) : (
                pendingUnits.map((unit, idx) => (
                  <PendingUnit key={unit._id} unit={unit} index={idx} />
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RECENT UPLOADS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-lg group hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              whileHover={{ rotate: -15, scale: 1.1 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/40 rounded-2xl shadow-sm text-blue-600 dark:text-cyan-400"
            >
              <Clock size={28} />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">
                Recent Uploads
              </h3>
              <p className="text-gray-500 font-medium">
                Your latest contributions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {recentUploads.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-500 font-medium p-4 text-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-700"
                >
                  No recent uploads yet. Time to share some knowledge!
                </motion.div>
              ) : (
                recentUploads.map((note, idx) => (
                  <RecentUpload key={note._id} note={note} index={idx} />
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </motion.main>
  );
}

/* ----------------- COMPONENTS ----------------- */

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-800/50"
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-100 dark:border-orange-800/50"
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-100 dark:border-indigo-800/50"
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-100 dark:border-green-800/50"
    }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
      }}
      className={`glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border ${theme.border} rounded-3xl p-6 relative overflow-hidden group transition-all duration-300 shadow-md hover:shadow-xl`}
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${theme.bg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="flex flex-col gap-4 relative z-10">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.15 }}
          className={`w-fit p-4 rounded-2xl ${theme.bg} ${theme.text} shadow-sm`}
        >
          {icon}
        </motion.div>

        <div>
          <motion.h4
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            {value}
          </motion.h4>
          <p className="text-gray-500 dark:text-gray-400 font-semibold mt-1">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PendingUnit({ unit, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.02, x: 5 }}
      className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-orange-100 dark:border-gray-700/50 rounded-2xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-all"
    >
      <div>
        <p className="font-bold text-gray-900 dark:text-white text-lg">{unit.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 mt-1">
          <BookOpen size={14} />
          {unit.subjectName}
        </p>
      </div>

      <motion.span
        whileHover={{ scale: 1.05 }}
        className="text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-full shadow-sm"
      >
        Pending
      </motion.span>
    </motion.div>
  );
}

function RecentUpload({ note, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.02, x: -5 }}
      className="bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 text-blue-500">
          <FileText size={20} />
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white text-lg">{note.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {note.subject?.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}