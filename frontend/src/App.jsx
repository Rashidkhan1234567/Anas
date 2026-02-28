import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { ReceptionistDashboard } from './pages/ReceptionistDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { AdminDoctorsPage } from './pages/admin/AdminDoctorsPage';
import { AdminReceptionistsPage } from './pages/admin/AdminReceptionistsPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

import { DoctorPatientsPage } from './pages/doctor/DoctorPatientsPage';
import { DoctorAIAssistPage } from './pages/doctor/DoctorAIAssistPage';
import { DoctorPrescriptionsPage } from './pages/doctor/DoctorPrescriptionsPage';
import { DoctorAnalyticsPage } from './pages/doctor/DoctorAnalyticsPage';

import { ReceptionistPatientsPage } from './pages/receptionist/ReceptionistPatientsPage';
import { ReceptionistBillingPage } from './pages/receptionist/ReceptionistBillingPage';

import { PatientAppointmentsPage } from './pages/patient/PatientAppointmentsPage';
import { PatientPrescriptionsPage } from './pages/patient/PatientPrescriptionsPage';

import { UserProfilePage } from './pages/shared/UserProfilePage';
import { UserNotificationsPage } from './pages/shared/UserNotificationsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Dashboard Routes (Simulated Roles for Demo) */}
        
        {/* Admin Routes */}
        <Route path="/dashboard" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctorsPage />} />
          <Route path="receptionists" element={<AdminReceptionistsPage />} />
          <Route path="activity" element={<AdminActivityPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
        </Route>
        
        {/* Doctor Routes */}
        <Route path="/dashboard/doctor" element={<DashboardLayout role="doctor" />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="patients" element={<DoctorPatientsPage />} />
          <Route path="ai-assist" element={<DoctorAIAssistPage />} />
          <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
          <Route path="analytics" element={<DoctorAnalyticsPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
        </Route>
        
        {/* Receptionist Routes */}
        <Route path="/dashboard/receptionist" element={<DashboardLayout role="receptionist" />}>
          <Route index element={<ReceptionistDashboard />} />
          <Route path="patients" element={<ReceptionistPatientsPage />} />
          <Route path="billing" element={<ReceptionistBillingPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
        </Route>
        
        {/* Patient Routes */}
        <Route path="/dashboard/patient" element={<DashboardLayout role="patient" />}>
          <Route index element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointmentsPage />} />
          <Route path="prescriptions" element={<PatientPrescriptionsPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
