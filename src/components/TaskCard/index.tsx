import type { Task } from '@/types/global';
import TaskItemHeader from './TaskItemHeader.tsx';
import TaskItemFooter from './TaskItemFooter.tsx';
import { forwardRef } from 'react';
import clsx from 'clsx';

interface TaskCardProps extends React.HTMLAttributes<HTMLLIElement> {
  task: Task;
}

const TaskCard = forwardRef<HTMLLIElement, TaskCardProps>(({ task, className, ...props }, ref) => {
  return (
    <li className={clsx('card-base card-hover flex flex-col gap-2', className)} {...props} ref={ref}>
      <TaskItemHeader title={task.title} />
      <p className={'opacity-70 text-sm font-light'}>{task.content}</p>
      <ul className={'flex gap-1'}>
        {task.tags.map(t => (
          <li className={'tag'} key={t}>
            {t}
          </li>
        ))}
      </ul>
      <TaskItemFooter priority={task.priority} date={task.date} />
    </li>
  );
});

export default TaskCard;
