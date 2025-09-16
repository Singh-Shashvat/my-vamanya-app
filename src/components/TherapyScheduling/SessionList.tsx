// src/components/TherapyScheduling/SessionList.tsx
import React from "react";
import { Session } from "../../types";
import { format, parseISO } from "date-fns";

interface SessionListProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (sessionId: string) => void;
  selectedDate: string; // yyyy-MM-dd
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onEdit, onDelete, selectedDate }) => {
  const filteredSessions = sessions.filter((s) => s.date === selectedDate);

  return (
    <section aria-labelledby="session-list-title" className="bg-white rounded-lg shadow p-4 mt-4">
      <h2 id="session-list-title" className="text-lg font-semibold mb-4">
        Sessions on {format(parseISO(selectedDate), "MMM d, yyyy")}
      </h2>
      {filteredSessions.length === 0 ? (
        <p className="text-gray-500">No sessions scheduled for this date.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredSessions.map((session) => (
            <li key={session.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{session.therapyType}</p>
                <p className="text-sm text-gray-600">
                  Patient: {session.patientName} | Practitioner: {session.practitionerName}
                </p>
                <p className="text-sm text-gray-500">Time: {session.time}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(session)}
                  className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                  aria-label={`Edit session ${session.therapyType}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this session?")) {
                      onDelete(session.id);
                    }
                  }}
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                  aria-label={`Delete session ${session.therapyType}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SessionList;