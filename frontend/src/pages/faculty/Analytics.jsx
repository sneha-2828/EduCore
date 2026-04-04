import {
  Eye,
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function FacultyAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/notes/analytics");
      setData(res.data);
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  if (!data)
    return (
      <div className="p-6 md:p-10 space-y-10 min-h-screen bg-gray-50 dark:bg-[#020617]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 w-full skeleton-shimmer rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 w-full skeleton-shimmer rounded-2xl"></div>
      </div>
    );

  const avgViews =
    data.totalNotes === 0
      ? 0
      : (data.totalViews / data.totalNotes).toFixed(1);

  const sortedNotes = [...data.notes].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  );

  const topNotes = sortedNotes.slice(0, 5);

  const lowEngagementNotes = sortedNotes.filter(
    (note) => (note.views || 0) < 10
  );

  const maxViews =
    data.unitWiseViews.length > 0
      ? Math.max(...data.unitWiseViews.map((u) => u.views))
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        p-6 md:p-10 space-y-10 min-h-screen
        bg-gray-50 dark:bg-[#020617]
        text-gray-900 dark:text-gray-200
        transition-colors relative overflow-hidden
      "
    >
      {/* GLOW BACKGROUND */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full top-[-100px] left-[30%]" />

      {/* HEADER */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Track engagement with your uploaded content
        </p>
      </div>

      {/* STATS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <StatCard title="Total Views" value={data.totalViews} icon={<Eye />} />
        <StatCard title="Notes Uploaded" value={data.totalNotes} icon={<FileText />} />
        <StatCard title="Total Units" value={data.totalUnits} icon={<Users />} />
        <StatCard title="Avg. Views" value={avgViews} icon={<BarChart3 />} />
      </motion.div>

      {/* BAR CHART */}
      <div className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border dark:border-gray-800 rounded-2xl p-6 shadow-sm relative z-10">
        <h2 className="text-lg font-semibold mb-6">
          Unit-wise Views
        </h2>

        {data.unitWiseViews.length === 0 ? (
          <p>No unit data available.</p>
        ) : (
          <div className="flex items-end justify-between h-52 gap-4">
            {data.unitWiseViews.map((unit, index) => {
              const height =
                maxViews === 0
                  ? 0
                  : (unit.views / maxViews) * 180;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scaleY: 1.05 }}
                    style={{ originY: 1 }}
                    className="w-8 rounded-lg bg-gradient-to-t from-blue-600 to-indigo-500 dark:from-cyan-400 dark:to-blue-500"
                  />

                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    {unit.unitTitle}
                  </span>

                  <span className="text-xs font-semibold">
                    {unit.views}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* TOP NOTES */}
      <div className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border dark:border-gray-800 rounded-2xl p-6 shadow-sm relative z-10">
        <h2 className="text-lg font-semibold mb-6">
          Top Performing Notes
        </h2>

        {topNotes.length === 0 ? (
          <p>No data yet.</p>
        ) : (
          <div className="space-y-4">
            {topNotes.map((note, index) => (
              <motion.div
                key={note._id}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                }}
                className="flex items-center justify-between bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50"
              >
                <div>
                  <p className="font-semibold">
                    {index + 1}. {note.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {note.subject?.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-semibold text-green-500">
                  {note.views || 0}
                  <TrendingUp size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* LOW ENGAGEMENT */}
      <div className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border dark:border-gray-800 rounded-2xl p-6 shadow-sm relative z-10">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <TrendingDown className="text-orange-500" />
          Needs Attention
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Notes with low engagement
        </p>

        {lowEngagementNotes.length === 0 ? (
          <p>No low-engagement notes 🎉</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lowEngagementNotes.map((note) => (
              <motion.div
                key={note._id}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-5"
              >
                <p className="font-semibold">{note.title}</p>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {note.subject?.name}
                </p>

                <div className="flex justify-between text-sm mt-4">
                  <span>{note.views || 0} views</span>
                  <span className="text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* STAT CARD */

function StatCard({ title, value, icon }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
      }}
      className="
        glass-card !bg-white/80 dark:!bg-[#0f172a]/80
        border border-gray-100 dark:border-gray-800
        rounded-2xl p-6
        flex justify-between items-center
      "
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>

      <motion.div
        whileHover={{ rotate: 10, scale: 1.2 }}
        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}