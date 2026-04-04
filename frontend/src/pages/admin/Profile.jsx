import { useState, useEffect } from "react";
import { Shield, Mail, Phone, Key, Lock, LogOut, X, Eye, EyeOff, Sparkles, Activity } from "lucide-react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const pageV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className={`group relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0f172a]/80 overflow-hidden shadow-xl backdrop-blur-xl ${className}`} onMouseMove={handleMouseMove}>
      <motion.div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)` }} />
      {children}
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/profile");
      setProfile(res.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile data");
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    navigate("/login");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) return toast.error("New passwords do not match");
    try {
      setIsSubmitting(true);
      await api.put("/admin/change-password", { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
      toast.success("Password successfully upgraded");
      setIsPasswordModalOpen(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update security credentials.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={pageV}
      className="p-6 md:p-10 space-y-10 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-gray-200 relative overflow-hidden transition-colors">
      {/* GLOWS */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 dark:bg-cyan-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/20 dark:bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      {/* HEADER */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="relative z-10 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring" }}>
              <Sparkles className="text-blue-500 dark:text-cyan-400" size={24} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-cyan-400 dark:to-blue-600">Admin</span>
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Command Center & Security Dashboard</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="space-y-8 relative z-10">
          <div className="h-48 w-full skeleton-shimmer rounded-3xl" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-72 w-full skeleton-shimmer rounded-3xl" />
            <div className="h-72 w-full skeleton-shimmer rounded-3xl" />
          </div>
        </div>
      ) : profile ? (
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }} className="relative z-10 space-y-8">
          {/* PROFILE BADGE CARD */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
            <SpotlightCard className="p-8 shadow-xl shadow-blue-900/5 dark:shadow-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500 animate-pulse" />
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                      <span className="text-3xl font-black text-white">{profile.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{profile.name}</h2>
                    <p className="text-lg font-medium text-blue-600 dark:text-cyan-400/80">Chief Administrator</p>
                    <div className="flex items-center gap-4 pt-2">
                      <span className="relative flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-black text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        Clearance Level: Tier 1
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto px-8 py-3.5 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                    Edit Identity
                  </motion.button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CONTACT & SYSTEM */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <SpotlightCard className="p-8 h-full shadow-xl shadow-blue-900/5 dark:shadow-none">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                    <Activity className="text-indigo-500" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Telemetry & Comms</h3>
                </div>
                <div className="space-y-6">
                  <InfoRow icon={<Mail />} label="Primary Route" value={profile.email} />
                  <InfoRow icon={<Phone />} label="Secure Line" value="+91 98765 43210" />
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-6" />
                  <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800/50">
                    <span className="text-sm font-semibold text-gray-500">Date of Commission</span>
                    <span className="font-mono text-sm text-gray-900 dark:text-white">{profile.joined ? new Date(profile.joined).toLocaleDateString() : 'Classified'}</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* SECURITY */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <SpotlightCard className="p-8 h-full shadow-xl shadow-blue-900/5 dark:shadow-none">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-800/30">
                    <Lock className="text-rose-500" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Security Protocols</h3>
                </div>
                <div className="space-y-4">
                  <SecurityAction icon={<Key size={20} />} title="Regenerate Passkey" subtitle="Update your master access token" onClick={() => setIsPasswordModalOpen(true)} primary />
                  <SecurityAction icon={<Shield size={20} />} title="Active Sessions" subtitle="2 devices securely connected" />
                  <div className="pt-4">
                    <motion.button whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }} onClick={handleLogout}
                      className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500/20 transition-all overflow-hidden relative group">
                      <span className="relative z-10 flex items-center gap-3"><LogOut size={20} /> Terminate All Sessions</span>
                      <div className="relative z-10 h-2 w-2 rounded-full bg-red-500 group-hover:animate-ping" />
                    </motion.button>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="relative z-10 text-center py-20 font-mono text-gray-500">[ ERR: FAILED TO FETCH PROFILE TELEMETRY ]</div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPasswordModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.2)] p-8 border border-white/20 dark:border-gray-800 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Security Upgrade</h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">Provide credentials to regenerate passkey.</p>
                </div>
                <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-5">
                <PasswordField label="Current Passkey" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} show={showCurrentPassword} toggle={() => setShowCurrentPassword(!showCurrentPassword)} />
                <PasswordField label="New Passkey" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} show={showNewPassword} toggle={() => setShowNewPassword(!showNewPassword)} minLength={6} />
                <PasswordField label="Confirm New Passkey" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} show={showNewPassword} toggle={() => setShowNewPassword(!showNewPassword)} minLength={6} />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting}
                  className="w-full mt-8 py-4 rounded-2xl font-bold tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  {isSubmitting ? "OVERWRITING STATUS..." : "UPGRADE CREDENTIALS"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800/50 transition-colors">
      <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="font-semibold text-gray-900 dark:text-white text-lg">{value}</p>
      </div>
    </div>
  );
}

function SecurityAction({ icon, title, subtitle, onClick, primary }) {
  return (
    <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`w-full flex items-center gap-5 p-4 rounded-2xl border text-left transition-all ${primary
        ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-100/50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 dark:bg-blue-500/5 dark:border-blue-500/10 dark:hover:bg-blue-500/10 dark:hover:border-blue-500/20'
        : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200 dark:bg-gray-900/30 dark:border-gray-800 dark:hover:bg-gray-800'
      }`}>
      <div className={`p-3 rounded-xl shadow-inner ${primary ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-bold ${primary ? 'text-blue-900 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{title}</h4>
        <p className="text-sm font-medium text-gray-500">{subtitle}</p>
      </div>
    </motion.button>
  );
}

function PasswordField({ label, value, onChange, show, toggle, minLength }) {
  return (
    <div className="space-y-1.5 relative group">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative">
        <input type={show ? "text" : "password"} required minLength={minLength} value={value} onChange={onChange}
          className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white font-mono placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none pr-12 transition-all" />
        {toggle && (
          <button type="button" onClick={toggle} className="absolute right-4 top-[14px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}