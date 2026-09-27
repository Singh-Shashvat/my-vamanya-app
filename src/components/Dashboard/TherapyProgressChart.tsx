import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Session } from "../../types.d";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TherapyProgressChartProps {
  sessions: Session[];
}

const TherapyProgressChart: React.FC<TherapyProgressChartProps> = ({ sessions }) => {
  const progressByTherapy: Record<string, { total: number; count: number }> = {};
  sessions.forEach(({ therapyType, progress }) => {
    // Shorten long therapy names for clear chart labels
    const shortName = therapyType.split("(")[0].trim();
    if (!progressByTherapy[shortName]) progressByTherapy[shortName] = { total: 0, count: 0 };
    progressByTherapy[shortName].total += progress;
    progressByTherapy[shortName].count += 1;
  });

  const labels = Object.keys(progressByTherapy);
  const data = labels.map(
    (therapy) => Math.round(progressByTherapy[therapy].total / progressByTherapy[therapy].count)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Average Completion Progress (%)",
        data,
        backgroundColor: "rgba(5, 150, 105, 0.75)",
        borderRadius: 6,
        hoverBackgroundColor: "rgba(5, 150, 105, 0.95)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Therapy Progress by Panchakarma Procedure" },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, callback: (val: number | string) => `${val}%` },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <section aria-label="Therapy progress chart" className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 h-80">
      <Bar data={chartData} options={options} />
    </section>
  );
};

export default TherapyProgressChart;