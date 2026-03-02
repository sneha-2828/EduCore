import { useState, useEffect } from "react";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ExamMode() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [examType, setExamType] = useState("mid");
  const [examDate, setExamDate] = useState("");
  const [units, setUnits] = useState([]);

  // 🔹 Fetch student subjects
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/notes/student/subjects");
      setSubjects(res.data);

      if (res.data.length > 0) {
        setSubjectId(res.data[0]._id);
        fetchUnits(res.data[0]._id);
      }
    } catch (error) {
      console.error("Subject fetch error:", error);
    }
  };

  // 🔹 Fetch units of selected subject
  const fetchUnits = async (id) => {
    try {
      const res = await api.get(`/notes/student/subject/${id}`);
      setUnits(res.data.units || []);
    } catch (error) {
      console.error("Unit fetch error:", error);
    }
  };

  const handleSubjectChange = (e) => {
    const id = e.target.value;
    setSubjectId(id);
    fetchUnits(id);
  };

  const handleStartExam = () => {
    if (!subjectId) return;
    navigate(`/student/exam/${subjectId}`);
  };

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Exam Mode
        </h1>
        <p className="text-gray-500">
          Focused preparation for upcoming exams
        </p>
      </div>

      {/* EXAM SETUP */}
      <div className="bg-white border rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SUBJECT */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Select Subject
          </label>
          <select
            value={subjectId}
            onChange={handleSubjectChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.code} - {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* EXAM TYPE */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Exam Type
          </label>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="mid">Mid Exam</option>
            <option value="sem">Semester Exam</option>
          </select>
        </div>

        {/* DATE */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Exam Date
          </label>
          <div className="relative mt-1">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* UNITS SECTION */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          📘 Available Units
        </h2>

        {units.length === 0 ? (
          <p className="text-gray-500">No units available</p>
        ) : (
          <div className="space-y-3">
            {units.map((unit) => (
              <div
                key={unit._id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" />
                  <span className="font-medium">
                    {unit.title}
                  </span>
                </div>

                <span className="text-sm font-medium text-green-600">
                  Ready
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* START BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleStartExam}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}