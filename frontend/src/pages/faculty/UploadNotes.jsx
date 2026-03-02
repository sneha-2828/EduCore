import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Star,
  Target
} from "lucide-react";
import api from "../../api/axios";

export default function UploadNotes() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [important, setImportant] = useState(false);
  const [examFocused, setExamFocused] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchUnits = async (subjectId) => {
    try {
      const res = await api.get(`/units?subject=${subjectId}`);
      setUnits(res.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSubject(subjectId);
    fetchUnits(subjectId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("department", subjects.find(s => s._id === subject)?.semester?.department);
    formData.append("subject", subject);
    formData.append("unit", unit);
    formData.append("file", file);


    try {
      await api.post("/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Note uploaded successfully!");
      setTitle("");
      setUnit("");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Upload Notes
        </h1>
        <p className="text-slate-500 mt-1">
          Share study materials with your students
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT FORM */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            {/* SUBJECT + UNIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="font-semibold text-sm text-slate-700">
                  Subject *
                </label>
                <select
                  value={subject}
                  onChange={handleSubjectChange}
                  className="mt-2 w-full border rounded-xl px-4 py-3 bg-slate-50"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm text-slate-700">
                  Unit *
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="mt-2 w-full border rounded-xl px-4 py-3 bg-slate-50"
                  required
                >
                  <option value="">Select Unit</option>
                  {units.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TITLE */}
            <div className="mb-6">
              <label className="font-semibold text-sm text-slate-700">
                Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full border rounded-xl px-4 py-3 bg-slate-50"
                required
              />
            </div>

            {/* FILE UPLOAD */}
            <div className="mb-6">
              <label className="font-semibold text-sm text-slate-700">
                File Upload *
              </label>

              <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-44 cursor-pointer hover:bg-slate-50 transition">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <p className="font-semibold text-slate-700">
                  Click to upload
                </p>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </label>
            </div>

            {message && (
              <p className="mb-4 text-blue-600">{message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Upload className="w-5 h-5" />
              Upload Notes
            </button>
          </form>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Preview
          </h3>

          <div className="border rounded-xl p-4 flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <p className="font-semibold">
                {title || "Note Title"}
              </p>
              <p className="text-sm text-slate-500">
                Faculty
              </p>
            </div>
          </div>

          <div className="border rounded-xl p-4 text-sm mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Unit</span>
              <span>{unit || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span>File</span>
              <span>
                {file ? file.name : "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Version</span>
              <span>v1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
