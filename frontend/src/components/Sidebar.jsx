import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  CheckSquare,
  BarChart3,
  User,
  Book,
  Building2,
  Users,
  FileBarChart,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen }) {
  const { user } = useContext(AuthContext);
  const role = user?.role;

  const menu = {
    student: [
      { to: "/student/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
      { to: "/student/subjects", icon: <Book size={20} />, label: "Subjects" },
      { to: "/student/exam-mode", icon: <CheckSquare size={20} />, label: "Exam Mode" },
      { to: "/student/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
      { to: "/student/profile", icon: <User size={20} />, label: "Profile" },
    ],
    faculty: [
      { to: "/faculty/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
      { to: "/faculty/upload-notes", icon: <Upload size={20} />, label: "Upload Notes" },
      { to: "/faculty/manage-notes", icon: <FileText size={20} />, label: "Manage Notes" },
      { to: "/faculty/syllabus-tracker", icon: <CheckSquare size={20} />, label: "Syllabus Tracker" },
      { to: "/faculty/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
      { to: "/faculty/profile", icon: <User size={20} />, label: "Profile" },
    ],
    admin: [
      { to: "/admin/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
      { to: "/admin/departments", icon: <Building2 size={20} />, label: "Departments" },
      { to: "/admin/users", icon: <Users size={20} />, label: "Users" },
      { to: "/admin/syllabus-status", icon: <CheckSquare size={20} />, label: "Syllabus Status" },
      { to: "/admin/reports", icon: <FileBarChart size={20} />, label: "Reports" },
      { to: "/admin/profile", icon: <User size={20} />, label: "Profile" },
    ],
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-800/60 shadow-sm
      transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-16 flex items-center justify-center font-bold text-lg border-b border-gray-200 dark:border-gray-800/60 text-gray-900 dark:text-white"
      >
        {isOpen ? (
          <span className="text-gradient font-extrabold tracking-tight">CampusNotes</span>
        ) : (
          "🎓"
        )}
      </motion.div>

      {/* MENU */}
      <nav className="mt-6 space-y-1.5 px-3">
        {menu[role]?.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 20 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-300 group font-medium text-sm
                 ${isActive 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"}`
              }
            >
               <span className={`transition-transform duration-300 group-hover:scale-110`}>
                 {item.icon}
               </span>
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </aside>
  );
}

