import { useState, useEffect } from "react";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function SyllabusStatus() {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/syllabus-status");
      // res.data is expected to be an array of department objects
      setSyllabusData(res.data);
    } catch (error) {
      console.error("Failed to fetch syllabus status:", error);
      toast.error("Failed to load syllabus data");
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
        p-6 lg:p-10 space-y-8 min-h-screen
        bg-gray-50 dark:bg-[#020617]
        text-gray-900 dark:text-gray-200
        transition-colors relative overflow-hidden
      "
    >
      {/* GLOW BACKGROUNDS */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full top-[-100px] left-[30%] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 dark:bg-purple-500/10 blur-[100px] rounded-full bottom-[10%] right-[-10%] pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-gradient mb-1"
          >
            Syllabus Status
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 font-medium text-lg"
          >
            Department-wise syllabus completion overview
          </motion.p>
        </div>
      </div>

      {loading ? (
        <div className="relative z-10 space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 w-full skeleton-shimmer rounded-2xl"></div>
          ))}
        </div>
      ) : syllabusData.length > 0 ? (
        <motion.div 
          className="relative z-10 space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {syllabusData.map((dept, index) => {
            if (dept.subjects && dept.subjects.length > 0) {
              return (
                <DepartmentSection
                  key={index}
                  title={dept.title || dept.name}
                  code={dept.code}
                  subjects={dept.subjects.map((sub) => {
                    // Calculate status dynamically based on percent
                    let status = "danger";
                    if (sub.percent >= 70) status = "good";
                    else if (sub.percent >= 30) status = "warning";
                    
                    return {
                      ...sub,
                      status,
                    };
                  })}
                />
              );
            } else {
              return (
                <EmptyDepartment
                  key={index}
                  title={dept.title || dept.name}
                  code={dept.code}
                />
              );
            }
          })}
        </motion.div>
      ) : (
        <div className="relative z-10 text-center py-20 text-gray-500 font-medium bg-white/50 dark:bg-[#0f172a]/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 backdrop-blur-sm">
          No syllabus data available.
        </div>
      )}
    </motion.div>
  );
}

/* COMPONENTS */

function DepartmentSection({ title, code, subjects }) {
  // Calculate department-wide average
  const avgPercent = subjects.length > 0
    ? Math.round(subjects.reduce((acc, s) => acc + s.percent, 0) / subjects.length)
    : 0;

  const avgStatus = avgPercent >= 70 ? "good" : avgPercent >= 30 ? "warning" : "danger";
  const avgColor = { good: "text-green-600 dark:text-green-400", warning: "text-amber-600 dark:text-amber-400", danger: "text-red-500 dark:text-red-400" };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="
        glass-card !bg-white/80 dark:!bg-[#0f172a]/80
        border border-gray-100 dark:border-gray-800
        rounded-2xl p-6 lg:p-8 shadow-xl transition-all backdrop-blur-xl
      "
    >
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-800/60 pb-5">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white capitalize">{title}</h2>
          {code && (
            <span className="text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700 shadow-sm">
              {code}
            </span>
          )}
        </div>
        <div className={`text-lg font-extrabold ${avgColor[avgStatus]} bg-white dark:bg-[#0f172a] px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800`}>
          Avg: {avgPercent}%
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={gridVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {subjects.map((sub, idx) => (
          <SubjectProgress key={idx} {...sub} index={idx} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function SubjectProgress({
  name,
  code,
  completed,
  total,
  percent,
  status,
  index = 0,
}) {
  const statusColor = {
    good: "text-green-600 dark:text-green-400",
    warning: "text-orange-500 dark:text-orange-400",
    danger: "text-red-500 dark:text-red-400",
  };

  const statusBg = {
    good: "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30",
    warning: "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/30",
    danger: "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800/30",
  };

  const barColor = {
    good: "from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-400",
    warning: "from-orange-400 to-amber-500 dark:from-orange-500 dark:to-amber-400",
    danger: "from-red-500 to-rose-600 dark:from-red-500 dark:to-rose-400",
  };

  const glowColor = {
    good: "shadow-green-500/20",
    warning: "shadow-orange-500/20",
    danger: "shadow-red-500/20",
  };

  const StatusIcon = () => {
    if (status === "good") return <CheckCircle2 size={16} />;
    if (status === "danger") return <AlertCircle size={16} />;
    return <Clock size={16} />;
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        border rounded-2xl p-6 relative overflow-hidden group
        dark:border-gray-700/50
        transition-all ${statusBg[status]}
        shadow-sm hover:shadow-xl hover:${glowColor[status]}
      `}
    >
      {/* Decorative gradient blur based on status */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${barColor[status]} opacity-5 dark:opacity-10 blur-2xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700`} />

      {/* TOP */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-col gap-2">
          <p className="font-extrabold text-lg text-gray-900 dark:text-white truncate max-w-[200px]" title={name}>{name}</p>
          {code && (
            <span className="
              w-fit text-[10px] font-bold uppercase px-3 py-1 rounded-lg tracking-widest
              bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300
              border border-black/5 dark:border-white/5 shadow-sm
            ">
              {code}
            </span>
          )}
        </div>

        <div className={`flex items-center gap-1.5 font-extrabold ${statusColor[status]} bg-white dark:bg-[#0f172a] px-3.5 py-1.5 rounded-xl shadow-sm border ${statusBg[status].split(" ")[1]} dark:border-gray-800`}>
          <StatusIcon />
          {percent}%
        </div>
      </div>

      {/* PROGRESS */}
      <div className="w-full h-3 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden shadow-inner relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.05, type: "spring", stiffness: 40 }}
          className={`h-full rounded-full bg-gradient-to-r shadow-[0_0_12px_rgba(0,0,0,0.15)] ${barColor[status]}`}
        />
      </div>

      <div className="flex justify-between mt-4 text-sm font-semibold relative z-10">
        <p className="text-gray-500 dark:text-gray-400">
          Units: <span className="text-gray-800 dark:text-gray-200">{completed}</span> / {total}
        </p>
        <p className={`${statusColor[status]} tracking-wide`}>
          {status === 'good' ? 'On Track' : status === 'warning' ? 'In Progress' : 'Needs Attention'}
        </p>
      </div>
    </motion.div>
  );
}

function EmptyDepartment({ title, code }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="
        glass-card !bg-white/80 dark:!bg-[#0f172a]/80
        border border-gray-100 dark:border-gray-800
        rounded-2xl p-6 lg:p-8 text-center shadow-xl transition-all backdrop-blur-xl
      "
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white capitalize">{title}</h2>
        {code && (
          <span className="text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700 shadow-sm">
            {code}
          </span>
        )}
      </div>

      <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl py-12 border border-dashed border-gray-200 dark:border-gray-700/60 backdrop-blur-sm">
        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">
          No subjects mapped yet
        </p>
      </div>
    </motion.div>
  );
}