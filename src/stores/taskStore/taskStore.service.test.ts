import { describe, expect, it } from 'vitest';
import { resortTask } from './taskStore.service.ts';
import type { Task } from '@/types/global';
import { TASK_STATUS } from '@shared/constants/taskConstants.tsx';

const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'A',
    status: TASK_STATUS.TODO,
    content: 'A content',
    tags: ['1', '2'],
    priority: 'medium',
    date: '2025-07-02',
    createdDate: '',
    updateDate: '',
  },
  {
    id: '2',
    title: 'B',
    status: TASK_STATUS.TODO,
    content: 'A content',
    tags: ['1', '2'],
    priority: 'medium',
    date: '2025-07-02',
    createdDate: '',
    updateDate: '',
  },
  {
    id: '3',
    title: 'C',
    status: TASK_STATUS.IN_PROGRESS,
    content: 'A content',
    tags: ['1', '2'],
    priority: 'medium',
    date: '2025-07-02',
    createdDate: '',
    updateDate: '',
  },
];

describe('resortTask()', () => {
  it('fromId가 존재하지 않으면 원본을 그대로 반환한다', () => {
    const result = resortTask(dummyTasks, { fromId: '999' });
    expect(result).toEqual(dummyTasks);
  });

  it('toId가 없으면 맨 마지막에 추가한다', () => {
    const result = resortTask(dummyTasks, { fromId: '1' });
    expect(result[result.length - 1]?.id).toBe('1');
  });

  it('toId가 존재하고 top일 경우 해당 위치 앞에 삽입된다', () => {
    const result = resortTask(dummyTasks, { fromId: '1', toId: '2', posYStr: 'top' });
    const index = result.findIndex(t => t.id === '1');
    expect(result[index + 1].id).toBe('2');
  });

  it('toId가 존재하고 bottom일 경우 해당 위치 뒤에 삽입된다', () => {
    const result = resortTask(dummyTasks, { fromId: '1', toId: '2', posYStr: 'bottom' });
    const index = result.findIndex(t => t.id === '1');
    expect(result[index - 1].id).toBe('2');
  });

  it('status가 바뀌면 status가 업데이트된다', () => {
    const result = resortTask(dummyTasks, { fromId: '1', status: TASK_STATUS.IN_PROGRESS });
    const moved = result.find(t => t.id === '1');
    expect(moved?.status).toBe(TASK_STATUS.IN_PROGRESS);
  });

  it('toId가 존재하지만 존재하지 않는 아이디면 맨 끝에 추가된다', () => {
    const result = resortTask(dummyTasks, { fromId: '1', toId: '999', posYStr: 'top' });
    expect(result[result.length - 1]?.id).toBe('1');
  });
});
