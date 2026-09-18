import Link from 'next/link';
import { getTasks } from '@/lib/api';
import KanbanBoard from '@/components/kanban/KanbanBoard';

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Tâches</h1>
        <Link
          href="/tasks/new"
          className="bg-zinc-900 text-white px-4 py-2 rounded-xl hover:bg-violet-600 transition-colors text-sm font-medium"
        >
          + Nouvelle tâche
        </Link>
      </div>

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
