// src/components/Feedback/FeedbackForm.tsx
import React, { useState } from "react";

interface FeedbackFormProps {
  onSubmit: (data: {
    symptoms: string;
    severity: "Mild" | "Moderate" | "Severe";
    comments: string;
  }) => void;
}

const severityOptions = ["Mild", "Moderate", "Severe"] as const;

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe">("Mild");
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      alert("Please enter symptoms.");
      return;
    }
    onSubmit({ symptoms, severity, comments });
    setSymptoms("");
    setSeverity("Mild");
    setComments("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-md">
      <h2 className="text-lg font-semibold mb-4">Submit Feedback</h2>

      <div className="mb-4">
        <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
          Symptoms
        </label>
        <textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Describe your symptoms"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
          Severity
        </label>
        <select
          id="severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as any)}
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          {severityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Comments
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={2}
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Any other notes"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;