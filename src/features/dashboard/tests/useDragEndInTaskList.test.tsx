import { renderHook } from '@testing-library/react';
import { useDragEndInTaskList } from '@/features/dashboard/useDragEndInTaskList';
import { describe, expect, it, vi } from 'vitest';
import { PointermoveProviderContext } from '@shared/providers/PointermoveProvider/PointermoveProvider.context.ts';

vi.mock('@stores/taskStore', () => ({
  useTaskStore: () => ({ resortTask: vi.fn() }),
}));

describe('useDragEndInTaskList', () => {
  it('콜백을 호출하고 유효한 "over" 없이 충돌하지 않는다.', () => {
    const callback = vi.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PointermoveProviderContext.Provider value={{ isDragging: false, position: { x: 0, y: 100 } }}>
        {children}
      </PointermoveProviderContext.Provider>
    );

    const { result } = renderHook(() => useDragEndInTaskList(callback), { wrapper });

    result.current({
      active: { id: '1' },
      over: null,
    } as any);

    expect(callback).toHaveBeenCalled();
  });
});
