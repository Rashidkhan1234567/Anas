import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, Plus, Phone, Calendar, Mail } from 'lucide-react';

const patientList = [
  { id: 'PT-1082', name: 'Sarah Jenkins', age: 34, lastVisit: 'Today', balance: '$0.00', status: 'Checked In', phone: '+1 555-0123' },
  { id: 'PT-0921', name: 'Mike Ross', age: 45, lastVisit: '1 Week Ago', balance: '$150.00', status: 'Upcoming', phone: '+1 555-0987' },
  { id: 'PT-1134', name: 'Emily Clark', age: 28, lastVisit: '2 Months Ago', balance: '$0.00', status: 'Inactive', phone: '+1 555-6543' },
];

export function ReceptionistPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Global Patient Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Search, update, and manage all clinic patients.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={18} /> Register Patient
        </Button>
      </div>

      <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-white">
          <div className="relative w-full sm:w-96">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
             </div>
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
               placeholder="Search patients by name, phone or ID..."
             />
          </div>
        </div>

        <Table headers={['Patient Name', 'Contact Info', 'Last Visit', 'Account Balance', 'Status', 'Actions']}>
          {patientList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((pt) => (
            <TableRow key={pt.id}>
              <TableCell>
                <div className="font-semibold text-slate-900">{pt.name}</div>
                <div className="text-xs text-slate-500">{pt.id}</div>
                <div className="text-xs text-slate-500 mt-0.5">{pt.age} years old</div>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                <div className="flex items-center gap-1"><Phone size={14} className="text-slate-400" /> {pt.phone}</div>
                <div className="flex items-center gap-1 mt-1"><Mail size={14} className="text-slate-400" /> email@example.com</div>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                <div className="flex items-center gap-1"><Calendar size={14} className="text-slate-400" /> {pt.lastVisit}</div>
              </TableCell>
              <TableCell className="font-medium text-slate-700">
                {pt.balance !== '$0.00' ? <span className="text-red-500">{pt.balance}</span> : pt.balance}
              </TableCell>
              <TableCell>
                <Badge variant={pt.status === 'Checked In' ? 'success' : pt.status === 'Upcoming' ? 'info' : 'default'}>
                  {pt.status}
                </Badge>
              </TableCell>
              <TableCell>
                 <Button variant="outline" size="sm">View Profile</Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
