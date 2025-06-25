import type { ChildrenProps } from '@/types/global';
import { XMarkIcon } from '@heroicons/react/24/outline';

type DisplayValuesTitleListProps = ChildrenProps;

interface DisplayValuesTitleItemPros {
  text: string;
  onClickXButton: () => void;
}

const DisplayValuesTitleItem: React.FC<DisplayValuesTitleItemPros> = ({ onClickXButton, text }) => {
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
  DisplayValuesTitleItem: typeof DisplayValuesTitleItem;
};
const DisplayValuesTitleList = DisplayValuesTitleListComp as DisplayValuesTitleList;
DisplayValuesTitleList.DisplayValuesTitleItem = DisplayValuesTitleItem;

export default DisplayValuesTitleList;
