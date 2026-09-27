import React, { useState } from "react";
import { usePanchakarma } from "../context/PanchakarmaContext";
import { format, parseISO } from "date-fns";
import { FaUserDoctor, FaUserInjured, FaCalendarCheck, FaNotesMedical } from "react-icons/fa6";
import { GiHerbsBundle } from "react-icons/gi";

const DoctorDashboardPage: React.FC = () => {
  const {
    doctors,
    patients,
    sessions,
    appointments,
    selectedDoctorId,
    setSelectedDoctorId,
    updateSessionProgress,
    sendNotification,
  } = usePanchakarma();

  const [activeTab, setActiveTab] = useState<"sessions" | "appointments" | "patients">("sessions");
  const [selectedSessionNote, setSelectedSessionNote] = useState<{ id: string; text: string } | null>(null);

  const currentDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  // Sessions supervised by this doctor
  const doctorSessions = sessions.filter(
    (s) => s.practitionerName.toLowerCase().includes(currentDoctor.name.toLowerCase().replace("dr. ", ""))
  );

  // Appointments for this doctor
  const doctorAppointments = appointments.filter((a) => a.doctorId === currentDoctor.id);

  // Patients assigned to this doctor
  const doctorPatients = patients.filter((p) => p.doctorId === currentDoctor.id);

  const handleQuickAlert = (patientName: string, therapy: string) => {
    sendNotification({
      patientName,
      message: `Direct Vaidya Instruction from ${currentDoctor.name}: Please strictly observe your warm liquid diet and report 15 minutes before your ${therapy} session.`,
      channel: "in-app",
      type: "pre-procedure",
    });
    alert(`Pre-procedure advisory alert sent to ${patientName}!`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Doctor Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl shadow-xs border border-emerald-200">
            <FaUserDoctor className="w-7 h-7 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{currentDoctor.name}</h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                Active Vaidya
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium">{currentDoctor.specialty}</p>
            <p className="text-xs text-gray-400">
              {currentDoctor.qualification} • {currentDoctor.experience} Exp.
            </p>
          </div>
        </div>

        {/* Doctor Switcher */}
        <div className="flex items-center gap-2">
          <label htmlFor="doctor-select" className="text-xs font-semibold text-gray-500">
            Switch Practitioner:
          </label>
          <select
            id="doctor-select"
            value={currentDoctor.id}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow-xs border border-emerald-100 p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
            <FaUserInjured className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Assigned Patients</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{doctorPatients.length}</p>
            <p className="text-xs text-emerald-600 mt-0.5">Active under Panchakarma care</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-amber-100 p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-700">
            <GiHerbsBundle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Therapy Sessions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{doctorSessions.length}</p>
            <p className="text-xs text-amber-600 mt-0.5">Vamana, Virechana, Shirodhara</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-teal-100 p-5 flex items-center gap-4">
          <div className="p-3 bg-teal-50 rounded-xl text-teal-700">
            <FaCalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Clinical Consultations</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{doctorAppointments.length}</p>
            <p className="text-xs text-teal-600 mt-0.5">Upcoming today & this week</p>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("sessions")}
          className={`py-3 px-5 text-sm font-semibold transition border-b-2 ${
            activeTab === "sessions"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Therapy Sessions ({doctorSessions.length})
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          className={`py-3 px-5 text-sm font-semibold transition border-b-2 ${
            activeTab === "appointments"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Appointments ({doctorAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab("patients")}
          className={`py-3 px-5 text-sm font-semibold transition border-b-2 ${
            activeTab === "patients"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Assigned Patients ({doctorPatients.length})
        </button>
      </div>

      {/* Tab 1: Sessions with Interactive Progress Updater */}
      {activeTab === "sessions" && (
        <section className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Panchakarma Sessions In Progress</h2>
              <p className="text-xs text-gray-500">
                Update patient progress percentage, protocol notes, and send procedural alerts directly.
              </p>
            </div>
          </div>

          {doctorSessions.length === 0 ? (
            <p className="text-gray-500 py-6 text-center text-sm">No sessions scheduled for this practitioner.</p>
          ) : (
            <div className="space-y-3">
              {doctorSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{session.therapyType}</span>
                        {session.stage && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              session.stage === "Pradhanakarma"
                                ? "bg-emerald-100 text-emerald-800"
                                : session.stage === "Purvakarma"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-indigo-100 text-indigo-800"
                            }`}
                          >
                            {session.stage}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            session.progress >= 100
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {session.status || "In-Progress"}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600">
                        Patient: <span className="font-semibold text-gray-800">{session.patientName}</span> • Room:{" "}
                        <span className="text-gray-700">{session.room || "Panchakarma Suite"}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Date: {format(parseISO(session.date), "MMM d, yyyy")} • Time: {session.time}
                      </p>
                      {session.notes && (
                        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100 mt-1 italic">
                          "{session.notes}"
                        </p>
                      )}
                    </div>

                    {/* Interactive Progress Controller */}
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${session.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-800 w-10 text-right">
                          {session.progress}%
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => updateSessionProgress(session.id, Math.min(100, session.progress + 15))}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-semibold hover:bg-emerald-100 transition"
                          title="Increase progress by 15%"
                        >
                          +15%
                        </button>
                        <button
                          onClick={() => updateSessionProgress(session.id, 100)}
                          className="px-2 py-1 bg-green-600 text-white rounded text-[11px] font-semibold hover:bg-green-700 transition"
                          title="Mark therapy completed"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleQuickAlert(session.patientName, session.therapyType)}
                          className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[11px] font-semibold hover:bg-amber-100 transition"
                          title="Send pre/post procedure warning"
                        >
                          Send Advisory
                        </button>
                        <button
                          onClick={() =>
                            setSelectedSessionNote(
                              selectedSessionNote?.id === session.id
                                ? null
                                : { id: session.id, text: session.notes || "" }
                            )
                          }
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[11px] font-semibold hover:bg-gray-200 transition"
                        >
                          <FaNotesMedical className="inline w-3 h-3 mr-1" />
                          Notes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Inline Note Editor */}
                  {selectedSessionNote?.id === session.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                      <input
                        type="text"
                        value={selectedSessionNote.text}
                        onChange={(e) =>
                          setSelectedSessionNote({ ...selectedSessionNote, text: e.target.value })
                        }
                        placeholder="Add clinical observation (e.g. Vega count, pulse, blood pressure)..."
                        className="flex-1 text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <button
                        onClick={() => {
                          updateSessionProgress(session.id, session.progress, selectedSessionNote.text);
                          setSelectedSessionNote(null);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                      >
                        Save Note
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Appointments */}
      {activeTab === "appointments" && (
        <section className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Scheduled Consultations & Assessments</h2>
          {doctorAppointments.length === 0 ? (
            <p className="text-gray-500 py-6 text-center text-sm">No upcoming appointments.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctorAppointments.map((appt) => (
                <div key={appt.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-gray-900">{appt.patientName}</p>
                      <p className="text-xs text-emerald-700 font-medium">{appt.therapyType}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      {appt.status || "Upcoming"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Date: {format(parseISO(appt.date), "MMM d, yyyy")} • Slot: {appt.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 3: Patients */}
      {activeTab === "patients" && (
        <section className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Patient Case Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorPatients.map((pat) => (
              <div key={pat.id} className="p-4 rounded-xl border border-gray-200 hover:shadow-xs transition bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                    {pat.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{pat.name}</h3>
                    <p className="text-xs text-gray-500">
                      {pat.age} yrs • {pat.gender} • Prakriti: <span className="font-semibold text-emerald-700">{pat.prakriti}</span>
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg space-y-1 mt-2">
                  <p>
                    <span className="font-medium text-gray-500">Condition:</span> {pat.condition}
                  </p>
                  <p>
                    <span className="font-medium text-gray-500">Prescribed:</span>{" "}
                    <span className="font-semibold text-emerald-800">{pat.activeTherapy}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DoctorDashboardPage;