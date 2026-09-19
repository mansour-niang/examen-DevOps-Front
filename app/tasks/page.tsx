import Link from 'next/link';
import { getTasks } from '@/lib/api';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import KpiCards from '@/components/KpiCards';

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-7 py-9 md:px-10 md:py-11 mb-8">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '18px 18px', color: '#fff' }}
        />
        <div
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-violet-600/30 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-2">Tableau de bord</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Vos tâches</h1>
            <p className="text-zinc-400 text-sm mt-1.5">Glissez une carte pour changer son statut.</p>
          </div>
          <Link
            href="/tasks/new"
            className="inline-flex items-center gap-1.5 self-start rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-violet-600 hover:text-white"
          >
            + Nouvelle tâche
          </Link>
        </div>
      </div>

      <KpiCards tasks={tasks} />

      {tasks.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border-2 border-dashed border-zinc-200">
          <p className="text-zinc-400">Aucune tâche pour le moment.</p>
          <Link href="/tasks/new" className="text-violet-600 text-sm font-medium hover:text-violet-700 mt-2 inline-block">
            Créer votre première tâche →
          </Link>
        </div>
      ) : (
        <KanbanBoard tasks={tasks} />
      )}
    </main>
  );
}
