import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Filter, Download } from 'lucide-react';

export function AdminActivityPage() {
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://anas-ebon.vercel.app/api/activity', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setActivityLogs(data);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Activity Logs</h1>
          <p className="text-sm text-slate-500 mt-1">Audit trail of all actions performed in ClinicAI.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={18} /> Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={18} /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading activity logs...</div>
        ) : (
          <Table headers={['Time', 'User', 'Module', 'Action', 'Type']}>
            {activityLogs.map((log) => (
              <TableRow key={log._id || log.id}>
                <TableCell className="text-slate-500 text-sm">{log.time}</TableCell>
                <TableCell className="font-medium text-slate-900">{log.user}</TableCell>
                <TableCell className="text-slate-600">{log.module}</TableCell>
                <TableCell className="text-sm text-slate-700">{log.action}</TableCell>
                <TableCell>
                  <Badge variant={
                    log.type === 'CREATE' ? 'success' : 
                    log.type === 'UPDATE' ? 'info' : 
                    log.type === 'DELETE' ? 'danger' : 'warning'
                  }>
                    {log.type}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}
