import { useEffect, useState, useRef } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  Clock,
  FileText,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

// Animated counter hook
function useCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return count;
}

// Shared animation variants
const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    departments: 0,
    students: 0,
    faculty: 0,
    pendingFaculty: 0,
  });
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch data in parallel
      const [usersRes, pendingRes, deptRes, syllabusRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/pending-faculty"),
        api.get("/departments"),
        api.get("/admin/syllabus-status"),
      ]);

      const users = usersRes.data.users || [];
      const studentsCount = users.filter((u) => u.role === "student").length;
      const facultyCount = users.filter((u) => u.role === "faculty").length;

      const pendingCount = pendingRes.data.count || (pendingRes.data.data ? pendingRes.data.data.length : 0);
      const deptsCount = deptRes.data.length || 0;

      setStats({
        departments: deptsCount,
        students: studentsCount,
        faculty: facultyCount,
        pendingFaculty: pendingCount,
      });

      setSyllabusData(syllabusRes.data.data || syllabusRes.data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="
        space-y-8 p-6 lg:p-10 min-h-screen
        bg-gray-50 dark:bg-[#020617]
        text-gray-900 dark:text-gray-200
        transition-colors relative overflow-hidden
      "
    >
      {/* GLOW BACKGROUNDS */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full top-[-100px] left-[30%] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 dark:bg-blue-600/10 blur-[100px] rounded-full bottom-[-50px] right-[-50px] pointer-events-none" />

      {/* HEADER */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-gradient mb-1"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-gray-500 dark:text-gray-400 font-medium text-lg"
          >
            Monitor platform activity and manage users
          </motion.p>
        </div>

        <motion.button
          onClick={() => navigate("/admin/reports")}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2
            bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600
            shadow-lg shadow-blue-500/25 dark:shadow-cyan-500/20 hover:shadow-blue-500/40
            transition-all
          "
        >
          Generate Reports
          <ArrowUpRight size={18} />
        </motion.button>
      </div>

      {/* ALERT CARD */}
      {stats.pendingFaculty > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ y: -3 }}
          className="
            flex justify-between items-center
            border border-amber-200 dark:border-amber-700/40
            bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10
            rounded-2xl p-5 relative z-10 shadow-sm backdrop-blur-sm
          "
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-200/50 dark:bg-amber-800/40 rounded-xl">
              <Clock className="text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-amber-900 dark:text-amber-100">Pending Faculty Approvals</p>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                {stats.pendingFaculty} faculty registration(s) awaiting approval
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/users")}
            className="border border-amber-300 dark:border-amber-600 px-5 py-2.5 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-800/40 transition font-semibold text-amber-900 dark:text-amber-300 shadow-sm"
          >
            Review Now
          </motion.button>
        </motion.div>
      )}

      {/* STATS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        <StatCard icon={<BookOpen />} label="Departments" value={stats.departments} loading={loading} color="blue" />
        <StatCard icon={<GraduationCap />} label="Students" value={stats.students} loading={loading} color="indigo" />
        <StatCard icon={<Users />} label="Faculty" value={stats.faculty} loading={loading} color="violet" />
        <StatCard icon={<Clock />} label="Pending" value={stats.pendingFaculty} loading={loading} color="amber" />
      </motion.div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* SYLLABUS */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-2 glass-card p-8 !bg-white/80 dark:!bg-[#0f172a]/80 shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl"
        >
          <div className="flex justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Syllabus Coverage</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">Department overview</p>
            </div>
            <motion.span
              whileHover={{ x: 3 }}
              onClick={() => navigate("/admin/syllabus-status")}
              className="text-blue-600 dark:text-cyan-400 font-bold cursor-pointer transition-colors flex items-center gap-1"
            >
              View All <ArrowUpRight size={16} />
            </motion.span>
          </div>

          {loading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-full rounded-xl skeleton-shimmer"></div>
              ))}
            </div>
          ) : syllabusData.length > 0 ? (
            syllabusData.slice(0, 4).map((dept, idx) => (
              <ProgressRow
                key={idx}
                label={dept.departmentName || dept.name}
                code={dept.departmentCode || dept.code}
                value={dept.progressPercentage || 0}
                units={`${dept.completedUnits || 0}/${dept.totalUnits || 0}`}
                delay={idx * 0.1}
              />
            ))
          ) : (
            <p className="text-sm font-medium text-gray-500 py-6 text-center bg-gray-50 dark:bg-gray-800/20 rounded-xl">No syllabus data available.</p>
          )}
        </motion.div>

        {/* ACTIVITY */}
        <motion.div
          variants={cardVariants}
          className="glass-card p-8 !bg-white/80 dark:!bg-[#0f172a]/80 shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>

          {!loading ? (
             <div className="space-y-1">
              <Activity text="System initialized" time="Today" delay={0} />
              <Activity text="Latest updates fetched" time="Just now" delay={0.1} />
              <Activity text="Metrics refreshed" time="Few seconds ago" delay={0.2} />
             </div>
          ) : (
            <div className="space-y-5 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 w-full rounded-xl skeleton-shimmer"></div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="relative z-10 pt-4">
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6">Quick Actions</h3>

        <motion.div
           initial="hidden"
           animate="visible"
           variants={{
             hidden: { opacity: 0 },
             visible: {
               opacity: 1,
               transition: { staggerChildren: 0.08 },
             },
           }}
           className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <QuickCard onClick={() => navigate("/admin/departments")} icon={<BookOpen />} label="Departments" />
          <QuickCard onClick={() => navigate("/admin/users")} icon={<Users />} label="Users" />
          <QuickCard onClick={() => navigate("/admin/syllabus-status")} icon={<TrendingUp />} label="Syllabus" />
          <QuickCard onClick={() => navigate("/admin/reports")} icon={<FileText />} label="Reports" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* COMPONENTS */

const iconColorMap = {
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-cyan-400", border: "border-blue-100 dark:border-blue-800/30", glow: "shadow-blue-500/10 dark:shadow-cyan-500/10" },
  indigo: { bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-100 dark:border-indigo-800/30", glow: "shadow-indigo-500/10 dark:shadow-indigo-500/10" },
  violet: { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-600 dark:text-violet-400", border: "border-violet-100 dark:border-violet-800/30", glow: "shadow-violet-500/10 dark:shadow-violet-500/10" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", border: "border-amber-100 dark:border-amber-800/30", glow: "shadow-amber-500/10 dark:shadow-amber-500/10" },
};

function StatCard({ icon, label, value, loading, color = "blue" }) {
  const animatedValue = useCounter(loading ? 0 : value);
  const c = iconColorMap[color] || iconColorMap.blue;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`
        glass-card !bg-white/80 dark:!bg-[#0f172a]/80
        border border-gray-100 dark:border-gray-800
        rounded-2xl p-6 flex flex-col justify-center items-start gap-4
        shadow-xl hover:shadow-2xl ${c.glow} transition-all backdrop-blur-xl
      `}
    >
      <div className={`p-3.5 ${c.bg} rounded-xl ${c.text} shadow-sm border ${c.border}`}>
        {icon}
      </div>
      <div>
        {loading ? (
          <div className="h-8 w-20 rounded-md skeleton-shimmer mb-1"></div>
        ) : (
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none mb-1">{animatedValue}</p>
        )}
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      </div>
    </motion.div>
  );
}

function ProgressRow({ label, code, value, units, delay = 0 }) {
  const progressColor = value >= 70
    ? "from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-400 shadow-green-500/20"
    : value >= 30
    ? "from-amber-400 to-orange-500 dark:from-amber-400 dark:to-orange-400 shadow-amber-500/20"
    : "from-red-400 to-rose-500 dark:from-red-400 dark:to-rose-400 shadow-red-500/20";

  const textColor = value >= 70
    ? "text-green-600 dark:text-green-400"
    : value >= 30
    ? "text-amber-600 dark:text-amber-400"
    : "text-red-500 dark:text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.01, x: 2 }}
      className="mb-6 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800 cursor-default"
    >
      <div className="flex justify-between items-end mb-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-gray-900 dark:text-white">{label}</span>
            {code && (
              <span className="border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 rounded-full text-xs font-bold text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-sm">
                {code}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className={`font-bold ${textColor}`}>{Math.round(value)}%</span>
          <span className="text-xs font-medium text-gray-500 block">{units} units</span>
        </div>
      </div>

      <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, type: "spring", stiffness: 45 }}
          className={`h-full bg-gradient-to-r ${progressColor} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
        />
      </div>
    </motion.div>
  );
}

function Activity({ text, time, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="flex gap-4 py-3 border-b border-gray-100 dark:border-gray-800/60 last:border-none group cursor-default"
    >
      <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800/30 rounded-xl h-fit group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
        <FileText size={16} />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-200">{text}</p>
        <p className="text-xs font-semibold text-gray-500 mt-0.5">{time}</p>
      </div>
    </motion.div>
  );
}

function QuickCard({ icon, label, onClick }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="
        glass-card !bg-white/80 dark:!bg-[#0f172a]/80
        border border-gray-100 dark:border-gray-800
        rounded-2xl p-6 flex flex-col items-center justify-center gap-3
        cursor-pointer shadow-xl hover:shadow-2xl
        text-gray-600 dark:text-gray-400 group
        transition-all backdrop-blur-xl
      "
    >
      <div className="p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/10">
        {icon}
      </div>
      <p className="font-extrabold group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{label}</p>
    </motion.div>
  );
}