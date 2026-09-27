import React, { useState } from "react";
import NotificationSettings from "../components/Notifications/NotificationSettings";
import NotificationList from "../components/Notifications/NotificationList";
import { usePanchakarma } from "../context/PanchakarmaContext";
import { MdOutlineNotificationsActive, MdOutlineSend } from "react-icons/md";
import { GiHerbsBundle } from "react-icons/gi";

const PRESET_MESSAGES = [
  {
    type: "pre-procedure" as const,
    channel: "sms" as const,
    label: "Vamana 12h Fasting Alert",
    text: "Urgent Purvakarma Advisory: Absolute fasting required 12 hours prior to Vamana. Sip only lukewarm ginger water.",
  },
  {
    type: "pre-procedure" as const,
    channel: "in-app" as const,
    label: "Snehapana Dosage Intake",
    text: "Take 30ml of medicated Ghee with hot water at 6:00 AM on empty stomach. Avoid sleeping during the day.",
  },
  {
    type: "post-procedure" as const,
    channel: "email" as const,
    label: "Paschatkarma Diet (Samsarjana)",
    text: "Consume only light mung bean soup (Yusha) with pinch of rock salt. Avoid cold drinks, air conditioning, and loud noise.",
  },
  {
    type: "post-procedure" as const,
    channel: "in-app" as const,
    label: "Post-Shirodhara Head Care",
    text: "Keep your head covered from wind and direct sunlight. Rest in a quiet dark room for minimum 45 minutes.",
  },
];

const NotificationsPage: React.FC = () => {
  const {
    notifications,
    notificationChannels,
    setNotificationChannels,
    sendNotification,
    patients,
  } = usePanchakarma();

  const [customMsg, setCustomMsg] = useState("");
  const [targetPatient, setTargetPatient] = useState(patients[0]?.name || "Ravi Kumar");
  const [selectedType, setSelectedType] = useState<"pre-procedure" | "post-procedure">("pre-procedure");
  const [selectedChannel, setSelectedChannel] = useState<"in-app" | "sms" | "email">("in-app");

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    sendNotification({
      patientName: targetPatient,
      message: customMsg,
      channel: selectedChannel,
      type: selectedType,
    });
    setCustomMsg("");
    alert(`Notification dispatched to ${targetPatient} via ${selectedChannel.toUpperCase()}!`);
  };

  const handleQuickSend = (preset: typeof PRESET_MESSAGES[0]) => {
    sendNotification({
      patientName: targetPatient,
      message: preset.text,
      channel: preset.channel,
      type: preset.type,
    });
    alert(`Dispatched "${preset.label}" to ${targetPatient}!`);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <MdOutlineNotificationsActive className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Panchakarma Pre & Post Procedure Notifications
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Automated compliance reminders: dietary guidelines, Snehana timings, fasting protocols, and recovery precautions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Channel Settings and Dispatch Form */}
        <div className="space-y-6">
          <NotificationSettings
            channels={notificationChannels}
            onChange={(channels) => setNotificationChannels(channels)}
          />

          {/* Quick Dispatch Presets */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <GiHerbsBundle className="text-emerald-600" />
              Standard Clinical Presets
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              One-click advisories tailored for Vamana, Virechana, and Shirodhara.
            </p>
            <div className="space-y-2">
              {PRESET_MESSAGES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickSend(preset)}
                  className="w-full text-left p-2.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition text-xs group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 group-hover:text-emerald-700">
                      {preset.label}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 px-1.5 py-0.5 rounded bg-gray-100">
                      {preset.channel}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px] mt-1 line-clamp-1">{preset.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Notification Form */}
          <form onSubmit={handleSendCustom} className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-800">Dispatch Custom Advisory</h3>

            <div>
              <label htmlFor="target-patient" className="block text-[11px] font-semibold text-gray-600 mb-1">
                Recipient Patient
              </label>
              <select
                id="target-patient"
                value={targetPatient}
                onChange={(e) => setTargetPatient(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.activeTherapy?.split(" ")[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="procedure-type" className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Procedure Phase
                </label>
                <select
                  id="procedure-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="pre-procedure">Pre-Procedure</option>
                  <option value="post-procedure">Post-Procedure</option>
                </select>
              </div>

              <div>
                <label htmlFor="delivery-channel" className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Channel
                </label>
                <select
                  id="delivery-channel"
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value as any)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="in-app">In-App</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="advisory-message" className="block text-[11px] font-semibold text-gray-600 mb-1">
                Advisory Instructions
              </label>
              <textarea
                id="advisory-message"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                rows={2}
                placeholder="Enter specific fasting, herbal intake, or resting instructions..."
                className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-1.5"
            >
              <MdOutlineSend className="w-3.5 h-3.5" />
              <span>Send Notification</span>
            </button>
          </form>
        </div>

        {/* Right Side: Notification History Table */}
        <div className="lg:col-span-2">
          <NotificationList notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;