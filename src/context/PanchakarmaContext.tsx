import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Session,
  Notification,
  Feedback,
  Doctor,
  Appointment,
  Patient,
  PractitionerApproval,
} from "../types.d";

const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Meena Sharma",
    specialty: "Senior Panchakarma Physician",
    qualification: "BAMS, MD (Panchakarma, NIA Jaipur)",
    experience: "14 Years",
    patients: ["p1", "p2", "p3"],
  },
  {
    id: "doc2",
    name: "Dr. Rajesh Varma",
    specialty: "Vaidya & Kayachikitsa Specialist",
    qualification: "BAMS, MD (Ayurveda, BHU)",
    experience: "18 Years",
    patients: ["p4"],
  },
  {
    id: "doc3",
    name: "Dr. Priya Nair",
    specialty: "Ayurvedic Detox & Rejuvenation Expert",
    qualification: "BAMS, MS (Ayur), Kerala Ayurveda Academy",
    experience: "9 Years",
    patients: [],
  },
];

const DEFAULT_PATIENTS: Patient[] = [
  {
    id: "p1",
    name: "Ravi Kumar",
    age: 35,
    gender: "Male",
    doctorId: "doc1",
    prakriti: "Kapha",
    condition: "Chronic Bronchial Asthma & Kapha Vikriti",
    activeTherapy: "Vamana Karma (Therapeutic Emesis)",
    admitDate: "2026-09-20",
  },
  {
    id: "p2",
    name: "Anita Sharma",
    age: 42,
    gender: "Female",
    doctorId: "doc1",
    prakriti: "Pitta-Vata",
    condition: "Migraine & Chronic Insomnia",
    activeTherapy: "Shirodhara & Nasya Karma",
    admitDate: "2026-09-22",
  },
  {
    id: "p3",
    name: "Sunil Joshi",
    age: 51,
    gender: "Male",
    doctorId: "doc1",
    prakriti: "Vata",
    condition: "Osteoarthritis & Lumbar Spondylosis",
    activeTherapy: "Kati Basti & Abhyanga",
    admitDate: "2026-09-24",
  },
  {
    id: "p4",
    name: "Meera Patel",
    age: 29,
    gender: "Female",
    doctorId: "doc2",
    prakriti: "Pitta",
    condition: "Psoriasis & Liver Heat Disbalance",
    activeTherapy: "Virechana Karma (Purgation)",
    admitDate: "2026-09-25",
  },
];

const todayStr = new Date().toISOString().slice(0, 10);
const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

