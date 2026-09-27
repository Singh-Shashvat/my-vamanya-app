import React from "react";
import { FiSmartphone, FiMail, FiBell } from "react-icons/fi";

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

  const channelMeta = {
    "in-app": {
      label: "In-App Push Alerts",
      desc: "Instant alerts on patient portal for fasting & intake reminders",
      icon: <FiBell className="w-4 h-4 text-teal-600" />,
    },
    sms: {
      label: "SMS Gateway (Direct Mobile)",
      desc: "Emergency Purvakarma dosage reminders via mobile network",
      icon: <FiSmartphone className="w-4 h-4 text-blue-600" />,
    },
    email: {
      label: "Email Summaries",
      desc: "Detailed Paschatkarma diet chart & recovery instructions",
      icon: <FiMail className="w-4 h-4 text-purple-600" />,
    },
  };

  return (
    <section aria-labelledby="notification-settings-title" className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5">
      <h2 id="notification-settings-title" className="text-base font-bold text-gray-900 mb-1">
        Communication Gateways
      </h2>
      <p className="text-xs text-gray-500 mb-4">Toggle automated delivery channels for procedural alerts</p>

      <div className="space-y-3">
        {(["in-app", "sms", "email"] as const).map((channel) => (
          <label
            key={channel}
            className="flex items-start justify-between p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-gray-50/50 cursor-pointer transition select-none"
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-gray-100 mt-0.5">{channelMeta[channel].icon}</div>
              <div>
                <p className="text-xs font-bold text-gray-800">{channelMeta[channel].label}</p>
                <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{channelMeta[channel].desc}</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={channels[channel]}
              onChange={() => handleToggle(channel)}
              className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 accent-emerald-600"
            />
          </label>
        ))}
      </div>
    </section>
  );
};

export default NotificationSettings;