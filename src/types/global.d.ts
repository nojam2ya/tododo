import type { TaskPriorityKey, TaskStatusKey } from '@shared/constants/taskConstants.tsx';

/* 작업 */
export interface Task {
  id: string; // 작업 아이디
  title: string; // 작업명
  content: string; // 작업 내용
  status: TaskStatusKey; // 작업 상태
  tags: string[]; // 태그 아이디 리스트
  date: string; // 작업 날짜
  completedDate?: string; // 완료 날짜
  priority: TaskPriorityKey; // 중요도
  createdDate: string; // 생성일
  updateDate: string; // 수정일
}

/* 태그 */
export interface Tag {
  id: string; // 태그 아이디
  title: string; // 태그 내용
  createdDate: string; // 생성일
  updateDate: string; // 수정일
}

/* 추가용 임시 태그 */
export type NewTag = Omit<Tag, 'id'>;
