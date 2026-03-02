import {
  Clock,
  AlertCircle,
} from "lucide-react";

export default function SyllabusStatus() {
  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Syllabus Status
        </h1>
        <p className="text-gray-500 mt-1">
          Department-wise syllabus completion overview
        </p>
      </div>

      {/* COMPUTER SCIENCE */}
      <DepartmentSection
        title="Computer Science"
        code="CS"
        subjects={[
          {
            name: "Data Structures & Algorithms",
            code: "CS301",
            completed: 3,
            total: 5,
            percent: 60,
            status: "warning",
          },
          {
            name: "Database Management Systems",
            code: "CS302",
            completed: 4,
            total: 5,
            percent: 80,
            status: "good",
          },
          {
            name: "Operating Systems",
            code: "CS303",
            completed: 2,
            total: 4,
            percent: 50,
            status: "warning",
          },
          {
            name: "Computer Networks",
            code: "CS401",
            completed: 2,
            total: 5,
            percent: 40,
            status: "danger",
          },
        ]}
      />

      {/* ECE */}
      <DepartmentSection
        title="Electronics & Communication"
        code="ECE"
        subjects={[
          {
            name: "Digital Signal Processing",
            code: "ECE301",
            completed: 2,
            total: 4,
            percent: 50,
            status: "warning",
          },
          {
            name: "VLSI Design",
            code: "ECE401",
            completed: 2,
            total: 3,
            percent: 67,
            status: "good",
          },
        ]}
      />

      {/* MECH */}
      <EmptyDepartment title="Mechanical Engineering" code="MECH" />

      {/* CIVIL */}
      <EmptyDepartment title="Civil Engineering" code="CIVIL" />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function DepartmentSection({ title, code, subjects }) {
  return (
    <div className="bg-white border rounded-2xl p-6 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm px-3 py-1 rounded-full bg-gray-100 font-medium">
          {code}
        </span>
      </div>

      {subjects.map((sub, idx) => (
        <SubjectProgress key={idx} {...sub} />
      ))}
    </div>
  );
}

function SubjectProgress({
  name,
  code,
  completed,
  total,
  percent,
  status,
}) {
  const statusColor = {
    good: "text-green-600",
    warning: "text-orange-500",
    danger: "text-red-600",
  };

  return (
    <div className="border rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <p className="font-semibold">{name}</p>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
            {code}
          </span>
        </div>

        <div className={`flex items-center gap-1 font-semibold ${statusColor[status]}`}>
          {status === "danger" ? <AlertCircle size={16} /> : <Clock size={16} />}
          {percent}%
        </div>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-2 bg-[#0a192f]"
          style={{ width: `${percent}%` }}
        />
        <div
          className="h-2 bg-yellow-500 -mt-2"
          style={{ width: `100%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {completed} of {total} units completed
      </p>
    </div>
  );
}

function EmptyDepartment({ title, code }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm px-3 py-1 rounded-full bg-gray-100 font-medium">
          {code}
        </span>
      </div>

      <p className="text-gray-400 text-center py-8">
        No subjects assigned
      </p>
    </div>
  );
}
