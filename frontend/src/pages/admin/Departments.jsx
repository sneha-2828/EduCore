import { Building2 } from "lucide-react";

export default function Departments() {
  const departments = [
    {
      name: "Computer Science",
      code: "CS",
      faculty: 3,
      students: 2,
      subjects: 6,
      progress: 52,
    },
    {
      name: "Electronics & Communication",
      code: "ECE",
      faculty: 1,
      students: 1,
      subjects: 2,
      progress: 57,
    },
    {
      name: "Mechanical Engineering",
      code: "MECH",
      faculty: 0,
      students: 0,
      subjects: 0,
      progress: 0,
    },
    {
      name: "Civil Engineering",
      code: "CIVIL",
      faculty: 0,
      students: 0,
      subjects: 0,
      progress: 0,
    },
  ];

  return (
    <main className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
        <p className="text-gray-500 mt-1">
          Manage departments and view their status
        </p>
      </div>

      {/* DEPARTMENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.code}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-yellow-100">
                  <Building2 className="text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {dept.name}
                </h2>
              </div>

              <span className="text-sm font-semibold px-3 py-1 rounded-full border text-gray-600">
                {dept.code}
              </span>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 text-center mb-6">
              <Stat label="Faculty" value={dept.faculty} />
              <Stat label="Students" value={dept.students} />
              <Stat label="Subjects" value={dept.subjects} />
            </div>

            {/* PROGRESS */}
            <div>
              <div className="flex justify-between text-sm mb-2 text-gray-600">
                <span>Syllabus Progress</span>
                <span className="font-semibold">{dept.progress}%</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${dept.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/* ---------- SMALL COMPONENT ---------- */
function Stat({ label, value }) {
  return (
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
