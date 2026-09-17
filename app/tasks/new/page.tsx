'use client';
import { createTask } from '@/lib/api';
import TaskForm from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-zinc-900 tracking-tight mb-6">Nouvelle tâche</h1>
      <TaskForm
        onSubmit={async (data) => { await createTask(data); }}
        submitLabel="Créer la tâche"
      />
    </main>
  );
}
