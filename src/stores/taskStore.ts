import { create } from 'zustand/react';
import type { Task } from '@/types/global';
import { createJSONStorage, persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { FULL_DATE_FORMAT } from '@/shared/constants/constants.tsx';
import type { TaskStatusKey } from '@/shared/constants/taskConstants.tsx';

const data: Task[] = [
  {
    id: '1',
    status: 'todo',
    title: 'Design new landing page',
    content: 'Create wireframes and mockups for the new landing page',
    date: '2025-12-15',
    tags: ['Design', 'UI/UX'],
    importance: 'medium',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
  {
    id: '2',
    status: 'todo',
    title: 'Set up authentication',
    content: 'Implement user login and registration system',
    date: '2025-12-15',
    tags: ['Backend', 'Auth'],
    importance: 'high',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
  {
    id: '3',
    status: 'todo',
    title: 'Design new landing page',
    content: 'Create wireframes and mockups for the new landing page',
    date: '2025-12-15',
    tags: ['Design', 'UI/UX'],
    importance: 'low',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
  {
    id: '55',
    status: 'inProgress',
    title: 'Implement user dashboard',
    content: 'Build the main dashboard with analytics and user data',
    date: '2025-12-15',
    tags: ['Frontend', 'Dashboard'],
    importance: 'medium',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
  {
    id: '56',
    status: 'inProgress',
    title: 'Database optimization',
    content: 'Optimize database queries and add proper indexing\n' + '\n',
    date: '2025-12-14',
    tags: ['Design', 'UI/UX'],
    importance: 'high',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
  {
    id: '57',
    status: 'inProgress',
    title: 'Design new landing page',
    content: 'Create wireframes and mockups for the new landing page',
    date: '2025-12-12',
    tags: ['Design', 'UI/UX'],
    importance: 'low',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
  {
    id: '125',
    status: 'completed',
    title: 'Project setup',
    content: 'Initialize project structure and dependencies',
    date: '2025-12-01',
    tags: ['Setup'],
    importance: 'medium',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
  {
    id: '126',
    status: 'completed',
    title: 'Design system',
    content: 'Create component library and design tokens',
    date: '2025-12-05',
    tags: ['Design', 'UI/UX'],
    importance: 'high',
    createdDate: '2025-12-15',
    updateDate: '2025-12-15',
  },
];

interface TaskStore {
  tasks: Task[];
  getTasksByStatus: (status: TaskStatusKey) => Task[];
  createTask: (task: Omit<Task, 'id' | 'createdDate' | 'updateDate'>) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: data,
      getTasksByStatus(status) {
        return get().tasks.filter(task => task.status === status);
      },
      createTask(task) {
        const today = dayjs();
        const curDate = today.format(FULL_DATE_FORMAT);
        set(state => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: `${today}${task.status}`,
              createdDate: curDate,
              updateDate: curDate,
            },
          ],
        }));
      },
    }),
    {
      name: 'task',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
