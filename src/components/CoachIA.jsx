import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const QUICK_PROMPTS = [
  { id: 'manger', label: '🍜 Où manger localement ?', text: 'Recommande-moi des restaurants locaux authentiques dans la région actuelle, pas trop touristiques.' },
  { id: 'transport', label: '🚄 Transport pratique', text: 'Comment se déplacer le plus facilement dans cette ville pour une famille avec enfants ?' },
  { id: 'top3', label: '🎯 Top 3 à ne pas rater', text: 'Quels sont les 3 absolus incontournables à faire dans cette région ?' },
  { id: 'enfants', label: '👨‍👩‍👧‍👦 Activités enfants', text: 'Quelles activités sont parfaites pour des enfants de 8 et 12 ans dans cette ville ?' },
];

const DEMO = {
  manger: {
    beijing: `**🍜 Où manger à Pékin — Mes recommandations :**

**Canard laqué** · Bianyifang (1416 !) Qianmen Dajie — la référence historique absolue, ~350¥ pour 4.

**Hot-pot** · Haidilao Wangfujing — service légendaire, bouillons séparés épicé/doux parfaits en famille.

**Jiao zi** · Bijiapei Dumplings près de Beihai — raviolis faits main sous vos yeux.

💡 Dans les Hutongs de Nanluoguxiang, 2 ruelles hors de l'axe principal : prix divisés par 3, locals only.`,
    xian: `**🥙 Où manger à Xi'an — Saveurs de la Route de la Soie :**

**Biang Biang Noodles** · Incontournables ! Demandez 微辣 (wēi là) pour les enfants.

**Rou Jia Mo** · Le "burger de l'Antiquité" — porc braisé, ~10¥ pièce dans Huimin Jie.

**Street food** · Brochettes d'agneau, jus de grenade frais pressé devant vous.

💡 Tong Sheng Xiang sur Xiyangshi Jie — spécialiste Biang Biang depuis 1920.`,
    chengdu: `**🌶️ Où manger à Chengdu — Capitale gastronomique de Chine :**

**Hot-pot** · Haidilao Taikoo Li (à 2 min de votre hôtel !) — casserole divisée épicé/doux.

**Mapo Tofu** · Chen Mapo Doufu (1862 !) — demandez 微辣, c'est la référence mondiale.

**Dan Dan Noodles** · Chez Mr Dan Dan près du temple Wenshu — 15¥ le bol.

💡 Le poivre du Sichuan engourdit sans brûler — expérience unique, les enfants adorent !`,
    shanghai: `**🥟 Où manger à Shanghai — La scène la plus diverse de Chine :**

**Xiaolongbao** · Nanxiang Mantou Dian (Jardin Yu, depuis 1900) — file 30 min mais incontournable. Alternative : Din Tai Fung IFC.

**Gastronomique** · Mr & Mrs Bund (Paul Pairet) — fusion franco-chinoise, vue directe sur le Bund.

**Street food** · Tianzifang le soir — Sheng Jian Bao, galettes oignons, Bubble Tea.

💡 Lost Heaven (cuisine yunnanaise) est idéal en famille — moins épicé, carte en photos.`,
  },
  transport: {
    default: `**🚄 Se déplacer en famille — Guide pratique :**

**En ville :**
📱 DiDi (Uber chinois) — installez l'app, interface anglaise, paiement carte. Montrez l'adresse en chinois depuis l'onglet Urgences 🚨

🚇 Métros ultra-modernes (3-8¥/trajet), plans en anglais. Évitez 7h-9h et 17h-19h avec enfants.

**Entre villes :**
🚄 TGV Fuxing — ponctuels à 98%, 1ère classe recommandée. Billets sur Trip.com, passeport en gare.

⚡ Maglev Shanghai (430 km/h) — 8 min jusqu'à l'aéroport, expérience inoubliable pour les enfants !`,
  },
  top3: {
    beijing: `**🏯 Top 3 absolus à Pékin :**

**1. 🧱 Grande Muraille — Mutianyu**
Téléphérique montée + luge descente = moment magique pour les enfants. Arrivée 9h avant les groupes.

**2. 🏯 Cité Interdite (Gugong)**
720 bâtiments, 9 999 pièces. Réservez en ligne (quota 40 000/j). Audioguide famille disponible.

**3. 🛕 Temple du Ciel à l'aube (6h30)**
Les Pékinois y font le tai-chi, chantent, dansent sous les arbres centenaires. Scène unique et authentique.`,
    xian: `**⚔️ Top 3 absolus à Xi'an :**

**1. ⚔️ Armée de Terre Cuite**
8 000 guerriers grandeur nature. Guide local indispensable — l'histoire de la découverte en 1974 fascine les enfants.

**2. 🧱 Remparts à vélo**
13,7 km en famille — vue vieille ville d'un côté, moderne de l'autre. 2h, 45¥/vélo.

**3. 🕌 Quartier Musulman (Huimin Jie)**
Route de la Soie en miniature, street food extraordinaire, ambiance électrique le soir.`,
    chengdu: `**🐼 Top 3 absolus à Chengdu :**

**1. 🐼 Base de Recherche des Pandas — à 8h00 précises**
Les pandas mangent le bambou le matin uniquement. À 11h ils dorment. Les pandas roux accessibles toute la journée.

**2. 🗿 Grand Bouddha de Leshan (71m)**
Prenez le bateau pour voir l'intégralité. Descendez les escaliers taillés dans la falaise jusqu'aux pieds.

**3. 👨‍🍳 Cours de cuisine sichuanaise en famille**
Mapo Tofu + Dumplings + Kung Pao avec un chef. Recettes remises. Souvenir gastronomique à vie.`,
    shanghai: `**🌆 Top 3 absolus à Shanghai :**

**1. 🌉 Le Bund illuminé + croisière Huangpu**
Coucher de soleil sur la promenade, croisière à 18h pour voir les deux rives s'illuminer. LA photo du voyage.

**2. 🏰 Shanghai Disneyland**
TRON Lightcycle Power Run (meilleure attraction mondiale !) — réservez-le dès 9h00 sur l'app.

**3. 🌺 Jardin Yu à 8h du matin**
Silence, brume légère, tai-chi. À 9h30 c'est bondé. Suivi de Xiaolongbao chez Nanxiang.`,
  },
  enfants: {
    beijing: `**👨‍👩‍👧‍👦 Activités pour vos enfants à Pékin :**

🎿 **Luge à Mutianyu** — toboggan depuis la Grande Muraille. Souvenir #1 garanti.

🚤 **Barques au Beihai Park** — pédalos sur le lac, vue sur la Pagode Blanche.

🎭 **Spectacle fontaines musicales** — Place de la Tour de la Cloche, gratuit, son & lumière.

🎨 **Quartier 798** — usines en galeries d'art, installations interactives, street art.

💡 La luge Mutianyu (Jour 3) est souvent le souvenir préféré des enfants sur tout le voyage !`,
    xian: `**👨‍👩‍👧‍👦 Activités pour vos enfants à Xi'an :**

🏺 **Armée de Terre Cuite** — voir les archéologues travailler en direct fascine les 8 et 12 ans.

🚲 **Vélo sur les remparts** — 13,7 km de fortifications médiévales, vue imprenable.

🎨 **Atelier calligraphie** (Jour 8) — 1h avec un maître, chaque enfant repart avec une œuvre.

🎭 **Spectacle Danses Tang** — costumes impériaux, percussions, acrobates.`,
    chengdu: `**👨‍👩‍👧‍👦 Activités pour vos enfants à Chengdu :**

🐼 **Pandas Roux** (Base de Recherche) — adorables, actifs toute la journée, très approchables.

👨‍🍳 **Cours de cuisine en famille** (Jour 12) — cuisiner ce qu'on mange ensuite, souvenir inoubliable.

🎭 **Face-Changing de l'Opéra** (Jour 11) — changement de masque en 0,2s, les enfants restent bouche bée.

🎨 **Atelier masques de l'Opéra** — chaque enfant peint et repart avec son propre masque.`,
    shanghai: `**👨‍👩‍👧‍👦 Activités pour vos enfants à Shanghai :**

🏰 **Disneyland** (Jour 19) — TRON Lightcycle Power Run en PREMIER (file 2h sinon). Château 2× Cinderella Castle.

🔭 **Planétarium de Shanghai** — le plus grand au monde (2021), section junior pour 8-12 ans.

🚤 **Croisière Huangpu** — voir les deux rives illuminées depuis l'eau, photo de famille mémorable.

⚡ **Maglev 430 km/h** — 8 min jusqu'à l'aéroport en dernière expérience. Les enfants adorent !`,
  },
  default: `Super question ! En tant que coach voyage de ${agencyConfig.name}, voici ce que je recommande pour votre circuit.

Chaque étape de votre itinéraire a été pensée pour allier authenticité, confort et expériences mémorables en famille. N'hésitez pas à utiliser les questions rapides ci-dessus pour des recommandations ciblées par thème.

Vous pouvez aussi me poser des questions précises sur un restaurant, une activité, un transport — je suis là pour personnaliser votre voyage !

— Coach IA · ${agencyConfig.name}`,
};

