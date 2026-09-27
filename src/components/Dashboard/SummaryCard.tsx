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
      className={`bg-white rounded-2xl shadow-xs border border-gray-200 p-5 flex items-center space-x-4 hover:border-emerald-300 transition-all ${
        className ?? ""
      }`}
      role="region"
      aria-label={title}
    >
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;