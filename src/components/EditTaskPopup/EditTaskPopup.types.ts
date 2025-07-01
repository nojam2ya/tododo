import type { Task } from '@/types/global';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';

export type AddFormTask = Omit<Task, 'id' | 'tags'>;

export interface EditTaskPopupProps {
  status: TaskStatusKey;
  task?: Task;
}
