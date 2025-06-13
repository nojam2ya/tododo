import type { ChildrenProps, Task } from '@/types/global';
import PlusButton from '@components/_buttons/PlusButton';
import TaskCard from 'src/components/TaskCard';
import OverlayPopup from '@components/OverlayPopup';
import { useState } from 'react';

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
  return (
    <>
      <li className={'flex flex-col flex-1 relative gap-2'}>
        <TaskStatusItemHeader
          title={title}
          count={tasks.length}
          button={<PlusButton type="button" aria-label={`${title} 추가`} onClick={open} />}
        />
        <ul className={'flex-grow flex flex-col gap-2'}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      </li>
      <OverlayPopup isOpen={isOpen} close={close}>
        test
      </OverlayPopup>
    </>
  );
};

const TaskStatusListComponent: React.FC<ChildrenProps> = ({ children }) => {
  return <ul className={'flex justify-between gap-12 h-full'}>{children}</ul>;
};

type TaskStatusListType = typeof TaskStatusListComponent & {
  TaskStatusItem: typeof TaskStatusItem;
};

const TaskStatusList = TaskStatusListComponent as TaskStatusListType;
TaskStatusList.TaskStatusItem = TaskStatusItem;

export default TaskStatusList;
