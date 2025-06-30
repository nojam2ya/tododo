import CardTitle from '@features/status/CardTitle.tsx';
import NotificationList from '@features/status/NotificationCard/NotificationList.tsx';
import dayjs from 'dayjs';
import type { TaskPriorityKey } from '@shared/constants/taskConstants.tsx';

const data = [
  {
    id: '1',
    title: 'New tasks available for review',
    date: '2025-06-15',
    priority: 'low',
  },
  {
    id: '2',
    title: 'Task review meeting',
    date: '2025-06-16',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'New task assignments',
    date: '2025-06-22',
    priority: 'high',
  },
  {
    id: '4',
    title: 'Task review meeting',
    date: '2025-06-42',
    priority: 'medium',
  },
];

const NotificationCard = () => {
  return (
    <div className={'card-base row-span-2'}>
      <CardTitle>
        <span className={'flex-between-center gap-2'}>
          알림
          <p className={'tag'}>Today, {dayjs().format('YYYY.MM.DD (ddd)')}</p>
        </span>
      </CardTitle>
      <NotificationList>
        {data.map(task => (
          <NotificationList.Item
            key={task.id}
            title={task.title}
            date={task.date}
            priority={task.priority as TaskPriorityKey}
          />
        ))}
      </NotificationList>
      <button className={'round-button w-full mt-6'}>더보기</button>
    </div>
  );
};

export default NotificationCard;
