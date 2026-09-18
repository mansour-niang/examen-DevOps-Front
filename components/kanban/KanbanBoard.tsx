'use client';

import { useMemo, useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { Task } from '@/lib/api';
import { updateTask } from '@/lib/api';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { COLUMNS, isColumnDroppableId, columnIdFromDroppableId, type ColumnId } from './constants';

type Columns = Record<ColumnId, number[]>;

function groupByStatus(tasks: Task[]): Columns {
  const grouped: Columns = { TODO: [], IN_PROGRESS: [], DONE: [] };
  for (const task of tasks) {
    const status = (task.status as ColumnId) in grouped ? (task.status as ColumnId) : 'TODO';
    grouped[status].push(task.id);
  }
  return grouped;
}

export default function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const [columns, setColumns] = useState<Columns>(() => groupByStatus(tasks));
  const [tasksById, setTasksById] = useState<Record<number, Task>>(() =>
    Object.fromEntries(tasks.map((t) => [t.id, t])),
  );
  const [activeId, setActiveId] = useState<number | null>(null);
  const startColumnRef = useRef<ColumnId | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function findColumnOf(taskId: number): ColumnId | null {
    return (Object.keys(columns) as ColumnId[]).find((col) => columns[col].includes(taskId)) ?? null;
  }

  function handleDragStart(event: DragStartEvent) {
    const id = Number(event.active.id);
    setActiveId(id);
    startColumnRef.current = findColumnOf(id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = Number(active.id);
    const activeCol = findColumnOf(activeId);
    if (!activeCol) return;

    const overCol = isColumnDroppableId(over.id)
      ? columnIdFromDroppableId(over.id)
      : findColumnOf(Number(over.id));
    if (!overCol || activeCol === overCol) return;

    setColumns((prev) => {
      const activeItems = prev[activeCol];
      const overItems = prev[overCol];
      const overIndex = overItems.indexOf(Number(over.id));

      return {
        ...prev,
        [activeCol]: activeItems.filter((id) => id !== activeId),
        [overCol]:
          overIndex === -1
            ? [...overItems, activeId]
            : [...overItems.slice(0, overIndex), activeId, ...overItems.slice(overIndex)],
      };
    });
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const id = Number(active.id);
    const fromColumn = startColumnRef.current;
    const currentColumn = findColumnOf(id);
    if (!fromColumn || !currentColumn) return;

    // Reorder within the destination column based on where it was dropped.
    if (!isColumnDroppableId(over.id)) {
      const overId = Number(over.id);
      setColumns((prev) => {
        const items = prev[currentColumn];
        const oldIndex = items.indexOf(id);
        const newIndex = items.indexOf(overId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev;
        return { ...prev, [currentColumn]: arrayMove(items, oldIndex, newIndex) };
      });
    }

    if (fromColumn === currentColumn) return;

    // Column changed: persist the new status. Reordering within a column
    // is session-only, since Task has no explicit ordering field.
    setTasksById((prev) => ({ ...prev, [id]: { ...prev[id], status: currentColumn } }));
    try {
      await updateTask(id, { status: currentColumn });
    } catch {
      // Revert on failure: move the card back to where it started.
      setColumns((prev) => ({
        ...prev,
        [currentColumn]: prev[currentColumn].filter((taskId) => taskId !== id),
        [fromColumn]: [...prev[fromColumn], id],
      }));
      setTasksById((prev) => ({ ...prev, [id]: { ...prev[id], status: fromColumn } }));
      alert("Impossible de déplacer la tâche, réessaie.");
    }
  }

  const activeTask = useMemo(() => (activeId ? tasksById[activeId] : null), [activeId, tasksById]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex flex-col gap-4 overflow-x-auto pb-2 md:flex-row">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            taskIds={columns[col.id]}
            tasksById={tasksById}
          />
        ))}
      </div>

      <DragOverlay>{activeTask ? <KanbanCard task={activeTask} overlay /> : null}</DragOverlay>
    </DndContext>
  );
}