const DEFAULT_SESSIONS: Session[] = [
  {
    id: "s1",
    therapyType: "Vamana Karma (Therapeutic Emesis)",
    patientName: "Ravi Kumar",
    practitionerName: "Dr. Meena Sharma",
    date: todayStr,
    time: "08:30",
    progress: 75,
    stage: "Pradhanakarma",
    status: "In-Progress",
    room: "Kuti-101 (Panchakarma Hall)",
    notes: "Snehapana completed. Madanaphala Yoga administered. Monitoring Vega count.",
  },
  {
    id: "s2",
    therapyType: "Abhyanga Massage & Swedana",
    patientName: "Ravi Kumar",
    practitionerName: "Dr. Meena Sharma",
    date: getRelativeDate(1),
    time: "10:00",
    progress: 100,
    stage: "Purvakarma",
    status: "Scheduled",
    room: "Therapy Room 3",
    notes: "Medicated Dhanwantharam Taila application followed by steam chamber.",
  },
  {
    id: "s3",
    therapyType: "Shirodhara (Takradhara)",
    patientName: "Anita Sharma",
    practitionerName: "Dr. Meena Sharma",
    date: todayStr,
    time: "14:00",
    progress: 60,
    stage: "Pradhanakarma",
    status: "Scheduled",
    room: "Dhara Room 2",
    notes: "Continuous medicated buttermilk stream over forehead for Vata-Pitta pacification.",
  },
  {
    id: "s4",
    therapyType: "Pizhichil (Oil Bath)",
    patientName: "Sunil Joshi",
    practitionerName: "Dr. Meena Sharma",
    date: getRelativeDate(2),
    time: "09:00",
    progress: 30,
    stage: "Pradhanakarma",
    status: "Scheduled",
    room: "Therapy Room 1",
    notes: "Warm herbal oil bath for joint stiffness and Vata vyadhi relief.",
  },
  {
    id: "s5",
    therapyType: "Virechana Karma",
    patientName: "Meera Patel",
    practitionerName: "Dr. Rajesh Varma",
    date: getRelativeDate(3),
    time: "09:30",
    progress: 15,
    stage: "Pradhanakarma",
    status: "Scheduled",
    room: "Kuti-102",
    notes: "Purvakarma diet initiated; scheduled for therapeutic purgation.",
  },
  {
    id: "s6",
    therapyType: "Nasya Karma",
    patientName: "Anita Sharma",
    practitionerName: "Dr. Meena Sharma",
    date: getRelativeDate(4),
    time: "11:30",
    progress: 0,
    stage: "Paschatkarma",
    status: "Scheduled",
    room: "ENT/Nasya Cabin",
    notes: "Anu Taila nasal drops for deep sinus cleansing.",
  },
];

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    patientName: "Ravi Kumar",
    doctorId: "doc1",
    date: todayStr,
    time: "08:00",
    sessionId: "s1",
    therapyType: "Vamana Karma Assessment",
    status: "Upcoming",
  },
  {
    id: "a2",
    patientName: "Anita Sharma",
    doctorId: "doc1",
    date: todayStr,
    time: "13:30",
    sessionId: "s3",
    therapyType: "Shirodhara Pre-Check",
    status: "Upcoming",
  },
  {
    id: "a3",
    patientName: "Sunil Joshi",
    doctorId: "doc1",
    date: getRelativeDate(2),
    time: "08:30",
    sessionId: "s4",
    therapyType: "Joint Assessment & Pizhichil Prep",
    status: "Upcoming",
  },
  {
    id: "a4",
    patientName: "Meera Patel",
    doctorId: "doc2",
    date: getRelativeDate(3),
    time: "09:00",
    sessionId: "s5",
    therapyType: "Virechana Protocol Review",
    status: "Upcoming",
  },
];

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    patientName: "Ravi Kumar",
    message: "Critical Purvakarma Alert: Please ensure 12 hours absolute fasting prior to today's Vamana session. Sip only lukewarm ginger water if thirsty.",
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    channel: "in-app",
    status: "sent",
    type: "pre-procedure",
  },
  {
    id: "n2",
    patientName: "Ravi Kumar",
    message: "SMS sent: Your Vamana Karma procedure starts at 08:30 AM in Kuti-101. Please report in comfortable cotton clothes.",
    date: new Date(Date.now() - 3600000 * 12).toISOString(),
    channel: "sms",
    status: "sent",
    type: "pre-procedure",
  },
  {
    id: "n3",
    patientName: "Anita Sharma",
    message: "Post-Procedure Shirodhara Care: Avoid direct exposure to cold air/AC, rest for 60 minutes, and wash hair with warm water and shikakai in the evening.",
    date: new Date(Date.now() - 3600000 * 20).toISOString(),
    channel: "email",
    status: "sent",
    type: "post-procedure",
  },
  {
    id: "n4",
    patientName: "Sunil Joshi",
    message: "Purvakarma Preparation: Begin taking medicated Ghritha (20ml) with warm water tomorrow at 6:00 AM as prescribed.",
    date: new Date(Date.now() - 86400000).toISOString(),
    channel: "in-app",
    status: "sent",
    type: "pre-procedure",
  },
  {
    id: "n5",
    patientName: "Meera Patel",
    message: "SMS Notification queued: Reminder for Purvakarma light diet (Kitchari/Mung Soup) before Virechana.",
    date: new Date(Date.now() - 7200000).toISOString(),
    channel: "sms",
    status: "pending",
    type: "pre-procedure",
  },
];

