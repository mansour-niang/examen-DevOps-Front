'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Modifier la tâche</h1>
        <DeleteButton id={task.id} />
      </div>
      <TaskForm
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
