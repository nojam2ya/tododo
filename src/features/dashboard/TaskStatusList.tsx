import type { ChildrenProps, Task } from '@/types/global';
import PlusButton from '@components/_buttons/PlusButton';
import OverlayPopup from '@components/OverlayPopup';
import { forwardRef, useState } from 'react';
import DraggableTaskCard from '@/shared/components/DraggableTaskCard';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

interface TaskStatusItemProps {
  title: string;
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
const TaskStatusItem: React.FC<TaskStatusItemProps> = ({ title, tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-task-container-${title}`,
  });

  return (
    <>
      <li className={'flex flex-col flex-1 relative gap-2'}>
        <TaskStatusItemHeader
          title={title}
          count={tasks.length}
          button={<PlusButton type="button" aria-label={`${title} 추가`} onClick={open} />}
        />
        <ul
          className={clsx(
            'flex-grow flex flex-col gap-2 rounded-lg transition-colors duration-300',
            isOver ? 'bg-primary/20' : undefined,
          )}
          ref={setNodeRef}
        >
          {tasks.map(task => (
            <DraggableTaskCard key={task.id} task={task} draggableId={`draggable-task-${task.id}`} />
          ))}
        </ul>
      </li>
      <OverlayPopup isOpen={isOpen} close={close}>
        test
      </OverlayPopup>
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
