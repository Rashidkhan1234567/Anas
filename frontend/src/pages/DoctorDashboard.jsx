import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Table, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { 
  Users, Calendar, Clock, BrainCircuit, FileText, CheckCircle2,
  Syringe, Activity, AlertCircle, FilePlus
} from 'lucide-react';

export function DoctorDashboard() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [rxModalOpen, setRxModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const doctorName = userInfo.name || 'Doctor';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const [appointmentsRes, profileRes] = await Promise.all([
          fetch('https://anas-ebon.vercel.app/api/doctor/appointments', { headers }),
          fetch('https://anas-ebon.vercel.app/api/doctor/profile', { headers })
        ]);

        const appointmentsData = await appointmentsRes.json();
        const profileData = await profileRes.json();

        if (Array.isArray(appointmentsData)) setAppointments(appointmentsData);
        if (profileRes.ok) setProfile(profileData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const patientHistory = [
    { date: 'Oct 12, 2023', type: 'Prescription Added', doctor: 'Dr. Smith', details: 'Amoxicillin 500mg, 3x daily for 7 days', icon: FilePlus },
    { date: 'Sep 05, 2023', type: 'Lab Test: Blood Work', doctor: 'Pathology Lab', details: 'Normal counts. Slightly elevated cholesterol.', icon: Syringe },
    { date: 'Jul 22, 2023', type: 'Initial Consultation', doctor: 'Dr. Smith', details: 'Patient reported recurring headaches and fatigue. BP was 130/85.', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome, Dr. {doctorName}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {profile?.specialization || 'Healthcare Professional'} • {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setAiModalOpen(true)} className="flex items-center gap-2">
             <BrainCircuit size={18} /> AI Diagnose Assit
          </Button>
          <Button variant="primary" onClick={() => setRxModalOpen(true)} className="flex items-center gap-2">
             <FileText size={18} /> New Rx
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <StatCard icon={Users} label="Daily Patients" value={appointments.length.toString()} />
         <StatCard icon={CheckCircle2} label="Completed" value={appointments.filter(a => a.status === 'completed').length.toString()} />
         <StatCard icon={Clock} label="Avg Wait Time" value="12 mins" />
         <StatCard icon={FileText} label="Scripts Written" value="145" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="col-span-1 shadow-sm border border-slate-100 !p-0 overflow-hidden flex flex-col">
           <div className="px-6 py-5 border-b border-slate-100 bg-white">
            <h3 className="text-lg font-semibold text-slate-800">Today's Schedule</h3>
          </div>
          <div className="flex-1 overflow-y-auto w-full">
            {loading ? (
              <div className="p-8 text-center text-slate-500 text-sm">Loading schedule...</div>
            ) : appointments.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No appointments scheduled for today.</div>
            ) : (
              <ul className="divide-y divide-slate-100 p-2">
                {appointments.map((apt) => (
                  <li key={apt._id} className="p-4 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <Badge variant={
                        apt.status === 'pending' ? 'warning' :
                        apt.status === 'confirmed' ? 'info' : 
                        apt.status === 'completed' ? 'success' : 'default'
                      }>
                        {apt.status}
                      </Badge>
                    </div>
                    <div className="font-medium text-slate-800">{apt.patientId?.name || 'Unknown Patient'}</div>
                    <div className="text-sm text-slate-500 mt-1 flex items-center gap-1.5 border-t border-slate-100 pt-2 border-dashed">
                       <AlertCircle size={14} className="text-slate-400" />
                       {apt.type || 'Consultation'}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        {/* Selected Patient View */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border border-slate-100 !p-0 overflow-hidden flex flex-col relative">
           <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border-2 border-white shadow-sm ring-1 ring-slate-100 text-lg">
                 {appointments[0]?.patientId?.name?.split(' ').map(n => n[0]).join('') || 'PJ'}
               </div>
               <div>
                 <h3 className="text-lg font-bold text-slate-800">{appointments[0]?.patientId?.name || 'Select a Patient'}</h3>
                 <p className="text-xs text-slate-500">
                   {appointments[0]?.patientId?.gender || '---'}, {appointments[0]?.patientId?.age || '--'} yrs • ID: {appointments[0]?.patientId?._id?.slice(-6).toUpperCase() || '#---'}
                 </p>
               </div>
            </div>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
             <h4 className="text-sm font-semibold text-slate-800 mb-6 uppercase tracking-wider text-slate-500">Medical Timeline</h4>
             
             <div className="relative border-l-2 border-green-100 ml-4 space-y-8 pb-4">
                {patientHistory.map((history, idx) => (
                   <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-green-500 text-green-500 flex items-center justify-center shadow-sm">
                      <history.icon size={14} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-slate-800 text-sm">{history.type}</h5>
                        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">{history.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">By {history.doctor}</p>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700 shadow-sm leading-relaxed">
                        {history.details}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </Card>
      </div>

      {/* AI Assistant Modal */}
      <Modal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} title="ClinicAI Assistant" maxWidth="max-w-2xl">
         <div className="space-y-4">
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-sm flex gap-3 border border-green-100">
               <BrainCircuit size={20} className="flex-shrink-0 text-green-600 mt-0.5" />
               <p>Enter patient symptoms, vitals, or history. The AI will provide a list of differential diagnoses based on latest medical guidelines.</p>
            </div>
            <textarea 
               rows={4}
               className="w-full rounded-xl border border-slate-200 p-4 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 pt-3"
               placeholder="Patient complains of frontal headache, nausea, and photophobia for 2 days. BP 120/80..."
            ></textarea>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
               <Button variant="ghost" onClick={() => setAiModalOpen(false)}>Cancel</Button>
               <Button variant="primary" className="flex items-center gap-2">Generate Diagnosis <BrainCircuit size={16} /></Button>
            </div>
         </div>
      </Modal>

      {/* Write Prescription Modal */}
      <Modal isOpen={rxModalOpen} onClose={() => setRxModalOpen(false)} title={`New Prescription - ${appointments[0]?.patientId?.name || 'Patient'}`} maxWidth="max-w-3xl">
         <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <Input label="Diagnosis / Chief Complaint" placeholder="Migraine with aura" />
               <Input label="Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            
            <div>
               <div className="flex justify-between items-center mb-2">
                 <label className="block text-sm font-medium text-slate-700">Medications</label>
                 <Button variant="outline" size="sm" className="h-8 text-xs py-0">+ Add Med</Button>
               </div>
               
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4 items-end">
                  <div className="flex-1"><Input label="Drug Name & Strength" placeholder="Sumatriptan 50mg" /></div>
                  <div className="w-1/4"><Input label="Dosage" placeholder="1 tab" /></div>
                  <div className="w-1/4"><Input label="Frequency" placeholder="PRN" /></div>
                  <div className="w-1/4"><Input label="Duration" placeholder="5 days" /></div>
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
               <Button variant="ghost" onClick={() => setRxModalOpen(false)}>Discard</Button>
               <Button variant="secondary">Save Draft</Button>
               <Button variant="primary" className="flex items-center gap-2 bg-slate-900 border-slate-900 text-white hover:bg-slate-800">
                 <FileText size={16} /> Generate PDF Rx
               </Button>
            </div>
         </div>
      </Modal>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="shadow-sm border border-slate-100 pl-6 py-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
        </div>
      </div>
    </Card>
  );
}
