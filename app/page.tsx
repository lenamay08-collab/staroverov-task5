import { getAllTasks } from '@/db/queries';
import { createTask, removeTask } from './actions';

export default async function HomePage() {
  const tasks = await getAllTasks();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">СПИСОК ЗАДАЧ</h1>

      {}
      <form action={createTask} className="mb-8 space-y-3">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Название задачи"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Описание (необязательно)"
            rows={2}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Добавить задачу
        </button>
      </form>

      {}
      {tasks.length === 0 ? (
        <p className="text-gray-500">Задач пока нет. Добавьте первую!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded-md shadow-sm flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                {task.description && <p className="text-gray-600">{task.description}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  {task.createdAt ? new Date(task.createdAt).toLocaleString() : '—'}
                </p>
              </div>
              <form action={removeTask}>
                <input type="hidden" name="id" value={task.id} />
                <button
                  type="submit"
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Удалить
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}