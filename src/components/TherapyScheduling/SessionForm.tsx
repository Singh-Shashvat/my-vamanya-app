// src/components/TherapyScheduling/SessionForm.tsx
import React, { useState, useEffect } from "react";
import { Session } from "../../types";

interface SessionFormProps {
  session?: Session;
  onSave: (session: Omit<Session, "id" | "progress">) => void;
  onCancel: () => void;
  date: string; // yyyy-MM-dd
}

const therapyTypes = [
  "Abhyanga Massage",
  "Shirodhara",
  "Pizhichil",
  "Nasya",
  "Basti",
  "Swedana",
];

const SessionForm: React.FC<SessionFormProps> = ({ session, onSave, onCancel, date }) => {
  const [therapyType, setTherapyType] = useState(session?.therapyType || therapyTypes[0]);
  const [patientName, setPatientName] = useState(session?.patientName || "");
  const [practitionerName, setPractitionerName] = useState(session?.practitionerName || "");
  const [sessionDate, setSessionDate] = useState(session?.date || date);
  const [time, setTime] = useState(session?.time || "10:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !practitionerName.trim()) {
      alert("Please fill in patient and practitioner names.");
      return;
    }
    onSave({
      therapyType,
      patientName,
      practitionerName,
      date: sessionDate,
      time,
    });
  };

  useEffect(() => {
    setSessionDate(date);
  }, [date]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{session ? "Edit Session" : "New Session"}</h3>

      <div>
        <label htmlFor="therapyType" className="block text-sm font-medium text-gray-700">
          Therapy Type
        </label>
        <select
          id="therapyType"
          value={therapyType}
          onChange={(e) => setTherapyType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          {therapyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
          Patient Name
        </label>
        <input
          type="text"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter patient name"
          required
        />
      </div>

      <div>
        <label htmlFor="practitionerName" className="block text-sm font-medium text-gray-700">
          Practitioner Name
        </label>
        <input
          type="text"
          id="practitionerName"
          value={practitionerName}
          onChange={(e) => setPractitionerName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter practitioner name"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SessionForm;