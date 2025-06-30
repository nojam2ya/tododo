import * as React from 'react';
import { forwardRef, useContext, useMemo, useState } from 'react';
import type { ChildrenProps, Task } from '@/types/global';
import DraggableTaskCard from 'src/components/DraggableTaskCard';
import clsx from 'clsx';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import { TASK_DROPPABLE_ID_PREFIX } from '@features/dashboard/constants.ts';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import PlusButton from '@shared/components/_buttons/PlusButton';
import { useSortType } from '@shared/hooks/useSortType.ts';
import type { SortOrder } from '@shared/constants/constants.tsx';

interface ItemProps {
  title: string;
  status: TaskStatusKey;
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

const Item: React.FC<ItemProps> = ({ title, tasks, status }) => {
  const { open } = useContext(OverlayPopupDispatchContext);
  const handleOpen = () => {
    open({ key: 'ADD_NEW_TASK_POPUP', props: { status } });
  };

  const { setNodeRef } = useDroppable({
    id: `${TASK_DROPPABLE_ID_PREFIX}${status}`,
    data: { id: status },
  });

  const [sortDateOrder, setSortDateOrder] = useState<number | null>(null);
  const [sortPriorityOrder, setSortPriorityOrder] = useState<number | null>(null);

  const { sortType: sortDateType, handleChangeSortType: changeSortDateType } = useSortType();
  const { sortType: sortPriorityType, handleChangeSortType: changeSortPriorityType } = useSortType();

  const sortTaskByDate = (tasks: Task[], sortType: SortOrder) => {
    if (!sortType) return tasks;

    if (sortDateType === 'desc') {
      return tasks.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
    }

    return tasks.sort();
  };

  const sortTaskByPriority = (tasks: Task[], sortType: SortOrder) => {
    if (!sortType) return tasks;

    if (sortType === 'desc') {
      return tasks.sort((a, b) => {
        const aNum = a.priority === 'high' ? 3 : a.priority === 'medium' ? 2 : 1;
        const bNum = b.priority === 'high' ? 3 : b.priority === 'medium' ? 2 : 1;
        if (aNum > bNum) return -1;
        if (aNum < bNum) return 1;
        return 0;
      });
    }

    return tasks.sort((a, b) => {
      const aNum = a.priority === 'high' ? 3 : a.priority === 'medium' ? 2 : 1;
      const bNum = b.priority === 'high' ? 3 : b.priority === 'medium' ? 2 : 1;
      if (aNum < bNum) return -1;
      if (aNum > bNum) return 1;
      return 0;
    });
  };

  const displayTasks = useMemo(() => {
    if (!sortDateType && !sortPriorityType) return tasks;

    if (!sortPriorityType) return sortTaskByDate(tasks, sortDateType);

    if (!sortDateType) return sortTaskByPriority(tasks, sortPriorityType);
  }, [tasks, sortDateType, sortDateOrder, sortPriorityType, sortPriorityOrder]);

  const handleSortDate = () => {
    const nextType = changeSortDateType();

    if (!nextType) {
      setSortDateOrder(null);
      if (sortPriorityOrder !== null && sortPriorityOrder > 1) setSortPriorityOrder(1);
      return;
    }

    if (sortDateOrder !== null) {
    }
  };

  return (
    <>
      <li className={'flex flex-col flex-1 relative gap-2'}>
        <TaskStatusItemHeader
          title={title}
          count={tasks.length}
          button={
            <>
              <PlusButton
                type="button"
                className={'absolute right-0 top-0'}
                aria-label={`${title} 추가`}
                onClick={handleOpen}
              />
              <button onClick={() => changeSortDateType()}>날짜순(내림차순)</button>
              <button onClick={() => changeSortPriorityType()}>중요도순(내림차순)</button>
            </>
          }
        />
        <ul
          className={clsx('flex-grow flex flex-col gap-2 rounded-lg transition-colors duration-300 h-full')}
          ref={setNodeRef}
          data-container-id={status}
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
  Item: typeof Item;
};

const TaskStatusList = TaskStatusListComponent as TaskStatusListType;
TaskStatusList.Item = Item;

export default TaskStatusList;
