import type { WorkStatusKey } from '@/shared/constants/workConstants.tsx';

export type Importance = 'high' | 'medium' | 'low';

export interface Work {
  id: string;
  title: string;
  content: string;
  status: WorkStatusKey;
  tags: string[];
  date: string;
  completedDate?: string;
  importance: Importance;
  createdDate: string;
  updateDate: string;
}

export interface WorkStatus {
  type: WorkStatusTypes;
  works: Work[];
}

//////////////////////////////////////////////////

export interface ChildrenProps {
  children: React.ReactNode;
}
