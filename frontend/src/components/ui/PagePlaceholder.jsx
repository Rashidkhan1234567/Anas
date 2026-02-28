import { motion } from 'framer-motion';
import { Card } from './Card';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PagePlaceholder({ title, description, icon: Icon }) {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-teal-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="text-center p-12 shadow-2xl shadow-green-500/10 border border-white/40 bg-white/70 backdrop-blur-xl rounded-3xl">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-50 rounded-3xl mx-auto flex items-center justify-center text-green-500 shadow-inner mb-6 -mt-20 border-4 border-white"
          >
            {Icon && <Icon size={40} strokeWidth={1.5} />}
          </motion.div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">{title}</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)} className="rounded-full shadow-sm hover:shadow-md transition-all gap-2">
              <ArrowLeft size={16} /> Go Back
            </Button>
            <Button variant="primary" className="rounded-full shadow-md shadow-green-500/30 hover:shadow-lg hover:shadow-green-500/40 transition-all hover:-translate-y-0.5" onClick={() => navigate(0)}>
              Refresh View
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
