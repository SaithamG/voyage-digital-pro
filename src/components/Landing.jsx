import React, { useEffect, useState } from 'react';
import { Globe, ArrowRight, MapPin, Users, Calendar, Star, Phone } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const Landing = ({ onEnter, timeLeft }) => {
  const { name, tagline, colors, contact } = agencyConfig;
  const { client, destination, flag, departDate, returnDate, duration, regions, reference } = tripConfig;
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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(160deg, #020817 0%, ${colors.dark}99 45%, #020817 100%)`,
        opacity: visible && !leaving ? 1 : 0,
        transform: leaving ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
      }}
    >
      {/* Ligne de couleur agence en haut */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})` }} />

      {/* Décoration fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: colors.primary }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: colors.secondary }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] leading-none opacity-[0.04]"
          style={{ filter: 'blur(2px)' }}
        >
          {flag}
        </div>
      </div>

      {/* Contenu centré */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-8">

        {/* Logo agence */}
        <div
          className="flex items-center gap-3 mb-10"
          style={{
            opacity: visible && !leaving ? 1 : 0,
            transform: visible && !leaving ? 'translateY(0)' : 'translateY(-16px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}
        >
          <div className="p-3 rounded-2xl shadow-2xl" style={{ background: colors.primary }}>
            <Globe size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-black text-xl tracking-tight leading-none">{name}</p>
            <p className="text-xs font-medium mt-0.5 opacity-80" style={{ color: colors.secondary }}>{tagline}</p>
          </div>
        </div>

        {/* Destination hero */}
        <div
          className="text-center mb-8"
          style={{
            opacity: visible && !leaving ? 1 : 0,
            transform: visible && !leaving ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          <div className="text-[7rem] leading-none mb-3" style={{ filter: 'drop-shadow(0 8px 32px rgba(255,255,255,0.08))' }}>
            {flag}
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-4">
            {destination}
          </h1>
          <div className="flex items-center justify-center gap-3">
            {regions.map((r, i) => (
              <React.Fragment key={r.id}>
                {i > 0 && <span className="text-slate-700">·</span>}
                <span className="text-slate-400 text-sm font-medium">{r.emoji} {r.name}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Carte voyage */}
        <div
          className="w-full max-w-sm mb-8"
          style={{
            opacity: visible && !leaving ? 1 : 0,
            transform: visible && !leaving ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s',
          }}
        >
          <div
            className="rounded-3xl p-6 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: `${colors.primary}40`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Star size={11} fill="currentColor" style={{ color: colors.secondary }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.secondary }}>
                Carnet de voyage personnel
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3">
                <Users size={14} className="text-slate-500 flex-shrink-0" />
                <span className="text-white font-bold text-sm">{client.name}</span>
                <span className="text-slate-500 text-xs">· {client.details}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-slate-500 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  {duration} jours ·{' '}
                  {new Date(departDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                  {' → '}
                  {new Date(returnDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-slate-500 flex-shrink-0" />
                <span className="text-slate-400 text-sm">{regions.map(r => r.name).join(' → ')}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="pt-5 border-t" style={{ borderColor: `${colors.primary}25` }}>
              <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold text-center mb-3">
                Départ dans
              </p>
              <div className="flex items-center justify-center gap-4">
                {[
                  { v: timeLeft.jours, l: 'jours' },
                  { v: timeLeft.heures, l: 'heures' },
                  { v: timeLeft.minutes, l: 'min' },
                ].map(({ v, l }, i) => (
                  <React.Fragment key={l}>
                    {i > 0 && <span className="text-slate-800 font-black text-2xl pb-4">:</span>}
                    <div className="text-center">
                      <div className="font-black text-3xl leading-none tabular-nums" style={{ color: colors.secondary }}>
                        {String(v).padStart(2, '0')}
                      </div>
                      <div className="text-slate-600 text-[9px] uppercase tracking-widest mt-1">{l}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: visible && !leaving ? 1 : 0,
            transform: visible && !leaving ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
          }}
        >
          <button
            onClick={handleEnter}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.dark})`,
              boxShadow: `0 0 48px ${colors.primary}50, 0 8px 32px rgba(0,0,0,0.4)`,
            }}
          >
            Découvrir mon carnet
            <ArrowRight size={18} />
          </button>

          <p className="text-slate-700 text-[10px] text-center mt-5">
            Réf. {reference} · Conseillère : {contact.advisor}
          </p>
        </div>
      </div>

      {/* Footer agence */}
      <div
        className="relative text-center pb-5"
        style={{
          opacity: visible && !leaving ? 1 : 0,
          transition: 'opacity 0.6s ease 0.6s',
        }}
      >
        <div className="flex items-center justify-center gap-3 text-slate-700 text-[10px]">
          <span className="font-bold">{name}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Phone size={9} />
            {contact.phone}
          </span>
          <span>·</span>
          <span>{contact.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
