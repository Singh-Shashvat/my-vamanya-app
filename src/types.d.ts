export interface Session {
  id: string;
  therapyType: string;
  patientName: string;
  practitionerName: string;
  date: string; // ISO string
  time: string; // e.g. "14:00"
  progress: number; // 0-100
}
export interface Notification {
  id: string;
  message: string;
  date: string; // ISO string
  channel: "in-app" | "sms" | "email";
  status: "sent" | "pending" | "failed";
  type: "pre-procedure" | "post-procedure";
}
export interface Feedback {
  id: string;
  sessionId: string;
  symptoms: string;
  severity: "Mild" | "Moderate" | "Severe";
  comments: string;
  date: string; // ISO string
}

// src/types.ts (additions)

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  patients: string[]; // array of patient IDs
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorId: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
  sessionId?: string; // optional link to session
}

// src/types.ts (additions)

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  doctorId: string;
}

export interface patientAppointment {
  id: string;
  patientId: string;
  doctorName: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
  sessionId?: string;
}