import { useState } from "react";
import { User, Lock, Bell, LogOut, CheckCircle } from "lucide-react";

export default function ProfileLayout({
  user,
  OverviewComponent,
  SecurityComponent,
  NotificationsComponent,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-white rounded-2xl border p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* LEFT PANEL */}
      <div className="border-r pr-6">
        {/* USER CARD */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#0f2a44] text-white flex items-center justify-center text-2xl font-bold">
              {user.initials}
            </div>
            <CheckCircle
              size={20}
              className="absolute bottom-0 right-0 text-green-500 bg-white rounded-full"
            />
          </div>

          <h3 className="mt-4 font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.id}</p>
        </div>

        {/* MENU */}
        <MenuItem
          icon={<User size={18} />}
          label="Account Overview"
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <MenuItem
          icon={<Lock size={18} />}
          label="Security & Password"
          active={activeTab === "security"}
          onClick={() => setActiveTab("security")}
        />
        <MenuItem
          icon={<Bell size={18} />}
          label="Notifications"
          active={activeTab === "notifications"}
          onClick={() => setActiveTab("notifications")}
        />
        <MenuItem
          icon={<LogOut size={18} />}
          label="Sign Out"
          danger
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:col-span-3">
        {activeTab === "overview" && <OverviewComponent />}
        {activeTab === "security" && <SecurityComponent />}
        {activeTab === "notifications" && <NotificationsComponent />}
      </div>
    </div>
  );
}

function MenuItem({ icon, label, active, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium mb-2
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : active
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
