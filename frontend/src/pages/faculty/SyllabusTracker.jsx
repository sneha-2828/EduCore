import { CheckCircle, AlertCircle, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function SyllabusTracker() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get("/notes/syllabus-progress");
        setSubjects(res.data);
      } catch (error) {
        console.error("Syllabus error:", error);
      }
    };

    fetchProgress();
  }, []);

  if (!subjects) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0a192f]">
          Syllabus Tracker
        </h1>
        <p className="text-gray-500 mt-1">
          Track your syllabus coverage across subjects
        </p>
      </div>

      {subjects.length === 0 ? (
        <p className="text-gray-500">
          No subjects assigned yet.
        </p>
      ) : (
        subjects.map((subject) => {
          const progress = subject.completionPercentage;

          return (
            <div
              key={subject.subjectId}
              className="bg-white rounded-2xl border p-6 shadow-sm mb-8"
            >
              {/* SUBJECT HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    📘
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0a192f]">
                      {subject.subjectName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {subject.completedUnits}/{subject.totalUnits} units completed
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-2xl font-bold text-[#0a192f]">
                    {progress}%
                  </h3>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                <div
                  className="h-2 bg-[#0a192f] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* UNITS STATUS */}
              {subject.pendingUnits.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle size={20} />
                  All units completed 🎉
                </div>
              ) : (
                <div className="space-y-2">
                  {subject.pendingUnits.map((unitTitle, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-4 border bg-orange-50 border-orange-200 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <AlertCircle
                          className="text-orange-500"
                          size={20}
                        />
                        <h4 className="font-semibold text-[#0a192f]">
                          {unitTitle}
                        </h4>
                      </div>

                      <button
                        className="p-2 rounded-lg hover:bg-orange-100 transition"
                        title="Upload Notes"
                      >
                        <Upload
                          size={18}
                          className="text-orange-600"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}