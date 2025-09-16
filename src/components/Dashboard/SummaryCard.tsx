import React from "react";
interface SummaryCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, className }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 flex items-center space-x-4 ${className ?? ""}`}
      role="region"
      aria-label={title}
    >
      {icon && <div className="text-indigo-600 text-3xl">{icon}</div>}
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
export default SummaryCard;