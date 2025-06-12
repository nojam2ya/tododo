import RecentCompletedList from '@features/status/RecentCompleted/RecentCompletedList.tsx';
import CardLargeTitle from '@features/status/CardLargeTitle.tsx';
import BaseCard from '@components/BaseCard';
import RoundButton from '@components/_buttons/RoundButton';

const data = [
  {
    id: '1',
    title: 'New tasks available for review',
    content: 'New tasks available for review',
    date: '2025-05-15',
    completedDate: '2025-05-15',
    importance: 'low',
  },
  {
    id: '2',
    title: 'Task review meeting',
    content: 'Task review meeting',
    date: '2025-05-16',
    completedDate: '2025-05-16',
    importance: 'medium',
  },
  {
    id: '3',
    title: 'New task assignments',
    content: 'New task assignments',
    date: '2025-05-22',
    completedDate: '2025-05-22',
    importance: 'high',
  },
];

const RecentCompleted = () => {
  return (
    <BaseCard>
      <CardLargeTitle>완료작업</CardLargeTitle>
      <RecentCompletedList>
        {data.map(work => (
          <RecentCompletedList.RecentCompletedItem
            completedDate={work.completedDate}
            title={work.title}
            content={work.content}
          />
        ))}
      </RecentCompletedList>
      <RoundButton className={'mt-4'}>더보기</RoundButton>
    </BaseCard>
  );
};

export default RecentCompleted;
