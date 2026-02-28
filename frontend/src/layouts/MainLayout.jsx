import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                +
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                Clinic<span className="text-green-500">AI</span>
              </span>
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link to="/#features" className="text-slate-600 hover:text-green-500 transition-colors font-medium text-sm">Features</Link>
              <Link to="/#how-it-works" className="text-slate-600 hover:text-green-500 transition-colors font-medium text-sm">How it works</Link>
              <Link to="/#pricing" className="text-slate-600 hover:text-green-500 transition-colors font-medium text-sm">Pricing</Link>
            </nav>

            <div className="flex gap-4">
              <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium text-sm flex items-center transition-colors">
                Log in
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
