import * as React from 'react';
import { type FC, forwardRef, memo, useContext, useEffect } from 'react';
import DraggableTaskCard from '@components/DraggableTaskCard';
import clsx from 'clsx';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { TASK_DROPPABLE_ID_PREFIX } from '@features/dashboard/dashboard.constants.ts';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import PlusButton from '@shared/components/_buttons/PlusButton';
import { useSortTasks } from '@features/dashboard/useSortTasks.ts';
import SortButton from '@shared/components/_buttons/SortButton';
import { XCircleIcon } from '@heroicons/react/24/solid';
import type { ChildrenProps } from '@/types/component';
import type { TaskStatusItemProps } from '@features/dashboard/dashboard.types.ts';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';

interface ItemHeaderProps extends ChildrenProps {
  icon?: React.ReactNode; // 아이콘
  title: string; // 작업 상태명
  count: number; // 작업 상태별 작업 수
}

/**
 * 작업 상태 아이템 헤더 컴포넌트
 */
const ItemHeader: React.FC<ItemHeaderProps> = React.memo(({ title, count, children, icon }) => {
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
      {children}
    </div>
  );
});

const EmptyTask: FC<{ status: TaskStatusKey }> = ({ status }) => {
  const { open } = useContext(OverlayPopupDispatchContext);

  // 작업 추가/삭제 팝업 열기
  const handleOpen = () => {
    open({ key: 'EDIT_TASK_POPUP', props: { status } });
  };

  return (
    <button
      className={clsx(
        'border border-solid border-gray-300 h-full rounded-md flex-center-center text-gray-300 text-center text-sm transition-colors duration-300',
        'dark:border-white/20 dark:text-white/20',
        'hover:bg-background-secondary hover:dark:bg-background-secondary-dark',
      )}
      onClick={handleOpen}
    >
      작업이 없습니다.
      <br /> 작업을 추가해주세요.
    </button>
  );
};

/**
 * 작업 상태 아이템 컴포넌트
 */
const Item: React.FC<TaskStatusItemProps> = React.memo(({ title, tasks, status }) => {
  const { open } = useContext(OverlayPopupDispatchContext);

  // 작업 추가/삭제 팝업 열기
  const handleOpen = () => {
    open({ key: 'EDIT_TASK_POPUP', props: { status } });
  };

  const { setNodeRef, active } = useDroppable({
    id: `${TASK_DROPPABLE_ID_PREFIX}${status}`,
    data: { id: status },
  });

  const { updateSortOption, sortedTasks, sortOptions, resetSortOption } = useSortTasks(tasks);

  const dateOption = sortOptions.find(t => t.key === 'date');
  const priorityOption = sortOptions.find(t => t.key === 'priority');

  useEffect(() => {
    if (active && resetSortOption.length) resetSortOption(); // 드래그 시 정렬 해제
  }, [active, resetSortOption]);

  return (
    <li className={'flex flex-col flex-1 relative gap-2'}>
      <ItemHeader title={title} count={tasks.length}>
        <PlusButton
          type="button"
          className={'absolute right-0 top-0'}
          aria-label={`${title} 추가`}
          onClick={handleOpen}
        />
        <SortButton onClick={() => updateSortOption('date')} aria-label={'날짜 정렬'} order={dateOption?.order}>
          날짜
        </SortButton>
        <SortButton
          onClick={() => updateSortOption('priority')}
          aria-label={'중요도 정렬'}
          order={priorityOption?.order}
        >
          중요도
        </SortButton>
        {(dateOption || priorityOption) && (
          <button onClick={resetSortOption} aria-label={'정렬 취소'}>
            <XCircleIcon className={'w-6 h-6 text-primary'} />
          </button>
        )}
      </ItemHeader>
      {!sortedTasks.length ? (
        <EmptyTask status={status} />
      ) : (
        <ul
          className={clsx(
            'flex-grow flex flex-col gap-2 rounded-lg transition-colors duration-300 h-full',
            'scroll-container',
          )}
          ref={setNodeRef}
          data-container-id={status}
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {sortedTasks.map(task => (
              <DraggableTaskCard key={task.id} task={task} draggableId={task.id} />
            ))}
          </SortableContext>
        </ul>
      )}
    </li>
  );
});

/**
 * 작업 상태 리스트 컨테이너 컴포넌트
 */
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

const TaskStatusList = memo(TaskStatusListComponent) as TaskStatusListType;
TaskStatusList.Item = Item;

export default TaskStatusList;
