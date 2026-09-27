export interface Session {
  id: string;
  therapyType: string;
  patientName: string;
  practitionerName: string;
  date: string; // yyyy-MM-dd
  time: string; // e.g. "14:00"
  progress: number; // 0-100
  stage?: "Purvakarma" | "Pradhanakarma" | "Paschatkarma";
  status?: "Scheduled" | "In-Progress" | "Completed" | "Cancelled";
  room?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  message: string;
  date: string; // ISO string
  channel: "in-app" | "sms" | "email";
  status: "sent" | "pending" | "failed";
  type: "pre-procedure" | "post-procedure";
  patientName?: string;
}

export interface Feedback {
  id: string;
  sessionId?: string;
  patientName: string;
  symptoms: string;
  severity: "Mild" | "Moderate" | "Severe";
  comments: string;
  date: string; // ISO string
  progress: number; // 0-100
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  patients: string[]; // array of patient IDs
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorId: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
  sessionId?: string;
  therapyType?: string;
  status?: "Upcoming" | "Completed" | "Cancelled";
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  doctorId: string;
  prakriti?: "Vata" | "Pitta" | "Kapha" | "Vata-Pitta" | "Pitta-Vata" | "Pitta-Kapha" | "Vata-Kapha" | "Tridoshic";
  condition?: string;
  activeTherapy?: string;
  admitDate?: string;
}

export interface patientAppointment {
  id: string;
  patientId: string;
  doctorName: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
  sessionId?: string;
  therapyType?: string;
  status?: "Upcoming" | "Completed" | "Cancelled";
}

export interface PractitionerApproval {
  id: number;
  name: string;
  specialty: string;
  email: string;
  experience: string;
  status: "Pending" | "Verified" | "Rejected";
  registrationNo: string;
}