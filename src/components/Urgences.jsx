import React, { useState } from 'react';
import { Phone, Copy, Check, MapPin, Shield } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const PhoneButton = ({ number, label }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(number).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-2">
      <a href={`tel:${number}`} className="flex-1 flex items-center gap-2 bg-surface2 hover:bg-surface2 rounded-xl px-3 py-2.5 transition-all group">
        <Phone size={14} className="text-emerald-600 flex-shrink-0" />
        <div>
          <p className="text-ink font-bold text-sm group-hover:text-emerald-700">{number}</p>
          {label && <p className="text-inkfaint text-[10px]">{label}</p>}
        </div>
      </a>
      <button onClick={copy} className="p-2.5 bg-surface2 rounded-xl text-inkfaint hover:text-ink transition-all">
        {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
      </button>
    </div>
  );
};

const Urgences = () => {
  const { colors } = agencyConfig;
  const { urgences, flag } = tripConfig;

  return (
    <div className="space-y-5">
      {/* Bannière alerte */}
      <div className="bg-red-50 rounded-2xl p-4 border border-red-200 flex items-center gap-3">
        <span className="text-3xl">🚨</span>
        <div>
          <p className="text-red-700 font-black text-sm">En cas d'urgence</p>
          <p className="text-red-600 text-xs">Police : 110 · Ambulance : 120 · Pompiers : 119</p>
        </div>
      </div>

      {/* Numéros locaux */}
      <div className="bg-surface rounded-2xl border border-line overflow-hidden">
        <div className="px-4 py-3 border-b border-line" style={{ background: `${colors.primary}15` }}>
          <h3 className="text-ink font-bold text-sm flex items-center gap-2">
            <span>{flag}</span> Numéros d'urgence — {tripConfig.destination}
          </h3>
        </div>
        <div className="p-4 space-y-2">
          {urgences.local.map((u, i) => (
            <div key={i}>
              <p className="text-inkfaint text-[10px] uppercase tracking-widest mb-1">{u.label}</p>
              <PhoneButton number={u.number} label={u.desc} />
            </div>
          ))}
        </div>
      </div>

      {/* Ambassade & Consulats */}
      <div className="bg-surface rounded-2xl border border-line overflow-hidden">
        <div className="px-4 py-3 border-b border-line" style={{ background: `${colors.primary}15` }}>
          <h3 className="text-ink font-bold text-sm flex items-center gap-2">
            🇫🇷 Services diplomatiques français
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {urgences.embassy.map((e, i) => (
            <div key={i}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-ink font-bold text-sm">{e.label}</p>
                  <p className="text-inkfaint text-xs flex items-center gap-1"><MapPin size={10} />{e.desc}</p>
                  <p className="text-inkfaint text-[10px]">{e.hours}</p>
                </div>
              </div>
              <PhoneButton number={e.number} />
            </div>
          ))}
        </div>
      </div>

      {/* Assurance */}
      <div className="bg-surface rounded-2xl border border-line overflow-hidden">
        <div className="px-4 py-3 border-b border-line" style={{ background: `${colors.primary}15` }}>
          <h3 className="text-ink font-bold text-sm flex items-center gap-2">
            <Shield size={14} style={{ color: colors.secondary }} />
            Assurance voyage
          </h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface2 rounded-xl p-3">
              <p className="text-inkfaint text-[9px] uppercase tracking-widest mb-1">Assureur</p>
              <p className="text-ink font-bold text-sm">{urgences.insurance.company}</p>
            </div>
            <div className="bg-surface2 rounded-xl p-3">
              <p className="text-inkfaint text-[9px] uppercase tracking-widest mb-1">N° police</p>
              <p className="text-ink font-bold text-sm font-mono">{urgences.insurance.policy}</p>
            </div>
          </div>
          <PhoneButton number={urgences.insurance.phone} label={urgences.insurance.company} />
          <div className="p-3 rounded-xl" style={{ background: `${colors.primary}15` }}>
            <p className="text-inksoft text-xs">{urgences.insurance.cover}</p>
          </div>
        </div>
      </div>

      {/* Hôtels avec adresses chinoises */}
      <div className="bg-surface rounded-2xl border border-line overflow-hidden">
        <div className="px-4 py-3 border-b border-line" style={{ background: `${colors.primary}15` }}>
          <h3 className="text-ink font-bold text-sm">🏨 Adresses hôtels en chinois</h3>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-inkfaint text-xs">Montrez l'adresse ci-dessous à votre chauffeur DiDi ou taxi.</p>
          {urgences.hotels.map((h, i) => (
            <div key={i} className="bg-surface2 rounded-xl p-3">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-ink font-bold text-sm">{h.name}</p>
                  <p className="text-inkfaint text-xs">{h.city}</p>
                </div>
                <a href={`tel:${h.phone}`} className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex-shrink-0 ml-2">{h.phone}</a>
              </div>
              <p className="text-2xl font-black mt-2 leading-relaxed" style={{ color: colors.secondary }}>{h.chinese}</p>
              <p className="text-inkfaint text-[10px] mt-1">{h.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phrases d'urgence */}
      <div className="bg-surface rounded-2xl border border-line overflow-hidden">
        <div className="px-4 py-3 border-b border-line" style={{ background: `${colors.primary}15` }}>
          <h3 className="text-ink font-bold text-sm">🗣️ Phrases d'urgence</h3>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {urgences.phrases.map((p, i) => (
            <div key={i} className="bg-red-50 rounded-xl p-3 border border-red-200">
              <p className="text-ink font-bold text-sm mb-1">{p.fr}</p>
              <p className="text-red-600 text-xs italic">{p.pinyin}</p>
              <p className="text-2xl font-black mt-1 text-red-700">{p.chinese}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Urgences;
