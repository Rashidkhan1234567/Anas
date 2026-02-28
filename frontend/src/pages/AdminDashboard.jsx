import { Card } from '../components/ui/Card';
import { Table, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, UserPlus, Calendar as CalendarIcon, DollarSign, BrainCircuit } from 'lucide-react';

const appointmentData = [
  { name: 'Mon', appointments: 45 },
  { name: 'Tue', appointments: 52 },
  { name: 'Wed', appointments: 38 },
  { name: 'Thu', appointments: 65 },
  { name: 'Fri', appointments: 48 },
  { name: 'Sat', appointments: 25 },
  { name: 'Sun', appointments: 10 },
];

const diagnosisData = [
  { name: 'Viral Fever', value: 400 },
  { name: 'Hypertension', value: 300 },
  { name: 'Diabetes', value: 300 },
  { name: 'Asthma', value: 200 },
];
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

const recentActivity = [
  { id: 1, user: 'Dr. Sarah Smith', action: 'Added prescription for Patient #1024', time: '10 mins ago', status: 'success' },
  { id: 2, user: 'System AI', action: 'Flagged abnormal lab results for review', time: '1 hour ago', status: 'warning' },
  { id: 3, user: 'John (Reception)', action: 'Cancelled appointment #849', time: '2 hours ago', status: 'info' },
  { id: 4, user: 'Admin', action: 'Updated billing configuration', time: '5 hours ago', status: 'default' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor clinic performance and system activity.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Patients" value="12,450" trend="+12%" trendUp />
        <StatCard icon={UserPlus} label="Total Doctors" value="24" trend="+2" trendUp />
        <StatCard icon={CalendarIcon} label="Monthly Appointments" value="1,840" trend="+5%" trendUp />
        <StatCard icon={DollarSign} label="Monthly Revenue" value="$42,500" trend="-2%" trendUp={false} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Weekly Appointments Overview</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="appointments" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-1 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Common AI Diagnosis</h3>
          <p className="text-xs text-slate-500 mb-4">Top conditions processed by Smart AI</p>
          <div className="flex-1 min-h-[250px] w-full relative -mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diagnosisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8 text-green-500">
              <BrainCircuit className="w-8 h-8 opacity-20" />
            </div>
          </div>
        </Card>
      </div>

      {/* Activity Table */}
      <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">Recent System Activity</h3>
          <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700">View all</a>
        </div>
        <Table headers={['User / System', 'Action Performed', 'Time', 'Status']}>
          {recentActivity.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-slate-900">{item.user}</TableCell>
              <TableCell>{item.action}</TableCell>
              <TableCell className="text-slate-500">{item.time}</TableCell>
              <TableCell>
                <Badge variant={item.status}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, trendUp }) {
  return (
    <Card className="shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
          <Icon size={20} />
        </div>
        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700 font-bold' : 'bg-red-50 text-red-700 font-bold'}`}>
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      </div>
    </Card>
  );
}
