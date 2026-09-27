import React from "react";
import { NavLink } from "react-router-dom";
import { usePanchakarma } from "../../context/PanchakarmaContext";
import {
  MdOutlineDashboard,
  MdOutlineCalendarMonth,
  MdOutlineNotificationsActive,
  MdOutlineRateReview,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { FaUserDoctor, FaUserInjured } from "react-icons/fa6";
import { GiLotus, GiHerbsBundle } from "react-icons/gi";

const Sidebar: React.FC = () => {
  const { sessions, notifications, practitioners } = usePanchakarma();

  const pendingApprovals = practitioners.filter((p) => p.status === "Pending").length;
  const activeSessionsCount = sessions.filter((s) => s.status !== "Completed").length;
  const recentNotifsCount = notifications.length;

  const navItems = [
    {
      name: "Main Overview",
      to: "/dashboard",
      icon: <MdOutlineDashboard className="w-5 h-5" />,
      badge: null,
    },
    {
      name: "Practitioner Portal",
      to: "/doctor-dashboard",
      icon: <FaUserDoctor className="w-5 h-5" />,
      badge: `${activeSessionsCount} Active`,
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      name: "Patient Portal",
      to: "/patient-dashboard",
      icon: <FaUserInjured className="w-5 h-5" />,
      badge: null,
    },
    {
      name: "Therapy Scheduling",
      to: "/therapy-scheduling",
      icon: <MdOutlineCalendarMonth className="w-5 h-5" />,
      badge: null,
    },
    {
      name: "Notifications & Alerts",
      to: "/notifications",
      icon: <MdOutlineNotificationsActive className="w-5 h-5" />,
      badge: recentNotifsCount > 0 ? `${recentNotifsCount}` : null,
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      name: "Feedback & Recovery",
      to: "/feedback",
      icon: <MdOutlineRateReview className="w-5 h-5" />,
      badge: null,
    },
    {
      name: "Admin Governance",
      to: "/admindashboard",
      icon: <MdOutlineAdminPanelSettings className="w-5 h-5" />,
      badge: pendingApprovals > 0 ? `${pendingApprovals} Pending` : null,
      badgeColor: "bg-rose-100 text-rose-700 font-semibold",
    },
  ];

  return (
    <aside className="bg-slate-900 text-slate-200 border-r border-slate-800 w-64 flex-shrink-0 hidden md:flex flex-col justify-between shadow-xl">
      <div>
        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center space-x-3 border-b border-slate-800/80 bg-slate-950/40">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <GiLotus className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">AyurSutra</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Vamanya
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">AYUSH Panchakarma Platform</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          <p className="px-3 pt-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Clinical Navigation
          </p>
          <nav className="flex flex-col space-y-1">
            {navItems.map(({ name, to, icon, badge, badgeColor }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="opacity-90">{icon}</span>
                  <span>{name}</span>
                </div>
                {badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      badgeColor || "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-4 m-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
          <GiHerbsBundle className="w-4 h-4" />
          <span>Vamana Protocol Live</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          SIH Automated Therapy Allocation & Samsarjana Krama Monitoring System.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;