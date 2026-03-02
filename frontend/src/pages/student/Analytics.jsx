import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get(
      "/notes/student/learning-analytics"
    );
    setData(res.data);
  };

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Learning Analytics
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Study Time" value={`${data.totalStudyHours}h`} />
        <Card title="Notes Accessed" value={data.notesAccessed} />
        <Card title="Avg Completion" value={`${data.avgCompletion}%`} />
        <Card title="This Week" value="Dynamic" />
      </div>

      {/* Weekly Activity Graph */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-semibold mb-4">
          Weekly Activity
        </h2>
        <div className="flex items-end gap-4 h-40">
          {Object.entries(data.weeklyData).map(
            ([day, value]) => (
              <div
                key={day}
                className="flex flex-col items-center"
              >
                <div
                  className="bg-blue-600 w-8 rounded"
                  style={{
                    height: `${value * 2}px`,
                  }}
                />
                <span className="text-sm mt-2">
                  {day}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Subject Stats */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-semibold mb-4">
          Subject-wise Statistics
        </h2>

        {Object.entries(data.subjectStats).map(
          ([subject, stats]) => (
            <div
              key={subject}
              className="flex justify-between border-b py-3"
            >
              <span>{subject}</span>
              <span>
                {Math.round(stats.time / 60)}h |{" "}
                {stats.notes} notes
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white border p-6 rounded-xl">
      <p className="text-gray-500 text-sm">
        {title}
      </p>
      <p className="text-2xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}