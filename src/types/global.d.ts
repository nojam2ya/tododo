export type Importance = 'high' | 'medium' | 'low';

export type WorkStatusTypes = 'To do' | 'In progress' | 'Completed';

export interface Work {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
  completedDate?: string;
  importance: Importance;
}

export interface WorkStatus {
  type: WorkStatusTypes;
  works: Work[];
}

//////////////////////////////////////////////////

export interface ChildrenProps {
  children: React.ReactNode;
}
