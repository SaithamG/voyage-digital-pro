import React, { useState, useEffect } from 'react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const ModeVoyage = () => {
  const { colors } = agencyConfig;
  const { departDate, returnDate, destination, flag, regions, itinerary, client } = tripConfig;
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const depart = new Date(departDate);
  const retour = new Date(returnDate);
  const isBeforeTrip = now < depart;
  const isDuringTrip = now >= depart && now <= retour;

  // Heure à Pékin/Shanghai (UTC+8)
  const chinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  const parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));

  const timeStr = (d) => d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (isBeforeTrip) {
    const daysLeft = Math.ceil((depart - now) / (1000 * 60 * 60 * 24));
    const nextReservation = tripConfig.runbook.find(r => r.status === 'pending' && r.alertDate);

    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-ink font-black text-xl mb-1">Mode Voyage</h2>
          <p className="text-inkfaint text-sm">Phase de préparation</p>
        </div>

        {/* Countdown hero */}
        <div className="relative overflow-hidden rounded-3xl p-6" style={{ background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})` }}>
          <div className="absolute top-0 right-0 text-8xl opacity-10 select-none">{flag}</div>
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Départ dans</p>
          <p className="text-white font-black text-6xl leading-none mb-1">{daysLeft}</p>
          <p className="text-white/80 text-lg">jours</p>
          <p className="text-white/50 text-xs mt-3">
            {depart.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Horloges */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface rounded-2xl p-4 border border-line text-center">
            <p className="text-inkfaint text-[10px] uppercase tracking-widest mb-1">🇫🇷 Paris</p>
            <p className="text-ink font-black text-2xl">{timeStr(parisTime)}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4 border border-line text-center">
            <p className="text-inkfaint text-[10px] uppercase tracking-widest mb-1">🇨🇳 Chine</p>
            <p className="font-black text-2xl" style={{ color: colors.secondary }}>{timeStr(chinaTime)}</p>
          </div>
        </div>

        {/* Prochaine étape */}
        {nextReservation && (
          <div className="bg-surface rounded-2xl p-4 border border-amber-300" style={{ background: 'rgba(245,158,11,0.05)' }}>
            <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-1">⏰ Prochaine action</p>
            <p className="text-ink font-bold text-sm">{nextReservation.label}</p>
            <p className="text-inksoft text-xs mt-1">{nextReservation.notes}</p>
            <p className="text-amber-700 text-xs font-bold mt-1">
              Date limite : {new Date(nextReservation.alertDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </p>
          </div>
        )}

        {/* Preview circuit */}
        <div>
          <h3 className="text-inksoft text-xs font-bold uppercase tracking-widest mb-3">Votre circuit</h3>
          <div className="space-y-2">
            {regions.map((r, i) => (
              <div key={r.id} className="flex items-center gap-3 bg-surface rounded-xl p-3 border border-line">
                <div className="w-7 h-7 rounded-lg bg-surface2 flex items-center justify-center text-xs font-black text-inkfaint">{i + 1}</div>
                <span className="text-xl">{r.emoji}</span>
                <div className="flex-1">
                  <p className="text-ink font-bold text-sm">{r.name}</p>
                  <p className="text-inkfaint text-xs">{r.dates} · {r.nights} nuits</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isDuringTrip) {
    const dayNum = Math.floor((now - depart) / (1000 * 60 * 60 * 24)) + 1;
    const todayData = itinerary.find(d => d.day === dayNum);
    const currentRegion = regions.find(r => r.id === todayData?.regionId);
    const tripProgress = ((now - depart) / (retour - depart)) * 100;

    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-ink font-black text-xl mb-1">Mode Voyage Actif</h2>
          <p className="text-inkfaint text-sm">{destination} {flag} · Jour {dayNum}/{itinerary.length}</p>
        </div>

        {/* Heure locale */}
        <div className="rounded-3xl p-5" style={{ background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs">Heure locale</p>
              <p className="text-white font-black text-4xl">{timeStr(chinaTime)}</p>
              <p className="text-white/50 text-xs">Paris : {timeStr(parisTime)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs">Jour</p>
              <p className="font-black text-5xl" style={{ color: colors.secondary }}>{dayNum}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-white/40 text-[10px] mb-1">
              <span>Départ</span>
              <span>{Math.round(tripProgress)}% du voyage</span>
              <span>Retour</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-white/40" style={{ width: `${tripProgress}%` }} />
            </div>
          </div>
        </div>

        {currentRegion && (
          <div className="bg-surface rounded-2xl p-4 border border-line">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentRegion.emoji}</span>
              <div>
                <p className="text-ink font-black">{currentRegion.name}</p>
                <p className="text-inkfaint text-xs">{currentRegion.description}</p>
              </div>
            </div>
            <p className="text-inksoft text-xs">🏨 {currentRegion.hotel}</p>
          </div>
        )}

        {todayData && (
          <div className="bg-surface rounded-2xl border border-line overflow-hidden">
            <div className="px-4 py-3 border-b border-line" style={{ background: `${colors.primary}15` }}>
              <p className="text-ink font-black">{todayData.title}</p>
              <p className="text-inkfaint text-xs">{todayData.dayLabel}</p>
            </div>
            <div className="p-4 space-y-2">
              {todayData.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-inkfaint text-xs font-mono w-10 flex-shrink-0 mt-0.5">{step.time}</span>
                  <span className="text-lg flex-shrink-0">{step.icon}</span>
                  <div>
                    <p className="text-ink text-sm font-semibold">{step.title}</p>
                    <p className="text-inkfaint text-xs">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Post-trip
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-ink font-black text-xl mb-1">Voyage terminé !</h2>
        <p className="text-inkfaint text-sm">{destination} {flag} · {tripConfig.duration} jours d'aventure</p>
      </div>
      <div className="rounded-3xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})` }}>
        <p className="text-6xl mb-3">🎉</p>
        <p className="text-white font-black text-2xl mb-1">Bravo {client.name} !</p>
        <p className="text-white/70 text-sm">{tripConfig.duration} jours · {regions.length} villes · Souvenirs à vie</p>
      </div>
      <div className="bg-surface rounded-2xl p-4 border border-line text-center">
        <p className="text-inksoft text-sm">Réservez votre prochain voyage avec</p>
        <p className="font-black text-lg" style={{ color: colors.secondary }}>{agencyConfig.name}</p>
        <p className="text-inkfaint text-xs mt-1">{agencyConfig.contact.phone}</p>
      </div>
    </div>
  );
};

export default ModeVoyage;
