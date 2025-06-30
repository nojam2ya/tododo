import type { ChildrenProps } from '@/types/global';
import { XMarkIcon } from '@heroicons/react/24/outline';

type DisplayValuesTitleListProps = ChildrenProps;

interface ItemProps {
  text: string;
  onClickXButton: () => void;
}

const Item: React.FC<ItemProps> = ({ onClickXButton, text }) => {
  return (
    <li className={'tag flex-center-center gap-2'}>
      {text}
      <button type={'button'} onClick={onClickXButton}>
        <XMarkIcon className={'w-4 h-4'} />
      </button>
    </li>
  );
};

const DisplayValuesTitleListComp: React.FC<DisplayValuesTitleListProps> = ({ children }) => {
  return <ul className={'flex gap-1 flex-wrap'}>{children}</ul>;
};

type DisplayValuesTitleList = typeof DisplayValuesTitleListComp & {
  Item: typeof Item;
};
const DisplayValuesTitleList = DisplayValuesTitleListComp as DisplayValuesTitleList;
DisplayValuesTitleList.Item = Item;

export default DisplayValuesTitleList;
