import React, { useState, useEffect } from "react";
import { Session } from "../../types.d";
import { usePanchakarma } from "../../context/PanchakarmaContext";

interface SessionFormProps {
  session?: Session;
  onSave: (session: Omit<Session, "id" | "progress">) => void;
  onCancel: () => void;
  date: string; // yyyy-MM-dd
}

const therapyTypes = [
  "Vamana Karma (Therapeutic Emesis)",
  "Virechana Karma (Therapeutic Purgation)",
  "Basti Karma (Medicated Enema)",
  "Nasya Karma (Nasal Administration)",
  "Raktamokshana (Bloodletting Therapy)",
  "Shirodhara (Takra / Taila)",
  "Abhyanga Massage & Swedana",
  "Pizhichil (Herbal Oil Bath)",
  "Kizhi (Warm Herbal Poultice)",
  "Kati / Janu Basti",
];

const rooms = [
  "Kuti-101 (Panchakarma Hall)",
  "Kuti-102 (Panchakarma Hall)",
  "Therapy Room 1 (Abhyanga)",
  "Therapy Room 2 (Swedana/Steam)",
  "Dhara Room 1 (Shirodhara)",
  "Nasya & ENT Cabin",
];

const SessionForm: React.FC<SessionFormProps> = ({ session, onSave, onCancel, date }) => {
  const { patients, doctors } = usePanchakarma();

  const [therapyType, setTherapyType] = useState(session?.therapyType || therapyTypes[0]);
  const [patientName, setPatientName] = useState(session?.patientName || patients[0]?.name || "");
  const [practitionerName, setPractitionerName] = useState(session?.practitionerName || doctors[0]?.name || "");
  const [stage, setStage] = useState<"Purvakarma" | "Pradhanakarma" | "Paschatkarma">(
    session?.stage || "Pradhanakarma"
  );
  const [room, setRoom] = useState(session?.room || rooms[0]);
  const [sessionDate, setSessionDate] = useState(session?.date || date);
  const [time, setTime] = useState(session?.time || "10:00");
  const [notes, setNotes] = useState(session?.notes || "");

  useEffect(() => {
    if (!session) {
      setSessionDate(date);
    }
  }, [date, session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !practitionerName.trim()) {
      alert("Please specify both patient and practitioner.");
      return;
    }

    onSave({
      therapyType,
      patientName,
      practitionerName,
      date: sessionDate,
      time,
      stage,
      room,
      notes,
      status: session?.status || "Scheduled",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900">
            {session ? "Modify Therapy Session" : "Schedule New Panchakarma Session"}
          </h3>
          <p className="text-xs text-gray-500">AYUSH Standard Slot & Resource Allocation</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Therapy Selection */}
        <div className="sm:col-span-2">
          <label htmlFor="therapyType" className="block text-xs font-semibold text-gray-700 mb-1">
            Panchakarma Procedure
          </label>
          <select
            id="therapyType"
            value={therapyType}
            onChange={(e) => setTherapyType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          >
            {therapyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Stage */}
        <div>
          <label htmlFor="stage" className="block text-xs font-semibold text-gray-700 mb-1">
            Panchakarma Stage
          </label>
          <select
            id="stage"
            value={stage}
            onChange={(e) => setStage(e.target.value as any)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="Purvakarma">1. Purvakarma (Snehana/Swedana)</option>
            <option value="Pradhanakarma">2. Pradhanakarma (Main Karma)</option>
            <option value="Paschatkarma">3. Paschatkarma (Samsarjana)</option>
          </select>
        </div>

        {/* Room / Facility */}
        <div>
          <label htmlFor="room" className="block text-xs font-semibold text-gray-700 mb-1">
            Therapy Suite / Room
          </label>
          <select
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Selection */}
        <div>
          <label htmlFor="patientName" className="block text-xs font-semibold text-gray-700 mb-1">
            Patient Name
          </label>
          <input
            list="patient-list"
            id="patientName"
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Select or enter patient"
            required
          />
          <datalist id="patient-list">
            {patients.map((p) => (
              <option key={p.id} value={p.name} />
            ))}
          </datalist>
        </div>

        {/* Practitioner Selection */}
        <div>
          <label htmlFor="practitionerName" className="block text-xs font-semibold text-gray-700 mb-1">
            Assigned Vaidya / Doctor
          </label>
          <input
            list="doctor-list"
            id="practitionerName"
            type="text"
            value={practitionerName}
            onChange={(e) => setPractitionerName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Select or enter doctor"
            required
          />
          <datalist id="doctor-list">
            {doctors.map((d) => (
              <option key={d.id} value={d.name} />
            ))}
          </datalist>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-xs font-semibold text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-xs font-semibold text-gray-700 mb-1">
            Session Time Slot
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        {/* Protocol Notes */}
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="block text-xs font-semibold text-gray-700 mb-1">
            Clinical Notes & Decoction/Taila Instructions
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="e.g., Snehapana dosage, herbal decoction details, fasting requirement..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow-xs"
        >
          {session ? "Update Session" : "Confirm & Schedule"}
        </button>
      </div>
    </form>
  );
};

export default SessionForm;