import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CreditCard, Download } from 'lucide-react';

export function ReceptionistBillingPage() {
  const [invoicesList, setInvoicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/billing', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setInvoicesList(data);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectPayment = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://anas-ebon.vercel.app/api/billing/${id}/pay`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error collecting payment:', error);
    }
  };

  const totalRevenue = invoicesList
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + parseFloat((inv.amount || "$0").replace('$', '')), 0);

  const pendingRevenue = invoicesList
    .filter(inv => inv.status === 'Pending')
    .reduce((sum, inv) => sum + parseFloat((inv.amount || "$0").replace('$', '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">Manage patient payments, generate invoices, and track outstanding balances.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <CreditCard size={18} /> New Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-white">
            <h3 className="text-slate-500 text-sm font-medium mb-2">Today's Revenue</h3>
            <p className="text-3xl font-bold text-slate-800">${totalRevenue.toLocaleString()}</p>
         </Card>
         <Card className="bg-white">
            <h3 className="text-slate-500 text-sm font-medium mb-2">Pending Invoices</h3>
            <p className="text-3xl font-bold text-amber-600">${pendingRevenue.toLocaleString()}</p>
         </Card>
         <Card className="bg-green-50 border-green-100">
            <h3 className="text-green-700 text-sm font-medium mb-2">Total Monthly Revenue</h3>
            <p className="text-3xl font-bold text-green-700">${totalRevenue.toLocaleString()}</p>
         </Card>
      </div>

      <Card className="shadow-sm border border-slate-100 !p-0 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading invoices...</div>
        ) : (
          <Table headers={['Invoice ID', 'Patient', 'Service Type', 'Amount', 'Date', 'Status', 'Actions']}>
            {invoicesList.map((inv) => (
              <TableRow key={inv._id || inv.id}>
                <TableCell className="font-semibold text-slate-900">{inv.invoiceId || inv.id}</TableCell>
                <TableCell className="font-medium text-slate-700">{inv.patient}</TableCell>
                <TableCell className="text-slate-600">{inv.type}</TableCell>
                <TableCell className="font-bold text-slate-800">{inv.amount}</TableCell>
                <TableCell className="text-sm text-slate-600">{inv.date}</TableCell>
                <TableCell>
                  <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'}>
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {inv.status === 'Pending' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white"
                        onClick={() => handleCollectPayment(inv._id)}
                      >
                        Collect
                      </Button>
                    )}
                    <button className="text-slate-400 hover:text-green-600 p-2 rounded-lg transition-colors flex items-center justify-center">
                      <Download size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}
