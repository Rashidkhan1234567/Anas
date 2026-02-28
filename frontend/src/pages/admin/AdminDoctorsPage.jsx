import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Search, Plus, Mail, Phone, Edit2, Trash2, Loader2 } from 'lucide-react';

export function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    experience: '',
    consultationFee: '',
    contact: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/admin/users?role=Doctor', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newDoctor,
          role: 'Doctor',
          profileData: {
            specialization: newDoctor.specialization,
            experience: newDoctor.experience,
            consultationFee: newDoctor.consultationFee,
            contact: newDoctor.contact
          }
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchDoctors();
        setNewDoctor({ name: '', email: '', password: '', specialization: '', experience: '', consultationFee: '', contact: '' });
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add doctor');
      }
    } catch (error) {
      console.error('Add doctor error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://anas-ebon.vercel.app/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchDoctors();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctors Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your medical staff and their access.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Add Doctor
        </Button>
      </div>

      <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
             </div>
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
               placeholder="Search by name..."
             />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <Loader2 className="animate-spin text-green-500 mx-auto mb-2" size={32} />
            Loading doctors...
          </div>
        ) : (
          <Table headers={['Doctor Info', 'Role', 'Contact', 'Joined', 'Actions']}>
            {doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((doc) => (
              <TableRow key={doc._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center">
                      {doc.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{doc.name}</div>
                      <div className="text-xs text-slate-500">{doc.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">{doc.role}</Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">{doc.email}</TableCell>
                <TableCell className="text-slate-500 text-xs">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(doc._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                       <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Doctor">
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <Input label="Name" value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} required />
          <Input label="Email" type="email" value={newDoctor.email} onChange={e => setNewDoctor({...newDoctor, email: e.target.value})} required />
          <Input label="Password" type="password" value={newDoctor.password} onChange={e => setNewDoctor({...newDoctor, password: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Specialization" value={newDoctor.specialization} onChange={e => setNewDoctor({...newDoctor, specialization: e.target.value})} required />
            <Input label="Exp (Years)" type="number" value={newDoctor.experience} onChange={e => setNewDoctor({...newDoctor, experience: e.target.value})} required />
          </div>
          <Input label="Consultation Fee" type="number" value={newDoctor.consultationFee} onChange={e => setNewDoctor({...newDoctor, consultationFee: e.target.value})} required />
          <Input label="Contact" value={newDoctor.contact} onChange={e => setNewDoctor({...newDoctor, contact: e.target.value})} required />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
             <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button variant="primary" type="submit">Create Doctor</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
