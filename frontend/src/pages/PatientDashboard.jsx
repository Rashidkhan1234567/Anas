import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Table, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { 
  Calendar as CalendarIcon, FileText, Download, Activity,
  BrainCircuit, ShieldCheck, Mail, Phone, MapPin
} from 'lucide-react';

export function PatientDashboard() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const [profileRes, appointmentsRes, prescriptionsRes] = await Promise.all([
          fetch('http://localhost:5000/api/patient/profile', { headers }),
          fetch('http://localhost:5000/api/patient/appointments', { headers }),
          fetch('http://localhost:5000/api/patient/prescriptions', { headers })
        ]);

        const profileData = await profileRes.json();
        const appointmentsData = await appointmentsRes.json();
        const prescriptionsData = await prescriptionsRes.json();

        if (profileRes.ok) setProfile(profileData);
        if (appointmentsRes.ok) setAppointments(appointmentsData);
        if (prescriptionsRes.ok) setPrescriptions(prescriptionsData);

      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadRx = async (rxId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/patient/prescriptions/${rxId}/download`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prescription-${rxId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Failed to download prescription');
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your health portal...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Health Portal</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your appointments, records, and prescriptions.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
           <CalendarIcon size={18} /> Book New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1 shadow-sm border border-slate-100 flex flex-col h-full">
           <div className="text-center pb-6 border-b border-slate-100">
             <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-md">
               {profile?.name?.split(' ').map(n => n[0]).join('') || 'PJ'}
             </div>
             <h2 className="text-xl font-bold text-slate-800">{profile?.name || 'Patient'}</h2>
             <p className="text-sm text-slate-500 mt-1">Patient ID: {profile?._id?.slice(-6).toUpperCase() || '#---'} • {profile?.gender || '---'}, {profile?.age || '--'} yrs</p>
             <div className="mt-4 flex justify-center gap-2">
               <Badge variant={profile?.insuranceStatus === 'Active' ? 'success' : 'warning'} className="px-3 py-1 flex items-center gap-1">
                 <ShieldCheck size={14} /> Insurance: {profile?.insuranceStatus || 'None'}
               </Badge>
             </div>
           </div>
           
           <div className="pt-6 space-y-4 flex-1">
             <div className="flex items-center gap-3 text-sm text-slate-600">
               <Mail size={16} className="text-slate-400" /> {JSON.parse(localStorage.getItem('userInfo') || '{}').email || 'No email'}
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600">
               <Phone size={16} className="text-slate-400" /> {profile?.contact || 'No contact'}
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600">
               <MapPin size={16} className="text-slate-400" /> {profile?.address || '742 Evergreen Terrace, Springfield'}
             </div>
             {profile?.bloodGroup && (
               <div className="flex items-center gap-3 text-sm text-slate-600">
                 <Activity size={16} className="text-slate-400" /> Blood Group: <span className="font-bold text-red-500">{profile.bloodGroup}</span>
               </div>
             )}
           </div>
        </Card>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* AI Explanation Banner */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 shadow-sm relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
               <BrainCircuit size={120} className="text-green-500" />
             </div>
             <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <BrainCircuit size={20} className="text-green-500" /> 
                    Understand Your Health Better
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-md">Our specialized AI can explain your recent diagnosis or lab results in simple, plain language.</p>
                </div>
                <Button 
                variant="outline" 
                className="bg-white border-green-200 text-green-700 hover:bg-green-50 whitespace-nowrap"
                onClick={() => setAiModalOpen(true)}
               >
                 Ask AI Assistant
               </Button>
             </div>
          </Card>

          {/* Appointments Table */}
          <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-white">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <CalendarIcon size={18} className="text-slate-400" /> Appointment History
              </h3>
            </div>
            {appointments.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No appointment history found.</div>
            ) : (
              <Table headers={['Date', 'Doctor', 'Status']}>
                {appointments.map((apt) => (
                  <TableRow key={apt._id}>
                    <TableCell className="font-medium text-slate-900">{new Date(apt.date).toLocaleDateString()}</TableCell>
                    <TableCell>{apt.doctorId?.name || 'General Doctor'}</TableCell>
                    <TableCell>
                      <Badge variant={apt.status === 'completed' ? 'success' : apt.status === 'pending' ? 'warning' : 'info'}>
                        {apt.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            )}
          </Card>

          {/* Prescriptions Table */}
          <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-white">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <FileText size={18} className="text-slate-400" /> Digital Prescriptions
              </h3>
            </div>
            {prescriptions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No prescriptions found.</div>
            ) : (
              <Table headers={['Date', 'Prescribed By', 'Action']}>
                {prescriptions.map((rx) => (
                  <TableRow key={rx._id}>
                    <TableCell className="font-medium text-slate-900">{new Date(rx.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{rx.doctorId?.name || 'Doctor'}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 flex items-center gap-1.5 h-8 px-3"
                        onClick={() => handleDownloadRx(rx._id)}
                      >
                        <Download size={14} /> Download PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            )}
          </Card>
        </div>
      </div>

      {/* AI Explanation Modal */}
      <Modal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} title="ClinicAI Patient Assistant">
         <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 mb-6 flex gap-3">
               <Activity size={20} className="text-slate-400 flex-shrink-0" />
               <p>I am an AI assistant designed to help you understand your medical reports. Please note, I do NOT provide medical advice. Always consult your doctor before acting on this information.</p>
            </div>
            
            <div className="w-full">
               <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">What would you like me to explain?</label>
               <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 mb-4">
                  <option>Recent Diagnosis: Migraine</option>
                  <option>Lab Result: Complete Blood Count</option>
                  <option>Prescription: Amoxicillin</option>
               </select>
            </div>

            <div className="bg-white border-2 border-green-50 rounded-xl p-5 shadow-inner">
               <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                 <BrainCircuit size={18} className="text-green-500" /> AI Explanation
               </h4>
               <p className="text-sm text-slate-600 leading-relaxed">
                 Migraine is a type of headache characterized by severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. 
               </p>
            </div>

            <div className="flex justify-end pt-4">
               <Button variant="primary" onClick={() => setAiModalOpen(false)}>Understood</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
}
