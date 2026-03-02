import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentProfile() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/notes/student/profile");
      setData(res.data);
    } catch (error) {
      console.error("Profile error:", error);
    }
  };

  const handleChangePassword = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await api.put("/notes/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert("Password changed successfully");

      setShowModal(false);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Password change failed"
      );
    }
  };

  if (!data) return <p className="p-8">Loading profile...</p>;

  return (
    <div className="p-8 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500">
          Manage your account details
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {data.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-gray-500">{data.email}</p>
            <p className="text-sm mt-2">
              Semester: {data.semester}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Exams" value={data.totalExams} />
        <StatCard title="Average Score" value={`${data.averageScore}%`} />
        <StatCard title="Notes Viewed" value={data.notesViewed} />
      </div>

      {/* ACCOUNT DETAILS */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <DetailRow label="Full Name" value={data.name} />
        <DetailRow label="Email" value={data.email} />
        <DetailRow label="Role" value={data.role} />
        <DetailRow
          label="Joined"
          value={new Date(data.joined).toLocaleDateString()}
        />
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4">
            <h2 className="text-xl font-semibold">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border p-2 rounded-lg"
              value={form.currentPassword}
              onChange={(e) =>
                setForm({ ...form, currentPassword: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-2 rounded-lg"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border p-2 rounded-lg"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}