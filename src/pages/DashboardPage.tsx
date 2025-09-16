import React from "react";
import SummaryCard from "../components/Dashboard/SummaryCard";
import UpcomingSessions from "../components/Dashboard/UpcomingSessions";
import TherapyProgressChart from "../components/Dashboard/TherapyProgressChart";
import { Session } from "../types";
import { CiBellOn , CiCalendar } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
// Dummy data for demo
const dummySessions: Session[] = [
  {
    id: "1",
    therapyType: "Abhyanga Massage",
    patientName: "Ravi Kumar",
    practitionerName: "Dr. Meena",
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: "10:00",
    progress: 40,
  },
  {
    id: "2",
    therapyType: "Shirodhara",
    patientName: "Anita Sharma",
    practitionerName: "Dr. Raj",
    date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    time: "14:00",
    progress: 70,
  },
  {
    id: "3",
    therapyType: "Pizhichil",
    patientName: "Sunil Joshi",
    practitionerName: "Dr. Meena",
    date: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    time: "09:00",
    progress: 20,
  },
];
const DashboardPage: React.FC = () => {
 
  const totalSessions = dummySessions.length;
  const uniquePatients = new Set(dummySessions.map((s) => s.patientName)).size;
  const notificationsCount = 5; 
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard
          title="Upcoming Sessions"
          value={totalSessions}
          icon={<CiCalendar className="w-8 h-8" />}
        />
        <SummaryCard
          title="Active Patients"
          value={uniquePatients}
          icon={<FaUserGroup className="w-8 h-8" />}
        />
        <SummaryCard
          title="Notifications"
          value={notificationsCount}
          icon={<CiBellOn className="w-8 h-8" />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingSessions sessions={dummySessions} />
        <div className="lg:col-span-2">
          <TherapyProgressChart sessions={dummySessions} />
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;