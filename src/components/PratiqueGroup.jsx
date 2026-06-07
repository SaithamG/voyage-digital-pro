import React, { useState } from 'react';
import SubNav from './SubNav';
import Transport from './Transport';
import Checklist from './Checklist';
import Runbook from './Runbook';
import Lexique from './Lexique';
import Urgences from './Urgences';

const SECTIONS = [
  { id: 'transport', label: 'Transports', icon: '🚄' },
  { id: 'checklist', label: 'Checklist', icon: '✅' },
  { id: 'reservations', label: 'Réservations', icon: '📋' },
  { id: 'lexique', label: 'Lexique', icon: '🗣️' },
  { id: 'urgences', label: 'Urgences', icon: '🚨' },
];

const PratiqueGroup = () => {
  const [section, setSection] = useState('transport');

  return (
    <div className="space-y-5">
      <SubNav sections={SECTIONS} active={section} onChange={setSection} />
      {section === 'transport' && <Transport />}
      {section === 'checklist' && <Checklist />}
      {section === 'reservations' && <Runbook />}
      {section === 'lexique' && <Lexique />}
      {section === 'urgences' && <Urgences />}
    </div>
  );
};

export default PratiqueGroup;
