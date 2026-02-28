import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Bell, Calendar, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function UserNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/notifications/read-all', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking read:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">Stay updated with your latest alerts and messages.</p>
        </div>
        <button 
          onClick={handleMarkAllRead}
          className="text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <Card className="!p-0 overflow-hidden border-slate-100 shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No notifications found.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notif) => (
              <div key={notif._id || notif.id} className={`p-4 sm:p-6 flex gap-4 transition-colors hover:bg-slate-50 ${!notif.read ? 'bg-green-50/30' : 'bg-white'}`}>
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notif.type === 'appointment' ? 'bg-blue-100 text-blue-600' :
                    notif.type === 'prescription' ? 'bg-purple-100 text-purple-600' :
                    notif.type === 'system' ? 'bg-amber-100 text-amber-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {notif.type === 'appointment' && <Calendar size={18} />}
                    {notif.type === 'prescription' && <FileText size={18} />}
                    {notif.type === 'system' && <AlertTriangle size={18} />}
                    {notif.type === 'report' && <CheckCircle2 size={18} />}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 items-start">
                    <h3 className={`text-sm font-semibold truncate ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                      {notif.title}
                    </h3>
                    <p className="text-xs text-slate-400 whitespace-nowrap pt-0.5">{notif.time}</p>
                  </div>
                  <p className={`text-sm mt-1 ${!notif.read ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                    {notif.desc}
                  </p>
                </div>

                {!notif.read && (
                  <div className="flex-shrink-0 flex items-center justify-center w-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
