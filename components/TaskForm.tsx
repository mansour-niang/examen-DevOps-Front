'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLUMNS, COLUMN_STYLES, type ColumnId } from '@/components/kanban/constants';

type Props = {
  onSubmit: (data: { title: string; description: string; status: string }) => Promise<void>;
  defaultValues?: { title: string; description: string; status: string };
  submitLabel?: string;
  heading: string;
};

export default function TaskForm({ onSubmit, defaultValues, submitLabel = 'Enregistrer', heading }: Props) {
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
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-xl font-bold tracking-tight text-zinc-900">{heading}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-500">
            {error}
          </p>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Titre *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 py-3 text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
            placeholder="Titre de la tâche"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 py-3 text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
            placeholder="Description (optionnel)"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Statut</label>
          <div className="grid grid-cols-3 gap-2">
            {COLUMNS.map((col) => {
              const style = COLUMN_STYLES[col.id as ColumnId];
              const active = status === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setStatus(col.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? `${style.cardBg} ${style.cardBorder} ring-2 ${style.cardRing} ring-offset-1`
                      : 'border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                  }`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
                  <span className={active ? 'text-zinc-900' : ''}>{col.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-zinc-900 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-violet-600 disabled:opacity-50"
          >
            {loading ? 'En cours...' : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-zinc-200 px-5 py-2.5 font-semibold text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
