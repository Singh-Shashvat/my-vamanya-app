import React, { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from "date-fns";
import { Session } from "../../types";
interface CalendarProps {
  sessions: Session[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}
const Calendar: React.FC<CalendarProps> = ({ sessions, onDateClick, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = new Date(day);
      const daySessions = sessions.filter(
        (s) => s.date === format(cloneDay, "yyyy-MM-dd")
      );
      days.push(
        <div
          key={day.toString()}
          className={`p-2 border rounded cursor-pointer select-none flex flex-col items-center justify-center
            ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, selectedDate ?? new Date())
                ? "bg-indigo-500 text-white"
                : "hover:bg-indigo-100"
            }
          `}
          onClick={() => onDateClick(cloneDay)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onDateClick(cloneDay);
          }}
          aria-label={`Day ${formattedDate}, ${daySessions.length} sessions`}
        >
          <span className="text-sm font-medium">{formattedDate}</span>
          {daySessions.length > 0 && (
            <span className="mt-1 w-2 h-2 rounded-full bg-indigo-600"></span>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
        {days}
      </div>
    );
    days = [];
  }

  const prevMonth = () => setCurrentMonth(addDays(monthStart, -1));
  const nextMonth = () => setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          aria-label="Previous month"
          className="p-1 rounded hover:bg-indigo-100"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={nextMonth}
          aria-label="Next month"
          className="p-1 rounded hover:bg-indigo-100"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2 select-none">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      {rows}
       </div>
  );
};
export default Calendar;

