import type { ChildrenProps } from '@/types/global';
import dayjs from 'dayjs';
import { KO_DATE_FORMAT } from '@shared/constants/constants.tsx';

interface ItemProps {
  title: string;
  content: string;
  completedDate: string;
}

const Item: React.FC<ItemProps> = ({ completedDate, title, content }) => {
  return (
    <li className={'flex flex-col'}>
      <span className={'opacity-50 font-light text-xs'}>{dayjs(completedDate).format(KO_DATE_FORMAT)}</span>
      <span className={'text-sm pt-1'}>{title}</span>
      <span className={'opacity-50 font-light text-xs'}>{content}</span>
    </li>
  );
};

const RecentCompletedListComponent: React.FC<ChildrenProps> = ({ children }) => {
  return <ul className={'flex flex-col gap-4 mt-4'}>{children}</ul>;
};

type RecentCompletedList = typeof RecentCompletedListComponent & { Item: typeof Item };
const RecentCompletedList = RecentCompletedListComponent as RecentCompletedList;
RecentCompletedList.Item = Item;

export default RecentCompletedList;
