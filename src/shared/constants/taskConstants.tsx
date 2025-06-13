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
