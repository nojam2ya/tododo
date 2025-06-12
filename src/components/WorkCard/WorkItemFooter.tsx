import ImportanceBox from '@components/WorkCard/ImportanceBox.tsx';
import type { Importance } from '@/types/global';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { KO_DATE_FORMAT } from '@/shared/constants.tsx';

interface WorkItemFooterProps {
  date: string;
  importance: Importance;
}

const WorkItemFooter: React.FC<WorkItemFooterProps> = ({ importance, date }) => {
  return (
    <div className={'flex-between-center'}>
      <p className={'flex items-ri gap-2 text-sm text-gray-400'}>
        <CalendarDaysIcon className={'w-5 h-5'} />
        {dayjs(date).format(KO_DATE_FORMAT)}
      </p>
      <ImportanceBox importance={importance} />
    </div>
  );
};

export default WorkItemFooter;
