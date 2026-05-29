import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cloud, BookOpen } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';
import SmartImage from './SmartImage';
import PhotoGallery from './PhotoGallery';

const colorMap = {
  red: { tab: '#EF444420', tabActive: '#EF4444', text: '#F87171', border: '#EF444440' },
  amber: { tab: '#F59E0B20', tabActive: '#F59E0B', text: '#FBB140', border: '#F59E0B40' },
  emerald: { tab: '#10B98120', tabActive: '#10B981', text: '#34D399', border: '#10B98140' },
  blue: { tab: '#3B82F620', tabActive: '#3B82F6', text: '#60A5FA', border: '#3B82F640' },
};

const DayCard = ({ day, region, expanded, onToggle, agencyColors }) => {
  const [showPlanB, setShowPlanB] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`lv_step_${day.day}`) || '[]'); } catch { return []; }
  });
  const [journal, setJournal] = useState(() => localStorage.getItem(`lv_journal_${day.day}`) || '');

  const toggleStep = (idx) => {
    const next = completedSteps.includes(idx) ? completedSteps.filter(i => i !== idx) : [...completedSteps, idx];
    setCompletedSteps(next);
    localStorage.setItem(`lv_step_${day.day}`, JSON.stringify(next));
  };

  const saveJournal = (v) => {
    setJournal(v);
    localStorage.setItem(`lv_journal_${day.day}`, v);
  };

  const c = colorMap[region.color] || colorMap.blue;
  const progress = day.steps.length > 0 ? Math.round((completedSteps.length / day.steps.length) * 100) : 0;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      <button className="w-full p-4 flex items-start gap-3 text-left" onClick={onToggle}>
        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center font-black text-xs" style={{ background: c.tab, color: c.text, border: `1px solid ${c.border}` }}>
          <span className="leading-none text-lg">{day.day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-slate-500 text-xs">{day.dayLabel}</span>
          </div>
          <p className="text-white font-black text-base leading-snug">{day.title}</p>
          <p className="text-slate-500 text-xs mt-0.5 truncate">{day.highlight}</p>
          {progress > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: c.tabActive }} />
              </div>
              <span className="text-xs font-bold" style={{ color: c.text }}>{progress}%</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 text-slate-600 mt-1">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-800 p-4 space-y-4">
          {/* Steps */}
          <div className="space-y-2">
            {day.steps.map((step, idx) => {
              const done = completedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${done ? 'bg-slate-800/50 opacity-60' : 'bg-slate-800/30 hover:bg-slate-800/60'}`}
                  onClick={() => toggleStep(idx)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${done ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'}`}>
                      {done && <span className="text-white text-[9px] font-black">✓</span>}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[10px] font-mono">{step.time}</span>
                      <span>{step.icon}</span>
                      <span className={`text-sm font-bold ${done ? 'line-through text-slate-500' : 'text-white'}`}>{step.title}</span>
                      {!step.outdoor && <span className="text-[9px] bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded-full">intérieur</span>}
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5 ml-0">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plan B */}
          <div>
            <button
              onClick={() => setShowPlanB(!showPlanB)}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Cloud size={13} />
              <span className="font-semibold">Plan B (mauvais temps)</span>
              {showPlanB ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            {showPlanB && (
              <div className="mt-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <p className="text-slate-400 text-xs">{day.planB}</p>
              </div>
            )}
          </div>

          {/* Hack simplissime */}
          <div className="p-3 rounded-xl" style={{ background: `${agencyColors.primary}15`, border: `1px solid ${agencyColors.primary}25` }}>
            <p className="text-slate-300 text-xs">{day.hackSimple}</p>
          </div>

          {/* Journal */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen size={12} className="text-slate-500" />
              <span className="text-slate-500 text-xs font-semibold">Journal du jour</span>
            </div>
            <textarea
              value={journal}
              onChange={e => saveJournal(e.target.value)}
              placeholder="Vos souvenirs de la journée…"
              rows={3}
              className="w-full bg-slate-800 text-slate-300 text-xs rounded-xl p-3 outline-none border border-slate-700 focus:border-slate-500 placeholder-slate-700 resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Itinerary = ({ activeRegion, setActiveRegion }) => {
  const { colors } = agencyConfig;
  const { regions, itinerary } = tripConfig;
  const [expandedDay, setExpandedDay] = useState(null);

  const currentRegion = regions.find(r => r.id === activeRegion) || regions[0];
  const regionDays = itinerary.filter(d => d.regionId === activeRegion);
  const c = colorMap[currentRegion.color] || colorMap.blue;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-black text-xl mb-1">Roadbook</h2>
        <p className="text-slate-500 text-sm">{itinerary.length} jours · 4 régions</p>
      </div>

      {/* Sélecteur de région */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {regions.map(region => {
          const rc = colorMap[region.color] || colorMap.blue;
          const isActive = region.id === activeRegion;
          return (
            <button
              key={region.id}
              onClick={() => { setActiveRegion(region.id); setExpandedDay(null); }}
              className="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-2xl text-xs font-bold transition-all border"
              style={isActive
                ? { background: rc.tabActive, color: 'white', borderColor: rc.tabActive }
                : { background: rc.tab, color: rc.text, borderColor: rc.border }}
            >
              <span className="text-xl">{region.emoji}</span>
              <span>{region.name}</span>
              <span className="opacity-70 font-normal">{region.dates}</span>
            </button>
          );
        })}
      </div>

      {/* Hero région */}
      <SmartImage
        src={currentRegion.image}
        alt={currentRegion.name}
        emoji={currentRegion.emoji}
        color={c.tabActive}
        className="rounded-2xl h-44 border border-slate-800"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{currentRegion.emoji}</span>
            <div>
              <p className="font-black text-white text-lg leading-tight">{currentRegion.name}</p>
              <p className="text-xs text-white/80">{currentRegion.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white">{currentRegion.dates}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white">{currentRegion.nights} nuits</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white">🏨 {currentRegion.hotel}</span>
          </div>
        </div>
      </SmartImage>

      {/* Galerie photos de la ville */}
      {currentRegion.gallery && currentRegion.gallery.length > 0 && (
        <PhotoGallery
          images={currentRegion.gallery}
          emoji={currentRegion.emoji}
          color={c.tabActive}
          name={currentRegion.name}
        />
      )}

      {/* Jours */}
      <div className="space-y-3">
        {regionDays.map(day => (
          <DayCard
            key={day.day}
            day={day}
            region={currentRegion}
            expanded={expandedDay === day.day}
            onToggle={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
            agencyColors={colors}
          />
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
