import React from 'react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const Transport = () => {
  const { colors } = agencyConfig;
  const { transports, destination } = tripConfig;

  const total = transports.reduce((s, t) => s + t.cost, 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-black text-xl mb-1">Transports</h2>
        <p className="text-slate-500 text-sm">{transports.length} liaisons · {total.toLocaleString('fr-FR')} € au total</p>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {transports.map((t, i) => (
          <div key={t.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                  {t.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-white font-black text-sm leading-tight">{t.from} → {t.to}</p>
                      <p className="text-slate-500 text-xs">{t.company} · {t.ref !== '—' ? `Réf. ${t.ref}` : t.type} · {t.class}</p>
                    </div>
                    {t.booked ? (
                      <span className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">✓ Réservé</span>
                    ) : (
                      <span className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">À réserver</span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-slate-800 rounded-lg p-2 text-center">
                      <p className="text-slate-500 text-[9px] uppercase tracking-wider mb-0.5">Départ</p>
                      <p className="text-white font-bold text-sm">{t.departTime}</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-2 text-center">
                      <p className="text-slate-500 text-[9px] uppercase tracking-wider mb-0.5">Durée</p>
                      <p className="font-bold text-sm" style={{ color: colors.secondary }}>{t.duration}</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-2 text-center">
                      <p className="text-slate-500 text-[9px] uppercase tracking-wider mb-0.5">Arrivée</p>
                      <p className="text-white font-bold text-sm">{t.arrivalTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
                    <div>
                      <p className="text-slate-600 text-[10px]">{t.date}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{t.notes}</p>
                    </div>
                    <div className="text-right">
                      {t.cost > 0 ? (
                        <>
                          <p className="text-white font-black text-lg">{t.cost} €</p>
                          <p className="text-slate-600 text-[10px]">{t.costNote}</p>
                        </>
                      ) : (
                        <p className="text-emerald-400 text-xs font-bold">Inclus</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">Total transports locaux</p>
          <p className="text-slate-600 text-xs">Hors vol A/R Paris</p>
        </div>
        <p className="font-black text-2xl" style={{ color: colors.secondary }}>
          {transports.filter(t => t.cost > 0 && !t.booked).reduce((s, t) => s + t.cost, 0)} €
        </p>
      </div>

      {/* Conseils pratiques */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <h3 className="text-white font-bold text-sm mb-3">🚄 Transports en {destination} — À savoir</h3>
        <div className="space-y-2">
          {[
            { icon: '🚄', text: 'Les TGV chinois (Fuxing/Hexie) sont parmi les plus rapides du monde — ponctuels à 98%.' },
            { icon: '📱', text: 'Appli Trip.com pour réserver les trains — interface en français, paiement carte internationale.' },
            { icon: '🆔', text: 'Passeport obligatoire pour retirer les billets TGV en gare (pas de e-ticket pour étrangers).' },
            { icon: '⚡', text: 'Le Maglev de Shanghai (430 km/h) est une expérience unique à ne pas manquer !' },
            { icon: '🚕', text: 'DiDi (Uber chinois) fonctionne partout — bien plus fiable que les taxis dans les grandes villes.' },
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

export default Transport;
