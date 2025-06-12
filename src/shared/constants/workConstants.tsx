export const WORK_STATUS = {
  TO_DO: {
    title: 'To do',
    key: 'todo',
  },
  IN_PROGRESS: {
    title: 'In progress',
    key: 'inProgress',
  },
  COMPElTED: {
    title: 'Completed',
    key: 'completed',
  },
} as const;

export type WorkStatusKey = (typeof WORK_STATUS)[keyof typeof WORK_STATUS]['key'];
