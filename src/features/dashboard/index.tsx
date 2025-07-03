import TaskStatusList from '@features/dashboard/TaskStatusList.tsx';
import { TASK_STATUS, TASK_STATUS_TITLE_MAP, type TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import { closestCorners, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useRef } from 'react';
import { createBoundaryModifier } from '@shared/utils/utils.ts';
import { useMainLayoutOutletContext } from '@layout/MainLayout/useMainLayoutOutletContext.ts';
import TaskCard from '@shared/components/TaskCard';
import { useDragOverlayTask } from '@features/dashboard/useDragOverlayTask.ts';
import { useDragEndInTaskList } from '@features/dashboard/useDragEndInTaskList.ts';
import type { TaskStatusItemProps } from '@features/dashboard/dashboard.types.ts';
import { useTaskStore } from '@stores/taskStore';

/**
 * 대시보드 페이지 컴포넌트
 * @constructor
 */
const DashboardPage = () => {
  // 메인 레이아웃 컨텐츠 최상위 컨테이너 dom ref
  const { containerRef } = useMainLayoutOutletContext();
  // 상태별 작업 리스트 dom ref
  const taskStatusListRef = useRef<HTMLUListElement>(null);

  const getTasksByStatus = useTaskStore(state => state.getTasksByStatus);

  const sensor = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const { handleDragStart, overlayWidth, activeTask, flushActiveTask } = useDragOverlayTask();
  const handleDragEnd = useDragEndInTaskList(flushActiveTask);

  // 작업 상태 아이템 프롭 리스트
  const TaskStatusItemProps: ({ key: TaskStatusKey } & TaskStatusItemProps)[] = [
    {
      key: TASK_STATUS.TODO,
      title: TASK_STATUS_TITLE_MAP[TASK_STATUS.TODO],
      status: TASK_STATUS.TODO,
      tasks: getTasksByStatus(TASK_STATUS.TODO),
    },
    {
      key: TASK_STATUS.IN_PROGRESS,
      title: TASK_STATUS_TITLE_MAP[TASK_STATUS.IN_PROGRESS],
      status: TASK_STATUS.IN_PROGRESS,
      tasks: getTasksByStatus(TASK_STATUS.IN_PROGRESS),
    },
    {
      key: TASK_STATUS.COMPLETED,
      title: TASK_STATUS_TITLE_MAP[TASK_STATUS.COMPLETED],
      status: TASK_STATUS.COMPLETED,
      tasks: getTasksByStatus(TASK_STATUS.COMPLETED),
    },
  ];

  return (
    <DndContext
      sensors={sensor}
      collisionDetection={closestCorners}
      modifiers={[createBoundaryModifier(containerRef)]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <TaskStatusList ref={taskStatusListRef}>
        {TaskStatusItemProps.map(({ key, ...props }) => (
          <TaskStatusList.Item key={key} {...props} />
        ))}
      </TaskStatusList>
      <DragOverlay adjustScale={false}>
        {activeTask ? (
          /* ghost component (드래그 대상 컴포넌트)*/
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
