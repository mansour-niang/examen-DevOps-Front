'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTask, updateTask, Task } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import DeleteButton from '@/components/DeleteButton';

export default function TaskDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    getTask(id).then(setTask);
  }, [id]);

  if (!task) return <main className="max-w-xl mx-auto p-6"><p className="text-zinc-400">Chargement...</p></main>;

  return (
    <main className="max-w-xl mx-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-violet-600"
        >
          ← Retour aux tâches
        </Link>
        <DeleteButton id={task.id} />
      </div>
      <TaskForm
        heading="Modifier la tâche"
        defaultValues={{
          title: task.title,
          description: task.description ?? '',
          status: task.status,
        }}
        onSubmit={async (data) => { await updateTask(task.id, data); }}
        submitLabel="Mettre à jour"
      />
    </main>
  );
}
