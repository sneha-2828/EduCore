import {
  Eye,
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function FacultyAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/notes/analytics");
      setData(res.data);
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  if (!data) return <p className="p-8">Loading analytics...</p>;

  const avgViews =
    data.totalNotes === 0
      ? 0
      : (data.totalViews / data.totalNotes).toFixed(1);

  const sortedNotes = [...data.notes].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  );

  const topNotes = sortedNotes.slice(0, 5);
  const lowEngagementNotes = sortedNotes.filter(
    note => (note.views || 0) < 10
  );

  const maxViews =
    data.unitWiseViews.length > 0
      ? Math.max(...data.unitWiseViews.map(u => u.views))
      : 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a192f]">
          Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Track engagement with your uploaded content
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Views"
          value={data.totalViews}
          icon={<Eye />}
        />

        <StatCard
          title="Notes Uploaded"
          value={data.totalNotes}
          icon={<FileText />}
        />

        <StatCard
          title="Total Units"
          value={data.totalUnits}
          icon={<Users />}
        />

        <StatCard
          title="Avg. Views/Note"
          value={avgViews}
          icon={<BarChart3 />}
        />
      </div>

      {/* Unit Wise Views Bar Graph */}
      <div className="bg-white rounded-xl p-6 border mb-10">
        <h2 className="text-lg font-semibold mb-6">
          Unit-wise Views
        </h2>

        {data.unitWiseViews.length === 0 ? (
          <p>No unit data available.</p>
        ) : (
          <div className="flex items-end gap-4 h-56">
            {data.unitWiseViews.map((unit, index) => {
              const height =
                maxViews === 0
                  ? 0
                  : (unit.views / maxViews) * 200;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center w-full"
                >
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-[#0a192f] to-[#1e3a8a]"
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2 text-center">
                    {unit.unitTitle}
                  </span>
                  <span className="text-xs font-semibold">
                    {unit.views}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Top Performing Notes */}
      <div className="bg-white rounded-xl p-6 border mb-10">
        <h2 className="text-lg font-semibold mb-6">
          Top Performing Notes
        </h2>

        {topNotes.length === 0 ? (
          <p>No data yet.</p>
        ) : (
          <div className="space-y-4">
            {topNotes.map((note, index) => (
              <div
                key={note._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold">
                    {index + 1}. {note.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {note.subject?.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-semibold">
                  {note.views || 0}
                  <TrendingUp
                    className="text-green-500"
                    size={16}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Needs Attention */}
      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <TrendingDown className="text-orange-500" />
          Needs Attention
        </h2>
        <p className="text-gray-500 mb-6">
          Notes with low engagement
        </p>

        {lowEngagementNotes.length === 0 ? (
          <p>No low-engagement notes 🎉</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lowEngagementNotes.map((note) => (
              <div
                key={note._id}
                className="border border-orange-200 bg-orange-50 rounded-xl p-5"
              >
                <p className="font-semibold">
                  {note.title}
                </p>
                <p className="text-sm text-gray-600">
                  {note.subject?.name}
                </p>

                <div className="flex justify-between text-sm mt-4">
                  <span>{note.views || 0} views</span>
                  <span className="text-gray-500">
                    {new Date(
                      note.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 border flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold text-[#0a192f] mt-1">
          {value}
        </p>
      </div>

      <div className="p-3 bg-gray-100 rounded-lg text-[#0a192f]">
        {icon}
      </div>
    </div>
  );
}