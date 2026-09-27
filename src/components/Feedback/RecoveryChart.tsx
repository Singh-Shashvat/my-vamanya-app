// src/components/Feedback/RecoveryChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RecoveryChartProps {
  dataPoints: { date: string; progress: number }[];
}

const RecoveryChart: React.FC<RecoveryChartProps> = ({ dataPoints }) => {
  const sortedData = [...dataPoints].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartData = {
    labels: sortedData.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "Recovery Progress (%)",
        data: sortedData.map((d) => d.progress),
        fill: false,
        borderColor: "rgba(99, 102, 241, 0.8)", 
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Patient Recovery Progress Over Time" },
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
    <section aria-label="Recovery progress chart" className="bg-white rounded-lg shadow p-4 max-w-3xl">
      <Line options={options} data={chartData} />
    </section>
  );
};

export default RecoveryChart;