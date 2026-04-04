import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  /* Rotating text */
  const texts = [
    "Smart Academic Notes Sharing",
    "Track Syllabus Progress",
    "Prepare Faster for Exams",
    "Analyze Learning Insights",
  ];

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      login(res.data.token, res.data.role, res.data.name || "User");

      rememberMe
        ? localStorage.setItem("rememberEmail", email)
        : localStorage.removeItem("rememberEmail");

      toast.success("Login successful");

      if (res.data.role === "admin") navigate("/admin/dashboard");
      else if (res.data.role === "faculty") navigate("/faculty/dashboard");
      else navigate("/student/dashboard");

    } catch {
      const msg = "Invalid email or password";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-500 ${
        darkMode ? "bg-[#020617] text-white" : "bg-white text-gray-900"
      }`}
    >
      <Toaster position="top-right" />

      {/* LEFT HERO SECTION */}
      <div className="hidden md:flex w-[60%] relative items-center justify-center overflow-hidden">
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
          animate={{ x: [0, 80, -80, 0], y: [0, -60, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${darkMode ? "bg-cyan-500/10" : "bg-blue-400/20"}`}
        />

        <motion.div
          animate={{ x: [0, -120, 120, 0], y: [0, 80, -80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none ${darkMode ? "bg-blue-600/10" : "bg-indigo-500/15"}`}
        />

        {/* CONTENT */}
        <div className="relative max-w-xl px-16 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-extrabold mb-6 tracking-tight"
          >
            <span className="text-gradient">CampusNotes</span>
          </motion.h1>

          {/* Animated text */}
          <motion.h2
            key={texts[textIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold mb-6 text-blue-600 dark:text-cyan-400"
          >
            {texts[textIndex]}
          </motion.h2>

          <p className="text-lg mb-10 text-gray-600 dark:text-gray-400 leading-relaxed">
            A centralized platform where students and faculty share organized
            academic notes, track syllabus progress, and prepare smarter for exams.
          </p>

          {/* Features */}
          <div className="space-y-5">
            <Feature text="Smart Notes Sharing" />
            <Feature text="Syllabus Tracking" />
            <Feature text="Exam Mode Preparation" />
            <Feature text="Advanced Analytics" />
            <Feature text="Role Based Dashboards" />
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="w-full md:w-[40%] flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-gray-50 dark:bg-[#020617] z-0" />

        <div className="w-full max-w-md px-10 py-12 relative z-10">
          <div className="glass-card p-10 !bg-white/80 dark:!bg-[#0f172a]/80 shadow-2xl shadow-blue-900/5">
            {/* Dark mode toggle */}
            <div className="flex justify-end mb-6">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors shadow-sm"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            {/* Center Logo */}
            <div className="flex justify-center mb-8">
              <img src="/college-logo.png" alt="logo" className="w-16 h-16 object-contain" />
            </div>

            <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2 tracking-tight">
              Welcome Back
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
              Login to your academic dashboard
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* EMAIL */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 block">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                  <input
                    type="email"
                    className="w-full pl-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                    placeholder="name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 block">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none text-gray-900 dark:text-white transition-all shadow-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              <div className="flex justify-between items-center px-1">
                <label className="flex items-center text-sm text-gray-600 dark:text-gray-400 cursor-pointer group">
                  <div className="relative flex items-center justify-center mr-2">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#020617] checked:bg-blue-600 dark:checked:bg-cyan-500 checked:border-transparent transition-colors cursor-pointer"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <span className="group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">Remember me</span>
                </label>

                <span onClick={() => navigate("/forgot-password")} className="text-sm font-medium text-blue-600 dark:text-cyan-400 cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 dark:bg-cyan-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all mt-4"
              >
                Sign In
              </motion.button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 dark:text-cyan-400 font-bold hover:underline">
              Register Here
            </Link>
          </p>
          
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors block mx-auto text-center"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* Feature Component */
function Feature({ text }) {
  return (
    <motion.div whileHover={{ x: 6 }} className="flex items-center gap-4 text-lg p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/30 transition-colors cursor-default">
      <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      <span className="text-gray-700 dark:text-gray-300 font-medium">{text}</span>
    </motion.div>
  );
}