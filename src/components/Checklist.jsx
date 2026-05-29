import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const Checklist = () => {
  const { colors } = agencyConfig;
  const { checklist } = tripConfig;

  const allItems = checklist.flatMap(c => c.items);
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lv_checklist') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('lv_checklist', JSON.stringify(checked));
  }, [checked]);

  const toggle = (id) => setChecked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const total = allItems.length;
  const done = checked.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-black text-xl mb-1">Checklist pré-voyage</h2>
        <p className="text-slate-500 text-sm">{done}/{total} éléments complétés</p>
      </div>

      {/* Progression globale */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Préparation</span>
          <span className="font-black text-lg" style={{ color: pct === 100 ? '#10B981' : colors.secondary }}>{pct}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: pct === 100 ? '#10B981' : colors.primary }}
          />
        </div>
        {pct === 100 && (
          <p className="text-emerald-400 text-xs font-bold mt-2 text-center">🎉 Tout est prêt — bon voyage !</p>
        )}
      </div>

      {/* Catégories */}
      {checklist.map(category => {
        const catDone = category.items.filter(item => checked.includes(item.id)).length;
        return (
          <div key={category.category} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between" style={{ background: `${colors.primary}10` }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="text-white font-bold text-sm">{category.category}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: catDone === category.items.length ? '#10B981' : colors.secondary }}>
                {catDone}/{category.items.length}
              </span>
            </div>
            <div className="p-2 space-y-1">
              {category.items.map(item => {
                const isDone = checked.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${isDone ? 'opacity-50' : 'hover:bg-slate-800'}`}
                  >
                    {isDone
                      ? <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                      : <Circle size={18} className="text-slate-600 flex-shrink-0" />
                    }
                    <span className={`text-sm flex-1 ${isDone ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                      {item.label}
                    </span>
                    {item.critical && !isDone && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${colors.primary}20`, color: colors.secondary }}>
                        ESSENTIEL
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Checklist;
