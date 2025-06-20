import { useState } from 'react';
import type { Task } from '@/types/global';
import type { DragStartEvent } from '@dnd-kit/core';
import { useTaskStore } from '@stores/taskStore.ts';

export const useDragOverlayTask = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overlayWidth, setOverlayWidth] = useState<number>();
  const tasks = useTaskStore(state => state.tasks);

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id;
    const task = tasks.find(t => t.id === id);
    if (task) setActiveTask(task);

    // 여기서 직접 width 측정
    const el = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (el) {
      setOverlayWidth(el.offsetWidth);
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
