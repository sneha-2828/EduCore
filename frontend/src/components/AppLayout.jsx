import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} />

      {/* MAIN CONTENT */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* NAVBAR */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* PAGE CONTENT */}
        <main className="bg-[#f8fafc] min-h-screen p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
