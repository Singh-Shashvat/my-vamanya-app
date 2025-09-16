import React from "react";
import { Session } from "../../types";
import { format, parseISO } from "date-fns";
interface UpcomingSessionsProps {
  sessions: Session[];
}
const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions }) => {
  return (
    <section aria-labelledby="upcoming-sessions-title" className="bg-white rounded-lg shadow p-4">
      <h2 id="upcoming-sessions-title" className="text-lg font-semibold mb-4">
        Upcoming Therapy Sessions
      </h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No upcoming sessions.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sessions.map((session) => (
            <li key={session.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{session.therapyType}</p>
                <p className="text-sm text-gray-600">
                  Patient: {session.patientName} | Practitioner: {session.practitionerName}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {format(parseISO(session.date), "MMM d, yyyy")} at {session.time}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default UpcomingSessions;