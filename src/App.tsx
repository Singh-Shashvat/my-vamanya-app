import DashboardPage from "./pages/DashboardPage";
import TherapySchedulingPage from "./pages/TherapySchedulingPage";
import NotificationsPage from "./pages/NotificationsPage";
import FeedbackPage from "./pages/FeedbackPage";
import Layout from "./components/Layout/Layout";
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/therapy-scheduling" element={<TherapySchedulingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;