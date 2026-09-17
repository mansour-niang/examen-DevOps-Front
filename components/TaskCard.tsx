import Link from 'next/link';
import { Task } from '@/lib/api';

const STATUS_COLORS: Record<string, string> = {
  TODO: 'bg-zinc-100 text-zinc-600',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  DONE: 'bg-emerald-100 text-emerald-700',
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="border border-zinc-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-zinc-200/60 hover:-translate-y-0.5 transition-all cursor-pointer bg-white h-full">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h2 className="font-semibold text-zinc-900">{task.title}</h2>
          <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[task.status] ?? 'bg-zinc-100 text-zinc-600'}`}>
            {task.status}
          </span>
        </div>
        {task.description && (
          <p className="text-sm text-zinc-500 line-clamp-3">{task.description}</p>
        )}
      </div>
    </Link>
  );
}
