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
      className={`fixed left-0 top-0 z-40 h-screen bg-[#0a192f] text-white
      transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-[#112240]">
        {isOpen ? "Academic Portal" : "🎓"}
      </div>

      {/* MENU */}
      <nav className="mt-4 space-y-1">
        {menu[role]?.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 mx-2 rounded-lg transition
               ${isActive ? "bg-[#112240]" : "hover:bg-[#112240]"}`
            }
          >
            {item.icon}
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
