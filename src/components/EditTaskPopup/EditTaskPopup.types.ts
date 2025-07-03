import type { NewTag, Tag, Task } from '@/types/global';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';

/* 추가용 임시 작업 */
export type NewTask = Omit<Task, 'id' | 'tags'> & { tags: (Tag | NewTag)[] };

/* 작업 추가/수정 팝업 컴포넌트 프롭 */
export interface EditTaskPopupProps {
  status: TaskStatusKey; // 작업
  task?: Task; // 작업 상태
}
