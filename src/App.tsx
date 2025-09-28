import DashboardPage from "./pages/DashboardPage";
import TherapySchedulingPage from "./pages/TherapySchedulingPage";
import NotificationsPage from "./pages/NotificationsPage";
import FeedbackPage from "./pages/FeedbackPage";
import Layout from "./components/Layout/Layout";
import DoctorDashboardPage from "./pages/DoctorDashbordPage";
import PatientDashboardPage from "./pages/PatientDashbord";
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./pages/AdminDashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/doctor-dashboard" element={<DoctorDashboardPage doctorId="doc1" />} />
          <Route path="/patient-dashboard" element={<PatientDashboardPage patientId="p1" />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/therapy-scheduling" element={<TherapySchedulingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;