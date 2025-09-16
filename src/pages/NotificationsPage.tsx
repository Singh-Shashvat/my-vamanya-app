// src/pages/NotificationsPage.tsx
import React, { useState } from "react";
import NotificationSettings from "../components/Notifications/NotificationSettings";
import NotificationList from "../components/Notifications/NotificationList";
import { Notification } from "../types";

const dummyNotifications: Notification[] = [
  {
    id: "n1",
    message: "Your therapy session is scheduled for tomorrow at 10:00 AM.",
    date: new Date(Date.now() - 86400000).toISOString(),
    channel: "in-app",
    status: "sent",
    type: "pre-procedure",
  },
  {
    id: "n2",
    message: "Please remember to drink plenty of water after your session.",
    date: new Date(Date.now() - 3600000).toISOString(),
    channel: "email",
    status: "pending",
    type: "post-procedure",
  },
  {
    id: "n3",
    message: "Your SMS notification failed to send.",
    date: new Date(Date.now() - 7200000).toISOString(),
    channel: "sms",
    status: "failed",
    type: "pre-procedure",
  },
];

const NotificationsPage: React.FC = () => {
  const [channels, setChannels] = useState({
    "in-app": true,
    sms: false,
    email: true,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

      <NotificationSettings channels={channels} onChange={setChannels} />

      <NotificationList notifications={dummyNotifications} />
    </div>
  );
};

export default NotificationsPage;