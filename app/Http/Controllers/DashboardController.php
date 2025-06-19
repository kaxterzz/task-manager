<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
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
        $users = \App\Models\User::select(['id', 'email'])->get();

        return Inertia::render('dashboard', [
            'tasks' => $tasks,
            'users' => $users,
            'filters' => $filters,
        ]);
    }
}