'use server';

import { revalidatePath } from 'next/cache';
import { addTask, deleteTask } from '@/db/queries';

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  if (!title || title.trim() === '') {
    throw new Error('Название задачи обязательно');
  }

  await addTask(title, description || null);
  revalidatePath('/');
}

export async function removeTask(formData: FormData) {
  const id = Number(formData.get('id'));
  await deleteTask(id);
  revalidatePath('/');
}