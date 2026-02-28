import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Calendar, Clock, Video, FileText, Loader2, Plus, ArrowRight } from 'lucide-react';

export function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    doctorId: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/patient/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/patient/doctors', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const combinedDateTime = `${bookingData.date}T${bookingData.time}`;
      
      const response = await fetch('https://anas-ebon.vercel.app/api/patient/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          doctorId: bookingData.doctorId,
          date: combinedDateTime
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchAppointments();
        setBookingData({ doctorId: '', date: '', time: '' });
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your upcoming visits and view past consultations.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Calendar size={18} /> Book New Appointment
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <Loader2 className="animate-spin text-green-500 mx-auto mb-2" size={32} />
            Loading your appointments...
          </div>
        ) : appointments.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 border-dashed border-2">
            No appointments found. Start by booking your first visit!
          </Card>
        ) : (
          appointments.map((apt) => (
            <Card key={apt._id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                 <div className="flex gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white font-bold shadow-md shadow-slate-200/50 ${apt.status === 'pending' || apt.status === 'confirmed' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-slate-300'}`}>
                       <span className="text-xs uppercase font-semibold leading-none">
                         {new Date(apt.date).toLocaleString('default', { month: 'short' })}
                       </span>
                       <span className="text-xl leading-none mt-1">
                         {new Date(apt.date).getDate()}
                       </span>
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-slate-900">{apt.doctorId?.name}</h3>
                       <p className="text-slate-500 text-sm font-medium">Appointment #{apt._id.slice(-6).toUpperCase()}</p>
                       
                       <div className="flex flex-wrap gap-3 mt-3">
                          <Badge variant="default" className="flex items-center gap-1.5 bg-slate-100 text-slate-600 border-none">
                             <Clock size={12}/> {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Badge>
                          <Badge variant="default" className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border-blue-100">
                             <Calendar size={12}/> Consultation
                          </Badge>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                    <Badge variant={apt.status === 'pending' ? 'warning' : apt.status === 'confirmed' ? 'info' : 'success'} className="w-fit">
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </Badge>
                    <div className="flex gap-2 mt-2">
                       {apt.status === 'pending' && <p className="text-xs text-slate-400 italic">Waiting for confirmation</p>}
                       {apt.status === 'confirmed' && (
                         <Button variant="outline" size="sm" className="bg-white flex items-center gap-2">
                           <Video size={14}/> Join Link
                         </Button>
                       )}
                    </div>
                 </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book New Appointment">
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Select Doctor</label>
            <select
              required
              className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={bookingData.doctorId}
              onChange={(e) => setBookingData({...bookingData, doctorId: e.target.value})}
            >
              <option value="">Choose a doctor...</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} - {doc.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Input 
               label="Date" 
               type="date" 
               value={bookingData.date} 
               onChange={e => setBookingData({...bookingData, date: e.target.value})} 
               required 
               min={new Date().toISOString().split('T')[0]}
             />
             <Input 
               label="Time" 
               type="time" 
               value={bookingData.time} 
               onChange={e => setBookingData({...bookingData, time: e.target.value})} 
               required 
             />
          </div>

          <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
             <div className="flex gap-3 text-green-700">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                   <Clock size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Booking Slot Estimation</p>
                  <p className="text-xs opacity-80 mt-0.5">Your request will be sent to the doctor for confirmation.</p>
                </div>
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
             <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button variant="primary" type="submit" className="flex items-center gap-2">
               Proceed to Book <ArrowRight size={16} />
             </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
