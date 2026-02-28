import { motion } from 'framer-motion';

export function Card({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 10px 40px -10px rgba(34,197,94,0.15)' } : {}}
      className={`glass-card p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
