import type { TaskPriorityKey, TaskStatusKey } from '@shared/constants/taskConstants.tsx';

export interface Task {
  id: string;
  title: string;
  content: string;
  status: TaskStatusKey;
  tags: string[];
  date: string;
  completedDate?: string;
  priority: TaskPriorityKey;
  createdDate: string;
  updateDate: string;
}

//////////////////////////////////////////////////

export interface ChildrenProps {
  children: React.ReactNode;
}
