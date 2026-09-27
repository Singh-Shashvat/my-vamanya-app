import React, { useState } from "react";
import FeedbackForm from "../components/Feedback/FeedbackForm";
import RecoveryChart from "../components/Feedback/RecoveryChart";
import { usePanchakarma } from "../context/PanchakarmaContext";
import { MdOutlineRateReview } from "react-icons/md";
import { format, parseISO } from "date-fns";

const severityColors: Record<string, string> = {
  Mild: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Moderate: "bg-amber-100 text-amber-800 border-amber-200",
  Severe: "bg-rose-100 text-rose-800 border-rose-200",
};

const FeedbackPage: React.FC = () => {
  const { feedbacks, addFeedback, patients } = usePanchakarma();
  const [filterPatient, setFilterPatient] = useState<string>("All");

  const handleSubmit = (data: {
    patientName: string;
    symptoms: string;
    severity: "Mild" | "Moderate" | "Severe";
    comments: string;
    progress: number;
  }) => {
    addFeedback(data);
    alert(`Recovery log successfully registered for ${data.patientName}!`);
  };

  const filteredFeedbacks =
    filterPatient === "All"
      ? feedbacks
      : feedbacks.filter((f) => f.patientName.toLowerCase() === filterPatient.toLowerCase());

  const chartDataPoints = filteredFeedbacks.map(({ date, progress }) => ({ date, progress }));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <MdOutlineRateReview className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Patient Feedback & Recovery Tracking
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time monitoring of Panchakarma detoxification response, symptom resolution, and dosha balance.
          </p>
        </div>

        {/* Patient Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="patient-filter" className="text-xs font-semibold text-gray-600">
            Filter Trajectory:
          </label>
          <select
            id="patient-filter"
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Patients</option>
            {patients.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-1">
          <FeedbackForm onSubmit={handleSubmit} />
        </div>

        {/* Right Chart & Log List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-2">
              Recovery Trajectory Over Time {filterPatient !== "All" && `(${filterPatient})`}
            </h2>
            <RecoveryChart dataPoints={chartDataPoints} />
          </div>

          {/* History of logs */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Past Recorded Patient Observations</h3>
            {filteredFeedbacks.length === 0 ? (
              <p className="text-gray-400 text-xs py-4 text-center">No feedback entries recorded.</p>
            ) : (
              <div className="space-y-3">
                {filteredFeedbacks.map((f) => (
                  <div
                    key={f.id}
                    className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 bg-gray-50/50 transition-all space-y-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{f.patientName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            severityColors[f.severity] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {f.severity}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {format(parseISO(f.date), "MMM d, yyyy • HH:mm")}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-emerald-900">
                      Symptoms: <span className="font-normal text-gray-700">{f.symptoms}</span>
                    </p>

                    {f.comments && (
                      <p className="text-xs text-gray-600 bg-white p-2 rounded-lg border border-gray-100 italic">
                        "{f.comments}"
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                      <span>Perceived Vitality / Recovery Score:</span>
                      <span className="font-bold text-emerald-700">{f.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;