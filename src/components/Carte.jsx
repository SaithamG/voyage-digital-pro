import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';
import TripMap from './TripMap';
import SmartImage from './SmartImage';

const colorHex = {
  red: '#EF4444',
  amber: '#F59E0B',
  emerald: '#10B981',
  blue: '#3B82F6',
};

const Carte = ({ goToRegion }) => {
  const { colors } = agencyConfig;
  const { regions, transports } = tripConfig;
  const mapped = regions.filter(r => r.coords);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-black text-xl mb-1">Carte du voyage</h2>
        <p className="text-slate-500 text-sm">{mapped.length} étapes reliées · cliquez sur un point</p>
      </div>

      <TripMap regions={regions} onSelectRegion={goToRegion} height="58vh" />

      {/* Étapes du circuit */}
      <div>
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Les étapes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mapped.map((region, i) => {
            const c = colorHex[region.color] || colorHex.blue;
            return (
              <button
                key={region.id}
                onClick={() => goToRegion(region.id)}
                className="group text-left rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all"
              >
                <SmartImage
                  src={region.image}
                  alt={region.name}
                  emoji={region.emoji}
                  color={c}
                  className="h-32"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: c }}>
                    {i + 1}
                  </div>
                  <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                    <div>
                      <p className="text-white font-black text-base leading-tight flex items-center gap-1.5">
                        <span>{region.emoji}</span> {region.name}
                      </p>
                      <p className="text-white/70 text-[11px]">{region.dates} · {region.nights} nuits</p>
                    </div>
                    <ArrowRight size={16} className="text-white/60 group-hover:translate-x-1 transition-transform" />
                  </div>
                </SmartImage>
              </button>
            );
          })}
        </div>
      </div>

      {/* Liaisons */}
      <div className="rounded-2xl p-4" style={{ background: `${colors.primary}12`, border: `1px solid ${colors.primary}25` }}>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} style={{ color: colors.secondary }} />
          <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">Liaisons entre étapes</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-400 text-xs">
          {mapped.map((r, i) => (
            <React.Fragment key={r.id}>
              {i > 0 && <span className="text-slate-600">→</span>}
              <span className="text-white font-semibold">{r.emoji} {r.name}</span>
            </React.Fragment>
          ))}
        </div>
        <p className="text-slate-500 text-[11px] mt-2">
          {transports.filter(t => t.type !== 'Maglev').length} liaisons · trains à grande vitesse & vols intérieurs
        </p>
      </div>

      <p className="text-slate-600 text-[10px] text-center">
        Carte © OpenStreetMap · CARTO — nécessite une connexion internet
      </p>
    </div>
  );
};

export default Carte;
