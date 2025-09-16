// src/components/Notifications/NotificationList.tsx
import React from "react";
import { Notification } from "../../types";
import { format, parseISO } from "date-fns";

interface NotificationListProps {
  notifications: Notification[];
}

const statusColors: Record<string, string> = {
  sent: "text-green-600 bg-green-100",
  pending: "text-yellow-600 bg-yellow-100",
  failed: "text-red-600 bg-red-100",
};

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <section aria-labelledby="notification-list-title" className="bg-white rounded-lg shadow p-4">
      <h2 id="notification-list-title" className="text-lg font-semibold mb-4">
        Past Notifications
      </h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications sent yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-3 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="border px-3 py-2 text-left text-sm font-medium text-gray-700">Message</th>
              <th className="border px-3 py-2 text-left text-sm font-medium text-gray-700">Channel</th>
              <th className="border px-3 py-2 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="border px-3 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(({ id, message, date, channel, status, type }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-sm text-gray-600">{format(parseISO(date), "MMM d, yyyy HH:mm")}</td>
                <td className="border px-3 py-2 text-sm text-gray-800">{message}</td>
                <td className="border px-3 py-2 text-sm capitalize">{channel.replace("-", " ")}</td>
                <td className="border px-3 py-2 text-sm capitalize">{type.replace("-", " ")}</td>
                <td className="border px-3 py-2 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[status]}`}
                    aria-label={`Status: ${status}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default NotificationList;