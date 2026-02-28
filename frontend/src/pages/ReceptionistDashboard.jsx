import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Table, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { 
  Users, UserPlus, Calendar as CalendarIcon, Phone,
  Search, MoreVertical, Edit2
} from 'lucide-react';

export function ReceptionistDashboard() {
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [bookAptOpen, setBookAptOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState({ name: '', age: '', gender: '', contact: '', email: '', password: '' });
  const [appointmentData, setAppointmentData] = useState({ patientId: '', doctorId: '', date: '', time: '' });
  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchSchedule();
    fetchDoctors();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/receptionist/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/receptionist/schedule', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) setSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/admin/users?role=Doctor', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/receptionist/patients', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        alert('Patient registered successfully!');
        setNewPatientOpen(false);
        setPatientData({ name: '', age: '', gender: '', contact: '', email: '', password: '' });
      } else {
        const error = await response.json();
        alert(error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Combine date and time
      const dateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
      
      const response = await fetch('https://anas-ebon.vercel.app/api/receptionist/appointments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          patientId: appointmentData.patientId,
          doctorId: appointmentData.doctorId,
          date: dateTime.toISOString()
        }),
      });

      if (response.ok) {
        alert('Appointment booked successfully!');
        setBookAptOpen(false);
        fetchSchedule();
        setAppointmentData({ patientId: '', doctorId: '', date: '', time: '' });
      } else {
        const error = await response.json();
        alert(error.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome, {profile?.name || 'Receptionist'}</h1>
          <p className="text-sm text-slate-500 mt-1">Manage today's appointments and clinic flow. (ID: {profile?.employeeId || '---'})</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setNewPatientOpen(true)} className="flex items-center gap-2">
             <UserPlus size={18} /> Add Patient
          </Button>
          <Button variant="primary" onClick={() => setBookAptOpen(true)} className="flex items-center gap-2">
             <CalendarIcon size={18} /> Book Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="flex items-center gap-4 bg-green-500 text-white border-0 !p-5 shadow-lg shadow-green-500/20">
          <div className="p-3 bg-white/20 rounded-xl">
             <CalendarIcon size={24} className="text-white" />
          </div>
          <div>
            <p className="text-green-50 text-sm font-medium opacity-90">Today's Appointments</p>
            <h4 className="text-3xl font-bold mt-1 tracking-tight">{schedule.length}</h4>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4 bg-white border border-slate-100 shadow-sm !p-5 cursor-pointer hover:border-green-200 hover:shadow-md transition-all">
          <div className="p-3 bg-amber-50 rounded-xl">
             <Users size={24} className="text-amber-500" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">In Waiting Room</p>
            <h4 className="text-3xl font-bold mt-1 text-slate-800 tracking-tight">
              {schedule.filter(s => s.status === 'pending' || s.status === 'confirmed').length}
            </h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white border border-slate-100 shadow-sm !p-5  cursor-pointer hover:border-green-200 hover:shadow-md transition-all">
          <div className="p-3 bg-blue-50 rounded-xl">
             <Phone size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Registered Today</p>
            <h4 className="text-3xl font-bold mt-1 text-slate-800 tracking-tight">--</h4>
          </div>
        </Card>
      </div>

      {/* Main Schedule Table */}
      <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white flex-col sm:flex-row gap-4">
          <h3 className="text-lg font-semibold text-slate-800">Clinic Master Schedule</h3>
          
          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
             </div>
             <input
               type="text"
               className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
               placeholder="Search patient or doctor..."
             />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading daily schedule...</div>
        ) : schedule.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No appointments scheduled for today.</div>
        ) : (
          <Table headers={['Time', 'Patient', 'Doctor', 'Status', 'Actions']}>
            {schedule.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-semibold text-slate-900">
                  {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell className="font-medium">{item.patientId?.name || '---'}</TableCell>
                <TableCell className="text-slate-600">{item.doctorId?.name || '---'}</TableCell>
                <TableCell>
                  <Badge variant={
                    item.status === 'pending' ? 'warning' :
                    item.status === 'confirmed' ? 'info' : 
                    item.status === 'completed' ? 'success' : 
                    item.status === 'cancelled' ? 'danger' : 'info'
                  }>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Update Status">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      {/* Add Patient Modal */}
      <Modal isOpen={newPatientOpen} onClose={() => setNewPatientOpen(false)} title="Register New Patient" maxWidth="max-w-2xl">
         <form onSubmit={handleRegisterPatient} className="space-y-6">
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Personal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Input label="Full Name" placeholder="John Doe" value={patientData.name} onChange={(e) => setPatientData({...patientData, name: e.target.value})} required />
               <Input label="Age" type="number" placeholder="25" value={patientData.age} onChange={(e) => setPatientData({...patientData, age: e.target.value})} required />
               <div className="w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">Gender</label>
                  <select 
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                    value={patientData.gender}
                    onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                    required
                  >
                     <option value="">Select Gender</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                  </select>
               </div>
               <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={patientData.contact} onChange={(e) => setPatientData({...patientData, contact: e.target.value})} required />
            </div>

            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mt-4">Account Access</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Input label="Email Address" type="email" placeholder="john@example.com" value={patientData.email} onChange={(e) => setPatientData({...patientData, email: e.target.value})} required />
               <Input label="Password" type="password" placeholder="Temporary password" value={patientData.password} onChange={(e) => setPatientData({...patientData, password: e.target.value})} required />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
               <Button variant="ghost" type="button" onClick={() => setNewPatientOpen(false)}>Cancel</Button>
               <Button variant="primary" type="submit">Register Patient</Button>
            </div>
         </form>
      </Modal>

      {/* Book Appointment Modal */}
      <Modal isOpen={bookAptOpen} onClose={() => setBookAptOpen(false)} title="Book Appointment">
         <form onSubmit={handleBookAppointment} className="space-y-4">
            <div className="w-full">
               <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">Patient ID (MongoDB ID)</label>
               <Input placeholder="Enter patient ID..." value={appointmentData.patientId} onChange={(e) => setAppointmentData({...appointmentData, patientId: e.target.value})} required />
            </div>

            <div className="w-full">
               <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">Select Doctor</label>
               <select 
                 className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                 value={appointmentData.doctorId}
                 onChange={(e) => setAppointmentData({...appointmentData, doctorId: e.target.value})}
                 required
               >
                  <option value="">Choose a doctor</option>
                  {doctors.map(doc => (
                    <option key={doc._id} value={doc._id}>{doc.name}</option>
                  ))}
               </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Input label="Date" type="date" value={appointmentData.date} onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})} required />
               <Input label="Time" type="time" value={appointmentData.time} onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})} required />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-10">
               <Button variant="ghost" type="button" onClick={() => setBookAptOpen(false)}>Cancel</Button>
               <Button variant="primary" type="submit">Confirm Booking</Button>
            </div>
         </form>
      </Modal>
    </div>
  );
}
