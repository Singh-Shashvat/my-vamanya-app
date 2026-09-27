import React from "react";
import StatCard from "../components/admin/StatCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { usePanchakarma } from "../context/PanchakarmaContext";
import { MdOutlineAdminPanelSettings, MdCheckCircle, MdCancel } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";

const AdminDashboard: React.FC = () => {
  const { practitioners, updatePractitionerStatus, patients, doctors, sessions } = usePanchakarma();

  const totalPatientsCount = 1200 + patients.length;
  const verifiedPractitioners = practitioners.filter((p) => p.status === "Verified").length + doctors.length;
  const pendingPractitioners = practitioners.filter((p) => p.status === "Pending").length;
  const todaySessionsCount = sessions.length;

  const stats = [
    { title: "Registered Patients", value: totalPatientsCount.toLocaleString() },
    { title: "Verified Practitioners", value: verifiedPractitioners },
    { title: "Active Panchakarma Sessions", value: todaySessionsCount },
    { title: "Pending Onboarding Approvals", value: pendingPractitioners },
  ];

  const chartData = [
    { day: "Mon", appointments: 42, vamana: 12 },
    { day: "Tue", appointments: 68, vamana: 18 },
    { day: "Wed", appointments: 55, vamana: 14 },
    { day: "Thu", appointments: 84, vamana: 25 },
    { day: "Fri", appointments: 72, vamana: 20 },
    { day: "Sat", appointments: 49, vamana: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <MdOutlineAdminPanelSettings className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl font-bold text-gray-900">
              AYUSH Panchakarma Hospital Administration
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Practitioner credentialing, capacity oversight, regulatory verification, and clinical load tracking.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} />
        ))}
      </div>

      {/* Grid: Charts + Capacity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Volume Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-sm text-gray-900">Weekly Panchakarma Procedure Volume</h3>
              <p className="text-xs text-gray-500">Distribution of Total Therapies vs Vamana Karma</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Total
              </span>
              <span className="flex items-center gap-1.5 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Vamana
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="appointments" name="Total Therapies" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="vamana" name="Vamana Sessions" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Therapy Room Capacity Meter */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 space-y-4">
          <h3 className="font-bold text-sm text-gray-900">Panchakarma Suite Utilization</h3>
          <p className="text-xs text-gray-500">Occupancy status across specialized clinical rooms</p>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>Kuti-101 (Vamana Hall)</span>
                <span className="text-emerald-700">85% Busy</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>Dhara Room 1 (Shirodhara)</span>
                <span className="text-emerald-700">70% Busy</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>Therapy Suite 2 (Swedana)</span>
                <span className="text-amber-700">92% High Load</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>Nasya & ENT Cabin</span>
                <span className="text-emerald-700">45% Available</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practitioner Verification Table (Interactive) */}
      <section className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <FaUserCheck className="text-emerald-700" />
              AYUSH Practitioner Credentialing & Verification
            </h3>
            <p className="text-xs text-gray-500">
              Review Central AYUSH Board registration numbers, licenses, and approve or reject clinical privileges.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase tracking-wider text-[11px]">
                <th className="p-3">Registration ID</th>
                <th className="p-3">Practitioner Name</th>
                <th className="p-3">Specialty</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Verification Status</th>
                <th className="p-3 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {practitioners.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition">
                  <td className="p-3 font-mono font-medium text-gray-500">{p.registrationNo}</td>
                  <td className="p-3 font-bold text-gray-900">{p.name}</td>
                  <td className="p-3 text-gray-700">{p.specialty}</td>
                  <td className="p-3 text-gray-600">{p.experience}</td>
                  <td className="p-3 text-gray-500">{p.email}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        p.status === "Verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : p.status === "Pending"
                          ? "bg-amber-100 text-amber-800 animate-pulse"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {p.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => updatePractitionerStatus(p.id, "Verified")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-[11px] flex items-center gap-1 transition"
                        >
                          <MdCheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => updatePractitionerStatus(p.id, "Rejected")}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-semibold text-[11px] flex items-center gap-1 transition"
                        >
                          <MdCancel className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
