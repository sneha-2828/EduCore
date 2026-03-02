import { BookOpen, FileText, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/notes/student/dashboard");
      setData(res.data);
    } catch (error) {
      console.error("Student dashboard error:", error);
    }
  };

  if (!data) return <p className="p-8">Loading dashboard...</p>;

  return (
    <div className="space-y-8">

      {/* WELCOME SECTION */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {data.studentName} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here’s a quick overview of your academic activity
        </p>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<BookOpen className="text-blue-600" />}
          title="Subjects Enrolled"
          value={data.totalSubjects}
          bg="bg-blue-50"
        />
        <StatCard
          icon={<FileText className="text-green-600" />}
          title="Notes Available"
          value={data.totalNotes}
          bg="bg-green-50"
        />
        <StatCard
          icon={<Clock className="text-orange-600" />}
          title="Most Active Subject"
          value={
            data.mostActiveSubject
              ? data.mostActiveSubject.subjectName
              : "N/A"
          }
          bg="bg-orange-50"
        />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* SUBJECT PROGRESS */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Subject Overview
          </h2>

          {data.subjectProgress && data.subjectProgress.length > 0 ? (
            data.subjectProgress.map((subject) => (
              <ProgressRow
                key={subject.subjectId}
                subject={subject.subjectName}
                completed={subject.completedUnits}
                total={subject.totalUnits}
              />
            ))
          ) : (
            <p>No subject data available.</p>
          )}
        </div>

        {/* RECENT NOTES */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Recently Added Notes
          </h2>

          {data.recentNotes.length === 0 ? (
            <p>No recent notes available.</p>
          ) : (
            data.recentNotes.map((note) => (
              <RecentNote
                key={note._id}
                title={note.title}
                subject={note.subject?.name}
                time={new Date(note.createdAt).toLocaleDateString()}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ icon, title, value, bg }) {
  return (
    <div className="bg-white border rounded-xl p-6 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${bg}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}

function ProgressRow({ subject, completed, total }) {
  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-5">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-gray-700">
          {subject}
        </span>
        <span className="text-gray-500">
          {completed}/{total} units
        </span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function RecentNote({ title, subject, time }) {
  return (
    <div className="flex justify-between items-center py-4 border-b last:border-none">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{subject}</p>
      </div>
      <span className="text-sm text-gray-400">{time}</span>
    </div>
  );
}