<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['status', 'assigned_user_id']);
        $tasks = $this->taskService->getPaginatedTasks($filters);

        // Return JSON for API requests
        if ($request->wantsJson()) {
            return response()->json($tasks);
        }

        // Return Inertia response for web requests
        $users = \App\Models\User::select(['id', 'email'])->get();
        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'users' => $users,
            'filters' => $filters,
        ]);
    }

    public function store(TaskRequest $request)
    {
        $this->taskService->createTask($request->validated());
        return response()->json(['message' => 'Task created successfully'], 201);
    }

    public function update(TaskRequest $request, $id)
    {
        $this->taskService->updateTask($id, $request->validated());
        return response()->json(['message' => 'Task updated successfully']);
    }

    public function destroy($id)
    {
        $this->taskService->deleteTask($id);
        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function assignUser(Request $request, $id)
    {
        $this->taskService->assignUser($id, $request->user_id);
        return response()->json(['message' => 'Task assigned successfully']);
    }
}