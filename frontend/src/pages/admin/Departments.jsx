import { useState, useEffect } from "react";
import { Building2, Plus, Users, BookOpen, ChevronRight, FileText, X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function Departments() {
  const [activeView, setActiveView] = useState({ level: "departments", id: null, title: "Departments" });
  
  // Breadcrumbs track the drill-down path
  const [breadcrumbs, setBreadcrumbs] = useState([{ level: "departments", id: null, title: "Departments" }]);

  const changeView = (level, id, title) => {
    const newView = { level, id, title };
    setActiveView(newView);
    
    // Update breadcrumbs
    if (level === "departments") {
      setBreadcrumbs([newView]);
    } else if (level === "subjects") {
      setBreadcrumbs([breadcrumbs[0], newView]);
    } else if (level === "units") {
      setBreadcrumbs([breadcrumbs[0], breadcrumbs[1], newView]);
    }
  };

  const navigateBack = (targetLevel) => {
    if (targetLevel === "departments") {
      setActiveView(breadcrumbs[0]);
      setBreadcrumbs([breadcrumbs[0]]);
    } else if (targetLevel === "subjects") {
      setActiveView(breadcrumbs[1]);
      setBreadcrumbs([breadcrumbs[0], breadcrumbs[1]]);
    }
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="p-6 lg:p-10 space-y-8 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-gray-200 transition-colors relative overflow-hidden"
    >
      {/* GLOW BACKGROUNDS */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full top-[-100px] left-[30%] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 dark:bg-blue-600/10 blur-[100px] rounded-full bottom-[-50px] right-[-50px] pointer-events-none" />

      {/* Header & Breadcrumbs */}
      <div className="relative z-10 space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} 
          className="text-4xl font-extrabold tracking-tight text-gradient mb-1"
        >
          Curriculum Management
        </motion.h1>
        
        {/* Breadcrumb Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.level} className="flex items-center gap-2">
              <button 
                onClick={() => navigateBack(crumb.level)}
                className={`hover:text-blue-600 dark:hover:text-cyan-400 transition-colors ${
                  activeView.level === crumb.level ? "text-gray-900 dark:text-gray-200 font-extrabold" : ""
                }`}
              >
                {crumb.title}
              </button>
              {index < breadcrumbs.length - 1 && <ChevronRight size={16} />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Content Area smoothly crossfading */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {activeView.level === "departments" && (
            <motion.div key="departments" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <DepartmentsView onDrillDown={(id, name) => changeView("subjects", id, name)} />
            </motion.div>
          )}

          {activeView.level === "subjects" && (
            <motion.div key="subjects" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <SubjectsView deptId={activeView.id} deptName={activeView.title} onDrillDown={(id, title) => changeView("units", id, title)} />
            </motion.div>
          )}

          {activeView.level === "units" && (
            <motion.div key="units" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <UnitsView subjectId={activeView.id} subjectTitle={activeView.title} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}

/* -------------------------------------------------------------------------- */
/*                              VIEWS                                         */
/* -------------------------------------------------------------------------- */

// 1. DEPARTMENTS VIEW
function DepartmentsView({ onDrillDown }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchDepartmentsData = async () => {
    try {
      setLoading(true);
      const [deptRes, usersRes, syllabusRes] = await Promise.all([
        api.get("/departments"),
        api.get("/admin/users"),
        api.get("/admin/syllabus-status"),
      ]);

      const deptsList = deptRes.data || [];
      const usersList = usersRes.data.users || usersRes.data || [];
      const syllabusList = syllabusRes.data || [];

      const combined = deptsList.map((dept) => {
        const syllabusData = syllabusList.find((s) => s.code === dept.code || s.title === dept.name);
        const subjectsCount = syllabusData ? syllabusData.subjects.length : 0;
        
        let avgProgress = 0;
        if (syllabusData && syllabusData.subjects.length > 0) {
          const totalPct = syllabusData.subjects.reduce((acc, sub) => acc + sub.percent, 0);
          avgProgress = Math.round(totalPct / syllabusData.subjects.length);
        }

        const facultyCount = usersList.filter(u => u.role === "faculty" && (u.department?._id === dept._id || u.department === dept._id || u.department?.code === dept.code)).length;
        const studentsCount = usersList.filter(u => u.role === "student" && (u.department?._id === dept._id || u.department === dept._id || u.department?.code === dept.code)).length;

        return { id: dept._id, name: dept.name, code: dept.code, faculty: facultyCount, students: studentsCount, subjects: subjectsCount, progress: avgProgress };
      });

      setDepartments(combined);
    } catch (error) {
      toast.error("Failed to load departments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDepartmentsData(); }, []);

  const handleCreate = async (data) => {
    try {
      await api.post("/departments", data);
      toast.success("Department created successfully!");
      setShowModal(false);
      fetchDepartmentsData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create department");
    }
  };

  const getProgressColor = (value) => {
    if (value >= 70) return "from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-400 shadow-green-500/20";
    if (value >= 30) return "from-amber-400 to-orange-500 dark:from-amber-400 dark:to-orange-400 shadow-amber-500/20";
    return "from-red-400 to-rose-500 dark:from-red-400 dark:to-rose-400 shadow-red-500/20";
  };

  const getProgressTextColor = (value) => {
    if (value >= 70) return "text-green-600 dark:text-green-400";
    if (value >= 30) return "text-amber-600 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <motion.button 
          onClick={() => setShowModal(true)} 
          whileHover={{ scale: 1.05, y: -2 }} 
          whileTap={{ scale: 0.95 }} 
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 shadow-lg shadow-blue-500/25 dark:shadow-cyan-500/20 hover:shadow-blue-500/40 transition-all"
        >
          <Plus size={18} /> Add Department
        </motion.button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-72 w-full rounded-2xl skeleton-shimmer"></div>)}
        </div>
      ) : departments.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={gridVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              variants={cardVariants}
              onClick={() => onDrillDown(dept.id, dept.name)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-800/40 cursor-pointer transition-all flex flex-col justify-between group backdrop-blur-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-cyan-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white transition-all border border-blue-100 dark:border-blue-800/30 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/20">
                    <Building2 size={24} />
                  </div>
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{dept.name}</h2>
                </div>
                <ChevronRight className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" size={20} />
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 grid grid-cols-3 gap-2 mb-6 border border-gray-100 dark:border-gray-700/50">
                <Stat icon={<Users size={14} className="text-violet-500 dark:text-violet-400" />} label="Faculty" value={dept.faculty} />
                <Stat icon={<GraduationCap size={14} className="text-blue-500 dark:text-blue-400" />} label="Students" value={dept.students} />
                <Stat icon={<BookOpen size={14} className="text-emerald-500 dark:text-emerald-400" />} label="Subjects" value={dept.subjects} />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-500 tracking-wider">SYLLABUS COVERAGE</span>
                  <span className={getProgressTextColor(dept.progress)}>{dept.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${dept.progress}%` }} transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 50 }}
                    className={`h-full bg-gradient-to-r ${getProgressColor(dept.progress)} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl text-gray-500 font-medium">No departments found.</div>
      )}

      {showModal && <CreateModal title="Add Department" fields={[{ name: "name", label: "Department Name" }, { name: "code", label: "Department Code" }]} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
    </div>
  );
}

// 2. SUBJECTS VIEW
function SubjectsView({ deptId, deptName, onDrillDown }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/subjects?department=${deptId}`);
      setSubjects(res.data || []);
    } catch (error) {
      toast.error("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchSubjects(); }, [deptId]);

  const handleCreate = async (data) => {
    try {
      await api.post("/subjects", { ...data, department: deptId });
      toast.success("Subject added!");
      setShowModal(false);
      fetchSubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create subject");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center glass-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl !bg-white/80 dark:!bg-[#0f172a]/80 backdrop-blur-xl">
        <h2 className="text-xl font-extrabold border-l-4 border-blue-500 dark:border-cyan-400 pl-4">{deptName} — Subjects</h2>
        <motion.button 
          onClick={() => setShowModal(true)} 
          whileHover={{ scale: 1.05, y: -2 }} 
          whileTap={{ scale: 0.95 }} 
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
        >
          <Plus size={18} /> Add Subject
        </motion.button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-32 w-full rounded-2xl skeleton-shimmer"></div>)}
        </div>
      ) : subjects.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={gridVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {subjects.map((sub) => (
            <motion.div
              key={sub._id}
              variants={cardVariants}
              onClick={() => onDrillDown(sub._id, sub.name)}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border border-gray-200/60 dark:border-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800/40 cursor-pointer transition-all flex justify-between items-center group backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all group-hover:shadow-lg group-hover:shadow-indigo-500/20">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 dark:text-white truncate max-w-[200px] group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">{sub.name}</h3>
                  <p className="text-sm font-semibold text-gray-500">{sub.code}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl text-gray-500 font-medium">No subjects currently enlisted.</div>
      )}

      {showModal && <CreateModal title="Add Subject" fields={[{ name: "name", label: "Subject Name" }, { name: "code", label: "Subject Code" }, { name: "facultyId", label: "Assign Faculty ID (Optional)" }]} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
    </div>
  );
}

// 3. UNITS VIEW
function UnitsView({ subjectId, subjectTitle }) {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/units?subject=${subjectId}`);
      setUnits(res.data || []);
    } catch (error) {
      toast.error("Failed to load units");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchUnits(); }, [subjectId]);

  const handleCreate = async (data) => {
    try {
      await api.post("/units", { ...data, subject: subjectId });
      toast.success("Unit added!");
      setShowModal(false);
      fetchUnits();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create unit");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center glass-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl !bg-white/80 dark:!bg-[#0f172a]/80 backdrop-blur-xl">
        <h2 className="text-xl font-extrabold border-l-4 border-indigo-500 dark:border-blue-500 pl-4">{subjectTitle} — Units</h2>
        <motion.button 
          onClick={() => setShowModal(true)} 
          whileHover={{ scale: 1.05, y: -2 }} 
          whileTap={{ scale: 0.95 }} 
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-blue-500 dark:to-indigo-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
        >
          <Plus size={18} /> Add Unit
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-20 w-full rounded-2xl skeleton-shimmer"></div>)}
        </div>
      ) : units.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
          className="space-y-4"
        >
          {units.map((unit, index) => (
            <motion.div
              key={unit._id}
              variants={cardVariants}
              whileHover={{ x: 4, scale: 1.005 }}
              className="flex items-center gap-4 glass-card p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800/40 hover:shadow-xl transition-all group backdrop-blur-xl"
            >
              <div className="h-12 w-12 flex items-center justify-center font-extrabold text-white bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 rounded-xl shrink-0 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 group-hover:scale-105 transition-all">
                {index + 1}
              </div>
              <FileText className="text-gray-400 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors" />
              <p className="font-extrabold text-lg text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{unit.title}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
         <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl text-gray-400 font-medium">No units defined.</div>
      )}

      {showModal && <CreateModal title="Add Unit" fields={[{ name: "title", label: "Unit Title/Topic" }]} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SHARED COMPONENTS                             */
/* -------------------------------------------------------------------------- */

function Stat({ label, value, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex items-center gap-1.5 mb-0.5">
        {icon}
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

function CreateModal({ title, fields, onClose, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative glass-card !bg-white dark:!bg-[#0f172a] w-full max-w-sm rounded-[2rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(field => (
            <div key={field.name} className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">{field.label}</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all shadow-sm"
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              />
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full mt-6 py-4 rounded-xl font-bold tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
            CREATE
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}