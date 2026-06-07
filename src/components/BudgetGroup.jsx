import React, { useState } from 'react';
import SubNav from './SubNav';
import Finance from './Finance';
import SuiviDepenses from './SuiviDepenses';
import Converter from './Converter';

const SECTIONS = [
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'depenses', label: 'Dépenses', icon: '💳' },
  { id: 'conversion', label: 'Convertisseur', icon: '💱' },
];

const BudgetGroup = () => {
  const [section, setSection] = useState('budget');

  return (
    <div className="space-y-5">
      <SubNav sections={SECTIONS} active={section} onChange={setSection} />
      {section === 'budget' && <Finance />}
      {section === 'depenses' && <SuiviDepenses />}
      {section === 'conversion' && <Converter />}
    </div>
  );
};

export default BudgetGroup;
