import React, { useState } from "react";
import Calendar from "../components/TherapyScheduling/Calander";
import SessionList from "../components/TherapyScheduling/SessionList";
import SessionForm from "../components/TherapyScheduling/SessionForm";
import { Session } from "../types.d";
import { usePanchakarma } from "../context/PanchakarmaContext";
import { format } from "date-fns";
import { GiLotus } from "react-icons/gi";

const TherapySchedulingPage: React.FC = () => {
  const { sessions, addSession, updateSession, deleteSession } = usePanchakarma();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDateClick = (date: Date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
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
    deleteSession(id);
  };

  const handleSave = (sessionData: Omit<Session, "id" | "progress">) => {
    if (editingSession) {
      updateSession({
        ...editingSession,
        ...sessionData,
      });
    } else {
      addSession({
        progress: 0,
        ...sessionData,
      });
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
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <GiLotus className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-bold text-gray-900">Therapy Scheduling & Resource Allocation</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Automated slot reservation for Vamana, Virechana, Shirodhara, and Basti suites.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow-xs flex items-center gap-2 self-start sm:self-auto transition"
        >
          <span>+ Schedule Therapy Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-4">
          <Calendar
            sessions={sessions}
            onDateClick={handleDateClick}
            selectedDate={selectedDate ? new Date(selectedDate) : null}
          />
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Has Scheduled Procedure
            </span>
            <span>Total: {sessions.length} Sessions</span>
          </div>
        </div>

        {/* Sessions on Selected Date */}
        <div className="lg:col-span-2 flex flex-col">
          <SessionList
            sessions={sessions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectedDate={selectedDate}
          />
        </div>
      </div>

      {/* Modal Dialog for Session Form */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="max-w-xl w-full">
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
  );
};

export default TherapySchedulingPage;