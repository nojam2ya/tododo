import type { Task } from '@/types/global';
import TaskItemHeader from './TaskItemHeader.tsx';
import TaskItemFooter from './TaskItemFooter.tsx';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <li className={'card-base card-hover flex flex-col gap-2'}>
      <TaskItemHeader title={task.title} />
      <p className={'opacity-70 text-sm font-light'}>{task.content}</p>
      <ul className={'flex gap-1'}>
        {task.tags.map(t => (
          <li className={'tag'} key={t}>
            {t}
          </li>
        ))}
      </ul>
      <TaskItemFooter importance={task.importance} date={task.date} />
    </li>
  );
};

export default TaskCard;
