import TaskStatusList from '@features/dashboard/TaskStatusList.tsx';
import { useTaskStore } from '@stores/taskStore.ts';
import { TASK_STATUS, TASK_STATUS_TITLE_MAP } from '@shared/constants/taskConstants.tsx';
import { closestCorners, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useRef } from 'react';
import { createBoundaryModifier } from '@shared/utils/utils.ts';
import { useMainLayoutOutletContext } from '@layout/MainLayout/useMainLayoutOutletContext.ts';
import TaskCard from '@shared/components/TaskCard';
import { useDragOverlayTask } from '@features/dashboard/useDragOverlayTask.ts';
import { useDragEndInTaskList } from '@features/dashboard/useDragEndInTaskList.ts';

const DashboardPage = () => {
  const taskStatusListRef = useRef<HTMLUListElement>(null);
  const { containerRef } = useMainLayoutOutletContext();
  const getTasksByStatus = useTaskStore(state => state.getTasksByStatus);

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('inProgress');
  const completedTasks = getTasksByStatus('completed');

  const sensor = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const { handleDragStart, overlayWidth, activeTask, flushActiveTask } = useDragOverlayTask();
  const handleDragEnd = useDragEndInTaskList(flushActiveTask);

  return (
    <DndContext
      sensors={sensor}
      collisionDetection={closestCorners}
      modifiers={[createBoundaryModifier(containerRef)]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <TaskStatusList ref={taskStatusListRef}>
        <TaskStatusList.Item
          title={TASK_STATUS_TITLE_MAP[TASK_STATUS.TODO]}
          status={TASK_STATUS.TODO}
          tasks={todoTasks}
        />
        <TaskStatusList.Item
          title={TASK_STATUS_TITLE_MAP[TASK_STATUS.IN_PROGRESS]}
          status={TASK_STATUS.IN_PROGRESS}
          tasks={inProgressTasks}
        />
        <TaskStatusList.Item
          title={TASK_STATUS_TITLE_MAP[TASK_STATUS.COMPLETED]}
          status={TASK_STATUS.COMPLETED}
          tasks={completedTasks}
        />
      </TaskStatusList>
      <DragOverlay adjustScale={false}>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            className="pointer-events-none shadow-lg"
            style={{ width: `${overlayWidth}px` }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DashboardPage;
