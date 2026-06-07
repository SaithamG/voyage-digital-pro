import React, { useState } from 'react';
import SubNav from './SubNav';
import Overview from './Overview';
import Carte from './Carte';
import ModeVoyage from './ModeVoyage';

const SECTIONS = [
  { id: 'apercu', label: "Vue d'ensemble", icon: '🗺️' },
  { id: 'carte', label: 'Carte', icon: '🧭' },
  { id: 'direct', label: 'En direct', icon: '⏱️' },
];

const VoyageGroup = ({ goToRegion }) => {
  const [section, setSection] = useState('apercu');

  return (
    <div className="space-y-5">
      <SubNav sections={SECTIONS} active={section} onChange={setSection} />
      {section === 'apercu' && <Overview />}
      {section === 'carte' && <Carte goToRegion={goToRegion} />}
      {section === 'direct' && <ModeVoyage />}
    </div>
  );
};

export default VoyageGroup;
