import BaseCard from '@components/BaseCard';
import CardTitle from '@features/status/CardTitle.tsx';
import NotificationList from '@features/status/NotificationCard/NotificationList.tsx';
import type { Importance } from '@/types/global';
import Tag from '@components/Tag';
import dayjs from 'dayjs';
import RoundButton from '@components/_buttons/RoundButton';

const data = [
  {
    id: '1',
    title: 'New tasks available for review',
    date: '2025-06-15',
    importance: 'low',
  },
  {
    id: '2',
    title: 'Task review meeting',
    date: '2025-06-16',
    importance: 'medium',
  },
  {
    id: '3',
    title: 'New task assignments',
    date: '2025-06-22',
    importance: 'high',
  },
  {
    id: '4',
    title: 'Task review meeting',
    date: '2025-06-42',
    importance: 'medium',
  },
];

const NotificationCard = () => {
  /* tailwindcss classes */
  const titleBase = 'flex-between-center gap-2';

  return (
    <BaseCard className={'row-span-2'}>
      <CardTitle>
        <span className={titleBase}>
          알림
          <Tag title={`Today, ${dayjs().format('YYYY.MM.DD (ddd)')}`} />
        </span>
      </CardTitle>
      <NotificationList>
        {data.map(work => (
          <NotificationList.NotificationItem
            key={work.id}
            title={work.title}
            date={work.date}
            importance={work.importance as Importance}
          />
        ))}
      </NotificationList>
      <RoundButton className={'mt-6'}>더보기</RoundButton>
    </BaseCard>
  );
};

export default NotificationCard;
