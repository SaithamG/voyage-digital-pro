import React from 'react';
import { Globe, MapPin, Users, Calendar, Phone, Star } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const TABS = [
  { id: 'voyage', label: 'Voyage', icon: '✈️' },
  { id: 'overview', label: 'Vue d\'ensemble', icon: '🗺️' },
  { id: 'roadbook', label: 'Roadbook', icon: '📍' },
  { id: 'map', label: 'Carte', icon: '🧭' },
  { id: 'finance', label: 'Budget', icon: '💰' },
  { id: 'expenses', label: 'Dépenses', icon: '💳' },
  { id: 'transport', label: 'Transports', icon: '🚄' },
  { id: 'conversion', label: 'Convertisseur', icon: '💱' },
  { id: 'checklist', label: 'Checklist', icon: '✅' },
  { id: 'lexique', label: 'Lexique', icon: '🇨🇳' },
  { id: 'runbook', label: 'Réservations', icon: '📋' },
  { id: 'urgences', label: 'Urgences', icon: '🚨' },
  { id: 'ai', label: 'Coach IA', icon: '🤖' },
];

const Header = ({ activeTab, setActiveTab, timeLeft }) => {
  const { name, tagline, colors, contact } = agencyConfig;
  const { client, destination, flag, departDate, returnDate, duration } = tripConfig;

  return (
    <header className="bg-slate-950 sticky top-0 z-40" style={{ borderBottom: `1px solid ${colors.primary}44` }}>
      {/* Barre Agence */}
      <div style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 100%)` }}>
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg" style={{ background: colors.secondary }}>
              <Globe size={15} className="text-slate-900" />
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none tracking-tight">{name}</p>
              <p className="text-[10px] font-medium leading-none mt-0.5 opacity-80" style={{ color: colors.secondary }}>{tagline}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <p className="text-white/50 text-[9px] uppercase tracking-widest font-bold">Votre conseillère</p>
              <p className="text-white text-xs font-bold leading-none mt-0.5">{contact.advisor}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
              <Phone size={11} style={{ color: colors.secondary }} />
              <span className="text-xs font-bold" style={{ color: colors.secondary }}>{contact.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barre Voyage */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-1 rounded" style={{ background: `${colors.primary}33` }}>
                <MapPin size={13} style={{ color: colors.secondary }} />
              </div>
              <span className="text-white font-black text-xl tracking-tight">{destination}</span>
              <span className="text-2xl">{flag}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 ml-1">
              <span className="flex items-center gap-1 text-slate-400 text-xs">
                <Users size={10} /> {client.details}
              </span>
              <span className="flex items-center gap-1 text-slate-400 text-xs">
                <Calendar size={10} />
                {duration} jours · {new Date(departDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} au {new Date(returnDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-slate-500 text-[9px] uppercase tracking-widest font-bold mb-1">Départ dans</p>
            <div className="flex items-center gap-2">
              {[
                { v: timeLeft.jours, l: 'j' },
                { v: timeLeft.heures, l: 'h' },
                { v: timeLeft.minutes, l: 'm' },
                { v: timeLeft.secondes, l: 's' },
              ].map(({ v, l }, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="text-slate-700 font-black text-lg">:</span>}
                  <div className="text-center">
                    <div className="font-black text-xl leading-none" style={{ color: colors.secondary }}>{String(v).padStart(2, '0')}</div>
                    <div className="text-slate-600 text-[9px] uppercase tracking-widest mt-0.5">{l}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Badge client */}
      <div style={{ background: `${colors.primary}12`, borderBottom: `1px solid ${colors.primary}25` }}>
        <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center gap-2">
          <Star size={11} style={{ color: colors.secondary }} fill="currentColor" />
          <span className="text-slate-400 text-[11px]">Carnet personnel de</span>
          <span className="text-[11px] font-black" style={{ color: colors.secondary }}>{client.name}</span>
          <span className="text-slate-700 text-[11px] mx-0.5">·</span>
          <span className="text-slate-600 text-[10px] font-mono">Réf. {tripConfig.reference}</span>
        </div>
      </div>

      {/* Navigation onglets */}
      <div className="bg-slate-950 overflow-x-auto scrollbar-hide">
        <div className="flex gap-0.5 px-3 py-2 max-w-5xl mx-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={activeTab === tab.id ? { background: colors.primary } : {}}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
