import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

/* PUBLIC */
import Home from "./pages/public/Home";
import Login from "./auth/Login";
import Register from "./pages/public/Register";
import ForgotPassword from "./pages/public/ForgotPassword";

/* LAYOUT */
import AppLayout from "./components/AppLayout";

/* STUDENT */
import StudentDashboard from "./pages/student/Dashboard";
import Subjects from "./pages/student/Subjects";
import SubjectDetail from "./pages/student/SubjectDetail";
import NoteViewer from "./pages/student/NoteViewer";
import ExamMode from "./pages/student/ExamMode";
import StudentExam from "./pages/student/StudentExam"; // ✅ ADDED
import StudentAnalytics from "./pages/student/Analytics";
import StudentProfile from "./pages/student/Profile";

/* FACULTY */
import FacultyDashboard from "./pages/faculty/Dashboard";
import UploadNotes from "./pages/faculty/UploadNotes";
import ManageNotes from "./pages/faculty/ManageNotes";
import SyllabusTracker from "./pages/faculty/SyllabusTracker";
import FacultyAnalytics from "./pages/faculty/Analytics";
import FacultyProfile from "./pages/faculty/Profile";

/* ADMIN */
import AdminDashboard from "./pages/admin/Dashboard";
import Departments from "./pages/admin/Departments";
import SyllabusStatus from "./pages/admin/SyllabusStatus";
import Reports from "./pages/admin/Reports";
import Users from "./pages/admin/Users";
import AdminProfile from "./pages/admin/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= PROTECTED LAYOUT ================= */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* ================= STUDENT ROUTES ================= */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/subjects" element={<Subjects />} />
            <Route
              path="/student/subject/:subjectId"
              element={<SubjectDetail />}
            />
            <Route path="/student/notes/:noteId" element={<NoteViewer />} />
            <Route path="/student/exam-mode" element={<ExamMode />} />
            <Route path="/student/exam/:subjectId" element={<StudentExam />} />
            <Route path="/student/analytics" element={<StudentAnalytics />} />
            <Route path="/student/profile" element={<StudentProfile />} />

            {/* ================= FACULTY ROUTES ================= */}
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/upload-notes" element={<UploadNotes />} />
            <Route path="/faculty/manage-notes" element={<ManageNotes />} />
            <Route
              path="/faculty/syllabus-tracker"
              element={<SyllabusTracker />}
            />
            <Route path="/faculty/notes/:noteId" element={<NoteViewer />} />
            <Route path="/faculty/analytics" element={<FacultyAnalytics />} />
            <Route path="/faculty/profile" element={<FacultyProfile />} />

            {/* ================= ADMIN ROUTES ================= */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/syllabus-status" element={<SyllabusStatus />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
