import { db } from './index';
import { tasks } from './schema';
import { eq } from 'drizzle-orm';

export async function getAllTasks() {
  return await db.select().from(tasks).orderBy(tasks.createdAt);
}

export async function addTask(title: string, description?: string) {
  const result = await db.insert(tasks).values({ title, description }).returning();
  return result[0];
}

export async function deleteTask(id: number) {
  await db.delete(tasks).where(eq(tasks.id, id));
}