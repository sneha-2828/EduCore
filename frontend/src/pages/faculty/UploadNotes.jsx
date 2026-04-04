import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Layers,
  FileUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";

export default function UploadNotes() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [file, setFile] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUnits = async (subjectId) => {
    try {
      const res = await api.get(`/units?subject=${subjectId}`);
      setUnits(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubjectChange = (e) => {
    const id = e.target.value;
    setSubject(id);
    setUnit("");
    fetchUnits(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus({ type: "error", message: "Please select a PDF file to upload." });
      return;
    }

    if (!title || !subject || !unit) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setStatus({ type: "loading", message: "Uploading your notes..." });

    const formData = new FormData();
    formData.append("title", title);
    formData.append(
      "department",
      subjects.find((s) => s._id === subject)?.semester?.department
    );
    formData.append("subject", subject);
    formData.append("unit", unit);
    formData.append("file", file);

    try {
      await api.post("/notes/upload", formData);
      setStatus({ type: "success", message: "Notes uploaded successfully! 🎉" });
      setTitle("");
      setSubject("");
      setUnit("");
      setFile(null);
    } catch {
      setStatus({ type: "error", message: "Upload failed. Please try again." });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovering(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setStatus({ type: "", message: "" });
    } else {
      setStatus({ type: "error", message: "Only PDF files are allowed." });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setStatus({ type: "", message: "" });
    } else {
      setStatus({ type: "error", message: "Only PDF files are allowed." });
    }
  };

  const selectedSubjectData = subjects.find(s => s._id === subject);
  const selectedUnitData = units.find(u => u._id === unit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 20 }}
      className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-gray-200 transition-colors relative overflow-hidden"
    >
      {/* GLOW */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-cyan-500/10 dark:to-blue-600/10 blur-[120px] rounded-full top-[-100px] left-[30%] -z-10"
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-10 relative z-10"
      >
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent pb-2">
          Upload Notes
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mt-2 font-medium">
          Share your study materials and empower your students
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="lg:col-span-8 glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all"
        >
          {/* Subtle bg glow */}
          <motion.div
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl -z-10"
          />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* SUBJECT + UNIT */}
            <div className="grid md:grid-cols-2 gap-8">
              <SelectField
                icon={<BookOpen size={18} className="text-indigo-500" />}
                label="Select Subject"
                value={subject}
                onChange={handleSubjectChange}
                options={subjects}
                optionLabel="name"
              />

              <SelectField
                icon={<Layers size={18} className="text-purple-500" />}
                label="Select Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                options={units}
                optionLabel="title"
                disabled={!subject}
              />
            </div>

            {/* TITLE */}
            <InputField
              icon={<FileText size={18} className="text-blue-500" />}
              label="Document Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chapter 1: Introduction to Web Data"
            />

            {/* FILE DROPZONE */}
            <div>
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 block">
                Upload PDF Document
              </label>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative flex flex-col items-center justify-center p-10
                  border-2 border-dashed rounded-3xl transition-all duration-300
                  ${isHovering 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' 
                    : file 
                      ? 'border-green-400 bg-green-50/50 dark:bg-green-900/10' 
                      : 'border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                  cursor-pointer group overflow-hidden
                `}
              >
                {/* Background pulse effect when hovering */}
                <AnimatePresence>
                  {isHovering && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="absolute inset-0 bg-indigo-400/10 dark:bg-cyan-400/10 z-0"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    animate={isHovering ? { y: -10 } : { y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className={`p-5 rounded-full mb-4 shadow-sm transition-colors ${
                      file ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400" :
                      isHovering ? "bg-indigo-100 text-indigo-600 dark:bg-cyan-900/50 dark:text-cyan-400" :
                      "bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {file ? <FileText size={32} /> : <FileUp size={32} />}
                  </motion.div>

                  {file ? (
                    <div className="space-y-2">
                      <p className="font-bold text-green-700 dark:text-green-400 text-lg">
                        {file.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-bold text-gray-700 dark:text-gray-200 text-lg">
                        {isHovering ? "Drop it here!" : "Click or drag your PDF here"}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        Maximum file size: 50MB
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="application/pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={handleFileChange}
                />
              </motion.div>
            </div>

            {/* STATUS MESSAGE */}
            <AnimatePresence mode="wait">
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className={`flex items-center gap-3 p-4 rounded-2xl font-semibold border ${
                    status.type === "success" 
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" 
                      : status.type === "loading"
                      ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                      : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                  }`}
                >
                  {status.type === "success" && <CheckCircle size={20} />}
                  {status.type === "error" && <AlertCircle size={20} />}
                  {status.type === "loading" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                    />
                  )}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={status.type === "loading"}
              className="
                w-full py-5 rounded-2xl font-bold text-white text-lg tracking-wide
                bg-gradient-to-r from-indigo-600 to-purple-600
                dark:from-cyan-500 dark:to-blue-600
                shadow-xl transition-all flex items-center justify-center gap-3
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              <Upload size={22} />
              {status.type === "loading" ? "Uploading..." : "Publish Notes"}
            </motion.button>

          </form>
        </motion.div>

        {/* PREVIEW PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="lg:col-span-4"
        >
          <div className="glass-card !bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:!from-slate-800/80 dark:!to-[#0f172a]/80 border border-indigo-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl sticky top-8">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-500 dark:text-cyan-400" />
              Document Preview
            </h3>

            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
              className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-32 bg-indigo-50 dark:bg-gray-700 rounded-xl flex items-center justify-center border border-indigo-100 dark:border-gray-600 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <FileText size={40} className={file ? "text-indigo-500" : "text-gray-300 dark:text-gray-500"} />
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider text-xs">Title</p>
                  <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                    {title || "Untitled Document"}
                  </p>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-700 w-full" />

                <Row label="Subject" value={selectedSubjectData?.name || "-"} />
                <Row label="Unit" value={selectedUnitData?.title || "-"} />
                
                <div className="h-px bg-gray-100 dark:bg-gray-700 w-full" />

                <Row 
                  label="File Status" 
                  value={file ? <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1"><CheckCircle size={14} /> Attached</span> : <span className="text-orange-500 font-bold">Pending</span>} 
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-indigo-100/50 dark:border-gray-700/50 rounded-2xl p-4 text-xs font-medium text-gray-500 dark:text-gray-400 text-center flex gap-2 items-start"
            >
               <AlertCircle size={16} className="text-indigo-400 shrink-0" />
               <p>Your uploaded notes will be instantly available to all students enrolled in this subject.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ----------------- COMPONENTS ----------------- */

function InputField({ label, value, onChange, placeholder, icon }) {
  return (
    <div className="relative">
      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:scale-110 transition-transform">
          {icon}
        </div>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full border-2 border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-4 py-4
            bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium
            focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10
            outline-none transition-all shadow-sm
          "
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, optionLabel, icon, disabled }) {
  return (
    <div className="relative">
      <label className={`text-sm font-bold mb-2 block ${disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </label>
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:scale-110 transition-transform ${disabled && 'opacity-50'}`}>
          {icon}
        </div>
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            appearance-none w-full border-2 border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-10 py-4
            bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium
            focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10
            outline-none transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <option value="" disabled>Choose {label.replace('Select ', '')}</option>
          {options.map((o) => (
            <option key={o._id} value={o._id} className="font-medium">
              {o[optionLabel]}
            </option>
          ))}
        </select>
        {/* Custom Caret */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
          <svg className={`w-5 h-5 ${disabled && 'opacity-50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-gray-500 dark:text-gray-400 font-semibold">{label}</span>
      <span className="font-bold text-gray-900 dark:text-white text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}