import { useState, useEffect, useRef } from "react";
import {
  MoreVertical,
  Eye,
  Download,
  Trash2,
  FileText,
  Search,
  BookOpen,
  Calendar,
  Eye as EyeIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ManageNotes() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyNotes();
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchMyNotes = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/notes/my-notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (note) => {
    setOpenMenuId(null);
    navigate(`/faculty/notes/${note._id}`);
  };

  const handleDownload = (note) => {
    setOpenMenuId(null);
    window.open(`http://localhost:5000${note.fileUrl}`, "_blank");
  };

  const handleDelete = async (note) => {
    setOpenMenuId(null);
    if (!window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      setNotes(prev => prev.filter(n => n._id !== note._id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-gray-200 transition-colors relative overflow-hidden"
    >
      {/* BACKGROUND GLOWS */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-600/10 dark:to-cyan-600/10 blur-[120px] rounded-full top-[-100px] right-[-100px] -z-10"
      />

      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 relative z-10"
      >
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent pb-1">
            Manage Notes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 text-lg">
            Organize and track your shared study materials
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-indigo-500 transition-colors text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search notes or subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:border-cyan-400 outline-none transition-all dark:text-gray-200"
          />
        </div>
      </motion.div>

      {/* TABLE CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="glass-card !bg-white/80 dark:!bg-[#0f172a]/80 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl overflow-visible relative z-10"
      >
        <div className="overflow-visible p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Document Details</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Subject & Unit</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Stats</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan="4" className="px-6 py-8">
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-full h-16 skeleton-shimmer rounded-2xl"></div>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ) : filteredNotes.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan="4" className="px-6 py-20 text-center">
                      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-700">
                        <FileText size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">No Notes Found</h3>
                      <p className="text-gray-500 max-w-sm mx-auto">
                        {searchTerm ? "No notes matched your search criteria." : "You haven't uploaded any notes yet. Share your material to get started!"}
                      </p>
                    </td>
                  </motion.tr>
                ) : (
                  filteredNotes.map((note, index) => (
                    <motion.tr
                      key={note._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.03)" }}
                      className="group transition-colors origin-left"
                    >
                      {/* DOCUMENT DETAILS */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100/50 dark:border-indigo-800/50 group-hover:scale-105 transition-transform">
                            <FileText size={22} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                              {note.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-400">v{note.version}</span>
                              <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SUBJECT & UNIT */}
                      <td className="px-6 py-5 hidden md:table-cell align-middle">
                        <div>
                          <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <BookOpen size={16} className="text-indigo-400" />
                            {note.subject?.name || "Unknown Subject"}
                          </p>
                          <p className="text-sm font-medium text-gray-500 mt-1 pl-6">
                            {note.unit?.title || "Unknown Unit"}
                          </p>
                        </div>
                      </td>

                      {/* STATS */}
                      <td className="px-6 py-5 hidden lg:table-cell align-middle">
                        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 w-fit px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-400">
                          <EyeIcon size={16} />
                          <span className="font-bold">{note.views || 0}</span>
                          <span className="text-xs font-semibold uppercase tracking-wider ml-1">views</span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5 text-right relative align-middle" ref={openMenuId === note._id ? menuRef : null}>
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setOpenMenuId(openMenuId === note._id ? null : note._id)}
                          className={`p-2 rounded-xl transition-colors ${openMenuId === note._id ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-cyan-400' : 'text-gray-400 hover:text-indigo-600 dark:hover:text-cyan-400'}`}
                        >
                          <MoreVertical size={20} />
                        </motion.button>

                        <AnimatePresence>
                          {openMenuId === note._id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10, rotateX: -20 }}
                              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="absolute right-12 top-6 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden transform origin-top-right text-left"
                            >
                              <div className="flex flex-col p-1">
                                <MenuButton 
                                  icon={<Eye size={16} />} 
                                  label="View Details" 
                                  onClick={() => handleView(note)} 
                                  color="indigo" 
                                />
                                <MenuButton 
                                  icon={<Download size={16} />} 
                                  label="Download PDF" 
                                  onClick={() => handleDownload(note)} 
                                  color="blue" 
                                />
                                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2" />
                                <MenuButton 
                                  icon={<Trash2 size={16} />} 
                                  label="Delete Note" 
                                  onClick={() => handleDelete(note)} 
                                  color="red" 
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MenuButton({ icon, label, onClick, color }) {
  const colorClasses = {
    indigo: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
    blue: "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
    red: "hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl font-medium transition-colors ${colorClasses[color]}`}
    >
      <span className={color === 'red' ? 'text-red-500' : ''}>{icon}</span>
      <span className={color === 'red' ? 'text-red-600 dark:text-red-400' : ''}>{label}</span>
    </button>
  );
}