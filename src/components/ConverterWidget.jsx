import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const ConverterWidget = () => {
  const { colors } = agencyConfig;
  const { currency } = tripConfig;
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState('');
  const [mode, setMode] = useState('cny');

  const result = mode === 'cny'
    ? (parseFloat(val) / currency.rate).toFixed(2)
    : (parseFloat(val) * currency.rate).toFixed(0);

  const isValid = !isNaN(parseFloat(val)) && parseFloat(val) > 0;

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {open && (
        <div className="mb-2 w-64 bg-slate-900 rounded-2xl shadow-2xl border p-4 space-y-3" style={{ borderColor: `${colors.primary}50` }}>
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-sm">Convertisseur rapide</span>
            <span className="text-slate-600 text-xs">1€ = {currency.rate}¥</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('cny')}
              className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={mode === 'cny' ? { background: colors.primary, color: 'white' } : { background: '#1e293b', color: '#94a3b8' }}
            >¥ → €</button>
            <button
              onClick={() => setMode('eur')}
              className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={mode === 'eur' ? { background: colors.primary, color: 'white' } : { background: '#1e293b', color: '#94a3b8' }}
            >€ → ¥</button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">{mode === 'cny' ? '¥' : '€'}</span>
            <input
              type="number"
              value={val}
              onChange={e => setVal(e.target.value)}
              placeholder="Montant"
              autoFocus
              className="w-full bg-slate-800 text-white font-black text-xl rounded-xl pl-8 pr-3 py-2.5 outline-none border border-slate-700 focus:border-slate-600 placeholder-slate-700"
            />
          </div>
          {isValid && (
            <div className="text-center py-2 rounded-xl" style={{ background: `${colors.primary}20` }}>
              <p className="font-black text-2xl" style={{ color: colors.secondary }}>
                {result} {mode === 'cny' ? '€' : '¥'}
              </p>
              <p className="text-slate-600 text-[10px] mt-0.5">{val} {mode === 'cny' ? '¥ chinois' : '€ euros'}</p>
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-2xl shadow-2xl flex items-center justify-center text-white font-black transition-all hover:scale-105"
        style={{ background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})` }}
      >
        {open ? <ChevronDown size={20} /> : <span className="text-lg">{tripConfig.currency.symbol}</span>}
      </button>
    </div>
  );
};

export default ConverterWidget;
