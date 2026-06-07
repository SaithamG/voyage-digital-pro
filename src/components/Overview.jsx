import React from 'react';
import { Star } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';
import SmartImage from './SmartImage';

const StatCard = ({ icon, label, value, sub, color = '#C9A227' }) => (
  <div className="bg-surface rounded-2xl p-4 border border-line hover:border-gold transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div className="text-2xl">{icon}</div>
      <div className="w-2 h-2 rounded-full mt-1" style={{ background: color }} />
    </div>
    <div className="font-black text-2xl text-ink leading-none mb-1">{value}</div>
    <div className="text-inksoft text-xs font-medium">{label}</div>
    {sub && <div className="text-inkfaint text-[10px] mt-1">{sub}</div>}
  </div>
);

const RegionCard = ({ region, index }) => {
  const colorMap = {
    red: { bg: '#9A2B2518', border: '#9A2B2540', text: '#9A2B25' },
    amber: { bg: '#B5662A18', border: '#B5662A40', text: '#9C551F' },
    emerald: { bg: '#4A7C6F18', border: '#4A7C6F40', text: '#3D6A5E' },
    blue: { bg: '#36657F18', border: '#36657F40', text: '#36657F' },
  };
  const c = colorMap[region.color] || colorMap.blue;

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-line hover:border-gold transition-all group">
      <SmartImage src={region.image} alt={region.name} emoji={region.emoji} color={c.text} className="h-28">
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white bg-black/40 backdrop-blur-sm">
          {index + 1}
        </div>
        <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2">
          <span className="text-xl">{region.emoji}</span>
          <span className="font-black text-white text-base drop-shadow">{region.name}</span>
        </div>
      </SmartImage>
      <div className="p-4">
        <p className="text-inkfaint text-xs italic mb-2">{region.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
            {region.dates}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface2 text-inksoft">
            {region.nights} nuits · {region.hotel}
          </span>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const { colors } = agencyConfig;
  const { client, destination, flag, duration, budget, regions, itinerary, transports, heroImage } = tripConfig;

  const totalBudget = budget.total;
  const totalActivites = itinerary.reduce((sum, day) => sum + day.steps.length, 0);
  const totalVilles = regions.length;

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <SmartImage src={heroImage} alt={destination} emoji={flag} color={colors.primary} className="rounded-3xl min-h-[15rem]">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.dark}e6 0%, ${colors.primary}b3 55%, transparent 130%)` }} />
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <Star size={14} style={{ color: colors.secondary }} fill="currentColor" />
            <span className="text-white/70 text-xs font-medium uppercase tracking-widest">Carnet de voyage</span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-1 drop-shadow">
            {destination} {flag}
          </h1>
          <p className="text-white/80 text-sm mb-4 drop-shadow">
            {client.name} · {client.details} · {duration} jours d'aventure
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.map(r => (
              <span key={r.id} className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm">
                {r.emoji} {r.name}
              </span>
            ))}
          </div>
        </div>
      </SmartImage>

      {/* Statistiques clés */}
      <div>
        <h2 className="text-inksoft text-xs font-bold uppercase tracking-widest mb-3">Le voyage en chiffres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon="📅" label="Jours de voyage" value={duration} sub="15 sept. – 5 oct." />
          <StatCard icon="🏙️" label="Villes visitées" value={totalVilles} sub="4 étapes majeures" />
          <StatCard icon="🎯" label="Activités planifiées" value={totalActivites} sub="jours détaillés" />
          <StatCard icon="💰" label="Budget total" value={`${totalBudget.toLocaleString('fr-FR')}€`} sub={`${Math.round(totalBudget / duration)}€/jour`} />
        </div>
      </div>

      {/* Circuit */}
      <div>
        <h2 className="text-inksoft text-xs font-bold uppercase tracking-widest mb-3">Le circuit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {regions.map((region, i) => (
            <RegionCard key={region.id} region={region} index={i} />
          ))}
        </div>
      </div>

      {/* Répartition budget */}
      <div>
        <h2 className="text-inksoft text-xs font-bold uppercase tracking-widest mb-3">Répartition du budget</h2>
        <div className="bg-surface rounded-2xl p-5 border border-line">
          <div className="space-y-3">
            {budget.categories.map(cat => {
              const pct = Math.round((cat.amount / totalBudget) * 100);
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-inksoft text-sm font-medium">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-ink font-bold text-sm">{cat.amount.toLocaleString('fr-FR')}€</span>
                      <span className="text-inkfaint text-xs w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: colors.primary }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
            <span className="text-inksoft text-sm font-medium">Total voyage</span>
            <span className="font-black text-xl" style={{ color: colors.secondary }}>{totalBudget.toLocaleString('fr-FR')} €</span>
          </div>
        </div>
      </div>

      {/* Transports clés */}
      <div>
        <h2 className="text-inksoft text-xs font-bold uppercase tracking-widest mb-3">Liaisons principales</h2>
        <div className="space-y-2">
          {transports.map(t => (
            <div key={t.id} className="bg-surface rounded-xl p-3 border border-line flex items-center gap-3">
              <span className="text-xl">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-ink text-sm font-semibold">
                  <span className="truncate">{t.from}</span>
                  <span className="text-inkfaint flex-shrink-0">→</span>
                  <span className="truncate">{t.to}</span>
                </div>
                <div className="flex items-center gap-2 text-inkfaint text-xs mt-0.5">
                  <span>{t.company}</span>
                  <span>·</span>
                  <span>{t.duration}</span>
                  <span>·</span>
                  <span>{t.date}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {t.booked ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300">✓ Réservé</span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">À réserver</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer agence */}
      <div className="rounded-2xl p-4 text-center" style={{ background: `${colors.primary}15`, border: `1px solid ${colors.primary}30` }}>
        <p className="text-inksoft text-xs mb-1">Carnet conçu par <span className="font-bold text-ink">{agencyConfig.name}</span></p>
        <p className="text-inkfaint text-[10px]">{agencyConfig.contact.email} · {agencyConfig.contact.phone}</p>
      </div>
    </div>
  );
};

export default Overview;
