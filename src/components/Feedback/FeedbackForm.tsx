import React, { useState } from "react";
import { usePanchakarma } from "../../context/PanchakarmaContext";

interface FeedbackFormProps {
  onSubmit: (data: {
    patientName: string;
    symptoms: string;
    severity: "Mild" | "Moderate" | "Severe";
    comments: string;
    progress: number;
  }) => void;
}

const severityOptions = ["Mild", "Moderate", "Severe"] as const;

const commonSymptoms = [
  "Throat dryness & lightness after Vamana",
  "Mild temporary fatigue after Swedana",
  "Headache relieved & deep sleep",
  "Digestive fire (Agni) stimulated",
  "Slight nausea during Snehapana",
  "Joint stiffness significantly reduced",
];

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const { patients, selectedPatientId } = usePanchakarma();
  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const [patientName, setPatientName] = useState(currentPatient?.name || "Ravi Kumar");
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe">("Mild");
  const [comments, setComments] = useState("");
  const [progressScore, setProgressScore] = useState<number>(75);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      alert("Please enter symptoms or select a quick observation.");
      return;
    }
    onSubmit({
      patientName,
      symptoms,
      severity,
      comments,
      progress: progressScore,
    });
    setSymptoms("");
    setSeverity("Mild");
    setComments("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 space-y-4">
      <div className="pb-2 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">Post-Procedure Symptom & Recovery Log</h2>
        <p className="text-xs text-gray-500">Record post-therapy vitals, symptoms, and perceived recovery.</p>
      </div>

      <div>
        <label htmlFor="reporting-patient" className="block text-xs font-semibold text-gray-700 mb-1">
          Patient Name
        </label>
        <select
          id="reporting-patient"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          {patients.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name} ({p.activeTherapy?.split(" ")[0]})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="symptoms-input" className="block text-xs font-semibold text-gray-700 mb-1">
          Observed Symptoms / Physical State
        </label>
        <textarea
          id="symptoms-input"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows={2}
          className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          placeholder="Describe symptoms (e.g. digestive status, lightness, fatigue level)..."
          required
        />
        {/* Quick Suggestion Chips */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {commonSymptoms.map((chip, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSymptoms(chip)}
              className="text-[10px] px-2 py-1 rounded-full bg-gray-100 hover:bg-emerald-100 hover:text-emerald-800 text-gray-700 transition"
            >
              + {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="severity-level" className="block text-xs font-semibold text-gray-700 mb-1">
            Symptom Severity
          </label>
          <select
            id="severity-level"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as any)}
            className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {severityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="recovery-feeling" className="block text-xs font-semibold text-gray-700 mb-1">
            Recovery Feeling: {progressScore}%
          </label>
          <input
            id="recovery-feeling"
            type="range"
            min="10"
            max="100"
            step="5"
            value={progressScore}
            onChange={(e) => setProgressScore(Number(e.target.value))}
            className="w-full accent-emerald-600 mt-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="feedback-notes" className="block text-xs font-semibold text-gray-700 mb-1">
          Detailed Comments & Vaidya Feedback
        </label>
        <textarea
          id="feedback-notes"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={2}
          className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          placeholder="Any additional notes for the attending practitioner..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition shadow-xs"
      >
        Submit Recovery Log
      </button>
    </form>
  );
};

export default FeedbackForm;