import type { ChildrenProps, Task } from '@/types/global';
import PlusButton from '@components/_buttons/PlusButton';
import { forwardRef, useContext } from 'react';
import DraggableTaskCard from '@shared/components/DraggableTaskCard';
import clsx from 'clsx';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import { TASK_DROPPABLE_ID_PREFIX } from '@features/dashboard/constants.ts';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupContext.ts';

interface TaskStatusItemProps {
  title: string;
  id: TaskStatusKey;
  tasks: Task[];
}

interface TaskStatusItemHeaderProps {
  icon?: React.ReactNode;
  title: string;
  count: number;
  button: React.ReactNode;
}

const TaskStatusItemHeader: React.FC<TaskStatusItemHeaderProps> = ({ title, count, button, icon }) => {
  return (
    <div className={'flex h-7 items-center gap-2'}>
      <h5 className={'flex gap-2 font-bold uppercase'}>
        {icon}
        {title}
      </h5>
      <p
        className={
          'w-8 h-5 rounded-full flex-center-center text-xs bg-background-secondary dark:bg-background-secondary/15'
        }
      >
        {count}
      </p>
      {button}
    </div>
  );
};
const TaskStatusItem: React.FC<TaskStatusItemProps> = ({ title, tasks, id }) => {
  const { open } = useContext(OverlayPopupDispatchContext);
  const handleOpen = () => {
    open({ key: 'ADD_NEW_TASK_POPUP' });
  };

  const { setNodeRef } = useDroppable({
    id: `${TASK_DROPPABLE_ID_PREFIX}${id}`,
    data: { id },
  });

  return (
    <>
      <li className={'flex flex-col flex-1 relative gap-2'}>
        <TaskStatusItemHeader
          title={title}
          count={tasks.length}
          button={<PlusButton type="button" aria-label={`${title} 추가`} onClick={handleOpen} />}
        />
        <ul
          className={clsx('flex-grow flex flex-col gap-2 rounded-lg transition-colors duration-300 h-full')}
          ref={setNodeRef}
          data-container-id={id}
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <DraggableTaskCard key={task.id} task={task} draggableId={task.id} />
            ))}
          </SortableContext>
        </ul>
      </li>
    </>
  );
};

const TaskStatusListComponent = forwardRef<HTMLUListElement, ChildrenProps & React.HTMLAttributes<HTMLUListElement>>(
  ({ children, ...props }, ref) => {
    return (
      <ul className={'flex justify-between gap-12 h-full relative'} {...props} ref={ref}>
        {children}
      </ul>
    );
  },
);

type TaskStatusListType = typeof TaskStatusListComponent & {
  TaskStatusItem: typeof TaskStatusItem;
};

const TaskStatusList = TaskStatusListComponent as TaskStatusListType;
TaskStatusList.TaskStatusItem = TaskStatusItem;

export default TaskStatusList;
