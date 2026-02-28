import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';

export function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your personal information and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1">
          <Card className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-xl flex items-center justify-center text-green-600 mx-auto">
                <User size={40} />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-green-600 shadow-sm transition-colors">
                 <Camera size={14} />
              </button>
            </div>
            <h2 className="text-lg font-bold text-slate-800">John Doe</h2>
            <p className="text-sm text-slate-500 mb-4">Clinic Administrator</p>
            <div className="flex gap-2 justify-center">
              <Badge variant="success">Active</Badge>
              <Badge variant="default">Verified</Badge>
            </div>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="col-span-1 md:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="First Name" defaultValue="John" />
              <Input label="Last Name" defaultValue="Doe" />
              <Input label="Email Address" type="email" defaultValue="john.doe@clinicai.com" icon={<Mail className="w-4 h-4 text-slate-400" />} />
              <Input label="Phone Number" type="tel" defaultValue="+1 (555) 123-4567" icon={<Phone className="w-4 h-4 text-slate-400" />} />
              <div className="sm:col-span-2">
                <Input label="Location" defaultValue="New York, USA" icon={<MapPin className="w-4 h-4 text-slate-400" />} />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
