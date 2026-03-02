import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

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

      if (res.data.role === "admin") navigate("/admin/dashboard");
      else if (res.data.role === "faculty") navigate("/faculty/dashboard");
      else navigate("/student/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* LEFT IMAGE – 60% */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:block w-[60%] h-screen"
      >
        <img
          src="/login-image.jpeg"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* RIGHT FORM – 40% */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-[40%] flex items-center justify-center bg-[#f8fafc]"
      >
        {/* CARD */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-10 py-12">
          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <img
              src="/college-logo.png"
              alt="College Logo"
              className="w-20 h-20"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-[#0a192f] text-center">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mt-2 mb-8">
            Login to continue to your dashboard
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-semibold rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="text-xs font-bold uppercase text-[#0a192f] mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-12 py-4 bg-gray-50 border-2 rounded-xl focus:border-[#1e90ff] outline-none"
                  placeholder="name@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-bold uppercase text-[#0a192f] mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl focus:border-[#1e90ff] outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <span className="text-sm text-[#1e90ff] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#1e90ff] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
            >
              Sign In
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400 font-semibold">
            Don&apos;t have an account?{" "}
            <Link to="/" className="text-[#1e90ff]">
              Contact Admin
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}