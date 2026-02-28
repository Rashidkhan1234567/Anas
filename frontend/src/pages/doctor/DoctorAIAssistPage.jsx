import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BrainCircuit, Send, User, Bot, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function DoctorAIAssistPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello Dr. Smith. Which patient case would you like to discuss today? Please provide symptoms or attach recent labs.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    // Simulate AI thinking and response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'Based on the reported symptoms (frontal headache, nausea, photophobia) and normal vitals, the most likely differential diagnoses include:\n\n1. Migraine without aura (Primary)\n2. Tension-type headache\n3. Sinusitis\n\nRecommendation: First-line abortive therapy with an NSAID or Triptan. Would you like me to draft a prescription for Sumatriptan 50mg?' }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BrainCircuit size={24} className="text-green-500" /> 
          Diagnostic Assistant
        </h1>
        <p className="text-sm text-slate-500 mt-1">Powered by ClinicAI Clinical Guidelines Model V4</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs flex gap-2 mb-4">
        <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
        <p>This tool is for decision support only and does not replace professional medical judgment. Review all AI-generated suggestions before applying them to a patient's care plan.</p>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col p-0 border border-slate-200 shadow-sm bg-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 border-2 border-white shadow-sm">
                  <Bot size={16} />
                </div>
              )}
              
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-green-500 text-white rounded-tr-none shadow-md shadow-green-500/20' 
                  : 'bg-white border text-slate-700 border-slate-200 rounded-tl-none shadow-sm'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <User size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2 relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe symptoms, ask for treatment guidelines, or paste lab results..."
              className="w-full pl-5 pr-14 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
