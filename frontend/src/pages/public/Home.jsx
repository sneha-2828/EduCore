import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BookOpen,
  BarChart3,
  Users,
  Clock,
  Sun,
  Moon,
} from "lucide-react";

export default function Home() {
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

  const features = [
    {
      icon: <BookOpen />,
      title: "Smart Notes Sharing",
      desc: "Faculty upload structured notes while students access organized learning material instantly.",
    },
    {
      icon: <Clock />,
      title: "Syllabus Tracking",
      desc: "Track syllabus completion and stay updated with pending academic units.",
    },
    {
      icon: <BarChart3 />,
      title: "Advanced Analytics",
      desc: "Powerful analytics show how students interact with academic content.",
    },
    {
      icon: <Users />,
      title: "Role Based Dashboards",
      desc: "Separate dashboards for Students, Faculty and Admin with dedicated features.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-gray-900 dark:text-white transition-colors duration-500">
      
      {/* NAVBAR */}
      <nav className="glass fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 transition-all duration-300">
        <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-gradient">CampusNotes</span>
        </h1>

        <div className="flex items-center gap-6 font-medium">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition"
          >
            Login
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="bg-blue-600 dark:bg-cyan-500 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all font-semibold"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors shadow-sm"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden pt-20">
        
        {/* Glow Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 dark:bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              A Smarter Way to <br className="hidden md:block" />
              <span className="text-gradient">Share Academic Notes</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Centralized platform for students and faculty. Organize notes, track your syllabus, and boost exam preparation with powerful analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="bg-blue-600 dark:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20"
            >
              Start for Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-8 py-4 rounded-xl font-bold text-lg shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              Go to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

      {/* FEATURES */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
              Powerful Platform Setup
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Everything you need to excel academically.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-cyan-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-blue-600 dark:text-cyan-400 mb-6 p-4 bg-blue-50 dark:bg-cyan-500/10 inline-block rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <Step number="1" title="Faculty Upload Notes" />
            <Step number="2" title="Students Access Material" delay={0.1} />
            <Step number="3" title="Track Progress & Prepare" delay={0.2} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-[#081024] dark:to-[#020617]" />
        <div className="max-w-4xl mx-auto relative z-10 text-center glass-card p-16 !bg-white/50 dark:!bg-[#0f172a]/50 border-blue-100 dark:border-gray-800/80">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
            Ready to upgrade your academics?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="bg-blue-600 dark:bg-cyan-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all mt-6"
          >
            Join CampusNotes Free
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#020617]">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">CampusNotes</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">© 2026 Crafted with ❤️ for Students.</p>
        <div className="flex justify-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">About</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Features</span>
          <span className="cursor-pointer hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Contact</span>
        </div>
      </footer>
    </div>
  );
}

function Step({ number, title, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-10 flex flex-col items-center group relative overflow-hidden"
    >
      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-cyan-500/10 flex items-center justify-center text-3xl font-extrabold text-blue-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
    </motion.div>
  );
}