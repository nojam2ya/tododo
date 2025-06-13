import type { TaskStatusKey } from '@/shared/constants/taskConstants.tsx';

export type Importance = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  content: string;
  status: TaskStatusKey;
  tags: string[];
  date: string;
  completedDate?: string;
  importance: Importance;
  createdDate: string;
  updateDate: string;
}

//////////////////////////////////////////////////

export interface ChildrenProps {
  children: React.ReactNode;
}
