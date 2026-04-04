import { useEffect, useState } from "react";
import { BookOpen, Users, Clock, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/axios";

export default function FacultySubjects() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reusing the syllabus-progress endpoint to get the subjects assigned
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/notes/syllabus-progress");
        setSubjects(res.data);
      } catch (error) {
        console.error("Subjects fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-[#020617]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 w-full skeleton-shimmer rounded-3xl"></div>
          ))}
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
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-600/10 dark:to-cyan-600/10 blur-[120px] rounded-full top-[-100px] right-[-100px] -z-10"
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="mb-12 relative z-10"
      >
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent pb-2">
          My Subjects
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mt-2 font-medium">
          View and manage the subjects assigned to you for this semester
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
          <p className="text-gray-500">You currently have no subjects assigned to you.</p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10"
        >
          {subjects.map((subject, index) => {
            const isComplete = subject.pendingUnits.length === 0;

            return (
              <motion.div
                key={subject.subjectId}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                }}
                whileHover={{ y: -10 }}
                className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 rounded-3xl p-8 shadow-xl border border-indigo-50 dark:border-gray-800 relative overflow-hidden group transition-all duration-300 flex flex-col h-full hover:shadow-2xl"
              >
                {/* Decorative Elements */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-indigo-400/20 blur-2xl group-hover:bg-indigo-400/30 transition-colors"
                />

                <div className="flex justify-between items-start mb-6">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl text-indigo-600 dark:text-cyan-400 shadow-sm"
                  >
                    <BookOpen size={28} />
                  </motion.div>

                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isComplete ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'}`}>
                    {isComplete ? 'Complete' : 'In Progress'}
                  </div>
                </div>

                <div className="flex-grow">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                    {subject.subjectName}
                  </h2>
                </div>

                <div className="mt-8 space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold">
                      <Target size={16} className="text-indigo-400" />
                      Total Units
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      {subject.totalUnits}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold">
                      <Clock size={16} className="text-indigo-400" />
                      Pending Units
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      {subject.pendingUnits.length}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/faculty/tracker'}
                  className="mt-6 w-full py-4 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-cyan-400 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors border border-indigo-100 dark:border-indigo-800/30"
                >
                  View Syllabus <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
