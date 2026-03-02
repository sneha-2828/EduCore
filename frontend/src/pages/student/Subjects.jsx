import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Subjects() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      // ✅ Correct backend route
      const res = await api.get("/notes/student/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Subjects
        </h1>
        <p className="text-gray-500">
          Access your enrolled subjects
        </p>
      </div>

      {subjects.length === 0 ? (
        <p className="text-gray-500">
          No subjects assigned to your semester.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject._id}
              onClick={() =>
                navigate(`/student/subject/${subject._id}`)
              }
              className="bg-white border rounded-xl p-6 cursor-pointer hover:shadow-md transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {subject.code}
                </h2>

                <p className="text-sm text-gray-500">
                  {subject.name}
                </p>

                <div className="mt-3 text-sm text-gray-600">
                  <p>{subject.totalUnits} Units</p>
                  <p>{subject.totalNotes} Notes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}