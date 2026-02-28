import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Calendar, BrainCircuit, 
  FileText, Activity, Settings, LogOut, Menu, X,
  Bell, Search
} from 'lucide-react';

const roleMenus = {
  admin: [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Doctors', icon: Users, path: '/dashboard/doctors' },
    { name: 'Receptionists', icon: Users, path: '/dashboard/receptionists' },
    { name: 'System Activity', icon: Activity, path: '/dashboard/activity' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ],
  doctor: [
    { name: 'Today\'s Schedule', icon: Calendar, path: '/dashboard/doctor' },
    { name: 'Patients', icon: Users, path: '/dashboard/doctor/patients' },
    { name: 'AI Assist', icon: BrainCircuit, path: '/dashboard/doctor/ai-assist' },
    { name: 'Prescriptions', icon: FileText, path: '/dashboard/doctor/prescriptions' },
    { name: 'Analytics', icon: Activity, path: '/dashboard/doctor/analytics' },
  ],
  receptionist: [
    { name: 'Schedule', icon: Calendar, path: '/dashboard/receptionist' },
    { name: 'Patients', icon: Users, path: '/dashboard/receptionist/patients' },
    { name: 'Billing', icon: FileText, path: '/dashboard/receptionist/billing' },
  ],
  patient: [
    { name: 'Health Profile', icon: Activity, path: '/dashboard/patient' },
    { name: 'Appointments', icon: Calendar, path: '/dashboard/patient/appointments' },
    { name: 'Prescriptions', icon: FileText, path: '/dashboard/patient/prescriptions' },
  ]
};

export function DashboardLayout({ role = 'admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const menu = roleMenus[role] || roleMenus.admin;

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform lg:translate-x-0 lg:static lg:flex-shrink-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                +
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                Clinic<span className="text-green-500">AI</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="mb-6 px-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Main Menu
              </p>
            </div>
            <nav className="space-y-1.5">
              {menu.map((item) => {
                const isBasePath = item.path === '/dashboard' || item.path === '/dashboard/doctor' || item.path === '/dashboard/receptionist' || item.path === '/dashboard/patient';
                const isActive = location.pathname === item.path || 
                                (!isBasePath && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-green-600' : 'text-slate-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-100">
            <Link
              to="/login"
              className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-red-500" />
              Sign out
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:inset-0 focus:ring-green-500"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="hidden sm:block ml-4 text-sm font-medium text-slate-500">
              {role.charAt(0).toUpperCase() + role.slice(1)} Portal
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="notifications" className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors relative">
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              <Bell className="h-5 w-5" />
            </Link>
            
            {/* Profile */}
            <Link to="profile" className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-700 font-bold text-sm">
                JD
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-slate-700 leading-none">John Doe</p>
                <p className="text-slate-500 text-xs mt-1 leading-none capitalize">{role}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
