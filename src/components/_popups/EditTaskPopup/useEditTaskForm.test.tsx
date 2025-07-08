import { renderHook } from '@testing-library/react';
import { useEditTaskForm } from '@components/_popups/EditTaskPopup/useEditTaskForm.ts';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';

vi.mock('@stores/taskStore', () => ({
  useTaskStore: () => ({
    createTask: vi.fn(),
    updateTask: vi.fn(),
  }),
}));

vi.mock('@stores/tagStore', () => ({
  useTagStore: () => ({
    tags: [],
    createTag: (title: string) => ({ id: `${title}-id`, title }),
  }),
}));

vi.mock('@shared/hooks/useInitAndCreatedDataList', () => ({
  useInitAndCreatedDataList: () => ({
    dataList: [],
    addData: vi.fn(),
    removeData: vi.fn(),
    createData: vi.fn(),
  }),
}));

describe('useEditTaskForm', () => {
  it('returns form methods', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <OverlayPopupDispatchContext.Provider value={{ open: vi.fn(), handleSize: vi.fn(), close: vi.fn() }}>
        {children}
      </OverlayPopupDispatchContext.Provider>
    );

    const { result } = renderHook(() => useEditTaskForm('todo'), { wrapper });

    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeInstanceOf(Function);
  });
});
