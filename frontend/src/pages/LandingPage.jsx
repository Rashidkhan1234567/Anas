import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Calendar, FileText, BrainCircuit, ActivitySquare, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const stepsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    // GSAP Scroll Animation for "How It Works"
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.step-card');
      
      gsap.from(steps, {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, stepsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-200 to-green-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 flex justify-center">
              <span className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-green-700 bg-green-50 ring-1 ring-inset ring-green-500/20 font-medium">
                Announcing ClinicAI Pro - Smarter Patient Care
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
              Smart AI Powered <br/> <span className="text-green-500">Clinic Management</span> System
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 mb-10">
              Digitize your clinic with next-gen AI. Seamlessly handle patient records, automate appointments, intelligently generate prescriptions, and leverage AI diagnostic assistance.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Link to="/login" className="text-base font-semibold leading-6 text-slate-900 hover:text-green-500 flex items-center transition-colors">
                Log in <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-green-500">Transform your practice</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to run a modern clinic</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Patient Management", desc: "Complete EMR with history, labs, and visit notes.", icon: <ActivitySquare className="text-green-500 w-6 h-6" /> },
              { title: "Smart Scheduling", desc: "Automated booking engine with reminders.", icon: <Calendar className="text-green-500 w-6 h-6" /> },
              { title: "AI Diagnosis Assist", desc: "Get real-time differential diagnosis suggestions.", icon: <BrainCircuit className="text-green-500 w-6 h-6" /> },
              { title: "Digital Prescriptions", desc: "Generate readable, printable PDF Rx instantly.", icon: <FileText className="text-green-500 w-6 h-6" /> },
              { title: "Analytics Dashboard", desc: "Track revenue, patient volume, and clinic growth.", icon: <Activity className="text-green-500 w-6 h-6" /> },
              { title: "Role-Based Access", desc: "Specific portals for doctors, receptionists & admins.", icon: <CheckCircle2 className="text-green-500 w-6 h-6" /> }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50 sm:py-32" ref={stepsRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-green-500">Workflow</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How ClinicAI streamlines your day</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "Register Clinic", desc: "Create an admin account and onboard stuff quickly" },
                { step: "02", title: "Add Patients", desc: "Reception creates profiles or patients book online" },
                { step: "03", title: "Consultation", desc: "Doctor reviews history and uses AI to aid diagnosis" },
                { step: "04", title: "Prescribe", desc: "Generate PDF prescription and log the visit securely" }
              ].map((item, i) => (
                <div key={i} className="step-card relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-md -mt-14 ring-4 ring-white">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, transparent pricing</h2>
          </div>
          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Free Plan */}
            <div className="rounded-3xl p-8 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold leading-8 text-slate-900">Basic Plan</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">Perfect for small, starting clinics.</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-slate-900">$0</span>
                <span className="text-sm font-semibold leading-6 text-slate-600">/month</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-green-500" /> Up to 50 patients/month</li>
                <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-green-500" /> Basic appointment tracking</li>
                <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-green-500" /> Simple dashboard</li>
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-full">Get started</Button>
            </div>

            {/* Pro Plan */}
            <div className="rounded-3xl p-8 ring-2 ring-green-500 bg-slate-900 text-white relative shadow-2xl">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Most Popular</div>
              <h3 className="text-lg font-semibold leading-8">Pro Plan</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">Advanced AI features for scaling clinics.</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">$49</span>
                <span className="text-sm font-semibold leading-6 text-slate-300">/month</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
                <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-green-400" /> Unlimited patients</li>
                <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-green-400" /> AI Diagnostic Assistant enabled</li>
                <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-green-400" /> Advanced Analytics</li>
                <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-green-400" /> Prescription PDFs</li>
              </ul>
              <Button variant="primary" className="mt-8 w-full rounded-full bg-green-500 hover:bg-green-400 text-slate-900 border-none">Get Started Pro</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2 text-slate-400">
            <a href="#" className="hover:text-green-500">About</a>
            <a href="#" className="hover:text-green-500">Contact</a>
            <a href="#" className="hover:text-green-500">Privacy</a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-slate-500">
              &copy; {new Date().getFullYear()} ClinicAI SaaS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
