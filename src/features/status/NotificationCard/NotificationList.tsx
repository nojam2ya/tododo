import type { ChildrenProps, Importance } from '@/types/global';
import clsx from 'clsx';
import dayjs from 'dayjs';

interface NotifiactionItemProps {
  title: string;
  date: string;
  importance: Importance;
}

const NotificationItem: React.FC<NotifiactionItemProps> = ({ importance, date, title }) => {
  const today = dayjs();

  /* tailwindcss classes */
  const headBase = 'flex items-baseline gap-2';
  const importanceCircleBase = 'w-3 h-3 rounded-full relative top-[0.08rem] ';
  const importanceCircleType = {
    'bg-red-500 dark:bg-red-600': importance === 'high',
    'bg-yellow-500 dark:bg-yellow-600': importance === 'medium',
    'bg-blue-500 dark:bg-blue-600': importance === 'low',
  };

  return (
    <li>
      <span className={headBase}>
        <span className={clsx(importanceCircleBase, importanceCircleType)} aria-label={importance} />
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

type NotificationList = typeof NotificationListComponent & { NotificationItem: typeof NotificationItem };
const NotificationList = NotificationListComponent as NotificationList;
NotificationList.NotificationItem = NotificationItem;

export default NotificationList;
