import type { ChildrenProps, Work } from '@/types/global';
import PlusButton from '@components/_buttons/PlusButton';
import WorkCard from 'src/components/WorkCard';

interface WorkStatusItemProps {
  title: string;
  works: Work[];
}

interface WorkStatusItemHeaderProps {
  icon?: React.ReactNode;
  title: string;
  count: number;
  button: React.ReactNode;
}

const WorkStatusItemHeader: React.FC<WorkStatusItemHeaderProps> = ({ title, count, button, icon }) => {
  /* tailwindcss classes */
  const wrapBase = 'flex h-7 items-center gap-2';
  const titleBase = 'flex gap-2 font-bold uppercase';
  const countBase =
    'w-8 h-5 rounded-full flex-center-center text-xs bg-background-secondary dark:bg-background-secondary/15';

  return (
    <div className={wrapBase}>
      <h5 className={titleBase}>
        {icon}
        {title}
      </h5>
      <p className={countBase}>{count}</p>
      {button}
    </div>
  );
};

const WorkStatusItem: React.FC<WorkStatusItemProps> = ({ title, works }) => {
  /* tailwindcss classes */
  const wrapBase = 'flex flex-col flex-1 relative gap-2';

  return (
    <li className={wrapBase}>
      <WorkStatusItemHeader
        title={title}
        count={works.length}
        button={<PlusButton type="button" aria-label={`${title} 추가`} />}
      />
      <ul className={'flex-grow flex flex-col gap-2'}>
        {works.map(work => (
          <WorkCard key={work.id} work={work} isList />
        ))}
      </ul>
    </li>
  );
};

const WorkStatusListComponent: React.FC<ChildrenProps> = ({ children }) => {
  return <ul className={'flex justify-between gap-12 h-full'}>{children}</ul>;
};

type WorkStatusListType = typeof WorkStatusListComponent & {
  WorkStatusItem: typeof WorkStatusItem;
};

const WorkStatusList = WorkStatusListComponent as WorkStatusListType;
WorkStatusList.WorkStatusItem = WorkStatusItem;

export default WorkStatusList;
