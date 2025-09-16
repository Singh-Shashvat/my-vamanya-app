// src/components/Notifications/NotificationSettings.tsx
import React from "react";

interface NotificationSettingsProps {
  channels: {
    "in-app": boolean;
    sms: boolean;
    email: boolean;
  };
  onChange: (channels: { "in-app": boolean; sms: boolean; email: boolean }) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ channels, onChange }) => {
  const handleToggle = (channel: keyof typeof channels) => {
    onChange({ ...channels, [channel]: !channels[channel] });
  };

  return (
    <section aria-labelledby="notification-settings-title" className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 id="notification-settings-title" className="text-lg font-semibold mb-4">
        Notification Channels
      </h2>
      <div className="flex flex-col space-y-3">
        {(["in-app", "sms", "email"] as const).map((channel) => (
          <label key={channel} className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={channels[channel]}
              onChange={() => handleToggle(channel)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="capitalize">{channel.replace("-", " ")}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default NotificationSettings;