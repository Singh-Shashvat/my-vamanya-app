// src/pages/TherapySchedulingPage.tsx
import React, { useState } from "react";
import Calendar from "../components/TherapyScheduling/Calander";
import SessionList from "../components/TherapyScheduling/SessionList";
import SessionForm from "../components/TherapyScheduling/SessionForm";
import { Session } from "../types";
import { v4 as uuidv4 } from "uuid";

const TherapySchedulingPage: React.FC = () => {
  // Sessions state (in real app, fetch from API)
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      therapyType: "Abhyanga Massage",
      patientName: "Ravi Kumar",
      practitionerName: "Dr. Meena",
      date: new Date().toISOString().slice(0, 10),
      time: "10:00",
      progress: 40,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date.toISOString().slice(0, 10));
    setEditingSession(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setEditingSession(null);
    setShowForm(true);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = (sessionData: Omit<Session, "id" | "progress">) => {
    if (editingSession) {
      // Update existing
      setSessions((prev) =>
        prev.map((s) =>
          s.id === editingSession.id ? { ...s, ...sessionData } : s
        )
      );
    } else {
      // Add new
      const newSession: Session = {
        id: uuidv4(),
        progress: 0,
        ...sessionData,
      };
      setSessions((prev) => [...prev, newSession]);
    }
    setShowForm(false);
    setEditingSession(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSession(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Therapy Scheduling</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Calendar sessions={sessions} onDateClick={handleDateClick} selectedDate={selectedDate ? new Date(selectedDate) : null} />

        <div className="lg:col-span-2 flex flex-col">
          <button
            onClick={handleAddNew}
            className="self-start mb-4 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            + New Session
          </button>

          <SessionList
            sessions={sessions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectedDate={selectedDate}
          />

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <SessionForm
                  session={editingSession ?? undefined}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  date={selectedDate}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapySchedulingPage;