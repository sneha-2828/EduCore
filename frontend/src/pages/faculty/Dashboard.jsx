import {
  Upload,
  FileText,
  Eye,
  Clock,
  Users,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function FacultyDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/notes/faculty-dashboard");
        setData(res.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchDashboard();
  }, []);

if (!data) {
  return (
    <div className="p-8">
      <p>Loading dashboard...</p>
    </div>
  );
}
  const pendingUnits = data.pendingUnits || [];
  const recentUploads = data.recentUploads || [];

  return (
    <main className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {data.facultyName}
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your notes and track syllabus progress
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<FileText />}
          label="Notes Uploaded"
          value={data.totalNotes || 0}
        />

        {/* <StatCard
          icon={<Eye />}
          label="Total Views"
          value={data.totalViews || 0}
        /> */}

        <StatCard
          icon={<Clock />}
          label="Pending Units"
          value={pendingUnits.length}
        />

        <StatCard
          icon={<Users />}
          label="Subjects"
          value={data.totalSubjects || 0}
        />
      </div>

      {/* SYLLABUS COMPLETION */}
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          Syllabus Completion
        </h3>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{
              width: `${data.syllabusCompletion || 0}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-600">
          {data.syllabusCompletion || 0}% completed
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PENDING UNITS */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-200 rounded-xl">
              <AlertTriangle className="text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Pending Units
              </h3>
              <p className="text-sm text-gray-600">
                Units awaiting notes upload
              </p>
            </div>
          </div>

          {pendingUnits.length === 0 ? (
            <p className="text-green-600 font-semibold">
              All units completed 🎉
            </p>
          ) : (
            pendingUnits.map((unit) => (
              <PendingUnit
                key={unit._id}
                title={unit.title}
                subject={unit.subjectName}
              />
            ))
          )}
        </div>

        {/* RECENT UPLOADS */}
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6">
            Recent Uploads
          </h3>

          {recentUploads.length === 0 ? (
            <p className="text-gray-500">
              No recent uploads
            </p>
          ) : (
            recentUploads.map((note) => (
              <RecentUpload
                key={note._id}
                title={note.title}
                subject={note.subject?.name}
              />
            ))
          )}
        </div>

      </div>
    </main>
  );
}


/* ---------- COMPONENTS ---------- */

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border rounded-xl p-6 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-xl text-blue-700">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function PendingUnit({ title, subject }) {
  return (
    <div className="bg-white border rounded-xl p-4 mb-3 flex justify-between items-center">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{subject}</p>
      </div>

      <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
        Pending
      </span>
    </div>
  );
}

function RecentUpload({ title, subject }) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <FileText size={18} />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{subject}</p>
        </div>
      </div>
    </div>
  );
}