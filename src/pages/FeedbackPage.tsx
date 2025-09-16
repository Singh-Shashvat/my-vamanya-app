// src/pages/FeedbackPage.tsx
import React, { useState } from "react";
import FeedbackForm from "../components/Feedback/FeedbackForm";
import RecoveryChart from "../components/Feedback/RecoveryChart";

interface FeedbackEntry {
  id: string;
  symptoms: string;
  severity: "Mild" | "Moderate" | "Severe";
  comments: string;
  date: string;
  progress: number; // 0-100, simulated for demo
}

const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([
    {
      id: "f1",
      symptoms: "Mild headache",
      severity: "Mild",
      comments: "Felt better after session",
      date: new Date(Date.now() - 7 * 86400000).toISOString(),
      progress: 30,
    },
    {
      id: "f2",
      symptoms: "Fatigue",
      severity: "Moderate",
      comments: "Improved sleep",
      date: new Date(Date.now() - 3 * 86400000).toISOString(),
      progress: 60,
    },
  ]);

  const handleSubmit = (data: Omit<FeedbackEntry, "id" | "date" | "progress">) => {
    const newEntry: FeedbackEntry = {
      id: (Math.random() * 100000).toFixed(0),
      date: new Date().toISOString(),
      progress: Math.min(100, (feedbacks[feedbacks.length - 1]?.progress ?? 0) + 20),
      ...data,
    };
    setFeedbacks((prev) => [...prev, newEntry]);
  };

  const chartDataPoints = feedbacks.map(({ date, progress }) => ({ date, progress }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Patient Feedback</h1>

      <FeedbackForm onSubmit={handleSubmit} />

      <RecoveryChart dataPoints={chartDataPoints} />
    </div>
  );
};

export default FeedbackPage;