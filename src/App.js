import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

import Landing from './components/Landing';
import Header from './components/Header';
import VoyageGroup from './components/VoyageGroup';
import Itinerary from './components/Itinerary';
import BudgetGroup from './components/BudgetGroup';
import PratiqueGroup from './components/PratiqueGroup';
import CoachIA from './components/CoachIA';
import ConverterWidget from './components/ConverterWidget';
import ChronoHotPot from './components/ChronoHotPot';

import { agencyConfig } from './config/agencyConfig';
import { tripConfig } from './config/tripConfig';

const calculerTempsRestant = () => {
  const diff = +new Date(tripConfig.departDate) - +new Date();
  if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
  return {
    jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
    heures: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    secondes: Math.floor((diff / 1000) % 60),
  };
};

const CSS_VARS = {
  paper: '--c-paper', surface: '--c-surface', surface2: '--c-surface2',
  ink: '--c-ink', inksoft: '--c-inksoft', inkfaint: '--c-inkfaint',
  line: '--c-line', primary: '--c-primary', gold: '--c-gold', jade: '--c-jade',
};

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('voyage');
  const [activeRegion, setActiveRegion] = useState('beijing');
  const [timeLeft, setTimeLeft] = useState(calculerTempsRestant());

  // Thème piloté par la destination (tripConfig.theme)
  useEffect(() => {
    const theme = tripConfig.theme;
    if (!theme) return;
    const root = document.documentElement.style;
    Object.entries(CSS_VARS).forEach(([key, varName]) => {
      if (theme[key]) root.setProperty(varName, theme[key]);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculerTempsRestant()), 1000);
    return () => clearInterval(timer);
  }, []);

  const goToRegion = (regionId) => {
    setActiveRegion(regionId);
    setActiveTab('roadbook');
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'voyage': return <VoyageGroup goToRegion={goToRegion} />;
      case 'roadbook': return <Itinerary activeRegion={activeRegion} setActiveRegion={setActiveRegion} />;
      case 'budget': return <BudgetGroup />;
      case 'pratique': return <PratiqueGroup />;
      case 'ai': return <CoachIA activeRegion={activeRegion} />;
      default: return null;
    }
  };

  const { colors } = agencyConfig;

  if (showLanding) {
    return <Landing onEnter={() => setShowLanding(false)} timeLeft={timeLeft} />;
  }

  return (
    <div className="min-h-screen bg-paper text-ink pb-32" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} timeLeft={timeLeft} />

      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4">
        {renderTab()}
      </main>

      <ConverterWidget />
      <ChronoHotPot />

      {/* Footer agence */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="bg-surface p-3 rounded-2xl border border-line flex justify-between items-center shadow-[0_8px_30px_rgba(44,33,24,0.12)]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg" style={{ background: colors.primary }}>
                <Globe size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest leading-none" style={{ color: colors.primary }}>
                  {agencyConfig.name}
                </p>
                <p className="text-[10px] text-inkfaint leading-none mt-0.5">{agencyConfig.tagline}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-inkfaint leading-none">Carnet de</p>
              <p className="text-[10px] font-black text-ink leading-none mt-0.5">{tripConfig.client.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
