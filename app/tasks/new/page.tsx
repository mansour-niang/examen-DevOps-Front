'use client';
import Link from 'next/link';
import { createTask } from '@/lib/api';
import TaskForm from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <Link
        href="/tasks"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-violet-600"
      >
        ← Retour aux tâches
      </Link>
      <TaskForm
        heading="Nouvelle tâche"
        onSubmit={async (data) => { await createTask(data); }}
        submitLabel="Créer la tâche"
      />
    </main>
  );
}
