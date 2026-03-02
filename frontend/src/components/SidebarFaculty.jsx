import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  ClipboardList,
  BarChart3,
  User
} from "lucide-react";

export default function SidebarFaculty() {
  return (
    <aside className="w-64 bg-[#0a192f] text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-8">AcademicHub</div>

      <NavItem to="/faculty" icon={<LayoutDashboard />} label="Dashboard" />
      <NavItem to="/faculty/upload" icon={<Upload />} label="Upload Notes" />
      <NavItem to="/faculty/manage" icon={<FileText />} label="Manage Notes" />
      <NavItem to="/faculty/syllabus" icon={<ClipboardList />} label="Syllabus Tracker" />
      <NavItem to="/faculty/analytics" icon={<BarChart3 />} label="Analytics" />
      <NavItem to="/faculty/profile" icon={<User />} label="Profile" />
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
          isActive
            ? "bg-blue-600"
            : "text-gray-300 hover:bg-[#112240]"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
