import React from 'react';
import { MapPin, Users, Calendar, Phone, Star } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const TABS = [
  { id: 'voyage', label: 'Voyage', icon: '🗺️' },
  { id: 'roadbook', label: 'Itinéraire', icon: '📖' },
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'pratique', label: 'Pratique', icon: '🧳' },
  { id: 'ai', label: 'Coach IA', icon: '✦' },
];

const Header = ({ activeTab, setActiveTab, timeLeft }) => {
  const { name, tagline, colors, contact } = agencyConfig;
  const { client, destination, flag, departDate, returnDate, duration, reference } = tripConfig;

  const fmt = (d) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

  return (
    <header className="bg-paper sticky top-0 z-40 border-b border-line">
      {/* Bandeau de marque agence */}
      <div style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 100%)` }}>
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg" style={{ background: colors.secondary }}>
              <Star size={13} style={{ color: colors.dark }} fill="currentColor" />
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none tracking-tight font-serif">{name}</p>
              <p className="text-[10px] font-medium leading-none mt-0.5" style={{ color: colors.secondary }}>{tagline}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <p className="text-white/50 text-[9px] uppercase tracking-widest font-bold">Votre conseillère</p>
              <p className="text-white text-xs font-bold leading-none mt-0.5">{contact.advisor}</p>
            </div>
            <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
              <Phone size={11} style={{ color: colors.secondary }} />
              <span className="text-xs font-bold" style={{ color: colors.secondary }}>{contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barre voyage */}
      <div className="bg-surface border-b border-line">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-ink font-black text-2xl tracking-tight font-serif">{destination}</span>
              <span className="text-2xl">{flag}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              <span className="flex items-center gap-1 text-inksoft text-xs">
                <Users size={10} /> {client.details}
              </span>
              <span className="flex items-center gap-1 text-inksoft text-xs">
                <Calendar size={10} /> {duration} jours · {fmt(departDate)} – {fmt(returnDate)}
              </span>
              <span className="hidden sm:flex items-center gap-1 text-inkfaint text-[11px]">
                <MapPin size={10} /> Réf. {reference}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-inkfaint text-[9px] uppercase tracking-widest font-bold mb-1">Départ dans</p>
            <div className="flex items-center gap-2">
              {[
                { v: timeLeft.jours, l: 'j' },
                { v: timeLeft.heures, l: 'h' },
                { v: timeLeft.minutes, l: 'm' },
                { v: timeLeft.secondes, l: 's' },
              ].map(({ v, l }, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="text-inkfaint font-black text-lg">:</span>}
                  <div className="text-center">
                    <div className="font-black text-xl leading-none tabular-nums" style={{ color: colors.primary }}>{String(v).padStart(2, '0')}</div>
                    <div className="text-inkfaint text-[9px] uppercase tracking-widest mt-0.5">{l}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation — 5 onglets (empilés sur mobile, en ligne sur desktop) */}
      <div className="bg-paper">
        <div className="flex gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 max-w-5xl mx-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={activeTab === tab.id ? { background: colors.primary } : {}}
              className={`flex-1 min-w-0 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2 py-1.5 sm:py-2 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'text-white shadow-sm'
                  : 'text-inksoft hover:text-ink hover:bg-surface2'
              }`}
            >
              <span className="text-base sm:text-sm leading-none">{tab.icon}</span>
              <span className="text-[10px] sm:text-xs leading-tight truncate max-w-full">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
