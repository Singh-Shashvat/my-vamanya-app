import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import TherapySchedulingPage from "./pages/TherapySchedulingPage";
import NotificationsPage from "./pages/NotificationsPage";
import FeedbackPage from "./pages/FeedbackPage";
import DoctorDashboardPage from "./pages/DoctorDashbordPage";
import PatientDashboardPage from "./pages/PatientDashbord";
import AdminDashboard from "./pages/AdminDashboard";
import { PanchakarmaProvider } from "./context/PanchakarmaContext";

const App: React.FC = () => {
  return (
    <PanchakarmaProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
            <Route path="/patient-dashboard" element={<PatientDashboardPage />} />
            <Route path="/therapy-scheduling" element={<TherapySchedulingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route
              path="*"
              element={
                <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">404 - Page Not Found</h2>
                  <p className="text-gray-500 mt-2">The requested Panchakarma clinical page does not exist.</p>
                </div>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </PanchakarmaProvider>
  );
};

export default App;