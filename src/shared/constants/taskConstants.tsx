export const TASK_STATUS = {
  TO_DO: {
    TITLE: 'To do',
    KEY: 'todo',
  },
  IN_PROGRESS: {
    TITLE: 'In progress',
    KEY: 'inProgress',
  },
  COMPElTED: {
    TITLE: 'Completed',
    KEY: 'completed',
  },
} as const;

export type TaskStatusKey = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]['KEY'];

export const TASK_Priority = {
  HIGH: {
    TITLE: 'high',
    KEY: 'high',
  },
  MEDIUM: {
    TITLE: 'medium',
    KEY: 'medium',
  },
  LOW: {
    TITLE: 'low',
    KEY: 'low',
  },
} as const;

export type TaskPriorityKey = (typeof TASK_Priority)[keyof typeof TASK_Priority]['KEY'];
