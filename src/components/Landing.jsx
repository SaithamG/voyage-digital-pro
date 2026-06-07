import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, Users, Calendar, Star, Phone } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const Landing = ({ onEnter, timeLeft }) => {
  const { name, tagline, colors, contact } = agencyConfig;
  const { client, destination, flag, departDate, returnDate, duration, regions, reference, heroImage } = tripConfig;
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 450);
  };

  const fade = (delay, dy = 0) => ({
    opacity: visible && !leaving ? 1 : 0,
    transform: visible && !leaving ? 'translateY(0)' : `translateY(${dy}px)`,
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  const fmtLong = (d) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-paper"
      style={{
        opacity: visible && !leaving ? 1 : 0,
        transform: leaving ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
      }}
    >
      {/* Photo d'en-tête */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <img src={heroImage} alt={destination} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${colors.dark}cc 0%, ${colors.dark}59 35%, ${colors.dark}f2 100%)` }}
        />
      </div>

      <div className="relative min-h-full flex flex-col">
        {/* Marque agence */}
        <div className="px-6 pt-6 flex items-center gap-3" style={fade(0.1, -16)}>
          <div className="p-2.5 rounded-xl shadow-lg" style={{ background: colors.secondary }}>
            <Star size={16} style={{ color: colors.dark }} fill="currentColor" />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none font-serif">{name}</p>
            <p className="text-xs mt-0.5" style={{ color: colors.secondary }}>{tagline}</p>
          </div>
        </div>

        {/* Bloc central */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
          <div style={fade(0.2, 20)}>
            <p className="uppercase tracking-[0.3em] text-[11px] font-bold mb-3" style={{ color: colors.secondary }}>
              Carnet de voyage
            </p>
            <div className="text-[5rem] leading-none mb-1" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))' }}>
              {flag}
            </div>
            <h1 className="text-white font-black text-6xl font-serif tracking-tight mb-4 drop-shadow-lg">
              {destination}
            </h1>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {regions.map((r, i) => (
                <React.Fragment key={r.id}>
                  {i > 0 && <span className="text-white/40">·</span>}
                  <span className="text-white/80 text-sm font-medium">{r.emoji} {r.name}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Carte détails */}
          <div
            className="w-full max-w-sm mt-8 rounded-3xl p-6 bg-surface border border-line text-left shadow-2xl"
            style={fade(0.35, 24)}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star size={11} fill="currentColor" style={{ color: colors.primary }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.primary }}>
                Votre voyage sur mesure
              </span>
            </div>

            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-3">
                <Users size={14} className="text-inkfaint flex-shrink-0" />
                <span className="text-ink font-bold text-sm">{client.name}</span>
                <span className="text-inkfaint text-xs">· {client.details}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-inkfaint flex-shrink-0" />
                <span className="text-inksoft text-sm">
                  {duration} jours · {fmtLong(departDate)} → {fmtLong(returnDate)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-inkfaint flex-shrink-0" />
                <span className="text-inksoft text-sm">{regions.map(r => r.name).join(' → ')}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-line">
              <p className="text-[9px] text-inkfaint uppercase tracking-widest font-bold text-center mb-3">Départ dans</p>
              <div className="flex items-center justify-center gap-4">
                {[
                  { v: timeLeft.jours, l: 'jours' },
                  { v: timeLeft.heures, l: 'heures' },
                  { v: timeLeft.minutes, l: 'min' },
                ].map(({ v, l }, i) => (
                  <React.Fragment key={l}>
                    {i > 0 && <span className="text-line font-black text-2xl pb-4">:</span>}
                    <div className="text-center">
                      <div className="font-black text-3xl leading-none tabular-nums" style={{ color: colors.primary }}>
                        {String(v).padStart(2, '0')}
                      </div>
                      <div className="text-inkfaint text-[9px] uppercase tracking-widest mt-1">{l}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={fade(0.5, 16)}>
            <button
              onClick={handleEnter}
              className="mt-8 flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-base font-serif transition-all hover:scale-105 active:scale-95"
              style={{ background: colors.primary, boxShadow: '0 14px 44px rgba(0,0,0,0.35)' }}
            >
              Découvrir mon carnet
              <ArrowRight size={18} />
            </button>
            <p className="text-white/60 text-[10px] text-center mt-4">
              Réf. {reference} · Conseillère : {contact.advisor}
            </p>
          </div>
        </div>

        {/* Footer agence */}
        <div className="pb-5 text-center" style={fade(0.6, 0)}>
          <div className="flex items-center justify-center gap-3 text-white/60 text-[10px]">
            <span className="font-bold">{name}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Phone size={9} />{contact.phone}</span>
            <span>·</span>
            <span>{contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
