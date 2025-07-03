import { useState } from 'react';
import type { Task } from '@/types/global';
import type { DragStartEvent } from '@dnd-kit/core';

import { useTaskStore } from '@stores/taskStore';

/**
 * 드래그 시 보여줄 작업 정보(ghost drag 용)
 */
export const useDragOverlayTask = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null); // 드래그된 작업
  const [overlayWidth, setOverlayWidth] = useState<number>(); // 드래그 창 width
  const tasks = useTaskStore(state => state.tasks);

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id;
    const task = tasks.find(t => t.id === id);
    if (task) setActiveTask(task);

    const el = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (el) {
      setOverlayWidth(el.offsetWidth); // 직접 width 측정
    }
  };

  const flushActiveTask = () => setActiveTask(null);

  return {
    activeTask,
    overlayWidth,
    handleDragStart,
    flushActiveTask,
  };
};
