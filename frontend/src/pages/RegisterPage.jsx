import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { User, Users, Activity, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Basic Info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  // Profile Info
  const [profileData, setProfileData] = useState({
    age: '',
    gender: '',
    contact: '',
    address: '',
    specialization: '',
    experience: '',
    consultationFee: '',
    employeeId: ''
  });

  const roles = [
    { title: 'Patient', icon: User, desc: 'Book appointments and view records' },
    { title: 'Doctor', icon: Activity, desc: 'Manage patients and prescriptions' },
    { title: 'Receptionist', icon: Users, desc: 'Manage clinic flow and billing' },
    { title: 'Admin', icon: ShieldCheck, desc: 'Full control over clinic operations' }
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://anas-ebon.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData,
          profileData 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-green-100 to-green-300 opacity-40 blur-3xl -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {step === 1 ? 'Choose Your Role' : step === 2 ? 'Account Details' : 'Professional Profile'}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Step {step} of 3 • {formData.role || 'Select role'}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <Card className="py-8 px-6 sm:px-10 border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {roles.map((r) => (
                  <button
                    key={r.title}
                    onClick={() => { setFormData({ ...formData, role: r.title }); setStep(2); }}
                    className={`p-6 text-left rounded-2xl border-2 transition-all hover:shadow-md ${formData.role === r.title ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${formData.role === r.title ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-500'}`}>
                      <r.icon size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900">{r.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{r.desc}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={(e) => { e.preventDefault(); setStep(3); }}
                className="space-y-4"
              >
                <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <Input label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}><ArrowLeft className="mr-2" size={18} /> Back</Button>
                  <Button type="submit" className="flex-1">Next <ArrowRight className="ml-2" size={18} /></Button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}
                
                {formData.role === 'Patient' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Age" type="number" value={profileData.age} onChange={(e) => setProfileData({...profileData, age: e.target.value})} required />
                      <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
                        <select className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-green-500" value={profileData.gender} onChange={(e) => setProfileData({...profileData, gender: e.target.value})} required>
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <Input label="Contact Number" value={profileData.contact} onChange={(e) => setProfileData({...profileData, contact: e.target.value})} required />
                    <Input label="Address" value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} required />
                  </>
                )}

                {formData.role === 'Doctor' && (
                  <>
                    <Input label="Specialization" placeholder="Cardiology, Neurology..." value={profileData.specialization} onChange={(e) => setProfileData({...profileData, specialization: e.target.value})} required />
                    <div className="grid grid-cols-2 gap-4">
                       <Input label="Exp (Years)" type="number" value={profileData.experience} onChange={(e) => setProfileData({...profileData, experience: e.target.value})} required />
                       <Input label="Fees ($)" type="number" value={profileData.consultationFee} onChange={(e) => setProfileData({...profileData, consultationFee: e.target.value})} required />
                    </div>
                    <Input label="Contact Number" value={profileData.contact} onChange={(e) => setProfileData({...profileData, contact: e.target.value})} required />
                  </>
                )}

                {formData.role === 'Receptionist' && (
                  <>
                    <Input label="Employee ID" value={profileData.employeeId} onChange={(e) => setProfileData({...profileData, employeeId: e.target.value})} required />
                    <Input label="Contact Number" value={profileData.contact} onChange={(e) => setProfileData({...profileData, contact: e.target.value})} required />
                  </>
                )}

                {formData.role === 'Admin' && (
                  <p className="text-sm text-slate-500 py-4">No additional profile information required for Admin.</p>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}><ArrowLeft className="mr-2" size={18} /> Back</Button>
                  <Button type="submit" className="flex-1" isLoading={loading}>Complete Signup</Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
          
          <div className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-green-600 hover:text-green-500">Sign in</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
