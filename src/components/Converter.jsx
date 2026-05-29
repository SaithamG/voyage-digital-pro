import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const Converter = () => {
  const { colors } = agencyConfig;
  const { currency } = tripConfig;
  const [eur, setEur] = useState('');
  const [cny, setCny] = useState('');

  const handleEur = (v) => {
    setEur(v);
    const n = parseFloat(v);
    setCny(isNaN(n) ? '' : (n * currency.rate).toFixed(0));
  };

  const handleCny = (v) => {
    setCny(v);
    const n = parseFloat(v);
    setEur(isNaN(n) ? '' : (n / currency.rate).toFixed(2));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-black text-xl mb-1">Convertisseur</h2>
        <p className="text-slate-500 text-sm">Euro ↔ Yuan chinois (CNY) · Taux : 1€ = {currency.rate} ¥</p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
        {/* EUR */}
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2 block">Euros (€)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">€</span>
            <input
              type="number"
              value={eur}
              onChange={e => handleEur(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-800 text-white font-black text-2xl rounded-xl pl-10 pr-4 py-4 outline-none border border-slate-700 focus:border-slate-500 placeholder-slate-700"
            />
          </div>
        </div>

        {/* Swap icon */}
        <div className="flex justify-center">
          <div className="p-2 rounded-xl" style={{ background: `${colors.primary}20` }}>
            <ArrowRightLeft size={18} style={{ color: colors.secondary }} />
          </div>
        </div>

        {/* CNY */}
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2 block">Yuan chinois (¥)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">¥</span>
            <input
              type="number"
              value={cny}
              onChange={e => handleCny(e.target.value)}
              placeholder="0"
              className="w-full bg-slate-800 text-white font-black text-2xl rounded-xl pl-10 pr-4 py-4 outline-none border border-slate-700 focus:border-slate-500 placeholder-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Conversions rapides */}
      <div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Conversions rapides ¥ → €</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {currency.presets.map(val => (
            <button
              key={val}
              onClick={() => handleCny(String(val))}
              className="bg-slate-900 rounded-xl p-3 border border-slate-800 hover:border-slate-700 transition-all text-center group"
            >
              <p className="text-white font-black text-lg group-hover:scale-105 transition-transform">{val} ¥</p>
              <p className="text-slate-500 text-xs">{(val / currency.rate).toFixed(2)} €</p>
            </button>
          ))}
        </div>
      </div>

      {/* Références utiles */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <h3 className="text-white font-bold text-sm mb-3">📌 Prix de référence en Chine</h3>
        <div className="space-y-2">
          {[
            { item: 'Repas street food', cny: '15-30', eur: `${(22.5 / currency.rate).toFixed(1)}` },
            { item: 'Restaurant mid-range (famille)', cny: '150-250', eur: `${(200 / currency.rate).toFixed(0)}` },
            { item: 'Métro Shanghai', cny: '3-8', eur: `${(5 / currency.rate).toFixed(2)}` },
            { item: 'DiDi trajet moyen', cny: '20-50', eur: `${(35 / currency.rate).toFixed(1)}` },
            { item: 'Hot-pot Haidilao (famille)', cny: '300-500', eur: `${(400 / currency.rate).toFixed(0)}` },
            { item: 'Entrée Cité Interdite', cny: '60', eur: `${(60 / currency.rate).toFixed(1)}` },
          ].map((ref, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{ref.item}</span>
              <div className="text-right">
                <span className="text-white font-semibold">{ref.cny} ¥</span>
                <span className="text-slate-600 text-xs ml-1">(~{ref.eur} €)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Converter;
