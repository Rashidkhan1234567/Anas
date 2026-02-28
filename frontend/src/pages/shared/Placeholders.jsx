import { PagePlaceholder } from '../../components/ui/PagePlaceholder';
import { 
  Users, Activity, Settings, BrainCircuit, FileText, Calendar, CreditCard 
} from 'lucide-react';

// Admin Placeholders
export const AdminDoctorsPage = () => (
  <PagePlaceholder 
    title="Doctors Management" 
    description="Manage your clinic's doctors, view their performance, and handle onboarding." 
    icon={Users} 
  />
);

export const AdminReceptionistsPage = () => (
  <PagePlaceholder 
    title="Receptionists Management" 
    description="Manage front desk staff, permissions, and shift schedules." 
    icon={Users} 
  />
);

export const AdminActivityPage = () => (
  <PagePlaceholder 
    title="System Activity Logs" 
    description="Detailed audit logs of all actions performed within ClinicAI." 
    icon={Activity} 
  />
);

export const AdminSettingsPage = () => (
  <PagePlaceholder 
    title="Clinic Settings" 
    description="Configure clinic details, billing info, and global preferences." 
    icon={Settings} 
  />
);

// Doctor Placeholders
export const DoctorPatientsPage = () => (
  <PagePlaceholder 
    title="My Patients" 
    description="View all your assigned patients, search history, and add long-term notes." 
    icon={Users} 
  />
);

export const DoctorAIAssistPage = () => (
  <PagePlaceholder 
    title="AI Diagnostic Assistant" 
    description="Interact natively with ClinicAI for complex differential diagnosis." 
    icon={BrainCircuit} 
  />
);

export const DoctorPrescriptionsPage = () => (
  <PagePlaceholder 
    title="Prescription History" 
    description="View all prescriptions you have issued and manage active refills." 
    icon={FileText} 
  />
);

export const DoctorAnalyticsPage = () => (
  <PagePlaceholder 
    title="My Analytics" 
    description="Track your consultation times, patient satisfaction, and revenue generation." 
    icon={Activity} 
  />
);

// Receptionist Placeholders
export const ReceptionistPatientsPage = () => (
  <PagePlaceholder 
    title="Patient Directory" 
    description="Search the full patient database, update contact info, and manage records." 
    icon={Users} 
  />
);

export const ReceptionistBillingPage = () => (
  <PagePlaceholder 
    title="Billing & Invoices" 
    description="Process copays, generate invoices, and track outstanding balances." 
    icon={CreditCard} 
  />
);

// Patient Placeholders
export const PatientAppointmentsPage = () => (
  <PagePlaceholder 
    title="My Appointments" 
    description="Manage upcoming visits, reschedule, or book a new consultation." 
    icon={Calendar} 
  />
);

export const PatientPrescriptionsPage = () => (
  <PagePlaceholder 
    title="My Digital Prescriptions" 
    description="View all active medications, download PDFs, and request refills." 
    icon={FileText} 
  />
);
