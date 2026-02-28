import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Search, Plus, Mail, Phone, Trash2, Loader2 } from 'lucide-react';

export function AdminReceptionistsPage() {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReceptionist, setNewReceptionist] = useState({
    name: '',
    email: '',
    password: '',
    employeeId: '',
    contact: ''
  });

  useEffect(() => {
    fetchReceptionists();
  }, []);

  const fetchReceptionists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/admin/users?role=Receptionist', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setReceptionists(data);
    } catch (error) {
      console.error('Error fetching receptionists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReceptionist = async (e) => {
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
          ...newReceptionist,
          role: 'Receptionist',
          profileData: {
            employeeId: newReceptionist.employeeId,
            contact: newReceptionist.contact
          }
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchReceptionists();
        setNewReceptionist({ name: '', email: '', password: '', employeeId: '', contact: '' });
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add receptionist');
      }
    } catch (error) {
      console.error('Add receptionist error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this receptionist?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://anas-ebon.vercel.app/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchReceptionists();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Receptionists Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage front desk staff and shift schedules.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Add Receptionist
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
            Loading receptionists...
          </div>
        ) : (
          <Table headers={['Staff Info', 'Role', 'Contact', 'Joined', 'Actions']}>
            {receptionists.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((stf) => (
              <TableRow key={stf._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm uppercase">
                      {stf.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{stf.name}</div>
                      <div className="text-xs text-slate-500">{stf.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">{stf.role}</Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">{stf.email}</TableCell>
                <TableCell className="text-slate-500 text-xs text-nowrap">
                  {new Date(stf.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(stf._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                       <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Receptionist">
        <form onSubmit={handleAddReceptionist} className="space-y-4">
          <Input label="Name" value={newReceptionist.name} onChange={e => setNewReceptionist({...newReceptionist, name: e.target.value})} required />
          <Input label="Email" type="email" value={newReceptionist.email} onChange={e => setNewReceptionist({...newReceptionist, email: e.target.value})} required />
          <Input label="Password" type="password" value={newReceptionist.password} onChange={e => setNewReceptionist({...newReceptionist, password: e.target.value})} required />
          <Input label="Employee ID" value={newReceptionist.employeeId} onChange={e => setNewReceptionist({...newReceptionist, employeeId: e.target.value})} required />
          <Input label="Contact" value={newReceptionist.contact} onChange={e => setNewReceptionist({...newReceptionist, contact: e.target.value})} required />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
             <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button variant="primary" type="submit">Create Receptionist</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
