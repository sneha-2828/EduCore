import { useState, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Download,
  Trash2,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ManageNotes() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const fetchMyNotes = async () => {
    try {
      const res = await api.get("/notes/my-notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleView = (note) => {
    navigate(`/faculty/notes/${note._id}`);
  };

  const handleDownload = (note) => {
    window.open(`http://localhost:5000${note.fileUrl}`, "_blank");
  };

  const handleDelete = async (note) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      fetchMyNotes();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Notes
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage your uploaded notes
          </p>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl border shadow-sm overflow-visible">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Subject</th>
              <th className="px-6 py-4 text-left">Unit</th>
              <th className="px-6 py-4 text-left">Views</th>
              <th className="px-6 py-4 text-left">Version</th>
              <th className="px-6 py-4 text-left">Uploaded</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {notes.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-6 text-center text-gray-500"
                >
                  No notes uploaded yet.
                </td>
              </tr>
            )}

            {notes.map((note) => (
              <tr key={note._id} className="hover:bg-gray-50">
                {/* TITLE */}
                <td className="px-6 py-4 flex items-center gap-3 font-semibold text-gray-900">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                    <FileText size={18} />
                  </div>
                  {note.title}
                </td>

                {/* SUBJECT */}
                <td className="px-6 py-4">
                  {note.subject?.name}
                </td>

                {/* UNIT */}
                <td className="px-6 py-4">
                  {note.unit?.title}
                </td>

                {/* VIEWS */}
                <td className="px-6 py-4 font-semibold text-blue-600">
                  {note.views || 0}
                </td>

                {/* VERSION */}
                <td className="px-6 py-4">
                  v{note.version}
                </td>

                {/* UPLOADED DATE */}
                <td className="px-6 py-4">
                  {new Date(note.createdAt).toLocaleDateString()}
                </td>

                {/* ACTION MENU */}
                <td className="px-6 py-4 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === note._id ? null : note._id
                      )
                    }
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === note._id && (
                    <div className="absolute right-6 top-12 w-44 bg-white border rounded-xl shadow-xl z-50">
                      <button
                        onClick={() => handleView(note)}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50"
                      >
                        <Eye size={16} /> View
                      </button>

                      <button
                        onClick={() => handleDownload(note)}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50"
                      >
                        <Download size={16} /> Download
                      </button>

                      <button
                        onClick={() => handleDelete(note)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}