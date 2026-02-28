import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Search, UserCircle, Phone, Calendar } from 'lucide-react';

const myPatients = [
  { id: 'PT-1082', name: 'Sarah Jenkins', age: 34, gender: 'Female', lastVisit: 'Today', condition: 'Migraine', phone: '+1 555-0123' },
  { id: 'PT-0921', name: 'Mike Ross', age: 45, gender: 'Male', lastVisit: '1 Week Ago', condition: 'Hypertension', phone: '+1 555-0987' },
  { id: 'PT-1134', name: 'Emily Clark', age: 28, gender: 'Female', lastVisit: '2 Months Ago', condition: 'Routine Checkup', phone: '+1 555-6543' },
];

export function DoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Patients Directory</h1>
        <p className="text-sm text-slate-500 mt-1">View your assigned patients, their conditions, and recent visits.</p>
      </div>

      <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-white">
          <div className="relative w-full sm:w-80">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
             </div>
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
               placeholder="Search patients by name or ID..."
             />
          </div>
        </div>

        <Table headers={['Patient Name', 'Details', 'Condition', 'Last Visit', 'Contact']}>
          {myPatients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((pt) => (
            <TableRow key={pt.id} className="cursor-pointer hover:bg-slate-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <UserCircle size={36} strokeWidth={1.5} className="text-slate-400" />
                  <div>
                    <div className="font-semibold text-slate-900">{pt.name}</div>
                    <div className="text-xs text-slate-500">{pt.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-slate-600 font-medium">
                {pt.age} yrs, {pt.gender}
              </TableCell>
              <TableCell>
                <Badge variant={pt.condition.includes('Checkup') ? 'success' : 'warning'}>
                  {pt.condition}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                <div className="flex items-center gap-1"><Calendar size={14} className="text-slate-400" /> {pt.lastVisit}</div>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                <div className="flex items-center gap-1"><Phone size={14} className="text-slate-400" /> {pt.phone}</div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
