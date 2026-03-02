import { Pencil, Key } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function FacultyProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/notes/faculty-profile");
        setData(res.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!data) return <p className="p-8">Loading profile...</p>;

  // Avatar initials
  const initials = data.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#0a192f]">Profile</h1>
      <p className="text-gray-500 mt-1">
        Manage your account information
      </p>

      {/* PROFILE CARD */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0a192f] to-[#112240] flex items-center justify-center text-yellow-400 text-3xl font-bold">
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#0a192f]">
                {data.name}
              </h2>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-semibold">
                {data.role}
              </span>
            </div>

            <p className="text-gray-500 mt-1">
              {data.email}
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-5 py-2 border rounded-lg font-semibold text-[#0a192f] hover:bg-gray-100 transition">
          <Pencil size={18} />
          Edit Profile
        </button>
      </div>

      {/* ACCOUNT STATISTICS */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#0a192f]">
          Account Statistics
        </h3>
        <p className="text-gray-500 mb-6">
          Your activity summary
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Assigned Subjects"
            value={data.totalSubjects}
          />
          <StatCard
            title="Notes Uploaded"
            value={data.totalNotes}
          />
          <StatCard
            title="Syllabus Complete"
            value={`${data.syllabusCompletion}%`}
          />
        </div>
      </div>

      {/* SECURITY */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#0a192f]">
          Security
        </h3>

        <div className="flex justify-between items-center border rounded-lg p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <Key />
            </div>
            <div>
              <p className="font-semibold">Password</p>
              <p className="text-sm text-gray-500">
                Managed securely
              </p>
            </div>
          </div>

          <button className="px-5 py-2 border rounded-lg font-semibold hover:bg-gray-100 transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center">
      <p className="text-3xl font-bold text-[#0a192f]">
        {value}
      </p>
      <p className="text-sm font-semibold text-gray-500 mt-2">
        {title}
      </p>
    </div>
  );
}