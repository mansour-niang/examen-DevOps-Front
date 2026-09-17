'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTask } from '@/lib/api';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteTask(id);
      router.push('/tasks');
      router.refresh();
    } catch {
      alert('Erreur lors de la suppression');
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-rose-400 text-white px-4 py-2 rounded-xl hover:bg-rose-500 disabled:opacity-50 font-medium text-sm shadow-sm shadow-rose-200 transition-colors"
        >
          {loading ? 'Suppression...' : 'Confirmer'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="border border-zinc-200 text-zinc-600 px-4 py-2 rounded-xl hover:bg-zinc-50 font-medium text-sm transition-colors"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-rose-400 border border-rose-100 px-4 py-2 rounded-xl hover:bg-rose-50 font-medium text-sm transition-colors"
    >
      Supprimer
    </button>
  );
}
