import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  ClipboardList,
  BarChart3,
  User
} from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarFaculty() {
  const menu = [
    { to: "/faculty", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/faculty/upload", icon: <Upload size={20} />, label: "Upload Notes" },
    { to: "/faculty/manage", icon: <FileText size={20} />, label: "Manage Notes" },
    { to: "/faculty/syllabus", icon: <ClipboardList size={20} />, label: "Syllabus Tracker" },
    { to: "/faculty/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
    { to: "/faculty/profile", icon: <User size={20} />, label: "Profile" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-800/60 shadow-sm min-h-screen">
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-gray-200 dark:border-gray-800/60 text-gray-900 dark:text-white">
        <span className="text-gradient font-extrabold tracking-tight">AcademicHub</span>
      </div>

      <nav className="mt-6 space-y-1.5 px-3">
        {menu.map((item, index) => (
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
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </aside>
  );
}

