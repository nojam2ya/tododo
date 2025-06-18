import TaskStatusList from '@features/dashboard/TaskStatusList.tsx';
import { useTaskStore } from '@stores/taskStore.ts';
import { TASK_STATUS } from '@/shared/constants/taskConstants.tsx';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useRef } from 'react';
import { createBoundaryModifier } from '@/shared/utils/utils.ts';
import { useMainLayoutOutletContext } from '@layout/MainLayout/useMainLayoutOutletContext.ts';

const DashboardPage = () => {
  const taskStatusListRef = useRef<HTMLUListElement>(null);
  const { containerRef } = useMainLayoutOutletContext();
  const getTasksByStatus = useTaskStore(state => state.getTasksByStatus);

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('inProgress');
  const completedTasks = getTasksByStatus('completed');

  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[createBoundaryModifier(containerRef)]}>
      <TaskStatusList ref={taskStatusListRef}>
        <TaskStatusList.TaskStatusItem title={TASK_STATUS.TO_DO.TITLE} tasks={todoTasks} />
        <TaskStatusList.TaskStatusItem title={TASK_STATUS.IN_PROGRESS.TITLE} tasks={inProgressTasks} />
        <TaskStatusList.TaskStatusItem title={TASK_STATUS.COMPElTED.TITLE} tasks={completedTasks} />
      </TaskStatusList>
    </DndContext>
  );
};

export default DashboardPage;
