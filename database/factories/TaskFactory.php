<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'title' => $this->faker->sentence,
        'description' => $this->faker->paragraph,
        'assigned_user_id' => \App\Models\User::factory(),
        'status' => $this->faker->randomElement(['pending', 'completed']),
        'due_date' => $this->faker->date,
    ];
    }
}
