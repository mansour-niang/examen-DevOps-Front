'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  onSubmit: (data: { title: string; description: string; status: string }) => Promise<void>;
  defaultValues?: { title: string; description: string; status: string };
  submitLabel?: string;
};

export default function TaskForm({ onSubmit, defaultValues, submitLabel = 'Enregistrer' }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [description, setDescription] = useState(defaultValues?.description ?? '');
  const [status, setStatus] = useState(defaultValues?.status ?? 'TODO');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError('Le titre est requis'); return; }
    setLoading(true);
    try {
      await onSubmit({ title, description, status });
      router.push('/tasks');
      router.refresh();
    } catch {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="text-rose-500 text-sm bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
          {error}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-zinc-600 mb-1.5">Titre *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-zinc-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-colors"
          placeholder="Titre de la tâche"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-600 mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-zinc-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-colors"
          placeholder="Description (optionnel)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-600 mb-1.5">Statut</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-zinc-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-colors"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-zinc-900 text-white px-4 py-2 rounded-xl hover:bg-violet-600 disabled:opacity-50 font-medium transition-colors"
        >
          {loading ? 'En cours...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-zinc-200 text-zinc-600 px-4 py-2 rounded-xl hover:bg-zinc-50 font-medium transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
