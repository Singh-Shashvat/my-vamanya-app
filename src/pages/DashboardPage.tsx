import React from "react";
import SummaryCard from "../components/Dashboard/SummaryCard";
import UpcomingSessions from "../components/Dashboard/UpcomingSessions";
import TherapyProgressChart from "../components/Dashboard/TherapyProgressChart";
import { usePanchakarma } from "../context/PanchakarmaContext";
import { CiBellOn, CiCalendar } from "react-icons/ci";
import { FaUserGroup, FaHeartPulse } from "react-icons/fa6";
import { GiHerbsBundle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { sessions, patients, notifications } = usePanchakarma();
  const navigate = useNavigate();

  const totalSessions = sessions.length;
  const activeSessions = sessions.filter((s) => s.status !== "Completed").length;
  const uniquePatients = patients.length;
  const notificationsCount = notifications.length;

  const avgProgress = totalSessions
    ? Math.round(sessions.reduce((acc, s) => acc + s.progress, 0) / totalSessions)
    : 0;

  // Stages count
  const purvaCount = sessions.filter((s) => s.stage === "Purvakarma").length;
  const pradhanaCount = sessions.filter((s) => s.stage === "Pradhanakarma").length;
  const paschatCount = sessions.filter((s) => s.stage === "Paschatkarma").length;

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold mb-3 border border-white/10">
            <GiHerbsBundle className="w-4 h-4 text-emerald-300" />
            <span>Smart India Hackathon • AYUSH Mission</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            AyurSutra: Vamanya Therapy Care
          </h1>
          <p className="mt-2 text-emerald-100 text-sm leading-relaxed">
            Automated Panchakarma scheduling, practitioner monitoring, Purvakarma preparation alerts, and clinical recovery trajectory tracking.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/therapy-scheduling")}
              className="px-4 py-2 bg-white text-emerald-900 rounded-lg text-xs font-semibold shadow hover:bg-emerald-50 transition"
            >
              + Schedule Therapy Session
            </button>
            <button
              onClick={() => navigate("/notifications")}
              className="px-4 py-2 bg-emerald-600/40 border border-emerald-400/40 text-white rounded-lg text-xs font-semibold hover:bg-emerald-600/60 transition"
            >
              Review Protocol Alerts ({notificationsCount})
            </button>
          </div>
        </div>

        {/* Decorative circle glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Active Sessions"
          value={`${activeSessions} / ${totalSessions}`}
          icon={<CiCalendar className="w-7 h-7 text-emerald-600" />}
        />
        <SummaryCard
          title="Registered Patients"
          value={uniquePatients}
          icon={<FaUserGroup className="w-7 h-7 text-teal-600" />}
        />
        <SummaryCard
          title="Avg Therapy Progress"
          value={`${avgProgress}%`}
          icon={<FaHeartPulse className="w-7 h-7 text-indigo-600" />}
        />
        <SummaryCard
          title="Clinical Alerts"
          value={notificationsCount}
          icon={<CiBellOn className="w-7 h-7 text-amber-600" />}
        />
      </div>

      {/* Panchakarma Stages Pipeline Indicator */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
          Panchakarma Therapy Flow Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase">1. Purvakarma (Prep)</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-200 text-amber-900 rounded-full">
                {purvaCount} Sessions
              </span>
            </div>
            <p className="text-xs text-amber-700 mt-2">
              Snehana (internal oleation) & Swedana (herbal fomentation) preparatory protocols.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase">2. Pradhanakarma (Main)</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-200 text-emerald-900 rounded-full">
                {pradhanaCount} Sessions
              </span>
            </div>
            <p className="text-xs text-emerald-700 mt-2">
              Core elimination procedures: Vamana, Virechana, Basti, Nasya & Raktamokshana.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-800 uppercase">3. Paschatkarma (Post)</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-indigo-200 text-indigo-900 rounded-full">
                {paschatCount} Sessions
              </span>
            </div>
            <p className="text-xs text-indigo-700 mt-2">
              Samsarjana Krama graduated dietetic recovery, Shamana herbs, and Rasayana vitality.
            </p>
          </div>
        </div>
      </div>

      {/* Main Charts and Upcoming Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingSessions sessions={sessions} />
        <div className="lg:col-span-2">
          <TherapyProgressChart sessions={sessions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;