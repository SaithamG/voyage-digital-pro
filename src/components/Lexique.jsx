import React, { useState } from 'react';
import { Volume2, Copy, Check } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const PhraseCard = ({ phrase, colors }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(phrase.chinese).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(phrase.pinyin);
      u.lang = 'zh-CN';
      speechSynthesis.speak(u);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-line p-4 hover:border-line transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-ink font-bold text-base">{phrase.fr}</p>
          <p className="text-inkfaint text-xs mt-0.5 italic">{phrase.context}</p>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          <button onClick={speak} className="p-1.5 rounded-lg bg-surface2 hover:bg-surface2 transition-all text-inksoft hover:text-ink">
            <Volume2 size={13} />
          </button>
          <button onClick={copy} className="p-1.5 rounded-lg bg-surface2 hover:bg-surface2 transition-all text-inksoft hover:text-ink">
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-inkfaint text-[9px] uppercase tracking-widest w-14 flex-shrink-0">Pinyin</span>
          <span className="text-inksoft text-sm font-medium italic">{phrase.pinyin}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-inkfaint text-[9px] uppercase tracking-widest w-14 flex-shrink-0">Chinois</span>
          <span className="text-2xl font-black leading-none" style={{ color: colors.secondary }}>{phrase.chinese}</span>
        </div>
      </div>
    </div>
  );
};

const Lexique = () => {
  const { colors } = agencyConfig;
  const { lexique, flag } = tripConfig;
  const [search, setSearch] = useState('');

  const filtered = lexique.filter(p =>
    p.fr.toLowerCase().includes(search.toLowerCase()) ||
    p.pinyin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-ink font-black text-xl mb-1">Lexique {flag}</h2>
        <p className="text-inkfaint text-sm">Phrases essentielles en mandarin · {lexique.length} expressions</p>
      </div>

      {/* Info */}
      <div className="bg-surface rounded-2xl p-4 border border-line">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-ink text-sm font-bold mb-1">Prononcer le mandarin</p>
            <p className="text-inksoft text-xs leading-relaxed">
              Le chinois mandarin est tonal — la même syllabe a 4 sens différents selon l'intonation.
              Les accents sur le pinyin indiquent le ton. Utilisez le bouton 🔊 pour entendre la prononciation correcte.
            </p>
          </div>
        </div>
      </div>

      {/* Recherche */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Chercher une phrase…"
        className="w-full bg-surface text-ink rounded-xl px-4 py-3 text-sm outline-none border border-line focus:border-line placeholder-inkfaint"
      />

      {/* Phrases */}
      <div className="space-y-3">
        {filtered.map(phrase => (
          <PhraseCard key={phrase.id} phrase={phrase} colors={colors} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-inkfaint">Aucune phrase trouvée</div>
      )}

      {/* Astuce traduction */}
      <div className="rounded-2xl p-4" style={{ background: `${colors.primary}15`, border: `1px solid ${colors.primary}25` }}>
        <p className="text-ink font-bold text-sm mb-1">📱 Traduction instantanée</p>
        <p className="text-inksoft text-xs">
          Installez Google Translate avec le pack chinois offline.
          La fonction "Appareil photo" traduit les menus et panneaux en temps réel — indispensable !
        </p>
      </div>
    </div>
  );
};

export default Lexique;
