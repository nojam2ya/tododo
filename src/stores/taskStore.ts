import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import dayjs from 'dayjs';

import type { Task } from '@/types/global';
import type { TaskStatusKey } from '@/shared/constants/taskConstants.tsx';
import { FULL_DATE_FORMAT } from '@/shared/constants/constants.tsx';

// 초기 데이터
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
    content: 'Optimize database queries and add proper indexing\n\n',
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

// 타입 정의
type FromId = { fromId: string; status?: TaskStatusKey };
type ToId = { toId: string; posYStr?: 'top' | 'bottom' };

interface TaskStore {
  tasks: Task[];
  getTasksByStatus: (status: TaskStatusKey) => Task[];
  createTask: (task: Omit<Task, 'id' | 'createdDate' | 'updateDate'>) => void;
  resortTask: (props: FromId | (FromId & ToId)) => void;
}

// 스토어 생성
export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: data,

      getTasksByStatus: status => get().tasks.filter(task => task.status === status),

      createTask: task => {
        const now = dayjs().format(FULL_DATE_FORMAT);
        const newTask: Task = {
          ...task,
          id: `${dayjs()}${task.status}`,
          createdDate: now,
          updateDate: now,
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
      },

      resortTask: props => {
        set(state => {
          const { fromId, status } = props;
          const fromTask = state.tasks.find(t => t.id === fromId);
          if (!fromTask) return state;

          const updatedTask = { ...fromTask, status: status ?? fromTask.status };
          const filteredTasks = state.tasks.filter(t => t.id !== fromId);

          if (!('toId' in props) || !props.toId) {
            return { tasks: [...filteredTasks, updatedTask] };
          }

          const { toId, posYStr = 'bottom' } = props;
          const index = filteredTasks.findIndex(t => t.id === toId);
          if (index === -1) return { tasks: [...filteredTasks, updatedTask] };

          const before = filteredTasks.slice(0, posYStr === 'top' ? index : index + 1);
          const after = filteredTasks.slice(posYStr === 'top' ? index : index + 1);
          return { tasks: [...before, updatedTask, ...after] };
        });
      },
    }),
    {
      name: 'task',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