const typeText = async (text, onChunk, signal) => {
  const chars = text.split('');
  let i = 0;
  const tick = () => new Promise(r => {
    if (signal.aborted) return;
    const delay = chars[i] === '\n' ? 30 : Math.random() * 8 + 6;
    setTimeout(r, delay);
  });
  while (i < chars.length) {
    if (signal.aborted) return;
    await tick();
    if (!signal.aborted) onChunk(chars.slice(0, i + 1).join(''));
    i++;
  }
};

const renderMarkdown = (text) => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
};

const CoachIA = ({ activeRegion }) => {
  const { colors } = agencyConfig;
  const { regions, destination, flag, client, budget } = tripConfig;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const abortRef = useRef(null);
  const bottomRef = useRef(null);

  const currentRegion = regions.find(r => r.id === activeRegion) || regions[0];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const getDemoResponse = (text) => {
    const lower = text.toLowerCase();
    const rid = currentRegion.id;

    if (lower.includes('manger') || lower.includes('restaurant') || lower.includes('food') || lower.includes('repas')) {
      return DEMO.manger[rid] || DEMO.manger.beijing;
    }
    if (lower.includes('transport') || lower.includes('déplacer') || lower.includes('métro') || lower.includes('taxi')) {
      return DEMO.transport.default;
    }
    if (lower.includes('top') || lower.includes('incontournable') || lower.includes('voir') || lower.includes('visiter')) {
      return DEMO.top3[rid] || DEMO.top3.beijing;
    }
    if (lower.includes('enfant') || lower.includes('enfants') || lower.includes('famille') || lower.includes('kid')) {
      return DEMO.enfants[rid] || DEMO.enfants.beijing;
    }
    return DEMO.default;
  };

  const sendWithGemini = async (allMessages, apiKey) => {
    const systemContext = `Tu es le coach voyage IA de ${agencyConfig.name}, une agence de voyage premium.
Voyage : ${destination} ${flag}, circuit ${regions.map(r => r.name).join(' → ')}, ${tripConfig.duration} jours.
Région actuelle : ${currentRegion.name} (${currentRegion.description}).
Clients : ${client.name}, ${client.details}, budget ${budget.total.toLocaleString('fr-FR')}€.
Réponds en français, de manière pratique, chaleureuse et concise. Utilise du markdown simple.`;

    const history = allMessages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemContext }] },
          contents: history,
        }),
      }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Désolé, je n\'ai pas pu répondre.';
  };

  const send = async (text = input) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setStreamingText('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let reply;
      const apiKey = process.env.REACT_APP_GEMINI_KEY;

      if (apiKey) {
        reply = await sendWithGemini(newMessages, apiKey);
      } else {
        reply = getDemoResponse(text);
        await new Promise(r => setTimeout(r, 400));
      }

      await typeText(reply, (partial) => {
        if (!controller.signal.aborted) setStreamingText(partial);
      }, controller.signal);

      if (!controller.signal.aborted) {
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        setStreamingText('');
      }
    } catch {
      if (!controller.signal.aborted) {
        setMessages(prev => [...prev, { role: 'assistant', content: '❌ Erreur de connexion. Vérifiez votre connexion internet.' }]);
        setStreamingText('');
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-[400px]">
      {/* En-tête */}
      <div className="mb-4">
        <h2 className="text-ink font-black text-xl mb-1">Coach IA</h2>
        <p className="text-inkfaint text-sm flex items-center gap-1.5">
          <Sparkles size={12} />
          Votre assistant voyage · {currentRegion.name} {currentRegion.emoji}
          {!process.env.REACT_APP_GEMINI_KEY && (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">mode démo</span>
          )}
        </p>
      </div>

      {/* Message de bienvenue + prompts rapides */}
      {messages.length === 0 && (
        <div className="space-y-3 mb-4">
          <div className="bg-surface rounded-2xl p-4 border border-line flex items-start gap-3">
            <div className="p-2 rounded-xl flex-shrink-0" style={{ background: `${colors.primary}20` }}>
              <Bot size={18} style={{ color: colors.secondary }} />
            </div>
            <div>
              <p className="text-ink font-bold text-sm mb-1">Bonjour {client.name} ! 👋</p>
              <p className="text-inksoft text-sm">
                Je suis votre coach voyage pour ce circuit en {destination}.
                Actuellement : <strong className="text-ink">{currentRegion.name}</strong> — {currentRegion.description}.
              </p>
              <p className="text-inkfaint text-xs mt-2">Comment puis-je vous aider ?</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.id}
                onClick={() => send(p.text)}
                className="bg-surface rounded-xl p-3 border border-line hover:border-line text-left text-xs text-inksoft font-medium transition-all hover:text-ink active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className="p-2 rounded-xl flex-shrink-0"
              style={msg.role === 'assistant' ? { background: `${colors.primary}20` } : { background: 'var(--c-surface2)' }}
            >
              {msg.role === 'user'
                ? <User size={14} className="text-inksoft" />
                : <Bot size={14} style={{ color: colors.secondary }} />
              }
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-surface2 text-ink' : 'bg-surface border border-line text-inksoft'}`}
              dangerouslySetInnerHTML={msg.role === 'assistant' ? { __html: renderMarkdown(msg.content) } : undefined}
            >
              {msg.role === 'user' ? msg.content : undefined}
            </div>
          </div>
        ))}

        {/* Message en cours de frappe */}
        {(loading || streamingText) && (
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-xl flex-shrink-0" style={{ background: `${colors.primary}20` }}>
              <Bot size={14} style={{ color: colors.secondary }} />
            </div>
            <div className="max-w-[85%] bg-surface border border-line rounded-2xl px-4 py-3 text-sm text-inksoft leading-relaxed">
              {streamingText ? (
                <span dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingText) + '<span class="animate-pulse">▍</span>' }} />
              ) : (
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-inkfaint animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-3 border-t border-line mt-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Posez votre question…"
          className="flex-1 bg-surface text-ink rounded-xl px-4 py-3 text-sm outline-none border border-line focus:border-line placeholder-inkfaint"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="p-3 rounded-xl transition-all disabled:opacity-40 text-white active:scale-95"
          style={{ background: colors.primary }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default CoachIA;
