import { useState } from 'react';
import TaskList from '@/components/task/task-list';
import TaskForm from '@/components/task/task-form';
import UserSelector from '@/components/task/user-selector';

import type { TasksIndexProps, Filters } from '@/types';

const TasksIndexPage: React.FC<TasksIndexProps> = ({ tasks, users, filters = {} }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>(filters.assigned_user_id ?? '');
  const [statusFilter, setStatusFilter] = useState<string>(filters.status ?? '');

  const appliedFilters: Filters = {
    assigned_user_id: selectedUser,
    status: statusFilter,
  };

  return (
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Task Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        <div className="mb-4 flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Filter by User</label>
            <UserSelector
              users={users}
              selectedUserId={selectedUser}
              onChange={setSelectedUser}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <TaskList filters={appliedFilters} />

        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <TaskForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}
      </div>
  );
};

export default TasksIndexPage;