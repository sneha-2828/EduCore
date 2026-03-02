import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function StudentLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar stays always */}
      <Sidebar />

      {/* Right side */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
