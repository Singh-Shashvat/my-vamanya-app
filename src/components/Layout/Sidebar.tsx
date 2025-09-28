import React from "react";
import { NavLink } from "react-router-dom";
const navItems = [
  {name: "Practitioner Dashbord", to: "/doctor-dashboard", icon: "🧑‍⚕️"},
  {name: "Patient Dashbord", to: "/patient-dashboard", icon: "🧑"},
  {name: "Admin Dashboard", to: "/admindashboard", icon: "🧑‍💼"},
  { name: "Dashboard", to: "/dashboard", icon: "🏠" },
  { name: "Therapy Scheduling", to: "/therapy-scheduling", icon: "📅" },
  { name: "Notifications", to: "/notifications", icon: "🔔" },
  { name: "Feedback", to: "/feedback", icon: "📝" },
  
];
const Sidebar: React.FC = () => {
  return (
    <aside className="bg-white border-r border-gray-200 w-64 flex-shrink-0 hidden md:flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-gray-200">
        Panchakarma
      </div>
      <nav className="flex flex-col p-4 space-y-1">
        {navItems.map(({ name, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : ""
              }`
            }
          ><span className="text-lg">{icon}</span>
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;