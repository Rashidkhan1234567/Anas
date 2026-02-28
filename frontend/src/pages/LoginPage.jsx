import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl -z-10">
        <div className="aspect-[1155/678] w-full bg-gradient-to-tr from-green-100 to-green-300 opacity-30 sm:rounded-full sm:blur-3xl shrink-0"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            +
          </div>
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to your ClinicAI account
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Card className="py-8 px-4 sm:px-10 border-0 shadow-2xl shadow-green-500/5 bg-white/90 backdrop-blur-xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['admin', 'doctor', 'receptionist', 'patient'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      role === r 
                        ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' 
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <Input 
              label="Email address" 
              type="email" 
              placeholder="you@example.com"
              required 
            />
            
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              required 
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-xl"
              isLoading={loading}
            >
              Sign in
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-green-600 hover:text-green-500">
              Create an account
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
