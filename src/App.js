import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

import Landing from './components/Landing';
import Header from './components/Header';
import Overview from './components/Overview';
import Finance from './components/Finance';
import SuiviDepenses from './components/SuiviDepenses';
import Itinerary from './components/Itinerary';
import Carte from './components/Carte';
import Transport from './components/Transport';
import Converter from './components/Converter';
import ConverterWidget from './components/ConverterWidget';
import Checklist from './components/Checklist';
import Lexique from './components/Lexique';
import Runbook from './components/Runbook';
import Urgences from './components/Urgences';
import ModeVoyage from './components/ModeVoyage';
import ChronoHotPot from './components/ChronoHotPot';
import CoachIA from './components/CoachIA';

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

const TAB_COMPONENTS = {
  voyage: ModeVoyage,
  overview: Overview,
  finance: Finance,
  expenses: SuiviDepenses,
  transport: Transport,
  conversion: Converter,
  checklist: Checklist,
  lexique: Lexique,
  runbook: Runbook,
  urgences: Urgences,
};

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRegion, setActiveRegion] = useState('beijing');
  const [timeLeft, setTimeLeft] = useState(calculerTempsRestant());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculerTempsRestant()), 1000);
    return () => clearInterval(timer);
  }, []);

  const goToRegion = (regionId) => {
    setActiveRegion(regionId);
    setActiveTab('roadbook');
  };

  const renderTab = () => {
    if (activeTab === 'roadbook') {
      return <Itinerary activeRegion={activeRegion} setActiveRegion={setActiveRegion} />;
    }
    if (activeTab === 'map') {
      return <Carte goToRegion={goToRegion} />;
    }
    if (activeTab === 'ai') {
      return <CoachIA activeRegion={activeRegion} />;
    }
    const TabComponent = TAB_COMPONENTS[activeTab];
    return TabComponent ? <TabComponent /> : null;
  };

  const { colors } = agencyConfig;

  if (showLanding) {
    return <Landing onEnter={() => setShowLanding(false)} timeLeft={timeLeft} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-32 selection:bg-blue-500/30" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} timeLeft={timeLeft} />

      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4">
        {renderTab()}
      </main>

      <ConverterWidget />
      <ChronoHotPot />

      {/* Footer agence */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div
            className="bg-slate-900/95 backdrop-blur-sm text-white p-3 rounded-2xl shadow-2xl flex justify-between items-center border"
            style={{ borderColor: `${colors.primary}40` }}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg" style={{ background: colors.primary }}>
                <Globe size={14} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest leading-none" style={{ color: colors.secondary }}>
                  {agencyConfig.name}
                </p>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">{agencyConfig.tagline}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-500 leading-none">Carnet de</p>
              <p className="text-[10px] font-black text-white leading-none mt-0.5">{tripConfig.client.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
