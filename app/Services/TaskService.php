<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskService
{
    protected $repository;

    public function __construct(TaskRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getPaginatedTasks(array $filters): LengthAwarePaginator
    {
        return $this->repository->getPaginated($filters);
    }

    public function createTask(array $data)
    {
        return $this->repository->create($data);
    }

    public function updateTask($id, array $data)
    {
        $task = $this->repository->find($id);
        if (!$task) {
            throw new \Exception('Task not found');
        }
        return $this->repository->update($task, $data);
    }

    public function deleteTask($id)
    {
        $task = $this->repository->find($id);
        if (!$task) {
            throw new \Exception('Task not found');
        }
        return $this->repository->delete($task);
    }

    public function assignUser($taskId, $userId)
    {
        $task = $this->repository->find($taskId);
        if (!$task) {
            throw new \Exception('Task not found');
        }
        return $this->repository->assignUser($task, $userId);
    }
}