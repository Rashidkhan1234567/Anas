import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { User, Mail, Phone, MapPin, Camera, Loader2 } from 'lucide-react';

export function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [data, setData] = useState({
    user: {},
    profile: {}
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok) {
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://anas-ebon.vercel.app/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          profileData: data.profile
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        // Update localStorage name if changed
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        userInfo.name = data.user.name;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        alert('Profile updated successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Update failed');
      }
    } catch (error) {
       console.error('Update error:', error);
       alert('Something went wrong');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-green-500" size={40} />
      </div>
    );
  }

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
              <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-xl flex items-center justify-center text-green-600 mx-auto font-bold text-2xl uppercase">
                {data.user.name?.split(' ').map(n => n[0]).join('') || <User size={40} />}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-green-600 shadow-sm transition-colors">
                 <Camera size={14} />
              </button>
            </div>
            <h2 className="text-lg font-bold text-slate-800">{data.user.name}</h2>
            <p className="text-sm text-slate-500 mb-4 capitalize">{data.user.role} Portal</p>
            <div className="flex gap-2 justify-center">
              <Badge variant="success">Active</Badge>
              <Badge variant="default">Verified</Badge>
            </div>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="col-span-1 md:col-span-2">
          <form onSubmit={handleUpdate}>
            <Card>
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="Full Name" 
                  value={data.user.name || ''} 
                  onChange={(e) => setData({...data, user: {...data.user, name: e.target.value}})}
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  value={data.user.email || ''} 
                  onChange={(e) => setData({...data, user: {...data.user, email: e.target.value}})}
                  icon={<Mail className="w-4 h-4 text-slate-400" />} 
                />
                <Input 
                  label="Phone Number" 
                  type="tel" 
                  value={data.profile.contact || ''} 
                  onChange={(e) => setData({...data, profile: {...data.profile, contact: e.target.value}})}
                  icon={<Phone className="w-4 h-4 text-slate-400" />} 
                />
                
                {data.user.role === 'Patient' && (
                   <>
                    <Input 
                      label="Address" 
                      value={data.profile.address || ''} 
                      onChange={(e) => setData({...data, profile: {...data.profile, address: e.target.value}})}
                    />
                    <Input 
                      label="Blood Group" 
                      value={data.profile.bloodGroup || ''} 
                      onChange={(e) => setData({...data, profile: {...data.profile, bloodGroup: e.target.value}})}
                    />
                   </>
                )}

                {data.user.role === 'Doctor' && (
                   <>
                    <Input 
                      label="Specialization" 
                      value={data.profile.specialization || ''} 
                      onChange={(e) => setData({...data, profile: {...data.profile, specialization: e.target.value}})}
                    />
                    <Input 
                      label="Experience (Years)" 
                      value={data.profile.experience || ''} 
                      onChange={(e) => setData({...data, profile: {...data.profile, experience: e.target.value}})}
                    />
                   </>
                )}

                {data.user.role === 'Receptionist' && (
                   <Input 
                     label="Employee ID" 
                     value={data.profile.employeeId || ''} 
                     readOnly
                     className="bg-slate-50 cursor-not-allowed"
                   />
                )}
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={fetchProfile}>Reset</Button>
                <Button variant="primary" type="submit" disabled={updating}>
                  {updating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
