import { beforeEach, describe, expect, it } from 'vitest';
import type { Task } from '@/types/global';
import { TASK_STATUS } from '@shared/constants/taskConstants.tsx';
import { useTaskStore } from '@stores/taskStore/index.ts';

describe('Task Store', () => {
  const dummy: Omit<Task, 'id' | 'createdDate' | 'updateDate'> = {
    title: 'Test Task',
    status: TASK_STATUS.TODO,
    content: '',
    priority: 'medium',
    tags: [],
    date: '2025-07-02',
  };

  beforeEach(() => {
    // 테스트 시작 전 상태 초기화
    useTaskStore.setState({ tasks: [] });
  });

  it('createTask로 task가 추가된다', () => {
    const store = useTaskStore;
    const task = store.getState().createTask(dummy);
    const tasks = store.getState().tasks;
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(task.id);
  });

  it('getTasksByStatus는 상태별 task만 필터링한다', () => {
    const store = useTaskStore.getState();
    store.createTask({ ...dummy, status: TASK_STATUS.TODO });
    store.createTask({ ...dummy, status: TASK_STATUS.IN_PROGRESS });

    const todos = store.getTasksByStatus(TASK_STATUS.TODO);
    const inProgress = store.getTasksByStatus(TASK_STATUS.IN_PROGRESS);
    expect(todos.length).toBe(1);
    expect(inProgress.length).toBe(1);
  });

  it('deleteTask로 task가 삭제된다', () => {
    const store = useTaskStore.getState();
    const task = store.createTask(dummy);
    store.deleteTask(task);
    expect(store.tasks.length).toBe(0);
  });

  it('updateTask로 task가 수정된다', () => {
    const store = useTaskStore.getState();
    const task = store.createTask(dummy);
    store.updateTask({ ...task, title: 'Updated Title' });
    const updatedStore = useTaskStore.getState();
    expect(updatedStore.tasks[0].title).toBe('Updated Title');
  });

  it('resortTask로 순서가 바뀐다', () => {
    const store = useTaskStore.getState();
    const a = store.createTask({ ...dummy, title: 'A' });
    const b = store.createTask({ ...dummy, title: 'B' });

    store.resortTask({ fromId: a.id, toId: b.id, posYStr: 'bottom' });

    const newList = useTaskStore.getState().tasks;
    expect(newList[0].id).toBe(b.id); // A가 B 뒤로 감 → B가 앞에 있음
    expect(newList[1].id).toBe(a.id);
  });
});
