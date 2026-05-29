import React from 'react';
import { Star } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const StatCard = ({ icon, label, value, sub, color = '#C9A227' }) => (
  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div className="text-2xl">{icon}</div>
      <div className="w-2 h-2 rounded-full mt-1" style={{ background: color }} />
    </div>
    <div className="font-black text-2xl text-white leading-none mb-1">{value}</div>
    <div className="text-slate-400 text-xs font-medium">{label}</div>
    {sub && <div className="text-slate-600 text-[10px] mt-1">{sub}</div>}
  </div>
);

const RegionCard = ({ region, index }) => {
  const colorMap = {
    red: { bg: '#EF444420', border: '#EF444440', text: '#F87171' },
    amber: { bg: '#F59E0B20', border: '#F59E0B40', text: '#FBB140' },
    emerald: { bg: '#10B98120', border: '#10B98140', text: '#34D399' },
    blue: { bg: '#3B82F620', border: '#3B82F640', text: '#60A5FA' },
  };
  const c = colorMap[region.color] || colorMap.blue;

  return (
    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all group">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-slate-500 bg-slate-800">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{region.emoji}</span>
            <span className="font-black text-white text-base">{region.name}</span>
          </div>
          <p className="text-slate-500 text-xs italic mb-2">{region.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
              {region.dates}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
              {region.nights} nuits · {region.hotel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const { colors } = agencyConfig;
  const { client, destination, flag, duration, budget, regions, itinerary, transports } = tripConfig;

  const totalBudget = budget.total;
  const totalActivites = itinerary.reduce((sum, day) => sum + day.steps.length, 0);
  const totalVilles = regions.length;

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6" style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 60%, #C9A22730 100%)` }}>
        <div className="absolute top-0 right-0 text-9xl opacity-10 select-none leading-none">{flag}</div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Star size={14} style={{ color: colors.secondary }} fill="currentColor" />
            <span className="text-white/60 text-xs font-medium uppercase tracking-widest">Carnet de voyage</span>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight mb-1">
            {destination} {flag}
          </h1>
          <p className="text-white/70 text-sm mb-4">
            {client.name} · {client.details} · {duration} jours d'aventure
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.map(r => (
              <span key={r.id} className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm">
                {r.emoji} {r.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques clés */}
      <div>
        <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Le voyage en chiffres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon="📅" label="Jours de voyage" value={duration} sub="15 sept. – 5 oct." />
          <StatCard icon="🏙️" label="Villes visitées" value={totalVilles} sub="4 étapes majeures" />
          <StatCard icon="🎯" label="Activités planifiées" value={totalActivites} sub="jours détaillés" />
          <StatCard icon="💰" label="Budget total" value={`${totalBudget.toLocaleString('fr-FR')}€`} sub={`${Math.round(totalBudget / duration)}€/jour`} />
        </div>
      </div>

      {/* Circuit */}
      <div>
        <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Le circuit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {regions.map((region, i) => (
            <RegionCard key={region.id} region={region} index={i} />
          ))}
        </div>
      </div>

      {/* Répartition budget */}
      <div>
        <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Répartition du budget</h2>
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <div className="space-y-3">
            {budget.categories.map(cat => {
              const pct = Math.round((cat.amount / totalBudget) * 100);
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-slate-300 text-sm font-medium">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{cat.amount.toLocaleString('fr-FR')}€</span>
                      <span className="text-slate-600 text-xs w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: colors.primary }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 text-sm font-medium">Total voyage</span>
            <span className="font-black text-xl" style={{ color: colors.secondary }}>{totalBudget.toLocaleString('fr-FR')} €</span>
          </div>
        </div>
      </div>

      {/* Transports clés */}
      <div>
        <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Liaisons principales</h2>
        <div className="space-y-2">
          {transports.map(t => (
            <div key={t.id} className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
              <span className="text-xl">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
                  <span className="truncate">{t.from}</span>
                  <span className="text-slate-600 flex-shrink-0">→</span>
                  <span className="truncate">{t.to}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs mt-0.5">
                  <span>{t.company}</span>
                  <span>·</span>
                  <span>{t.duration}</span>
                  <span>·</span>
                  <span>{t.date}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {t.booked ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">✓ Réservé</span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">À réserver</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer agence */}
      <div className="rounded-2xl p-4 text-center" style={{ background: `${colors.primary}15`, border: `1px solid ${colors.primary}30` }}>
        <p className="text-slate-400 text-xs mb-1">Carnet conçu par <span className="font-bold text-white">{agencyConfig.name}</span></p>
        <p className="text-slate-600 text-[10px]">{agencyConfig.contact.email} · {agencyConfig.contact.phone}</p>
      </div>
    </div>
  );
};

export default Overview;
