import { ChartBarIcon, PresentationChartBarIcon } from '@heroicons/react/24/solid';
import SingleAxisBarChart from '@shared/components/_charts/SingleAxisBarChart';
import { type FC, useState } from 'react';
import { useTagUsedChartData } from '@features/setting/TagManagement/TagUsedCart/useTagUsedChartData.ts';
import clsx from 'clsx';

interface TagUsedCartProps {
  className?: string;
}

const ToggleSortModeButton: FC<{
  onClick: () => void;
  isTop: boolean;
  isLeast: boolean;
}> = ({ isTop, isLeast, onClick }) => {
  return (
    <button
      className={
        'w-8 h-8 rounded-full flex-center-center bg-background-primary dark:bg-background-primary-dark absolute right-5 top-5'
      }
      onClick={onClick}
      title={isLeast ? '사용수 상위 보기' : isTop ? '사용수 하위 보기' : undefined}
    >
      {isLeast && <ChartBarIcon className={'w-3 h-3 -scale-x-100 scale-y-100'} aria-label={'사용수 하위'} />}
      {isTop && <ChartBarIcon className={'w-3 h-3'} aria-label={'사용수 상위'} />}
    </button>
  );
};

const TagUsedCart: FC<TagUsedCartProps> = ({ className }) => {
  const [sortMode, setSortMode] = useState<'least' | 'top'>('top');

  const toggleSortMode = () => setSortMode(prev => (prev === 'least' ? 'top' : 'least'));

  const { topUsed, leastUsed } = useTagUsedChartData();

  const chartMap = {
    top: topUsed,
    least: leastUsed,
  };

  return (
    <div className={clsx('card-base flex flex-col gap-2 relative', className)}>
      <ToggleSortModeButton onClick={toggleSortMode} isLeast={sortMode === 'least'} isTop={sortMode === 'top'} />
      <h4 className={'flex items-center gap-2 text-sm text-gray-500'}>
        <PresentationChartBarIcon className={'w-4 h-4'} />
        태그 사용 통계({sortMode === 'top' ? '상위 10개' : '하위 10개'})
      </h4>
      <div className={'flex-grow p-4'}>
        {chartMap[sortMode] && <SingleAxisBarChart key={sortMode} datasetsLabel={'사용수'} {...chartMap[sortMode]} />}
      </div>
    </div>
  );
};

export default TagUsedCart;
