import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';

const PRESETS = [
  { label: '90 min', value: 90 },
  { label: '2h', value: 120 },
];

const ChronoHotPot = () => {
  const { colors } = agencyConfig;
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(90);
  const [remaining, setRemaining] = useState(90 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => setRemaining(r => r - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      if (remaining === 0) setRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, remaining]);

  const reset = (d = duration) => {
    setRunning(false);
    setRemaining(d * 60);
  };

  const toggle = () => setRunning(r => !r);

  const total = duration * 60;
  const pct = (remaining / total) * 100;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  const getColor = () => {
    if (pct > 50) return '#10B981';
    if (pct > 20) return '#F97316';
    return '#EF4444';
  };

  const r = 30;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ * (1 - pct / 100);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-4 z-50 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl transition-all hover:scale-105"
        style={{ background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})` }}
        title="Chrono Hot-Pot"
      >
        🍲
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 left-4 z-50 bg-surface rounded-2xl shadow-2xl border p-4 w-52" style={{ borderColor: `${colors.primary}50` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span>🍲</span>
          <span className="text-ink font-bold text-xs">Hot-Pot Timer</span>
        </div>
        <button onClick={() => setOpen(false)} className="text-inkfaint hover:text-ink text-xs transition-colors">✕</button>
      </div>

      {/* Cercle */}
      <div className="flex justify-center mb-3">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r={r} fill="none" stroke="#E7DBC4" strokeWidth="6" />
            <circle
              cx="40" cy="40" r={r} fill="none"
              stroke={getColor()} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-ink font-black text-lg leading-none">{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</span>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="flex gap-1.5 mb-3">
        {PRESETS.map(p => (
          <button
            key={p.value}
            onClick={() => { setDuration(p.value); reset(p.value); }}
            className="flex-1 py-1 rounded-lg text-xs font-bold transition-all"
            style={duration === p.value ? { background: colors.primary, color: 'white' } : { background: 'var(--c-surface2)', color: 'var(--c-inksoft)' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Contrôles */}
      <div className="flex gap-1.5">
        <button onClick={toggle} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-white text-xs font-bold transition-all hover:opacity-90" style={{ background: colors.primary }}>
          {running ? <Pause size={12} /> : <Play size={12} />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => reset()} className="p-2 rounded-xl bg-surface2 text-inksoft hover:text-ink transition-all">
          <RotateCcw size={14} />
        </button>
      </div>

      {remaining === 0 && (
        <div className="mt-2 p-2 rounded-lg bg-red-100 text-center">
          <p className="text-red-600 text-xs font-bold">⏰ Temps écoulé !</p>
        </div>
      )}
    </div>
  );
};

export default ChronoHotPot;
