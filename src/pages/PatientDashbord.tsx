import React, { useState, useEffect } from "react";
import { Patient, Session,  patientAppointment } from "../types";
import { format, parseISO } from "date-fns";

interface PatientDashboardPageProps {
  patientId: string;
}

const dummyPatient: Patient = {
  id: "p1",
  name: "Ravi Kumar",
  age: 35,
  gender: "Male",
  doctorId: "doc1",
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
    id: "s3",
    therapyType: "Pizhichil",
    patientName: "Ravi Kumar",
    practitionerName: "Dr. Meena",
    date: new Date(new Date().getTime() + 2 * 86400000).toISOString().slice(0, 10), // 2 days later
    time: "11:00",
    progress: 20,
  },
];

const dummyAppointments: patientAppointment[] = [
  {
    id: "a1",
    patientId: "p1",
    doctorName: "Dr. Meena",
    date: new Date().toISOString().slice(0, 10),
    time: "10:00",
    sessionId: "s1",
  },
  {
    id: "a3",
    patientId: "p1",
    doctorName: "Dr. Meena",
    date: new Date(new Date().getTime() + 2 * 86400000).toISOString().slice(0, 10),
    time: "11:00",
    sessionId: "s3",
  },
];

const PatientDashboardPage: React.FC<PatientDashboardPageProps> = ({ patientId }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [appointments, setAppointments] = useState<patientAppointment[]>([]);

  useEffect(() => {
    // Simulate fetching data
    if (patientId === dummyPatient.id) {
      setPatient(dummyPatient);
      setSessions(dummySessions);
      setAppointments(dummyAppointments);
    }
  }, [patientId]);

  if (!patient) return <p>Loading patient data...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>

      <section className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-indigo-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Patient</h2>
          <p className="text-xl font-bold">{patient.name}</p>
          <p className="text-gray-700">Age: {patient.age}</p>
          <p className="text-gray-700">Gender: {patient.gender}</p>
        </div>

        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Sessions Attended</h2>
          <p className="text-3xl font-bold">{sessions.length}</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
          <p className="text-3xl font-bold">{appointments.length}</p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sessions</h2>
        {sessions.length === 0 ? (
          <p>No sessions found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <li key={session.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{session.therapyType}</p>
                  <p className="text-sm text-gray-600">
                    Practitioner: {session.practitionerName} | Date: {format(parseISO(session.date), "MMM d, yyyy")} | Time: {session.time}
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
                  <p className="font-medium">Doctor: {appt.doctorName}</p>
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

export default PatientDashboardPage;