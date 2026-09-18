'use client';

import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '@/lib/api';
import { COLUMN_STYLES, type ColumnId } from './constants';

type Props = {
  task: Task;
  overlay?: boolean;
};

export default function KanbanCard({ task, overlay = false }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });
  const accent = COLUMN_STYLES[task.status as ColumnId] ?? COLUMN_STYLES.TODO;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={overlay ? undefined : style}
      {...(overlay ? {} : attributes)}
      {...(overlay ? {} : listeners)}
      className={`mb-3 touch-none select-none rounded-2xl border p-4 transition-all
        ${
          overlay
            ? `${accent.cardBg} scale-105 rotate-2 border-transparent shadow-xl ring-2 ${accent.cardRing}`
            : isDragging
              ? `${accent.cardBg} cursor-grabbing border-dashed border-zinc-300 opacity-40`
              : `${accent.cardBg} ${accent.cardBorder} cursor-grab hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing`
        }`}
    >
      <h3 className="mb-1 text-sm font-semibold text-zinc-900">{task.title}</h3>
      {task.description && (
        <p className="mb-2 line-clamp-2 text-xs text-zinc-500">{task.description}</p>
      )}
      <Link
        href={`/tasks/${task.id}`}
        onPointerDown={(e) => e.stopPropagation()}
        className="text-xs font-medium text-violet-600 hover:text-violet-700"
      >
        Voir le détail →
      </Link>
    </div>
  );
}
