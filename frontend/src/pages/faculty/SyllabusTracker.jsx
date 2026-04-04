import { CheckCircle, AlertCircle, Upload, BookOpen, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";

export default function SyllabusTracker() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get("/notes/syllabus-progress");
        setSubjects(res.data);
      } catch (error) {
        console.error("Syllabus error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-[#020617]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[400px] w-full skeleton-shimmer rounded-3xl"></div>
          <div className="h-[400px] w-full skeleton-shimmer rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-gray-200 transition-colors relative overflow-hidden"
    >
      {/* GLOW BACKGROUNDS */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-600/10 dark:to-cyan-600/10 blur-[120px] rounded-full top-[-100px] left-[20%] -z-10"
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="mb-10 relative z-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent pb-1">
          Syllabus Tracker
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mt-2 font-medium">
          Monitor your coverage and pending units across all your subjects
        </p>
      </motion.div>

      {subjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-xl max-w-2xl mx-auto mt-10"
        >
          <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Subjects Assigned</h2>
          <p className="text-gray-500">You currently have no subjects assigned to track syllabus for. Check back later!</p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10"
        >
          {subjects.map((subject) => {
            const progress = subject.completionPercentage;
            const isComplete = subject.pendingUnits.length === 0;

            return (
              <motion.div
                key={subject.subjectId}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                }}
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                className={`
                  glass-card !bg-white/80 dark:!bg-[#0f172a]/80 rounded-3xl p-8 shadow-xl border relative overflow-hidden group transition-all duration-300
                  ${isComplete ? 'border-green-200 dark:border-green-800/50' : 'border-indigo-100 dark:border-gray-800'}
                `}
              >
                {/* Subtle Background Elements */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl -z-10 ${isComplete ? 'bg-green-400/20' : 'bg-indigo-400/20'}`}
                />

                {/* SUBJECT HEADER */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`p-4 rounded-2xl shadow-sm ${isComplete ? 'bg-green-50 text-green-500 dark:bg-green-900/20' : 'bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20 text-cyan-400'}`}
                    >
                      <BookOpen size={28} />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {subject.subjectName}
                      </h2>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 w-fit px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700/50">
                        <Target size={14} className="text-indigo-400" />
                        {subject.completedUnits} / {subject.totalUnits} Units
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Completion</span>
                    <h3 className={`text-4xl font-black ${isComplete ? 'text-green-500' : 'text-indigo-600 dark:text-cyan-400'}`}>
                      {progress}%
                    </h3>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-8 relative shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: progress + "%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className={`h-full rounded-full relative ${isComplete ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500'}`}
                  >
                    {!isComplete && (
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    )}
                  </motion.div>
                </div>

                {/* STATUS LIST */}
                <div className="bg-white/50 dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-indigo-400" />
                    Syllabus Status
                  </h4>
                  
                  {isComplete ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400 font-bold p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl"
                    >
                      <CheckCircle size={24} />
                      <span className="text-lg">Syllabus 100% Completed! 🎉</span>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      <AnimatePresence>
                        {subject.pendingUnits.map((unitTitle, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-orange-100 dark:border-orange-900/30 flex justify-between items-center shadow-sm hover:shadow-md transition-all group/item"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg group-hover/item:rotate-12 transition-transform">
                                <AlertCircle className="text-orange-500" size={18} />
                              </div>
                              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                {unitTitle}
                              </h4>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.1)" }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2.5 rounded-xl text-orange-500 hover:text-orange-600 transition-colors"
                              title="Upload Notes for this unit"
                              onClick={() => { window.location.href = '/faculty/upload' }}
                            >
                              <Upload size={18} />
                            </motion.button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}