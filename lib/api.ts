const BASE = process.env.NEXT_PUBLIC_API_URL;

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}/tasks`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Task not found');
  return res.json();
}

export async function createTask(data: { title: string; description?: string; status: string }): Promise<Task> {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: number, data: { title?: string; description?: string; status?: string }): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}
