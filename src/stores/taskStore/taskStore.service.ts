import type { Task } from '@/types/global';
import type { FromId, ToId } from '@stores/taskStore/taskStore.types.ts';

/**
 * 작업 재정렬
 * @param taskList - 기존 작업 리스트
 * @param props
 */
export function resortTask(taskList: Task[], props: FromId | (FromId & ToId)): Task[] {
  const { fromId, status } = props;
  const fromTask = taskList.find(t => t.id === fromId);
  if (!fromTask) return taskList;

  const updatedTask = { ...fromTask, status: status ?? fromTask.status };
  const filteredTasks = taskList.filter(t => t.id !== fromId);

  // 재정렬 목표 작업이 없는 경우
  if (!('toId' in props) || !props.toId) {
    return [...filteredTasks, updatedTask]; // 작업 리스트 마지막에 추가
  }

  // 재정렬 목표 작업이 있는 경우
  const {
    toId,
    posYStr = 'bottom', // top - 앞, bottom - 뒤 추가
  } = props;
  const index = filteredTasks.findIndex(t => t.id === toId);
  if (index === -1) return [...filteredTasks, updatedTask];

  const before = filteredTasks.slice(0, posYStr === 'top' ? index : index + 1);
  const after = filteredTasks.slice(posYStr === 'top' ? index : index + 1);

  return [...before, updatedTask, ...after];
}
