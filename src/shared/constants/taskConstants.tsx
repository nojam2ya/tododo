export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  COMPLETED: 'completed',
} as const;

export const TASK_STATUS_TITLE_MAP = {
  [TASK_STATUS.TODO]: 'To do',
  [TASK_STATUS.IN_PROGRESS]: 'In progress',
  [TASK_STATUS.COMPLETED]: 'Completed',
} as const;

export type TaskStatusKey = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export const TASK_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export const TASK_PRIORITY_TITLE_MAP = {
  [TASK_PRIORITY.HIGH]: 'high',
  [TASK_PRIORITY.MEDIUM]: 'medium',
  [TASK_PRIORITY.LOW]: 'low',
} as const;

export type TaskPriorityKey = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];

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
