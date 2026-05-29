import React, { useState } from 'react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const colorMap = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', bar: '#3B82F6' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', bar: '#8B5CF6' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', bar: '#10B981' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', bar: '#F97316' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400', bar: '#EC4899' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', bar: '#EAB308' },
  slate: { bg: 'bg-slate-500/10', border: 'border-slate-500/20', text: 'text-slate-400', bar: '#64748B' },
};

const Finance = () => {
  const { colors } = agencyConfig;
  const { budget, duration, client, destination, currency } = tripConfig;
  const [selected, setSelected] = useState(null);

  const total = budget.total;
  const perPerson = Math.round(total / client.travelers);
  const perDay = Math.round(total / duration);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-black text-xl mb-1">Budget du voyage</h2>
        <p className="text-slate-500 text-sm">{client.name} · {client.details}</p>
      </div>

      {/* Récapitulatif global */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Budget total', value: `${total.toLocaleString('fr-FR')} €`, sub: '100%', icon: '💰' },
          { label: 'Par personne', value: `${perPerson.toLocaleString('fr-FR')} €`, sub: `${client.travelers} voyageurs`, icon: '👤' },
          { label: 'Par jour', value: `${perDay} €`, sub: `${duration} jours`, icon: '📅' },
        ].map(item => (
          <div key={item.label} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-black text-lg text-white leading-none">{item.value}</div>
            <div className="text-slate-500 text-[10px] mt-1">{item.label}</div>
            <div className="text-slate-600 text-[10px]">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Graphique en barres */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <h3 className="text-white font-bold text-sm mb-4">Répartition détaillée</h3>
        <div className="space-y-4">
          {budget.categories.map(cat => {
            const pct = (cat.amount / total) * 100;
            const c = colorMap[cat.color] || colorMap.slate;
            const isSelected = selected === cat.id;
            return (
              <div
                key={cat.id}
                className="cursor-pointer"
                onClick={() => setSelected(isSelected ? null : cat.id)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-black text-sm">{cat.amount.toLocaleString('fr-FR')} €</span>
                    <span className={`text-xs font-bold ${c.text} min-w-[30px] text-right`}>{Math.round(pct)}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: c.bar }}
                  />
                </div>
                {isSelected && (
                  <div className={`mt-2 p-2 rounded-lg text-xs ${c.bg} ${c.text} border ${c.border}`}>
                    {cat.amount.toLocaleString('fr-FR')} € · {Math.round(cat.amount / client.travelers).toLocaleString('fr-FR')} €/pers · {Math.round(cat.amount / duration)} €/jour
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Total voyage</span>
            <span className="font-black text-2xl" style={{ color: colors.secondary }}>{total.toLocaleString('fr-FR')} €</span>
          </div>
        </div>
      </div>

      {/* Infos pratiques */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <h3 className="text-white font-bold text-sm mb-3">💡 Conseils budget {destination}</h3>
        <div className="space-y-2">
          {[
            { icon: '💳', text: 'WeChat Pay et Alipay sont nécessaires — cartes étrangères peu acceptées hors hôtels.' },
            { icon: '💵', text: `Prévoyez 500 ${currency.symbol}/pers en espèces pour les marchés et la street food.` },
            { icon: '🔄', text: `Taux de change estimé : 1€ = ${currency.rate} ${currency.symbol} (${currency.name}).` },
            { icon: '🏧', text: 'Retraits ATM possibles dans les aéroports et grandes villes (frais ~3%).' },
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="flex-shrink-0 mt-0.5">{tip.icon}</span>
              <span>{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finance;
