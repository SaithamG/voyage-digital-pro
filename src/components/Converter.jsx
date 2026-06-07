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
        <h2 className="text-ink font-black text-xl mb-1">Convertisseur</h2>
        <p className="text-inkfaint text-sm">Euro ↔ Yuan chinois (CNY) · Taux : 1€ = {currency.rate} ¥</p>
      </div>

      <div className="bg-surface rounded-2xl p-5 border border-line space-y-4">
        {/* EUR */}
        <div>
          <label className="text-inkfaint text-xs font-semibold uppercase tracking-widest mb-2 block">Euros (€)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-inksoft font-bold text-lg">€</span>
            <input
              type="number"
              value={eur}
              onChange={e => handleEur(e.target.value)}
              placeholder="0.00"
              className="w-full bg-surface2 text-ink font-black text-2xl rounded-xl pl-10 pr-4 py-4 outline-none border border-line focus:border-gold placeholder-inkfaint"
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
          <label className="text-inkfaint text-xs font-semibold uppercase tracking-widest mb-2 block">Yuan chinois (¥)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-inksoft font-bold text-lg">¥</span>
            <input
              type="number"
              value={cny}
              onChange={e => handleCny(e.target.value)}
              placeholder="0"
              className="w-full bg-surface2 text-ink font-black text-2xl rounded-xl pl-10 pr-4 py-4 outline-none border border-line focus:border-gold placeholder-inkfaint"
            />
          </div>
        </div>
      </div>

      {/* Conversions rapides */}
      <div>
        <h3 className="text-inkfaint text-xs font-bold uppercase tracking-widest mb-3">Conversions rapides ¥ → €</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {currency.presets.map(val => (
            <button
              key={val}
              onClick={() => handleCny(String(val))}
              className="bg-surface rounded-xl p-3 border border-line hover:border-line transition-all text-center group"
            >
              <p className="text-ink font-black text-lg group-hover:scale-105 transition-transform">{val} ¥</p>
              <p className="text-inkfaint text-xs">{(val / currency.rate).toFixed(2)} €</p>
            </button>
          ))}
        </div>
      </div>

      {/* Références utiles */}
      <div className="bg-surface rounded-2xl p-4 border border-line">
        <h3 className="text-ink font-bold text-sm mb-3">📌 Prix de référence en Chine</h3>
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
              <span className="text-inksoft">{ref.item}</span>
              <div className="text-right">
                <span className="text-ink font-semibold">{ref.cny} ¥</span>
                <span className="text-inkfaint text-xs ml-1">(~{ref.eur} €)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Converter;
