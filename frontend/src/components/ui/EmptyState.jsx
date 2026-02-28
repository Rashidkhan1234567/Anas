import { motion } from 'framer-motion';
import { Button } from './Button';

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = ''
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 mb-4 rounded-full bg-green-50 flex items-center justify-center text-green-500">
          <Icon size={32} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
