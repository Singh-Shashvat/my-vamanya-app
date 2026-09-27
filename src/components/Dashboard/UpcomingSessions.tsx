import React from "react";
import { Session } from "../../types.d";
import { format, parseISO } from "date-fns";

interface UpcomingSessionsProps {
  sessions: Session[];
}

const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions }) => {
  return (
    <section aria-labelledby="upcoming-sessions-title" className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="upcoming-sessions-title" className="text-base font-bold text-gray-900">
            Upcoming Therapy Sessions
          </h2>
          <p className="text-xs text-gray-500">Live clinical pipeline</p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <p className="text-gray-500 text-xs py-6 text-center">No upcoming sessions.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {sessions.slice(0, 5).map((session) => (
            <li key={session.id} className="py-3 flex justify-between items-start">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-gray-900">{session.therapyType}</span>
                  {session.stage && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {session.stage.slice(0, 8)}..
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-600">
                  Patient: <span className="font-medium text-gray-800">{session.patientName}</span>
                </p>
                <p className="text-[10px] text-gray-400">
                  {format(parseISO(session.date), "MMM d, yyyy")} • {session.time} • {session.room || "Room 1"}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700">{session.progress}%</span>
                <p className="text-[10px] text-gray-400">progress</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default UpcomingSessions;