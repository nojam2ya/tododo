import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';

/* 재정렬할 대상 작업 아이디 */
export type FromId = { fromId: string; status?: TaskStatusKey };
/* 재정렬할 목표 작업 아이디 */
export type ToId = { toId: string; posYStr?: 'top' | 'bottom' };
