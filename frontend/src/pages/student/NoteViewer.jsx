import { FileDown, Calendar, Layers, Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function NoteViewer() {
  const { noteId } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log("Fetching note with ID:", noteId);

        const res = await api.get(`/notes/${noteId}`);

        console.log("Note response:", res.data);

        setNote(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError("Failed to load note.");
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  if (loading) {
    return <p className="text-gray-500">Loading note...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!note) {
    return <p className="text-red-500">Note not found</p>;
  }

  const handleAskAI = () => {
    if (!question.trim()) return;

    setAiResponse(
      "AI feature will be implemented in Phase 4."
    );
    setQuestion("");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {note.title}
          </h1>

          <div className="flex gap-4 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <Layers size={14} /> v{note.version}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(note.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <a
          href={`http://localhost:5000${note.fileUrl}`}
          download
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <FileDown size={16} />
          Download
        </a>
      </div>

      {/* PDF VIEWER */}
      <div className="bg-white border rounded-xl p-4 h-[600px]">
        <iframe
          src={`http://localhost:5000${note.fileUrl}`}
          title="PDF Viewer"
          className="w-full h-full rounded"
        />
      </div>

      {/* AI SECTION */}
      <div className="bg-white border rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">
          Ask AI about this note
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question from this note..."
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleAskAI}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <Send size={16} />
            Ask
          </button>
        </div>

        {aiResponse && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
            {aiResponse}
          </div>
        )}
      </div>
    </div>
  );
}
