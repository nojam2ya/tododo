import type { Task } from '@/types/global';
import TaskItemHeader from './TaskItemHeader.tsx';
import TaskItemFooter from './TaskItemFooter.tsx';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { useTagStore } from '@stores/tagStore.ts';

interface TaskCardProps extends React.HTMLAttributes<HTMLLIElement> {
  task: Task;
}

const TaskCard = forwardRef<HTMLLIElement, TaskCardProps>(({ task, className, ...props }, ref) => {
  const tagMap = useTagStore(state => state.getTagMap)();
  return (
    <li className={clsx('card-base card-hover flex flex-col gap-2', className)} {...props} ref={ref}>
      <TaskItemHeader title={task.title} />
      <p className={'opacity-70 text-sm font-light'}>{task.content}</p>
      <ul className={'flex gap-1'}>
        {task.tags.map(tagId => (
          <li className={'tag'} key={tagId}>
            {tagMap.get(tagId)?.title}
          </li>
        ))}
      </ul>
      <TaskItemFooter priority={task.priority} date={task.date} />
    </li>
  );
});

export default TaskCard;
