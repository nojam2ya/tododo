import clsx from 'clsx';
import type { Work } from '@/types/global';
import WorkItemHeader from './WorkItemHeader.tsx';
import WorkItemFooter from './WorkItemFooter.tsx';
import BaseCard from '@components/BaseCard';
import Tag from '@components/Tag';

interface WorkCardProps {
  work: Work;
  isList?: boolean;
}

const WorkCardContent: React.FC<Work> = ({ title, content, importance, tags, date }) => {
  /* tailwindcss classes */
  const contentBase = 'opacity-70 text-sm font-light';
  const tagListBase = 'flex gap-1';

  return (
    <>
      <WorkItemHeader title={title} />
      <p className={contentBase}>{content}</p>
      <ul className={tagListBase}>
        {tags.map(t => (
          <Tag key={t} title={t} isList />
        ))}
      </ul>
      <WorkItemFooter importance={importance} date={date} />
    </>
  );
};

const WorkCard: React.FC<WorkCardProps> = ({ isList, work }) => {
  const base = 'flex flex-col gap-2';

  return (
    <BaseCard className={clsx(base)} hover isList={isList}>
      <WorkCardContent {...work} />
    </BaseCard>
  );
};

export default WorkCard;
