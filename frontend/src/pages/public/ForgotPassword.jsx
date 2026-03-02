import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow w-[380px]">
        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter your registered college email. Reset instructions will be sent.
        </p>

        <input
          type="email"
          className="w-full border p-2 mb-4 rounded"
          placeholder="College Email"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold">
          Send Reset Link
        </button>

        <p className="text-sm text-center mt-4">
          Back to{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
