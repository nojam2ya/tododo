import ValueCard from '@features/status/ValueCard.tsx';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import NotificationCard from '@features/status/NotificationCard';
import RecentCompleted from '@features/status/RecentCompleted';

const StatusPage = () => {
  return (
    <div className={'grid grid-cols-3 grid-rows-auto gap-4'}>
      <ValueCard
        title={
          <span className={'flex-between-center'}>
            <span>완료율</span>
            <ArrowTrendingUpIcon className={'w-4 h-4 text-green-600'} />
          </span>
        }
        content={'85%'}
        footer={'지난달 대비'}
      />
      <ValueCard
        title={
          <span className={'flex-between-center'}>
            <span>지연일</span>
            <ArrowTrendingDownIcon className={'w-4 h-4 text-red-600'} />
          </span>
        }
        content={'2 시간'}
        footer={'지난달 대비'}
      />
      <NotificationCard />
      <ValueCard
        title={
          <span className={'flex-between-center'}>
            <span>전체 완료 작업</span>
          </span>
        }
        content={'150'}
        footer={'지난달 대비'}
      />
      `
      <ValueCard
        title={
          <span className={'flex-between-center'}>
            <span>전체 마감</span>
          </span>
        }
        content={'300 시간'}
        footer={'지난달 대비'}
      />
      <div className={'card-base col-span-2'}>chart</div>
      <RecentCompleted />
    </div>
  );
};

export default StatusPage;
