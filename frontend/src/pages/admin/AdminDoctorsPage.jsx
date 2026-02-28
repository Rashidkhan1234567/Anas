import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, Plus, MoreVertical, Mail, Phone, Edit2, Trash2 } from 'lucide-react';

const doctorsData = [
  { id: 'DR-101', name: 'Dr. Sarah Smith', spec: 'General Physician', phone: '+1 234-567-8900', email: 'sarah@clinic.com', status: 'Active' },
  { id: 'DR-102', name: 'Dr. John Doe', spec: 'Cardiologist', phone: '+1 234-567-8901', email: 'john@clinic.com', status: 'Active' },
  { id: 'DR-103', name: 'Dr. Emily Chen', spec: 'Pediatrician', phone: '+1 234-567-8902', email: 'emily@clinic.com', status: 'On Leave' },
];

export function AdminDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctors Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your medical staff and their access.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
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
               placeholder="Search by name or ID..."
             />
          </div>
        </div>

        <Table headers={['Doctor Info', 'Specialization', 'Contact', 'Status', 'Actions']}>
          {doctorsData.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center">
                    {doc.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{doc.name}</div>
                    <div className="text-xs text-slate-500">{doc.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-slate-600 font-medium">{doc.spec}</TableCell>
              <TableCell>
                <div className="text-sm text-slate-600 flex items-center gap-1"><Phone size={14} className="text-slate-400"/> {doc.phone}</div>
                <div className="text-sm text-slate-500 flex items-center gap-1 mt-1"><Mail size={14} className="text-slate-400"/> {doc.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant={doc.status === 'Active' ? 'success' : 'warning'}>{doc.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                     <Edit2 size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                     <Trash2 size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
