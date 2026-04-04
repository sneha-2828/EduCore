import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, User, Mail, Lock, Building, Layers, ShieldCheck } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  // Read dark mode from local storage if available, default light
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex transition-colors duration-500 ${
        darkMode ? "bg-[#020617] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* LEFT HERO SECTION */}
      <div className="hidden lg:flex w-[55%] relative items-center justify-center overflow-hidden">
        {/* Gradient */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            darkMode
              ? "bg-gradient-to-br from-[#081024] via-[#020617] to-black"
              : "bg-gradient-to-br from-blue-50 via-white to-blue-100"
          }`}
        />

        {/* Animated blobs */}
        <motion.div
          animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${darkMode ? "bg-cyan-500/10" : "bg-blue-400/20"}`}
        />

        <motion.div
          animate={{ x: [0, -100, 100, 0], y: [0, 60, -60, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none ${darkMode ? "bg-blue-600/10" : "bg-indigo-500/15"}`}
        />

        {/* CONTENT */}
        <div className="relative max-w-xl px-16 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-extrabold mb-6 tracking-tight"
          >
            Join <span className="text-gradient">CampusNotes</span>
          </motion.h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
            Create an account to discover a smarter way of managing academic notes, tracking your syllabus, and preparing for exams collaboratively.
          </p>
          
          <div className="flex justify-center">
             <img src="/college-logo.png" alt="logo" className="w-32 h-32 object-contain opacity-80" />
          </div>
        </div>
      </div>

      {/* RIGHT REGISTRATION SECTION */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="w-full lg:w-[45%] flex items-center justify-center relative overflow-y-auto"
      >
        <div className="absolute inset-0 bg-gray-50 dark:bg-[#020617] z-0" />

        <div className="w-full max-w-[480px] px-8 py-12 relative z-10 my-8">
          <div className="glass-card p-8 sm:p-10 !bg-white/80 dark:!bg-[#0f172a]/80 shadow-2xl shadow-blue-900/5">
            {/* Dark mode toggle */}
            <div className="flex justify-end mb-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors shadow-sm"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              Create Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Enter your details to register
            </p>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/login"); }}>
              {/* FULL NAME */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="text"
                  className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="email"
                  className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                  placeholder="College Email"
                  required
                />
              </div>

              {/* ROLE SELECT */}
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                <select
                  className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm appearance-none cursor-pointer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student Account</option>
                  <option value="faculty">Faculty Account</option>
                </select>
              </div>

              {/* DEPARTMENT */}
              <div className="relative group">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="text"
                  className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                  placeholder="Department"
                  required
                />
              </div>

              {/* ROLE SPECIFIC FIELDS */}
              {role === "student" && (
                <div className="relative group">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                  <select className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm appearance-none cursor-pointer">
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              )}

              {role === "faculty" && (
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                  <input
                    type="text"
                    className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                    placeholder="Faculty ID"
                    required
                  />
                </div>
              )}

              {/* PASSWORD */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="password"
                  className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                  placeholder="Password"
                  required
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="password"
                  className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 dark:bg-cyan-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all mt-4"
              >
                Register
              </motion.button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600 dark:text-cyan-400 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

