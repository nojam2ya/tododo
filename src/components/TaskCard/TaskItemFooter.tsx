import PriorityBox from '@components/TaskCard/PriorityBox.tsx';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { KO_DATE_FORMAT } from '@shared/constants/constants.tsx';
import type { TaskPriorityKey } from '@shared/constants/taskConstants.tsx';

interface TaskItemFooterProps {
  date: string;
  priority: TaskPriorityKey;
}

const TaskItemFooter: React.FC<TaskItemFooterProps> = ({ priority, date }) => {
  return (
    <div className={'flex-between-center'}>
      <p className={'flex items-ri gap-2 text-sm text-gray-400'}>
        <CalendarDaysIcon className={'w-5 h-5'} />
        {dayjs(date).format(KO_DATE_FORMAT)}
      </p>
      <PriorityBox priority={priority} />
    </div>
  );
};

export default TaskItemFooter;
