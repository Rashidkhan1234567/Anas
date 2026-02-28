import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FileText, Download, Calendar, Activity } from 'lucide-react';

const myPrescriptions = [
  { id: 'RX-8921', doc: 'Dr. Sarah Smith', date: 'Today', expiry: 'Nov 24, 2023', meds: ['Sumatriptan 50mg (9 tabs)'], status: 'Active' },
  { id: 'RX-8210', doc: 'Dr. Emily Chen', date: 'Sep 05, 2023', expiry: 'Sep 15, 2023', meds: ['Amoxicillin 500mg', 'Ibuprofen 400mg'], status: 'Expired' },
];

const labReports = [
  { id: 'LAB-402', name: 'Comprehensive Metabolic Panel (CMP)', date: 'Oct 10, 2023', status: 'Reviewed' },
  { id: 'LAB-391', name: 'Complete Blood Count (CBC)', date: 'Sep 01, 2023', status: 'Reviewed' },
]

export function PatientPrescriptionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Medical Records</h1>
        <p className="text-sm text-slate-500 mt-1">Access your prescriptions, lab results, and request refills securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Prescriptions */}
         <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
               <FileText className="text-green-500" size={20}/> Active Prescriptions
            </h2>
            
            {myPrescriptions.map((rx) => (
              <Card key={rx.id} className="p-5 border border-slate-200">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="font-bold text-slate-900">{rx.id}</h3>
                       <p className="text-sm text-slate-500">Prescribed by {rx.doc}</p>
                    </div>
                    <Badge variant={rx.status === 'Active' ? 'success' : 'default'}>{rx.status}</Badge>
                 </div>
                 
                 <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <ul className="space-y-2">
                       {rx.meds.map((med, i) => (
                         <li key={i} className="text-sm font-medium text-slate-800 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            {med}
                         </li>
                       ))}
                    </ul>
                 </div>
                 
                 <div className="flex flex-wrap gap-3 justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5"><Calendar size={14}/> Expires: {rx.expiry}</span>
                    <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                       {rx.status === 'Active' && <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Refill</Button>}
                       <Button variant="primary" size="sm" className="flex-1 sm:flex-none flex justify-center items-center gap-2"><Download size={14}/> PDF</Button>
                    </div>
                 </div>
              </Card>
            ))}
         </div>

         {/* Lab Reports */}
         <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
               <Activity className="text-blue-500" size={20}/> Lab Results & Reports
            </h2>
            
            <div className="grid gap-3">
               {labReports.map((lab) => (
                 <div key={lab.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Activity size={20}/>
                       </div>
                       <div>
                          <h4 className="font-semibold text-slate-900 line-clamp-1">{lab.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{lab.date} &#x2022; {lab.id}</p>
                       </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                       <Download size={18}/>
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
