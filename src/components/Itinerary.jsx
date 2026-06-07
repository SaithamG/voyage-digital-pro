import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cloud, BookOpen } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';
import SmartImage from './SmartImage';
import PhotoGallery from './PhotoGallery';

const colorMap = {
  red: { tab: '#9A2B2518', tabActive: '#9A2B25', text: '#9A2B25', border: '#9A2B2540' },
  amber: { tab: '#B5662A18', tabActive: '#B5662A', text: '#9C551F', border: '#B5662A40' },
  emerald: { tab: '#4A7C6F18', tabActive: '#4A7C6F', text: '#3D6A5E', border: '#4A7C6F40' },
  blue: { tab: '#36657F18', tabActive: '#36657F', text: '#36657F', border: '#36657F40' },
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
    <div className="bg-surface rounded-2xl border border-line overflow-hidden">
      <button className="w-full p-4 flex items-start gap-3 text-left" onClick={onToggle}>
        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center font-black text-xs" style={{ background: c.tab, color: c.text, border: `1px solid ${c.border}` }}>
          <span className="leading-none text-lg">{day.day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-inkfaint text-xs">{day.dayLabel}</span>
          </div>
          <p className="text-ink font-black text-base leading-snug">{day.title}</p>
          <p className="text-inkfaint text-xs mt-0.5 truncate">{day.highlight}</p>
          {progress > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1 bg-surface2 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: c.tabActive }} />
              </div>
              <span className="text-xs font-bold" style={{ color: c.text }}>{progress}%</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 text-inkfaint mt-1">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-line p-4 space-y-4">
          {/* Steps */}
          <div className="space-y-2">
            {day.steps.map((step, idx) => {
              const done = completedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${done ? 'bg-surface2 opacity-60' : 'bg-surface2 hover:bg-surface2'}`}
                  onClick={() => toggleStep(idx)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${done ? 'border-emerald-500 bg-emerald-500' : 'border-line'}`}>
                      {done && <span className="text-white text-[9px] font-black">✓</span>}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-inkfaint text-[10px] font-mono">{step.time}</span>
                      <span>{step.icon}</span>
                      <span className={`text-sm font-bold ${done ? 'line-through text-inkfaint' : 'text-ink'}`}>{step.title}</span>
                      {!step.outdoor && <span className="text-[9px] bg-surface2 text-inkfaint px-1.5 py-0.5 rounded-full">intérieur</span>}
                    </div>
                    <p className="text-inksoft text-xs mt-0.5 ml-0">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plan B */}
          <div>
            <button
              onClick={() => setShowPlanB(!showPlanB)}
              className="flex items-center gap-2 text-xs text-inkfaint hover:text-inksoft transition-colors"
            >
              <Cloud size={13} />
              <span className="font-semibold">Plan B (mauvais temps)</span>
              {showPlanB ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            {showPlanB && (
              <div className="mt-2 p-3 rounded-xl bg-surface2 border border-line">
                <p className="text-inksoft text-xs">{day.planB}</p>
              </div>
            )}
          </div>

          {/* Hack simplissime */}
          <div className="p-3 rounded-xl" style={{ background: `${agencyColors.primary}15`, border: `1px solid ${agencyColors.primary}25` }}>
            <p className="text-inksoft text-xs">{day.hackSimple}</p>
          </div>

          {/* Journal */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen size={12} className="text-inkfaint" />
              <span className="text-inkfaint text-xs font-semibold">Journal du jour</span>
            </div>
            <textarea
              value={journal}
              onChange={e => saveJournal(e.target.value)}
              placeholder="Vos souvenirs de la journée…"
              rows={3}
              className="w-full bg-surface2 text-inksoft text-xs rounded-xl p-3 outline-none border border-line focus:border-gold placeholder-inkfaint resize-none"
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
        <h2 className="text-ink font-black text-xl mb-1">Itinéraire</h2>
        <p className="text-inkfaint text-sm">{itinerary.length} jours · 4 régions</p>
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
        className="rounded-2xl h-44 border border-line"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
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
