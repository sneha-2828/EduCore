import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { FileText } from "lucide-react";

export default function SubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [units, setUnits] = useState([]);
  const [activeUnit, setActiveUnit] = useState(null);

  // 🔵 Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/subject/${subjectId}`);

        setNotes(res.data);

        // Extract unique units from notes
        const uniqueUnits = [];
        const unitMap = {};

        res.data.forEach((note) => {
          if (note.unit && !unitMap[note.unit._id]) {
            unitMap[note.unit._id] = true;
            uniqueUnits.push(note.unit);
          }
        });

        setUnits(uniqueUnits);

        if (uniqueUnits.length > 0) {
          setActiveUnit(uniqueUnits[0]._id);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [subjectId]);

  // Filter notes by selected unit
  const filteredNotes = notes.filter(
    (note) => note.unit?._id === activeUnit
  );

  return (
    <div className="space-y-6">
      {/* SUBJECT TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Subject Notes
        </h1>
        <p className="text-gray-500">
          Select a unit to view notes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT – UNIT SIDEBAR */}
        <div className="bg-white border rounded-xl p-4 space-y-2">
          {units.length === 0 && (
            <p className="text-gray-500">No units available</p>
          )}

          {units.map((unit) => (
            <button
              key={unit._id}
              onClick={() => setActiveUnit(unit._id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition
                ${
                  activeUnit === unit._id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {unit.title}
            </button>
          ))}
        </div>

        {/* RIGHT – NOTES LIST */}
        <div className="lg:col-span-3 bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Notes
          </h2>

          {filteredNotes.length === 0 ? (
            <p className="text-gray-500">
              No notes available for this unit.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => (
                <div
                  key={note._id}
                  onClick={() =>
                    navigate(`/student/notes/${note._id}`)
                  }
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-600" />
                    <span className="font-medium">
                      {note.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    View →
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
