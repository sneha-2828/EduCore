import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Brain,
  Upload,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-[#071426] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#071426]/80 backdrop-blur border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            AcademicHub
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link
              to="/login"
              className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2a4a] to-[#071426] text-white">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6"
          >
            <Sparkles size={16} />
            AI-Powered Academic Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Your Complete <br />
            <span className="text-amber-400">
              Academic Learning Hub
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-white/80"
          >
            Structured college notes, AI-powered assistance, exam-focused
            learning, and real-time academic progress tracking — all in one
            platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-amber-500 text-black font-bold flex items-center gap-2 hover:bg-amber-400 transition"
            >
              Get Started <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-28 bg-gray-50 dark:bg-[#081a2f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold">
              Powerful Features for Modern Learning
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Everything you need to succeed academically — built for colleges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen />,
                title: "Organized Notes",
                desc: "Subject-wise and unit-wise notes uploaded by faculty.",
              },
              {
                icon: <Brain />,
                title: "AI-Powered Learning",
                desc: "Smart summaries, exam focus, and contextual Q&A.",
              },
              {
                icon: <Upload />,
                title: "Easy Upload",
                desc: "Faculty uploads with AI summarization and versioning.",
              },
              {
                icon: <BarChart3 />,
                title: "Progress Tracking",
                desc: "Monitor syllabus completion and engagement analytics.",
              },
              {
                icon: <ShieldCheck />,
                title: "Secure Access",
                desc: "Role-based access for students, faculty, and admins.",
              },
              {
                icon: <Sparkles />,
                title: "Exam Mode",
                desc: "Focused revision with priority units and checklists.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#071426] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg">{f.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            How It Works
          </motion.h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Get started in minutes with a simple, guided workflow.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register & Login",
                desc: "Create an account using your college email.",
              },
              {
                step: "02",
                title: "Access Dashboard",
                desc: "Personalized dashboard based on your role.",
              },
              {
                step: "03",
                title: "Start Learning",
                desc: "Browse notes, use AI tools, and track progress.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-gray-50 dark:bg-[#081a2f] border border-gray-200 dark:border-white/10"
              >
                <div className="text-5xl font-extrabold text-gray-300 mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-xl">{s.title}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-br from-[#0b2a4a] to-[#071426] text-white py-28">
        <div className="text-center px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <p className="mt-4 text-white/80">
            Join thousands of students and faculty already using AcademicHub.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#071426] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm text-white/70">
          <div>© 2026 AcademicHub. All rights reserved.</div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">About</span>
            <span className="hover:text-white cursor-pointer">Contact</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
