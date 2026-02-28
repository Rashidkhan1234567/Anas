import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, Video, FileText } from 'lucide-react';

const myAppointments = [
  { id: 'APT-9241', doctor: 'Dr. Sarah Smith', spec: 'General Physician', date: 'Tomorrow, Oct 25', time: '10:30 AM', type: 'In-Person', status: 'Upcoming' },
  { id: 'APT-9102', doctor: 'Dr. John Doe', spec: 'Cardiologist', date: 'Oct 12, 2023', time: '02:15 PM', type: 'Video Consult', status: 'Completed' },
  { id: 'APT-8933', doctor: 'Dr. Emily Chen', spec: 'Pediatrician', date: 'Sep 05, 2023', time: '09:00 AM', type: 'In-Person', status: 'Completed' },
];

export function PatientAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your upcoming visits and view past consultations.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Calendar size={18} /> Book New Appointment
        </Button>
      </div>

      <div className="grid gap-4">
        {myAppointments.map((apt) => (
          <Card key={apt.id} className="p-6">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
               <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white font-bold shadow-md shadow-slate-200/50 ${apt.status === 'Upcoming' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-slate-300'}`}>
                     <span className="text-xs uppercase font-semibold leading-none">{apt.date.split(', ')[1]?.split(' ')[0] || apt.date.split(' ')[0]}</span>
                     <span className="text-xl leading-none mt-1">{apt.date.split(', ')[1]?.split(' ')[1] || apt.date.split(' ')[1]}</span>
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-slate-900">{apt.doctor}</h3>
                     <p className="text-slate-500 text-sm font-medium">{apt.spec}</p>
                     
                     <div className="flex flex-wrap gap-3 mt-3">
                        <Badge variant="default" className="flex items-center gap-1.5 bg-slate-100 text-slate-600 border-none">
                           <Clock size={12}/> {apt.time}
                        </Badge>
                        <Badge variant="default" className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border-blue-100">
                           {apt.type === 'Video Consult' ? <Video size={12}/> : <Calendar size={12}/>} {apt.type}
                        </Badge>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                  <Badge variant={apt.status === 'Upcoming' ? 'info' : 'success'} className="w-fit">
                    {apt.status}
                  </Badge>
                  {apt.status === 'Upcoming' ? (
                    <div className="flex gap-2 mt-2">
                       <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">Cancel</Button>
                       <Button variant="outline" size="sm" className="bg-white">Reschedule</Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="mt-2 flex items-center gap-2 text-slate-600">
                       <FileText size={14}/> View Notes
                    </Button>
                  )}
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
