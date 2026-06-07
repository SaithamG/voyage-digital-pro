import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const CATEGORIES = [
  { id: 'repas', label: 'Repas', icon: '🍜' },
  { id: 'transport', label: 'Transport', icon: '🚄' },
  { id: 'activite', label: 'Activités', icon: '🎭' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'autre', label: 'Autre', icon: '📦' },
];

const SuiviDepenses = () => {
  const { colors } = agencyConfig;
  const { currency, budget } = tripConfig;
  const budgetCNY = Math.round(budget.total * currency.rate);

  const [expenses, setExpenses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lv_china_expenses') || '[]'); } catch { return []; }
  });
  const [amount, setAmount] = useState('');
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState('repas');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('lv_china_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalCNY = expenses.reduce((s, e) => s + e.amount, 0);
  const totalEUR = (totalCNY / currency.rate).toFixed(2);
  const remaining = budgetCNY - totalCNY;
  const pct = Math.min((totalCNY / budgetCNY) * 100, 100);

  const addExpense = () => {
    const val = parseFloat(amount);
    if (!val || !label.trim()) return;
    setExpenses(prev => [{
      id: Date.now(),
      label: label.trim(),
      amount: val,
      category,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    }, ...prev]);
    setAmount(''); setLabel(''); setShowForm(false);
  };

  const removeExpense = (id) => setExpenses(prev => prev.filter(e => e.id !== id));

  const byCategory = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.total > 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-ink font-black text-xl">Suivi des dépenses</h2>
          <p className="text-inkfaint text-sm">En yuans (¥) · Converti en euros automatiquement</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all text-white"
          style={{ background: colors.primary }}
        >
          <Plus size={15} />
          Ajouter
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-surface rounded-2xl p-4 border border-line space-y-3">
          <h3 className="text-ink font-bold text-sm">Nouvelle dépense</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Montant (¥)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="bg-surface2 text-ink rounded-xl px-3 py-2.5 text-sm outline-none border border-line focus:border-gold placeholder-inkfaint"
            />
            <input
              type="text"
              placeholder="Description"
              value={label}
              onChange={e => setLabel(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addExpense()}
              className="bg-surface2 text-ink rounded-xl px-3 py-2.5 text-sm outline-none border border-line focus:border-gold placeholder-inkfaint"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${category === cat.id ? 'text-white' : 'bg-surface2 text-inksoft hover:text-ink'}`}
                style={category === cat.id ? { background: colors.primary } : {}}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
          <button onClick={addExpense} className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: colors.primary }}>
            Enregistrer
          </button>
        </div>
      )}

      {/* Progression */}
      <div className="bg-surface rounded-2xl p-5 border border-line">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-inkfaint text-xs font-medium mb-1">Dépensé</div>
            <div className="font-black text-3xl text-ink">{totalCNY.toLocaleString('fr-FR')} ¥</div>
            <div className="text-inksoft text-sm">{totalEUR} €</div>
          </div>
          <div className="text-right">
            <div className="text-inkfaint text-xs font-medium mb-1">Restant</div>
            <div className={`font-black text-2xl ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {remaining >= 0 ? '+' : ''}{remaining.toLocaleString('fr-FR')} ¥
            </div>
            <div className="text-inkfaint text-xs">sur {budgetCNY.toLocaleString('fr-FR')} ¥ budget</div>
          </div>
        </div>
        <div className="h-3 bg-surface2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: pct > 90 ? '#EF4444' : pct > 70 ? '#F97316' : colors.primary }}
          />
        </div>
        <div className="flex justify-between text-inkfaint text-[10px] mt-1">
          <span>0 ¥</span>
          <span>{Math.round(pct)}% utilisé</span>
          <span>{budgetCNY.toLocaleString('fr-FR')} ¥</span>
        </div>
      </div>

      {/* Par catégorie */}
      {byCategory.length > 0 && (
        <div className="bg-surface rounded-2xl p-4 border border-line">
          <h3 className="text-inksoft text-xs font-bold uppercase tracking-widest mb-3">Par catégorie</h3>
          <div className="space-y-2">
            {byCategory.map(cat => (
              <div key={cat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span className="text-inksoft text-sm">{cat.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-ink font-bold text-sm">{cat.total.toLocaleString('fr-FR')} ¥</span>
                  <span className="text-inkfaint text-xs ml-1">({(cat.total / currency.rate).toFixed(0)} €)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liste des dépenses */}
      <div className="space-y-2">
        {expenses.length === 0 ? (
          <div className="bg-surface rounded-2xl p-8 border border-line text-center">
            <div className="text-4xl mb-3">💳</div>
            <p className="text-inkfaint text-sm">Aucune dépense enregistrée</p>
            <p className="text-inkfaint text-xs mt-1">Commencez à tracker vos dépenses en voyage !</p>
          </div>
        ) : expenses.map(expense => {
          const cat = CATEGORIES.find(c => c.id === expense.category);
          return (
            <div key={expense.id} className="bg-surface rounded-xl p-3.5 border border-line flex items-center gap-3">
              <span className="text-xl flex-shrink-0">{cat?.icon || '📦'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-ink text-sm font-semibold truncate">{expense.label}</p>
                <p className="text-inkfaint text-xs">{expense.date} · {cat?.label}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-ink font-bold text-sm">{expense.amount.toLocaleString('fr-FR')} ¥</p>
                <p className="text-inkfaint text-xs">{(expense.amount / currency.rate).toFixed(1)} €</p>
              </div>
              <button onClick={() => removeExpense(expense.id)} className="ml-1 text-inkfaint hover:text-red-600 transition-colors flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuiviDepenses;
