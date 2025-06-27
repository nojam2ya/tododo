import type { Task } from '@/types/global';

export type AddFormTask = Omit<Task, 'id' | 'tags'>;
