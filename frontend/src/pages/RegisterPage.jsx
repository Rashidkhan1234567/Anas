import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-full max-w-3xl -z-10">
        <div className="aspect-square w-[600px] rounded-full bg-gradient-to-tr from-green-100 to-green-300 opacity-40 blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Create clinic account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Setup your new AI-powered clinic in seconds
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Card className="py-8 px-4 sm:px-10 border-0 shadow-2xl shadow-green-500/5 bg-white/90 backdrop-blur-xl">
          <form className="space-y-5" onSubmit={handleRegister}>
            
            <Input 
              label="Clinic Name" 
              type="text" 
              placeholder="e.g. City Health Clinic"
              required 
            />

            <Input 
              label="Admin Full Name" 
              type="text" 
              placeholder="John Doe"
              required 
            />

            <Input 
              label="Email address" 
              type="email" 
              placeholder="admin@clinic.com"
              required 
            />
            
            <Input 
              label="Password" 
              type="password" 
              placeholder="Create a strong password"
              required 
            />

            <Button 
              type="submit" 
              className="w-full rounded-xl mt-6"
              isLoading={loading}
            >
              Start Free Trial
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-green-600 hover:text-green-500">
              Sign in
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
