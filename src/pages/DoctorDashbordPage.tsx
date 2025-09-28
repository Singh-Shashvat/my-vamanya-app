import React, { useState, useEffect } from "react";
import { Doctor, Session, Appointment } from "@/types.d";
import { format, parseISO } from "date-fns";

interface DoctorDashboardPageProps {
  doctorId: string;
}

const dummyDoctor: Doctor = {
  id: "doc1",
  name: "Dr. Meena",
  specialty: "Ayurveda Specialist",
  patients: ["p1", "p2", "p3"],
};

const dummySessions: Session[] = [
  {
    id: "s1",
    therapyType: "Abhyanga Massage",
    patientName: "Ravi Kumar",
    practitionerName: "Dr. Meena",
    date: new Date().toISOString().slice(0, 10),
    time: "10:00",
    progress: 40,
  },
  {
    id: "s2",
    therapyType: "Shirodhara",
    patientName: "Anita Singh",
    practitionerName: "Dr. Meena",
    date: new Date().toISOString().slice(0, 10),
    time: "14:00",
    progress: 60,
  },
];

const dummyAppointments: Appointment[] = [
  {
    id: "a1",
    patientName: "Ravi Kumar",
    doctorId: "doc1",
    date: new Date().toISOString().slice(0, 10),
    time: "10:00",
    sessionId: "s1",
  },
  {
    id: "a2",
    patientName: "Anita Singh",
    doctorId: "doc1",
    date: new Date().toISOString().slice(0, 10),
    time: "14:00",
    sessionId: "s2",
  },
];

const DoctorDashboardPage: React.FC<DoctorDashboardPageProps> = ({ doctorId }) => {
  // In real app, fetch doctor, sessions, appointments from API by doctorId
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Simulate fetching data
    if (doctorId === dummyDoctor.id) {
      setDoctor(dummyDoctor);
      setSessions(dummySessions);
      setAppointments(dummyAppointments);
    }
  }, [doctorId]);

  if (!doctor) return <p>Loading doctor data...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>

      <section className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-indigo-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Doctor</h2>
          <p className="text-xl font-bold">{doctor.name}</p>
          <p className="text-gray-700">{doctor.specialty}</p>
        </div>

        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Patients</h2>
          <p className="text-3xl font-bold">{doctor.patients.length}</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Upcoming Sessions</h2>
          <p className="text-3xl font-bold">{sessions.length}</p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sessions</h2>
        {sessions.length === 0 ? (
          <p>No sessions scheduled.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <li key={session.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{session.therapyType}</p>
                  <p className="text-sm text-gray-600">
                    Patient: {session.patientName} | Date: {format(parseISO(session.date), "MMM d, yyyy")} | Time: {session.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Progress: {session.progress}%</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>
        {appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appt) => (
              <li key={appt.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Patient: {appt.patientName}</p>
                  <p className="text-sm text-gray-600">
                    Date: {format(parseISO(appt.date), "MMM d, yyyy")} | Time: {appt.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DoctorDashboardPage;