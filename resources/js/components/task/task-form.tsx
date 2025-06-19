import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/bootstrap';
import type { TaskFormProps, Task } from '@/types';

const TaskForm: React.FC<TaskFormProps> = ({ task = null, onClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Task, Error, FormData>({
    mutationFn: (data) =>
      task
        ? axios.put(`/api/tasks/${task.id}`, data)
        : axios.post('/api/tasks', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={task?.title ?? ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={task?.description ?? ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          defaultValue={task?.status ?? 'pending'}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          name="due_date"
          defaultValue={task?.due_date ?? ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {task ? 'Update' : 'Create'} Task
      </button>
    </form>
  );
};

export default TaskForm;