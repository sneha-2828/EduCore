import { useState } from "react";
import { Mail, Calendar, UserCheck, UserX } from "lucide-react";

export default function Users() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage faculty approvals, students, and user accounts
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3 bg-gray-100 p-2 rounded-xl w-fit">
        <Tab
          label="Pending Approvals"
          count={3}
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        />
        <Tab
          label="Faculty"
          active={activeTab === "faculty"}
          onClick={() => setActiveTab("faculty")}
        />
        <Tab
          label="Students"
          active={activeTab === "students"}
          onClick={() => setActiveTab("students")}
        />
      </div>

      {/* USER LIST */}
      <div className="space-y-5">
        <UserCard
          name="Dr. James Wilson"
          email="james.wilson@college.edu"
          department="Computer Science"
          date="Today"
          id="FAC-2024-015"
        />
        <UserCard
          name="Prof. Emily Chen"
          email="emily.chen@college.edu"
          department="Electronics"
          date="Yesterday"
          id="FAC-2024-016"
        />
        <UserCard
          name="Dr. Robert Brown"
          email="robert.brown@college.edu"
          department="Mechanical"
          date="2 days ago"
          id="FAC-2024-017"
        />
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Tab({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2
        ${
          active
            ? "bg-white shadow text-gray-900"
            : "text-gray-600 hover:text-gray-900"
        }`}
    >
      {label}
      {count && (
        <span className="bg-yellow-100 text-yellow-700 px-2 rounded-full text-xs">
          {count}
        </span>
      )}
    </button>
  );
}

function UserCard({ name, email, department, date, id }) {
  return (
    <div className="bg-white border rounded-2xl p-6 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="font-bold text-gray-600">
            {name.split(" ")[1][0]}
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-gray-900">
            {name}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Mail size={14} /> {email}
            </span>
            <span>{department}</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {date}
            </span>
          </div>

          <span className="inline-block mt-2 px-3 py-1 text-xs border rounded-full">
            {id}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">
          <UserCheck size={16} />
          Approve
        </button>
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
          <UserX size={16} />
          Reject
        </button>
      </div>
    </div>
  );
}
