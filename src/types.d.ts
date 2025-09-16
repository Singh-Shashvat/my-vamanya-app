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