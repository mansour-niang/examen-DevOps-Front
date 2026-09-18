export const COLUMNS = [
  { id: 'TODO', title: 'À Faire' },
  { id: 'IN_PROGRESS', title: 'En Cours' },
  { id: 'DONE', title: 'Terminée' },
] as const;

export type ColumnId = (typeof COLUMNS)[number]['id'];

export const COLUMN_STYLES: Record<
  ColumnId,
  {
    dot: string;
    header: string;
    overRing: string;
    overBg: string;
    cardRing: string;
    cardBg: string;
    cardBorder: string;
  }
> = {
  TODO: {
    dot: 'bg-zinc-400',
    header: 'text-zinc-600',
    overRing: 'ring-zinc-300',
    overBg: 'bg-zinc-100/80',
    cardRing: 'ring-zinc-400',
    cardBg: 'bg-zinc-50',
    cardBorder: 'border-zinc-200',
  },
  IN_PROGRESS: {
    dot: 'bg-amber-400',
    header: 'text-amber-700',
    overRing: 'ring-amber-300',
    overBg: 'bg-amber-50',
    cardRing: 'ring-amber-400',
    cardBg: 'bg-amber-50',
    cardBorder: 'border-amber-200',
  },
  DONE: {
    dot: 'bg-emerald-400',
    header: 'text-emerald-700',
    overRing: 'ring-emerald-300',
    overBg: 'bg-emerald-50',
    cardRing: 'ring-emerald-400',
    cardBg: 'bg-emerald-50',
    cardBorder: 'border-emerald-200',
  },
};

export function columnDroppableId(columnId: ColumnId): string {
  return `column:${columnId}`;
}

export function isColumnDroppableId(id: string | number): id is string {
  return typeof id === 'string' && id.startsWith('column:');
}

export function columnIdFromDroppableId(id: string): ColumnId {
  return id.replace('column:', '') as ColumnId;
}