const DEFAULT_FEEDBACKS: Feedback[] = [
  {
    id: "f1",
    patientName: "Ravi Kumar",
    symptoms: "Mild throat dryness & heaviness relieved",
    severity: "Mild",
    comments: "After Snehapana and initial steam, breathing felt noticeably clearer. Minimal fatigue.",
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    progress: 35,
  },
  {
    id: "f2",
    patientName: "Ravi Kumar",
    symptoms: "Temporary fatigue after Swedana",
    severity: "Moderate",
    comments: "Sweating therapy was intense but alleviated stiffness. Rested well after warm herbal broth.",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    progress: 55,
  },
  {
    id: "f3",
    patientName: "Ravi Kumar",
    symptoms: "Clear airway, light stomach, calm mind",
    severity: "Mild",
    comments: "Current Vamana procedure went smoothly under Dr. Meena's supervision. Phlegm cleared.",
    date: new Date().toISOString(),
    progress: 75,
  },
  {
    id: "f4",
    patientName: "Anita Sharma",
    symptoms: "Headache reduced significantly, improved sleep depth",
    severity: "Mild",
    comments: "Takradhara therapy gave tremendous relaxation. Stress symptoms decreased by 70%.",
    date: new Date(Date.now() - 86400000).toISOString(),
    progress: 80,
  },
];

const DEFAULT_PRACTITIONERS: PractitionerApproval[] = [
  {
    id: 1,
    name: "Dr. Anand Sharma",
    specialty: "Panchakarma & Marma Chikitsa",
    email: "anand.sharma@ayursutra.gov.in",
    experience: "11 Years",
    status: "Verified",
    registrationNo: "AYUSH-IN-2015-8942",
  },
  {
    id: 2,
    name: "Dr. Bharati Kumar",
    specialty: "Nadi Pariksha & Kayachikitsa",
    email: "bharati.k@ayursutra.gov.in",
    experience: "7 Years",
    status: "Verified",
    registrationNo: "AYUSH-IN-2019-3312",
  },
  {
    id: 3,
    name: "Dr. Chandresh Singh",
    specialty: "Dravyaguna & Panchakarma Detox",
    email: "chandresh.singh@ayurveda.org",
    experience: "5 Years",
    status: "Pending",
    registrationNo: "AYUSH-UP-2021-9921",
  },
  {
    id: 4,
    name: "Dr. Shalini Deshmukh",
    specialty: "Stri Roga & Prasuti Tantra (Ayur)",
    email: "shalini.d@ayurclinics.in",
    experience: "8 Years",
    status: "Pending",
    registrationNo: "AYUSH-MH-2018-7740",
  },
];

export interface PanchakarmaContextType {
  doctors: Doctor[];
  patients: Patient[];
  sessions: Session[];
  appointments: Appointment[];
  notifications: Notification[];
  feedbacks: Feedback[];
  practitioners: PractitionerApproval[];
  activeRole: "doctor" | "patient" | "admin";
  selectedDoctorId: string;
  selectedPatientId: string;
  notificationChannels: { "in-app": boolean; sms: boolean; email: boolean };
  setActiveRole: (role: "doctor" | "patient" | "admin") => void;
  setSelectedDoctorId: (id: string) => void;
  setSelectedPatientId: (id: string) => void;
  addSession: (session: Omit<Session, "id">) => void;
  updateSession: (session: Session) => void;
  deleteSession: (id: string) => void;
  updateSessionProgress: (id: string, progress: number, notes?: string) => void;
  addFeedback: (data: Omit<Feedback, "id" | "date">) => void;
  sendNotification: (data: Omit<Notification, "id" | "date" | "status">) => void;
  setNotificationChannels: React.Dispatch<React.SetStateAction<{ "in-app": boolean; sms: boolean; email: boolean }>>;
  updatePractitionerStatus: (id: number, status: "Verified" | "Rejected") => void;
  resetAllData: () => void;
}

const PanchakarmaContext = createContext<PanchakarmaContextType | undefined>(undefined);

