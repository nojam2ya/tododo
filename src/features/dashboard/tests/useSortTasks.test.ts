import { act, renderHook } from '@testing-library/react';
import { useSortTasks } from '@/features/dashboard/useSortTasks';
import { describe, expect, it } from 'vitest';
import type { Task } from '@/types/global';

const sampleTasks = [
  { id: '1', date: '2023-01-01', priority: 'high' },
  { id: '2', date: '2023-01-03', priority: 'low' },
  { id: '3', date: '2023-01-02', priority: 'medium' },
] as Task[];

describe('useSortTasks', () => {
  it('작업을 date(작엄 날짜) 기준으로 내림차순 정렬', () => {
    const { result } = renderHook(() => useSortTasks(sampleTasks));

    act(() => {
      result.current.updateSortOption('date');
    });

    expect(result.current.sortedTasks[0].id).toBe('2');
  });

  it('작업을 priority(중요도) 기준으로 오름차순 정렬', () => {
    const { result } = renderHook(() => useSortTasks(sampleTasks));

    act(() => {
      result.current.updateSortOption('priority');
      result.current.updateSortOption('priority');
    });

    expect(result.current.sortedTasks[0].priority).toBe('low');
  });
});
