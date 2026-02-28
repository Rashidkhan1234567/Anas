import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { User, Users, Activity, ShieldCheck, ArrowLeft } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const roles = [
    { title: 'Patient', icon: User, color: 'bg-blue-500' },
    { title: 'Doctor', icon: Activity, color: 'bg-green-500' },
    { title: 'Receptionist', icon: Users, color: 'bg-amber-500' },
    { title: 'Admin', icon: ShieldCheck, color: 'bg-slate-800' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data));
        
        const dashboardPath = data.role === 'Admin' ? '/dashboard' : 
                            data.role === 'Doctor' ? '/dashboard/doctor' :
                            data.role === 'Receptionist' ? '/dashboard/receptionist' :
                            '/dashboard/patient';
        
        navigate(dashboardPath);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl -z-10">
        <div className="aspect-[1155/678] w-full bg-gradient-to-tr from-green-100 to-green-300 opacity-30 sm:rounded-full sm:blur-3xl shrink-0"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center text-slate-800">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {step === 1 ? 'Who is logging in?' : 'Welcome back!'}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {step === 1 ? 'Select your role to continue' : `Sign in as ${selectedRole}`}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-6 sm:px-10 border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="roles"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-2 gap-4"
              >
                {roles.map((r) => (
                  <button
                    key={r.title}
                    onClick={() => { setSelectedRole(r.title); setStep(2); }}
                    className="p-6 flex flex-col items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white hover:border-green-500 hover:bg-green-50 transition-all group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${r.color} group-hover:scale-110 transition-transform`}>
                      <r.icon size={28} />
                    </div>
                    <span className="font-bold text-slate-800">{r.title}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
                onSubmit={handleLogin}
              >
                {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}
                
                <Input 
                  label="Email address" 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                
                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />

                <div className="flex items-center justify-between py-2">
                  <div className="text-sm">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center text-slate-500 hover:text-green-600 font-medium">
                      <ArrowLeft size={16} className="mr-1" /> Change Role
                    </button>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-green-600 hover:text-green-500">Forgot password?</a>
                  </div>
                </div>

                <Button type="submit" className="w-full rounded-xl" isLoading={loading}>
                  Sign into Portal
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          
          <div className="mt-8 text-center text-sm text-slate-600 border-t border-slate-100 pt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-green-600 hover:text-green-500">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
