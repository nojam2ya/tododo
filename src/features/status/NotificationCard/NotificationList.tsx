import clsx from 'clsx';
import dayjs from 'dayjs';
import type { TaskPriorityKey } from '@shared/constants/taskConstants.tsx';
import type { ChildrenProps } from '@/types/component';

interface ItemProps {
  title: string;
  date: string;
  priority: TaskPriorityKey;
}

const Item: React.FC<ItemProps> = ({ priority, date, title }) => {
  const today = dayjs();

  /* tailwindcss classes */
  const headBase = 'flex items-baseline gap-2';
  const PriorityCircleBase = 'w-3 h-3 rounded-full relative top-[0.08rem] ';
  const PriorityCircleType = {
    'bg-red-500 dark:bg-red-600': priority === 'high',
    'bg-yellow-500 dark:bg-yellow-600': priority === 'medium',
    'bg-blue-500 dark:bg-blue-600': priority === 'low',
  };

  return (
    <li>
      <span className={headBase}>
        <span className={clsx(PriorityCircleBase, PriorityCircleType)} aria-label={priority} />
        <span className={'flex flex-col'}>
          <span className={'text-sm'}>{title}</span>
          <span className={'text-xs text-gray-400'}>{dayjs(date).diff(today, 'day')}일 전</span>
        </span>
      </span>
    </li>
  );
};

const NotificationListComponent: React.FC<ChildrenProps> = ({ children }) => {
  const base = 'flex flex-col gap-4 mt-3';
  return <ul className={base}>{children}</ul>;
};

type NotificationList = typeof NotificationListComponent & { Item: typeof Item };
const NotificationList = NotificationListComponent as NotificationList;
NotificationList.Item = Item;

export default NotificationList;
