import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow w-[420px]">
        <div className="flex justify-center mb-6">
          <img src="/college-logo.png" alt="Logo" className="w-14" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <input className="w-full border p-2 mb-3 rounded" placeholder="Full Name" />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="College Email"
        />

        <select
          className="w-full border p-2 mb-3 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Department"
        />

        {role === "student" && (
          <select className="w-full border p-2 mb-3 rounded">
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        )}

        {role === "faculty" && (
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Faculty ID"
          />
        )}

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
        />
        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Confirm Password"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