export const PanchakarmaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(DEFAULT_DOCTORS);
  const [patients] = useState<Patient[]>(DEFAULT_PATIENTS);

  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem("vamanya_sessions");
    return saved ? JSON.parse(saved) : DEFAULT_SESSIONS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("vamanya_appointments");
    return saved ? JSON.parse(saved) : DEFAULT_APPOINTMENTS;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("vamanya_notifications");
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const saved = localStorage.getItem("vamanya_feedbacks");
    return saved ? JSON.parse(saved) : DEFAULT_FEEDBACKS;
  });

  const [practitioners, setPractitioners] = useState<PractitionerApproval[]>(() => {
    const saved = localStorage.getItem("vamanya_practitioners");
    return saved ? JSON.parse(saved) : DEFAULT_PRACTITIONERS;
  });

  const [activeRole, setActiveRole] = useState<"doctor" | "patient" | "admin">("doctor");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("doc1");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("p1");

  const [notificationChannels, setNotificationChannels] = useState({
    "in-app": true,
    sms: true,
    email: true,
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem("vamanya_sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("vamanya_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("vamanya_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("vamanya_feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem("vamanya_practitioners", JSON.stringify(practitioners));
  }, [practitioners]);

  const addSession = (sessionData: Omit<Session, "id">) => {
    const newSession: Session = {
      ...sessionData,
      id: "s_" + Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);

    // Also automatically create an appointment if future date
    const newAppt: Appointment = {
      id: "a_" + Date.now(),
      patientName: newSession.patientName,
      doctorId: selectedDoctorId,
      date: newSession.date,
      time: newSession.time,
      sessionId: newSession.id,
      therapyType: newSession.therapyType,
      status: "Upcoming",
    };
    setAppointments((prev) => [newAppt, ...prev]);

    // Send pre-procedure notification
    sendNotification({
      patientName: newSession.patientName,
      message: `Automated Panchakarma Alert: Your ${newSession.therapyType} session has been scheduled for ${newSession.date} at ${newSession.time}. Please adhere to Purvakarma instructions.`,
      channel: "in-app",
      type: "pre-procedure",
    });
  };

  const updateSession = (updated: Session) => {
    setSessions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setAppointments((prev) => prev.filter((a) => a.sessionId !== id));
  };

  const updateSessionProgress = (id: string, progress: number, notes?: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = progress >= 100 ? "Completed" : progress > 0 ? "In-Progress" : "Scheduled";
          return {
            ...s,
            progress,
            status: newStatus,
            notes: notes !== undefined ? notes : s.notes,
          };
        }
        return s;
      })
    );
  };

  const addFeedback = (data: Omit<Feedback, "id" | "date">) => {
    const newFeedback: Feedback = {
      ...data,
      id: "f_" + Date.now(),
      date: new Date().toISOString(),
    };
    setFeedbacks((prev) => [...prev, newFeedback]);
  };

  const sendNotification = (data: Omit<Notification, "id" | "date" | "status">) => {
    const newNotif: Notification = {
      ...data,
      id: "n_" + Date.now(),
      date: new Date().toISOString(),
      status: "sent",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updatePractitionerStatus = (id: number, status: "Verified" | "Rejected") => {
    setPractitioners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const resetAllData = () => {
    localStorage.removeItem("vamanya_sessions");
    localStorage.removeItem("vamanya_appointments");
    localStorage.removeItem("vamanya_notifications");
    localStorage.removeItem("vamanya_feedbacks");
    localStorage.removeItem("vamanya_practitioners");
    setSessions(DEFAULT_SESSIONS);
    setAppointments(DEFAULT_APPOINTMENTS);
    setNotifications(DEFAULT_NOTIFICATIONS);
    setFeedbacks(DEFAULT_FEEDBACKS);
    setPractitioners(DEFAULT_PRACTITIONERS);
  };

  return (
    <PanchakarmaContext.Provider
      value={{
        doctors,
        patients,
        sessions,
        appointments,
        notifications,
        feedbacks,
        practitioners,
        activeRole,
        selectedDoctorId,
        selectedPatientId,
        notificationChannels,
        setActiveRole,
        setSelectedDoctorId,
        setSelectedPatientId,
        addSession,
        updateSession,
        deleteSession,
        updateSessionProgress,
        addFeedback,
        sendNotification,
        setNotificationChannels,
        updatePractitionerStatus,
        resetAllData,
      }}
    >
      {children}
    </PanchakarmaContext.Provider>
  );
};

export const usePanchakarma = () => {
  const context = useContext(PanchakarmaContext);
  if (!context) {
    throw new Error("usePanchakarma must be used within a PanchakarmaProvider");
  }
  return context;
};
