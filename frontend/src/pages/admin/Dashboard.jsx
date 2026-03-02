import {
  Users,
  BookOpen,
  GraduationCap,
  Clock,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor platform activity and manage users
          </p>
        </div>

        <button className="bg-[#0f172a] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#020617] transition">
          Generate Reports
        </button>
      </div>

      {/* PENDING APPROVAL */}
      <div className="flex justify-between items-center border border-yellow-300 bg-yellow-50 rounded-xl p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-200 rounded-xl">
            <Clock className="text-yellow-700" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              Pending Faculty Approvals
            </p>
            <p className="text-sm text-gray-600">
              1 faculty registration awaiting approval
            </p>
          </div>
        </div>
        <button className="border border-gray-300 bg-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Review Now
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<BookOpen />}
          label="Departments"
          value="4"
          bg="bg-gray-100"
        />
        <StatCard
          icon={<GraduationCap />}
          label="Total Students"
          value="3"
          bg="bg-yellow-100"
        />
        <StatCard
          icon={<Users />}
          label="Total Faculty"
          value="4"
          bg="bg-blue-100"
        />
        <StatCard
          icon={<Clock />}
          label="Pending Approvals"
          value="1"
          bg="bg-orange-100"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SYLLABUS COVERAGE */}
        <div className="lg:col-span-2 bg-white border rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">
                Department-wise Syllabus Coverage
              </h3>
              <p className="text-sm text-gray-500">
                Overview of syllabus completion across departments
              </p>
            </div>
            <span className="text-blue-600 cursor-pointer font-medium">
              View Details →
            </span>
          </div>

          <ProgressRow
            label="Computer Science"
            code="CS"
            value={52}
            units="14/27 units"
          />
          <ProgressRow
            label="Electronics & Communication"
            code="ECE"
            value={57}
            units="4/7 units"
          />
          <ProgressRow
            label="Mechanical Engineering"
            code="MECH"
            value={0}
            units="0/0 units"
          />
          <ProgressRow
            label="Civil Engineering"
            code="CIVIL"
            value={0}
            units="0/0 units"
          />
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6">
            Recent Activity
          </h3>

          <Activity
            text={`Dr. Suresh Menon uploaded "Binary Trees Comprehensive Notes"`}
            time="Oct 5, 10:15 PM"
          />
          <Activity
            text={`Rahul Sharma viewed "SQL Commands Complete Guide"`}
            time="Oct 5, 9:00 PM"
          />
          <Activity
            text={`Prof. Anita Desai updated "CPU Scheduling Algorithms"`}
            time="Oct 1, 2:30 PM"
          />
          <Activity
            text={`Dr. Rajesh Iyer uploaded "Z-Transform Notes"`}
            time="Sep 28, 4:30 PM"
          />
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <QuickCard icon={<BookOpen />} label="Manage Departments" />
          <QuickCard icon={<Users />} label="User Management" />
          <QuickCard icon={<TrendingUp />} label="Faculty Activity" />
          <QuickCard icon={<FileText />} label="Generate Reports" />
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ icon, label, value, bg }) {
  return (
    <div className="bg-white border rounded-xl p-6 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function ProgressRow({ label, code, value, units }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between text-sm mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          <span className="border px-2 py-0.5 rounded-full text-xs">
            {code}
          </span>
        </div>
        <span className="text-gray-500">{units}</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-yellow-500 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Activity({ text, time }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-b-0">
      <div className="p-2 bg-green-100 rounded-full">
        <FileText size={16} />
      </div>
      <div>
        <p className="text-sm font-medium">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

function QuickCard({ icon, label }) {
  return (
    <div className="bg-white border rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow transition cursor-pointer">
      <div className="p-3 bg-gray-100 rounded-xl">
        {icon}
      </div>
      <p className="font-semibold">{label}</p>
    </div>
  );
}
