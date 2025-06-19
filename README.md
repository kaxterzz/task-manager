Task Management App
A simple task management application built with Laravel, Inertia.js, React, and TypeScript. This app allows users to log in, manage tasks (create, update, delete, assign), and view task lists with filtering capabilities.
Features

User authentication with Laravel Sanctum (session-based).
Task CRUD operations (Create, Read, Update, Delete).
Task assignment to users.
Responsive UI with React and Tailwind CSS (assumed).
API endpoints for task management.
TypeScript for type safety in the frontend.

Tech Stack

Backend: Laravel (PHP), Sanctum for authentication
Frontend: Inertia.js, React, TypeScript
Database: MySQL (configurable)
Styling: Tailwind CSS (assumed)
API Client: Axios
State Management: React Query (for API calls)
Build Tool: Vite

Prerequisites

PHP >= 8.1
Composer
Node.js >= 18
npm or Yarn
MySQL or another supported database
Git

Installation

Clone the Repository
git clone https://github.com/your-username/task-management-app.git
cd task-management-app


Install Backend Dependencies
composer install


Install Frontend Dependencies
npm install


Configure Environment

Copy .env.example to .env:cp .env.example .env


Update .env with your database and app settings:APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:8000
SESSION_DOMAIN=localhost


Generate an application key:php artisan key:generate




Set Up Database

Run migrations to create database tables:php artisan migrate


Optionally seed the database with sample data:php artisan db:seed




Start the Development Servers

Start the Laravel server:php artisan serve


Start the Vite development server:npm run dev




Access the App

Open http://localhost:8000 in your browser.
Log in with seeded credentials (if applicable) or register a new user.



Usage

Login: Access /login to authenticate with email and password.
Dashboard: View and manage tasks at /dashboard.
Tasks: Create, update, delete, or assign tasks via the task list interface.
API: Use unauthenticated API endpoints (e.g., /api/tasks) for task management.

Project Structure
├── app/
│   ├── Http/
│   │   ├── Controllers/        # Laravel controllers (e.g., AuthController, TaskController)
│   │   └── Middleware/         # Custom middleware
│   └── Models/                 # Eloquent models (e.g., Task, User)
├── resources/
│   ├── css/                    # Styles (e.g., app.css)
│   └── js/                     # Frontend code
│       ├── Pages/              # Inertia.js pages (e.g., Auth/Login.tsx)
│       ├── components/         # React components (e.g., task/task-list.tsx)
│       └── bootstrap.ts        # Axios configuration
├── routes/
│   ├── api.php                 # API routes (e.g., /api/tasks)
│   └── web.php                 # Web routes (e.g., /login)
├── public/                     # Public assets
└── vite.config.ts              # Vite configuration

Debugging

Backend Logs: Check storage/logs/laravel.log.
Frontend Logs: Use browser DevTools (Console, Network tabs).
Axios Debugging: Logs are enabled in bootstrap.ts for requests and responses.
Vite Proxy: Ensure vite.config.ts proxies /api and /sanctum to http://localhost:8000.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is open-source and licensed under the MIT License.
Contact
For issues or questions, contact [kasunsmbox@hotmail.com] or open an issue on GitHub.
