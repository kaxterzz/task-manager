import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface SimpleUser {
  id: number;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  assigned_user_id?: number;
  assigned_user?: User;
  status: 'pending' | 'completed';
  due_date?: string;
}

export interface PaginatedTasks {
  data: Task[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Filters {
  assigned_user_id?: string;
  status?: string;
}

export interface TaskListProps {
  filters: Filters;
}

export interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
}

export interface UserSelectorProps {
  users: User[];
  selectedUserId: string | undefined;
  onChange: (value: string) => void;
}

export interface TasksIndexProps {
  tasks: PaginatedTasks;
  users: User[];
  filters: Filters;
}

export interface DashboardProps {
  tasks: PaginatedTasks;
  users: User[];
  filters: Filters;
}