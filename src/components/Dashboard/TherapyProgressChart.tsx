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
import { Session } from "../../types";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface TherapyProgressChartProps {
  sessions: Session[];
}
const TherapyProgressChart: React.FC<TherapyProgressChartProps> = ({ sessions }) => {
  
  const progressByTherapy: Record<string, { total: number; count: number }> = {};
  sessions.forEach(({ therapyType, progress }) => {
    if (!progressByTherapy[therapyType]) progressByTherapy[therapyType] = { total: 0, count: 0 };
    progressByTherapy[therapyType].total += progress;
    progressByTherapy[therapyType].count += 1;
  });
  const labels = Object.keys(progressByTherapy);
  const data = labels.map(
    (therapy) => progressByTherapy[therapy].total / progressByTherapy[therapy].count
  );
  const chartData = {
    labels,
    datasets: [
      {
        label: "Average Progress (%)",
        data,
        backgroundColor: "rgba(99, 102, 241, 0.7)", 
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Therapy Progress Overview" },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, callback: (val: number | string) => `${val}%` },
      },
      },
  };
  return (
    <section aria-label="Therapy progress chart" className="bg-white rounded-lg shadow p-4">
      <Bar  data={chartData} options={options} />
    </section>
  );
};
export default TherapyProgressChart;