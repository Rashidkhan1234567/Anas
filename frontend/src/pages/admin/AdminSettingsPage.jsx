import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { BuildingIcon, CreditCard, Bell, Shield, Save, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: BuildingIcon, label: 'Clinic Profile' },
    { id: 'billing', icon: CreditCard, label: 'Billing & Plans' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Clinic Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your clinic's global configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="col-span-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-50 text-green-700 shadow-sm ring-1 ring-green-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-green-600' : 'text-slate-400'} /> 
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="col-span-1 md:col-span-3">
          <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
               <Card className="shadow-sm border border-slate-100 p-6 sm:p-8 min-h-[500px]">
                 {activeTab === 'profile' && <ProfileSettings />}
                 {activeTab === 'billing' && <BillingSettings />}
                 {activeTab === 'notifications' && <NotificationSettings />}
                 {activeTab === 'security' && <SecuritySettings />}
               </Card>
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4">Clinic Profile Details</h3>
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 font-bold text-xl border-2 border-dashed border-green-300">
          Logo
        </div>
        <Button variant="outline" size="sm">Upload New Logo</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Clinic Name" defaultValue="City Health Clinic" />
        <Input label="Registration Number" defaultValue="REG-993821" />
        <div className="sm:col-span-2">
          <Input label="Address" defaultValue="123 Main St, City, ST 12345" />
        </div>
        <Input label="Contact Email" type="email" defaultValue="admin@cityhealth.com" />
        <Input label="Phone Number" type="tel" defaultValue="+1 (555) 000-0000" />
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <Button variant="primary" className="flex items-center gap-2">
          <Save size={16} /> Save Changes
        </Button>
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4">Billing & Subscription</h3>
      
      <div className="bg-slate-900 rounded-2xl p-6 text-white flex justify-between items-center shadow-lg shadow-slate-900/20">
         <div>
            <Badge variant="success" className="bg-green-500/20 text-green-300 border-none mb-2">Active Plan</Badge>
            <h4 className="text-2xl font-bold">Pro Plan</h4>
            <p className="text-slate-400 text-sm mt-1">Billed $49.00 monthly. Next billing on Nov 15, 2023.</p>
         </div>
         <Button variant="outline" className="text-slate-900 bg-white border-none hover:bg-slate-100">Manage Plan</Button>
      </div>

      <div className="mt-6">
         <h4 className="text-sm font-semibold text-slate-800 mb-3">Payment Method</h4>
         <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center border border-slate-200 font-bold text-slate-600 text-xs italic">
                 VISA
               </div>
               <div>
                  <p className="text-sm font-semibold text-slate-800">Visa ending in 4242</p>
                  <p className="text-xs text-slate-500">Expires 12/2025</p>
               </div>
            </div>
            <button className="text-sm font-medium text-green-600 hover:text-green-700">Update</button>
         </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4">Notification Preferences</h3>
      
      <div className="space-y-4">
         {[
           { title: 'New Appointment Booked', desc: 'Get notified when a patient books online.', on: true },
           { title: 'Prescription Refill Requests', desc: 'Alerts for pending patient medication refills.', on: true },
           { title: 'Daily Report Summary', desc: 'Receive a daily email with clinic analytics.', on: false },
           { title: 'Security Alerts', desc: 'Important notifications about account security.', on: true },
         ].map((item, i) => (
           <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
             <div>
               <p className="text-sm font-medium text-slate-800">{item.title}</p>
               <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
             </div>
             <button className={`w-11 h-6 rounded-full transition-colors relative ${item.on ? 'bg-green-500' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${item.on ? 'translate-x-5' : 'translate-x-0'} shadow-sm`}></div>
             </button>
           </div>
         ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4">Security Settings</h3>
      
      <div className="space-y-4 max-w-sm">
         <Input label="Current Password" type="password" placeholder="••••••••" />
         <Input label="New Password" type="password" placeholder="Create a new secure password" />
         <Input label="Confirm New Password" type="password" placeholder="Confirm your new password" />
         <Button variant="primary" className="mt-2 text-sm w-full">Update Password</Button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
         <h4 className="text-sm font-semibold text-slate-800 mb-2">Two-Factor Authentication (2FA)</h4>
         <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4 bg-slate-50">
           <div>
             <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                Authenticator App
             </p>
             <p className="text-xs text-slate-500 mt-0.5">Protect your account with an extra layer of security.</p>
           </div>
           <Button variant="outline" size="sm" className="bg-white">Configure</Button>
         </div>
      </div>
    </div>
  );
}
