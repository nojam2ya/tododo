import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import type { Task } from '@/types/global';

export interface TaskStatusItemProps {
  title: string;
  status: TaskStatusKey;
  tasks: Task[];
}
