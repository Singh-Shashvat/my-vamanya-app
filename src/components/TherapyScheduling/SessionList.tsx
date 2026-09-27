import React from "react";
import { Session } from "../../types.d";
import { format, parseISO } from "date-fns";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface SessionListProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (sessionId: string) => void;
  selectedDate: string; // yyyy-MM-dd
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onEdit, onDelete, selectedDate }) => {
  const filteredSessions = sessions.filter((s) => s.date === selectedDate);

  let formattedHeading = selectedDate;
  try {
    formattedHeading = format(parseISO(selectedDate), "EEEE, MMMM d, yyyy");
  } catch {
    formattedHeading = selectedDate;
  }

  return (
    <section aria-labelledby="session-list-title" className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 mt-4">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <div>
          <h2 id="session-list-title" className="text-base font-bold text-gray-900">
            Sessions on {formattedHeading}
          </h2>
          <p className="text-xs text-gray-500">
            {filteredSessions.length} procedure{filteredSessions.length === 1 ? "" : "s"} scheduled
          </p>
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <div className="py-8 text-center text-gray-400 text-xs">
          <p className="font-medium text-gray-500">No therapy sessions scheduled for this date.</p>
          <p className="mt-1">Click "+ New Session" above to allocate a therapy room and practitioner.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900">{session.therapyType}</span>
                  {session.stage && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      {session.stage}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                    {session.room || "Room 1"}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Patient: <span className="font-semibold text-gray-800">{session.patientName}</span> • Vaidya:{" "}
                  <span className="font-semibold text-gray-800">{session.practitionerName}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Time Slot: <span className="font-medium text-emerald-700">{session.time}</span> • Progress:{" "}
                  <span className="font-bold text-gray-700">{session.progress}%</span>
                </p>
                {session.notes && (
                  <p className="text-[11px] text-gray-500 italic mt-0.5">"{session.notes}"</p>
                )}
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                <button
                  onClick={() => onEdit(session)}
                  className="p-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-white hover:text-emerald-700 text-xs flex items-center gap-1 font-medium transition"
                  aria-label={`Edit session ${session.therapyType}`}
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Cancel and delete therapy session "${session.therapyType}"?`)) {
                      onDelete(session.id);
                    }
                  }}
                  className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs flex items-center gap-1 font-medium transition"
                  aria-label={`Delete session ${session.therapyType}`}
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SessionList;