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
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-white font-bold text-base">{phrase.fr}</p>
          <p className="text-slate-500 text-xs mt-0.5 italic">{phrase.context}</p>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          <button onClick={speak} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-slate-400 hover:text-white">
            <Volume2 size={13} />
          </button>
          <button onClick={copy} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-slate-400 hover:text-white">
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-slate-600 text-[9px] uppercase tracking-widest w-14 flex-shrink-0">Pinyin</span>
          <span className="text-slate-300 text-sm font-medium italic">{phrase.pinyin}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 text-[9px] uppercase tracking-widest w-14 flex-shrink-0">Chinois</span>
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
        <h2 className="text-white font-black text-xl mb-1">Lexique {flag}</h2>
        <p className="text-slate-500 text-sm">Phrases essentielles en mandarin · {lexique.length} expressions</p>
      </div>

      {/* Info */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-white text-sm font-bold mb-1">Prononcer le mandarin</p>
            <p className="text-slate-400 text-xs leading-relaxed">
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
        className="w-full bg-slate-900 text-white rounded-xl px-4 py-3 text-sm outline-none border border-slate-800 focus:border-slate-600 placeholder-slate-600"
      />

      {/* Phrases */}
      <div className="space-y-3">
        {filtered.map(phrase => (
          <PhraseCard key={phrase.id} phrase={phrase} colors={colors} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-slate-600">Aucune phrase trouvée</div>
      )}

      {/* Astuce traduction */}
      <div className="rounded-2xl p-4" style={{ background: `${colors.primary}15`, border: `1px solid ${colors.primary}25` }}>
        <p className="text-white font-bold text-sm mb-1">📱 Traduction instantanée</p>
        <p className="text-slate-400 text-xs">
          Installez Google Translate avec le pack chinois offline.
          La fonction "Appareil photo" traduit les menus et panneaux en temps réel — indispensable !
        </p>
      </div>
    </div>
  );
};

export default Lexique;
