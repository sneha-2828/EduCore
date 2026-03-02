import { Menu, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-20">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu />
        </button>

        <h1 className="font-semibold text-lg capitalize">
          {user?.role} Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-sm">{user?.name || "User"}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
