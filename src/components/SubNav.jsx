import React from 'react';
import { agencyConfig } from '../config/agencyConfig';

const SubNav = ({ sections, active, onChange }) => {
  const { colors } = agencyConfig;
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
      {sections.map(s => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            style={isActive ? { background: colors.primary } : {}}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              isActive
                ? 'text-white border-transparent shadow-sm'
                : 'text-inksoft border-line bg-surface hover:text-ink hover:border-gold'
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SubNav;
