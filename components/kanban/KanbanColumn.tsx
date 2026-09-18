'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task } from '@/lib/api';
import KanbanCard from './KanbanCard';
import { COLUMN_STYLES, columnDroppableId, type ColumnId } from './constants';

type Props = {
  id: ColumnId;
  title: string;
  taskIds: number[];
  tasksById: Record<number, Task>;
};

export default function KanbanColumn({ id, title, taskIds, tasksById }: Props) {
  const style = COLUMN_STYLES[id];
  const { setNodeRef, isOver } = useDroppable({ id: columnDroppableId(id) });

  return (
    <div className="flex w-full shrink-0 flex-col rounded-2xl border border-zinc-200 bg-zinc-50/60 p-3 md:w-80">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
        <h2 className={`text-sm font-semibold ${style.header}`}>{title}</h2>
        <span className="ml-auto rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-400">
          {taskIds.length}
        </span>
      </div>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`min-h-[140px] flex-1 rounded-xl p-1 transition-colors ${
            isOver ? `${style.overBg} ring-2 ring-dashed ${style.overRing}` : ''
          }`}
        >
          {taskIds.map((taskId) => (
            <KanbanCard key={taskId} task={tasksById[taskId]} />
          ))}
          {taskIds.length === 0 && (
            <p className="py-6 text-center text-xs text-zinc-400">Aucune tâche</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
