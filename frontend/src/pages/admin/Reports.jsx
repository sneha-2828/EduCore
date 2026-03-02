import { Download, Printer, FileText } from "lucide-react";

export default function Reports() {
  return (
    <div className="p-6 space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 mt-1">
          Generate and export platform reports
        </p>
      </div>

      {/* GENERATE REPORT */}
      <div className="bg-white rounded-2xl border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Generate Report
          </h2>
          <p className="text-gray-500 text-sm">
            Select report type and parameters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* REPORT TYPE */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Report Type
            </label>
            <select className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:outline-none">
              <option>Select report type</option>
              <option>Syllabus Completion</option>
              <option>Faculty Contribution</option>
              <option>Department Overview</option>
            </select>
          </div>

          {/* DEPARTMENT */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Department (Optional)
            </label>
            <select className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:outline-none">
              <option>All departments</option>
              <option>Computer Science</option>
              <option>ECE</option>
              <option>Mechanical</option>
              <option>Civil</option>
            </select>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90">
            <Download size={18} />
            Export PDF
          </button>

          <button className="flex items-center gap-2 border px-5 py-3 rounded-xl font-semibold hover:bg-gray-100">
            <Printer size={18} />
            Print
          </button>
        </div>
      </div>

      {/* RECENT REPORTS */}
      <div className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Recent Reports
        </h2>

        <ReportItem
          title="Syllabus Completion - CS Department"
          date="Generated Oct 20, 2024"
        />
        <ReportItem
          title="Faculty Contribution - October 2024"
          date="Generated Oct 19, 2024"
        />
        <ReportItem
          title="Department Overview - All"
          date="Generated Oct 18, 2024"
        />
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function ReportItem({ title, date }) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          <FileText />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      <button className="text-gray-600 hover:text-gray-900">
        <Download />
      </button>
    </div>
  );
}
