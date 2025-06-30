import RecentCompletedList from '@features/status/RecentCompleted/RecentCompletedList.tsx';
import CardLargeTitle from '@features/status/CardLargeTitle.tsx';

const data = [
  {
    id: '1',
    title: 'New tasks available for review',
    content: 'New tasks available for review',
    date: '2025-05-15',
    completedDate: '2025-05-15',
    Priority: 'low',
  },
  {
    id: '2',
    title: 'Task review meeting',
    content: 'Task review meeting',
    date: '2025-05-16',
    completedDate: '2025-05-16',
    Priority: 'medium',
  },
  {
    id: '3',
    title: 'New task assignments',
    content: 'New task assignments',
    date: '2025-05-22',
    completedDate: '2025-05-22',
    priority: 'high',
  },
];

const RecentCompleted = () => {
  return (
    <div className={'card-base'}>
      <CardLargeTitle>완료작업</CardLargeTitle>
      <RecentCompletedList>
        {data.map(task => (
          <RecentCompletedList.Item completedDate={task.completedDate} title={task.title} content={task.content} />
        ))}
      </RecentCompletedList>
      <button className={'round-button w-full mt-4'}>더보기</button>
    </div>
  );
};

export default RecentCompleted;
