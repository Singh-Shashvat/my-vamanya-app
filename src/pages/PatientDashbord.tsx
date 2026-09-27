import React from "react";
import { usePanchakarma } from "../context/PanchakarmaContext";
import { format, parseISO } from "date-fns";
import { FaUserInjured, FaCalendarCheck, FaHeartPulse, FaUtensils, FaBed, FaBottleDroplet } from "react-icons/fa6";
import { GiHerbsBundle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const PatientDashboardPage: React.FC = () => {
  const {
    patients,
    doctors,
    sessions,
    appointments,
    selectedPatientId,
    setSelectedPatientId,
  } = usePanchakarma();

  const navigate = useNavigate();
  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];
  const assignedDoctor = doctors.find((d) => d.id === currentPatient.doctorId) || doctors[0];

  // Sessions for this patient
  const patientSessions = sessions.filter(
    (s) => s.patientName.toLowerCase() === currentPatient.name.toLowerCase()
  );

  // Appointments for this patient
  const patientAppointments = appointments.filter(
    (a) => a.patientName.toLowerCase() === currentPatient.name.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Header and Patient Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl shadow-xs border border-teal-200">
            <FaUserInjured className="w-7 h-7 text-teal-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{currentPatient.name}</h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                Active Therapy Patient
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Prakriti Constitution: <span className="font-bold text-emerald-700">{currentPatient.prakriti} Dosha</span> • {currentPatient.age} yrs • {currentPatient.gender}
            </p>
            <p className="text-xs text-gray-500">
              Primary Vaidya: <span className="font-semibold text-gray-700">{assignedDoctor.name}</span>
            </p>
          </div>
        </div>

        {/* Patient Switcher */}
        <div className="flex items-center gap-2">
          <label htmlFor="patient-select" className="text-xs font-semibold text-gray-500">
            Switch Patient Profile:
          </label>
          <select
            id="patient-select"
            value={currentPatient.id}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {patients.map((pat) => (
              <option key={pat.id} value={pat.id}>
                {pat.name} ({pat.prakriti})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow-xs border border-emerald-100 p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
            <GiHerbsBundle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Prescribed Therapy</p>
            <p className="text-base font-bold text-gray-900 mt-1">{currentPatient.activeTherapy}</p>
            <p className="text-xs text-emerald-600 mt-0.5">{currentPatient.condition}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-indigo-100 p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-700">
            <FaHeartPulse className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sessions Scheduled</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{patientSessions.length}</p>
            <p className="text-xs text-indigo-600 mt-0.5">
              {patientSessions.filter((s) => s.progress === 100).length} completed
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-amber-100 p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-700">
            <FaCalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Doctor Checkups</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{patientAppointments.length}</p>
            <p className="text-xs text-amber-600 mt-0.5">Upcoming with {assignedDoctor.name}</p>
          </div>
        </div>
      </div>

      {/* Ayurvedic Protocol Compliance Card (Crucial for SIH Problem Statement) */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl">
              <GiHerbsBundle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Patient Pre & Post Procedure Protocols (Panchakarma Pathya)
              </h2>
              <p className="text-xs text-amber-800">
                Strict adherence is mandatory for maximum therapeutic efficacy and safety during Vamana / Virechana.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/feedback")}
            className="px-4 py-2 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition shadow-xs self-start"
          >
            + Log Symptoms & Recovery
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200/60 flex items-start gap-3">
            <FaUtensils className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Dietary Regimen (Peya / Vilepi)</p>
              <p className="text-gray-600 mt-1">
                Warm mung soup and light gruel only. Strictly abstain from heavy, cold, oily, or spicy foods.
              </p>
            </div>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200/60 flex items-start gap-3">
            <FaBottleDroplet className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Hydration with Ushnodaka</p>
              <p className="text-gray-600 mt-1">
                Drink only boiled and lukewarm ginger water in small sips throughout the day.
              </p>
            </div>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200/60 flex items-start gap-3">
            <FaBed className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Physical & Mental Rest</p>
              <p className="text-gray-600 mt-1">
                Avoid direct drafts of cold air, excessive speech, sun exposure, and strenuous exercise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Therapy Sessions Table */}
      <section className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your Therapy Journey</h2>
        {patientSessions.length === 0 ? (
          <p className="text-gray-500 py-6 text-center text-sm">No therapy sessions found for your profile.</p>
        ) : (
          <div className="space-y-3">
            {patientSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{session.therapyType}</span>
                    {session.stage && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                        {session.stage}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Supervised by: <span className="font-medium text-gray-800">{session.practitionerName}</span> •
                    Location: {session.room || "Panchakarma Wing"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Schedule: {format(parseISO(session.date), "MMM d, yyyy")} at {session.time}
                  </p>
                  {session.notes && (
                    <p className="text-xs text-emerald-800 bg-emerald-50/50 p-2 rounded-lg mt-1 border border-emerald-100">
                      Vaidya Observation: {session.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600">Progress:</span>
                    <span className="text-xs font-bold text-emerald-700">{session.progress}%</span>
                  </div>
                  <div className="w-28 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: `${session.progress}%` }}
                    ></div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                      session.progress === 100
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {session.progress === 100 ? "Completed" : "In Progress"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Appointments List */}
      <section className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Doctor Consultation Appointments</h2>
        {patientAppointments.length === 0 ? (
          <p className="text-gray-500 py-6 text-center text-sm">No upcoming appointments.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientAppointments.map((appt) => (
              <div key={appt.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-gray-900">{appt.therapyType}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                    Confirmed
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Doctor: <span className="font-semibold text-gray-800">{assignedDoctor.name}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Date: {format(parseISO(appt.date), "MMM d, yyyy")} • Slot: {appt.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PatientDashboardPage;