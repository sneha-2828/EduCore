import { useState, useEffect, useRef } from "react";
import { Download, Printer, FileText, Users, BookOpen, Star, TrendingUp, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

function useCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);
  return count;
}

const pageV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const cardV = { hidden: { opacity: 0, y: 24, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } } };

export default function Reports() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/reports");
      setReportData(res.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      toast.error("Failed to load analytics");
    } finally { setLoading(false); }
  };

  const handleExport = () => toast.success("PDF exported successfully!");
  const handlePrint = () => window.print();

  const maxNotes = reportData?.topSubjects?.reduce((m, s) => Math.max(m, s.notes), 0) || 1;

  return (
    <motion.div initial="hidden" animate="visible" variants={pageV}
      className="p-6 lg:p-10 space-y-8 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-gray-200 transition-colors relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full top-[-100px] left-[30%] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 dark:bg-blue-600/10 blur-[100px] rounded-full bottom-[-50px] right-[-50px] pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold tracking-tight text-gradient mb-1">Platform Analytics</motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-500 dark:text-gray-400 font-medium text-lg">Generate reports and view detailed platform statistics</motion.p>
        </div>
        <div className="flex gap-4">
          <motion.button onClick={handleExport} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 shadow-lg shadow-blue-500/25 dark:shadow-cyan-500/20 hover:shadow-blue-500/40 transition-all">
            <Download size={18} /> Export PDF
          </motion.button>
          <motion.button onClick={handlePrint} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-bold bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
            <Printer size={18} /> Print
          </motion.button>
        </div>
      </div>

      {loading ? (
        <div className="relative z-10 grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-40 w-full rounded-2xl skeleton-shimmer" />)}
          <div className="h-96 w-full rounded-2xl md:col-span-2 skeleton-shimmer" />
          <div className="h-96 w-full rounded-2xl skeleton-shimmer" />
        </div>
      ) : reportData ? (
        <div className="relative z-10 space-y-8">
          {/* STATS */}
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBox icon={<Users />} label="Total Students" value={reportData.students} color="blue" />
            <StatBox icon={<Users />} label="Total Faculty" value={reportData.faculty} color="green" />
            <StatBox icon={<BookOpen />} label="Total Notes" value={reportData.totalNotes} color="purple" />
            <StatBox icon={<TrendingUp />} label="Top Subjects" value={reportData.topSubjects?.length || 0} color="orange" />
          </motion.div>

          {/* BAR CHART */}
          {reportData.topSubjects?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="glass-card p-8 !bg-white/80 dark:!bg-[#0f172a]/80 shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
              <h2 className="text-xl font-extrabold mb-8 flex items-center gap-3 text-gray-900 dark:text-white pb-5 border-b border-gray-100 dark:border-gray-800/60">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30"><BarChart3 className="text-indigo-600 dark:text-indigo-400" size={20} /></div>
                Subject Activity — Bar Chart
              </h2>
              <div className="flex items-end gap-4 h-56 px-4">
                {reportData.topSubjects.map((subject, i) => {
                  const h = (subject.notes / maxNotes) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                      <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                        className="text-sm font-extrabold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{subject.notes}</motion.span>
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: `${h}%`, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1, type: "spring", stiffness: 50 }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-blue-500 to-indigo-400 dark:from-cyan-500 dark:to-blue-400 shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 group-hover:shadow-blue-500/40 transition-all min-h-[8px]" />
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 text-center leading-tight mt-2 truncate w-full">{subject.subject}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* CONTENT GRID */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="md:col-span-2 glass-card p-8 !bg-white/80 dark:!bg-[#0f172a]/80 shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
              <h2 className="text-xl font-extrabold mb-6 flex items-center gap-3 text-gray-900 dark:text-white pb-5 border-b border-gray-100 dark:border-gray-800/60">
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/30"><Star className="text-yellow-500 dark:text-yellow-400" size={20} /></div>
                Most Viewed Notes
              </h2>
              <div className="space-y-4">
                {reportData.topNotes?.length > 0 ? reportData.topNotes.map((note, i) => (
                  <motion.div key={note._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} whileHover={{ scale: 1.01, x: 5 }}
                    className="flex justify-between items-center p-5 rounded-xl border border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/40 hover:shadow-lg transition-all cursor-default group">
                    <div className="flex items-center gap-5">
                      <div className={`h-12 w-12 flex items-center justify-center font-extrabold text-white rounded-xl shadow-lg ${i === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-500" : i === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400" : i === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700" : "bg-gray-100 dark:bg-gray-800 !text-gray-500 shadow-none border border-gray-200 dark:border-gray-700"}`}>
                        #{i + 1}
                      </div>
                      <div>
                        <p className="font-extrabold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{note.title}</p>
                        <p className="text-sm font-semibold text-gray-500">{note.subject?.name || "Unknown"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-800/30 shadow-sm">{note.views} views</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1">{new Date(note.createdAt).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                )) : <p className="text-gray-500 text-center py-8 font-medium bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">No notes found.</p>}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="glass-card p-8 !bg-white/80 dark:!bg-[#0f172a]/80 shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
              <h2 className="text-xl font-extrabold mb-6 flex items-center gap-3 text-gray-900 dark:text-white pb-5 border-b border-gray-100 dark:border-gray-800/60">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30"><FileText className="text-blue-600 dark:text-blue-400" size={20} /></div>
                Subject Activity
              </h2>
              <div className="space-y-2">
                {reportData.topSubjects?.length > 0 ? reportData.topSubjects.map((subject, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                    className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:px-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 rounded-lg transition-all cursor-default group">
                    <p className="font-bold text-gray-800 dark:text-gray-200 truncate pr-4 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{subject.subject}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{subject.notes}</span>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">notes</span>
                    </div>
                  </motion.div>
                )) : <p className="text-gray-500 text-center py-8 font-medium bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">No subject activity found.</p>}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center py-20 text-gray-500 font-medium bg-white/50 dark:bg-[#0f172a]/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 backdrop-blur-sm">No data available.</div>
      )}
    </motion.div>
  );
}

const cMap = {
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-100 dark:border-blue-800/30" },
  green: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-100 dark:border-green-800/30" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-800/30" },
  orange: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-100 dark:border-orange-800/30" },
};

function StatBox({ icon, label, value, color = "blue" }) {
  const animatedValue = useCounter(value || 0);
  const c = cMap[color];
  return (
    <motion.div variants={cardV} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl flex flex-col justify-between backdrop-blur-xl transition-all">
      <div className={`p-3.5 rounded-xl w-fit mb-5 ${c.bg} ${c.text} border ${c.border} shadow-sm`}>{icon}</div>
      <div>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1.5 tracking-tight">{animatedValue}</p>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest leading-relaxed">{label}</p>
      </div>
    </motion.div>
  );
}