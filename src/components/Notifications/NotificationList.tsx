import React from "react";
import { Notification } from "../../types.d";
import { format, parseISO } from "date-fns";

interface NotificationListProps {
  notifications: Notification[];
}

const statusColors: Record<string, string> = {
  sent: "text-emerald-700 bg-emerald-100 border-emerald-200",
  pending: "text-amber-700 bg-amber-100 border-amber-200",
  failed: "text-rose-700 bg-rose-100 border-rose-200",
};

const channelBadges: Record<string, { bg: string; text: string }> = {
  "in-app": { bg: "bg-teal-50 border-teal-200", text: "text-teal-700" },
  sms: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700" },
  email: { bg: "bg-purple-50 border-purple-200", text: "text-purple-700" },
};

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <section aria-labelledby="notification-list-title" className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="notification-list-title" className="text-base font-bold text-gray-900">
            Dispatched Clinical Advisories & Logs
          </h2>
          <p className="text-xs text-gray-500">Chronological communication audit across all active patients</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
          {notifications.length} Total Logs
        </span>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-xs py-8 text-center">No notifications sent yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 uppercase tracking-wider text-[11px]">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Advisory Message</th>
                <th className="p-3">Channel</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notifications.map(({ id, patientName, message, date, channel, status, type }) => (
                <tr key={id} className="hover:bg-gray-50/70 transition">
                  <td className="p-3 text-gray-500 whitespace-nowrap">
                    {format(parseISO(date), "MMM d, HH:mm")}
                  </td>
                  <td className="p-3 font-bold text-gray-900 whitespace-nowrap">
                    {patientName || "All Patients"}
                  </td>
                  <td className="p-3 text-gray-800 max-w-xs">{message}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        channelBadges[channel]?.bg || "bg-gray-100"
                      } ${channelBadges[channel]?.text || "text-gray-700"}`}
                    >
                      {channel.replace("-", " ")}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        type === "pre-procedure"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-indigo-50 text-indigo-800 border border-indigo-200"
                      }`}
                    >
                      {type === "pre-procedure" ? "Pre-Karma" : "Post-Karma"}
                    </span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        statusColors[status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default NotificationList;