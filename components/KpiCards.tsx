import type { Task } from '@/lib/api';

const ICONS: Record<string, React.ReactNode> = {
  total: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  TODO: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
  IN_PROGRESS: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" />
    </svg>
  ),
  DONE: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

const CARDS = [
  { id: 'total', label: 'Total' },
  { id: 'TODO', label: 'À faire' },
  { id: 'IN_PROGRESS', label: 'En cours' },
  { id: 'DONE', label: 'Terminées' },
] as const;

const ACCENT: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  total: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', iconBg: 'bg-violet-600' },
  TODO: { bg: 'bg-zinc-50', border: 'border-zinc-200', text: 'text-zinc-600', iconBg: 'bg-zinc-500' },
  IN_PROGRESS: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconBg: 'bg-amber-500' },
  DONE: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', iconBg: 'bg-emerald-600' },
};

export default function KpiCards({ tasks }: { tasks: Task[] }) {
  const counts = {
    total: tasks.length,
    TODO: tasks.filter((t) => t.status === 'TODO').length,
    IN_PROGRESS: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    DONE: tasks.filter((t) => t.status === 'DONE').length,
  };
  const donePct = counts.total > 0 ? Math.round((counts.DONE / counts.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {CARDS.map((card) => {
        const style = ACCENT[card.id];
        const value = counts[card.id as keyof typeof counts];
        return (
          <div
            key={card.id}
            className={`rounded-2xl border ${style.border} ${style.bg} p-5 transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${style.iconBg} text-white`}>
                {ICONS[card.id]}
              </span>
              <span className={`text-xs font-semibold uppercase tracking-wide ${style.text}`}>{card.label}</span>
            </div>
            <div className="text-3xl font-extrabold text-zinc-900 tabular-nums">{value}</div>
            {card.id === 'DONE' && counts.total > 0 && (
              <div className="text-xs text-zinc-400 mt-1">{donePct}% du total</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
