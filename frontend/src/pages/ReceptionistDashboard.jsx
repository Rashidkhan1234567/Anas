import { useState } from 'react';
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

const schedule = [
  { id: 1, time: '09:00 AM', doctor: 'Dr. Sarah Smith', patient: 'Sarah Jenkins', type: 'Checkup', status: 'Waiting' },
  { id: 2, time: '09:30 AM', doctor: 'Dr. Sarah Smith', patient: 'Mike Ross', type: 'Follow up', status: 'In Progress' },
  { id: 3, time: '10:00 AM', doctor: 'Dr. John Doe', patient: 'Tom Hardy', type: 'Consultation', status: 'Completed' },
  { id: 4, time: '10:15 AM', doctor: 'Dr. Sarah Smith', patient: 'Emily Clark', type: 'Consultation', status: 'Scheduled' },
  { id: 5, time: '11:00 AM', doctor: 'Dr. Mary Anne', patient: 'Will Byers', type: 'Lab Results', status: 'Cancelled' },
];

export function ReceptionistDashboard() {
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [bookAptOpen, setBookAptOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Front Desk Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Manage today's appointments and clinic flow.</p>
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
            <h4 className="text-3xl font-bold mt-1 tracking-tight">42</h4>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4 bg-white border border-slate-100 shadow-sm !p-5 cursor-pointer hover:border-green-200 hover:shadow-md transition-all">
          <div className="p-3 bg-amber-50 rounded-xl">
             <Users size={24} className="text-amber-500" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">In Waiting Room</p>
            <h4 className="text-3xl font-bold mt-1 text-slate-800 tracking-tight">8</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white border border-slate-100 shadow-sm !p-5  cursor-pointer hover:border-green-200 hover:shadow-md transition-all">
          <div className="p-3 bg-blue-50 rounded-xl">
             <Phone size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">New Registrations</p>
            <h4 className="text-3xl font-bold mt-1 text-slate-800 tracking-tight">12</h4>
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

        <Table headers={['Time', 'Patient', 'Doctor', 'Visit Type', 'Status', 'Actions']}>
          {schedule.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold text-slate-900">{item.time}</TableCell>
              <TableCell className="font-medium">{item.patient}</TableCell>
              <TableCell className="text-slate-600">{item.doctor}</TableCell>
              <TableCell className="text-slate-500">{item.type}</TableCell>
              <TableCell>
                <Badge variant={
                  item.status === 'Waiting' ? 'warning' :
                  item.status === 'In Progress' ? 'success' : 
                  item.status === 'Completed' ? 'default' : 
                  item.status === 'Cancelled' ? 'danger' : 'info'
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
      </Card>

      {/* Add Patient Modal */}
      <Modal isOpen={newPatientOpen} onClose={() => setNewPatientOpen(false)} title="Register New Patient" maxWidth="max-w-2xl">
         <div className="space-y-6">
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Personal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Input label="First Name" placeholder="John" />
               <Input label="Last Name" placeholder="Doe" />
               <Input label="Date of Birth" type="date" />
               <div className="w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">Gender</label>
                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500">
                     <option>Select Gender</option>
                     <option>Male</option>
                     <option>Female</option>
                     <option>Other</option>
                  </select>
               </div>
            </div>

            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mt-4">Contact Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
               <Input label="Email Address" type="email" placeholder="john@example.com" />
               <div className="sm:col-span-2">
                 <Input label="Residential Address" placeholder="123 Main St, City, ST 12345" />
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
               <Button variant="ghost" onClick={() => setNewPatientOpen(false)}>Cancel</Button>
               <Button variant="primary">Register Patient</Button>
            </div>
         </div>
      </Modal>

      {/* Book Appointment Modal */}
      <Modal isOpen={bookAptOpen} onClose={() => setBookAptOpen(false)} title="Book Appointment">
         <div className="space-y-4">
            <div className="w-full">
               <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">Select Patient</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-slate-400" />
                 </div>
                 <input type="text" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500" placeholder="Search by name or ID..." />
               </div>
            </div>

            <div className="w-full">
               <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">Select Doctor</label>
               <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500">
                  <option>Dr. Sarah Smith (General)</option>
                  <option>Dr. John Doe (Cardiologist)</option>
               </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Input label="Date" type="date" />
               <Input label="Time" type="time" />
            </div>

            <div className="w-full">
               <label className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">Visit Type</label>
               <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500">
                  <option>General Checkup</option>
                  <option>Follow-up</option>
                  <option>Specialist Consultation</option>
                  <option>Lab Results Review</option>
               </select>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
               <Button variant="ghost" onClick={() => setBookAptOpen(false)}>Cancel</Button>
               <Button variant="primary">Confirm Booking</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
}
