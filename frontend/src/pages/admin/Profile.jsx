import { Shield, Mail, Phone, Key, Lock, LogOut } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Profile
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your administrator account and system access
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
            <Shield className="text-yellow-600" size={36} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Dr. V. Krishnamurthy
            </h2>
            <p className="text-gray-500">System Administrator</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
              ADMIN ACCESS
            </span>
          </div>
        </div>

        <button className="border px-5 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Edit Profile
        </button>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CONTACT INFO */}
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Contact Information
          </h3>

          <InfoRow icon={<Mail />} label="Email" value="admin@college.edu" />
          <InfoRow icon={<Phone />} label="Phone" value="+91 98765 43210" />
        </div>

        {/* ADMIN PRIVILEGES */}
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Administrator Privileges
          </h3>

          <Privilege text="Approve faculty registrations" />
          <Privilege text="Manage departments & users" />
          <Privilege text="View platform analytics & reports" />
          <Privilege text="Full system access" />
        </div>
      </div>

      {/* SECURITY */}
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Security Settings
        </h3>

        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold">
            <Key size={16} />
            Change Password
          </button>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold">
            <Lock size={16} />
            Manage Sessions
          </button>

          <button className="flex items-center gap-2 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 font-semibold">
            <LogOut size={16} />
            Logout from all devices
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 mb-3 text-gray-700">
      <span className="text-gray-500">{icon}</span>
      <span className="font-semibold w-20">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Privilege({ text }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Shield size={16} className="text-yellow-600" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}
