import React, { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const Runbook = () => {
  const { colors } = agencyConfig;
  const { runbook } = tripConfig;
  const [statuses, setStatuses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lv_runbook') || '{}'); } catch { return {}; }
  });

  const getStatus = (item) => statuses[item.id] ?? item.status;
  const toggle = (id) => {
    const curr = statuses[id] ?? runbook.find(r => r.id === id)?.status ?? 'pending';
    const next = curr === 'done' ? 'pending' : 'done';
    const updated = { ...statuses, [id]: next };
    setStatuses(updated);
    localStorage.setItem('lv_runbook', JSON.stringify(updated));
  };

  const done = runbook.filter(r => getStatus(r) === 'done').length;
  const pct = Math.round((done / runbook.length) * 100);

  const today = new Date();
  const getUrgency = (alertDate) => {
    if (!alertDate) return null;
    const diff = Math.ceil((new Date(alertDate) - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { label: 'Dépassé !', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' };
    if (diff <= 14) return { label: `Dans ${diff}j`, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' };
    if (diff <= 30) return { label: `Dans ${diff}j`, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' };
    return { label: new Date(alertDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }), color: 'text-slate-500', bg: 'bg-slate-800 border-slate-700' };
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-black text-xl mb-1">Réservations & Démarches</h2>
        <p className="text-slate-500 text-sm">{done}/{runbook.length} complétées</p>
      </div>

      {/* Progression */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Avancement</span>
          <span className="font-black text-lg" style={{ color: pct === 100 ? '#10B981' : colors.secondary }}>{pct}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct === 100 ? '#10B981' : colors.primary }} />
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {runbook.map(item => {
          const isDone = getStatus(item) === 'done';
          const urgency = getUrgency(item.alertDate);
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`bg-slate-900 rounded-2xl p-4 border cursor-pointer transition-all ${isDone ? 'border-emerald-500/20 opacity-60' : 'border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isDone
                    ? <CheckCircle size={20} className="text-emerald-500" />
                    : <Clock size={20} className="text-slate-600" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>{item.label}</p>
                  {item.ref && <p className="text-slate-600 text-[10px] font-mono mt-0.5">Réf. {item.ref}</p>}
                  {item.notes && <p className="text-slate-400 text-xs mt-1">{item.notes}</p>}
                </div>
                <div className="flex-shrink-0">
                  {!isDone && urgency && (
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${urgency.bg} ${urgency.color}`}>
                      {urgency.label}
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ✓ Fait
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Runbook;
