import { forwardRef } from 'react';

export const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  id, 
  ...props 
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5 pb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`
          w-full rounded-xl border px-4 py-3 text-sm transition-colors
          focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500
          disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500
          ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 bg-white/50 hover:bg-white'}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
