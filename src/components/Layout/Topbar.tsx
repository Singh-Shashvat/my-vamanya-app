import React, { useState } from "react";
import { usePanchakarma } from "../../context/PanchakarmaContext";
import { FaBell, FaUserDoctor, FaUserInjured, FaUserShield } from "react-icons/fa6";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const {
    activeRole,
    setActiveRole,
    doctors,
    patients,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedPatientId,
    setSelectedPatientId,
    notifications,
    resetAllData,
  } = usePanchakarma();

  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const currentDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const handleRoleChange = (role: "doctor" | "patient" | "admin") => {
    setActiveRole(role);
    if (role === "doctor") navigate("/doctor-dashboard");
    else if (role === "patient") navigate("/patient-dashboard");
    else if (role === "admin") navigate("/admindashboard");
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-xs">
      {/* Left Title / Context Badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-gray-800 hidden sm:block">
          Panchakarma Clinical Management
        </h1>
        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          AYUSH Centre Portal
        </span>
      </div>

      {/* Middle/Right Quick Switcher and Actions */}
      <div className="flex items-center gap-3">
        {/* Role Quick Selector */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg text-xs font-medium border border-gray-200">
          <button
            onClick={() => handleRoleChange("doctor")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
              activeRole === "doctor"
                ? "bg-white text-emerald-800 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="Switch to Practitioner view"
          >
            <FaUserDoctor className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Doctor View</span>
          </button>

          <button
            onClick={() => handleRoleChange("patient")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
              activeRole === "patient"
                ? "bg-white text-emerald-800 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="Switch to Patient view"
          >
            <FaUserInjured className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Patient View</span>
          </button>

          <button
            onClick={() => handleRoleChange("admin")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
              activeRole === "admin"
                ? "bg-white text-emerald-800 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="Switch to Admin view"
          >
            <FaUserShield className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Admin View</span>
          </button>
        </div>

        {/* Dynamic Context Selector based on role */}
        {activeRole === "doctor" && (
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        )}

        {activeRole === "patient" && (
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {patients.map((pat) => (
              <option key={pat.id} value={pat.id}>
                {pat.name} ({pat.prakriti})
              </option>
            ))}
          </select>
        )}

        {/* Notifications Icon with popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <FaBell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
            )}
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                <span className="font-semibold text-xs text-gray-800">Recent Panchakarma Alerts</span>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/notifications");
                  }}
                  className="text-[11px] text-emerald-600 hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.slice(0, 3).map((n) => (
                  <div key={n.id} className="text-xs p-2 rounded-lg bg-gray-50 hover:bg-emerald-50/50 transition">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                      <span className="font-semibold text-emerald-700 capitalize">{n.type}</span>
                      <span>{new Date(n.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <p className="text-gray-700 text-[11px] line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (window.confirm("Reset all Panchakarma sessions, appointments, and feedback to original sample data?")) {
              resetAllData();
            }
          }}
          title="Reset sample dummy data"
          className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-gray-100 rounded-lg transition"
        >
          <HiOutlineRefresh className="w-4 h-4" />
        </button>

        {/* User Avatar badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {activeRole === "doctor"
              ? currentDoctor.name.replace("Dr. ", "").charAt(0)
              : activeRole === "patient"
              ? currentPatient.name.charAt(0)
              : "A"}
          </div>
          <div className="hidden lg:block text-left text-xs">
            <p className="font-semibold text-gray-800 leading-tight">
              {activeRole === "doctor" ? currentDoctor.name : activeRole === "patient" ? currentPatient.name : "Admin Vaidya"}
            </p>
            <p className="text-[10px] text-gray-500 capitalize">{activeRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;