import { XMarkIcon } from '@heroicons/react/24/outline';
import type { ChildrenProps } from '@/types/component';

type DisplayValuesTitleListProps = ChildrenProps;

interface ItemProps {
  onClickXButton: () => void; // 선택 취소 버튼 클릭 핸들러
  text: string;
}

/**
 * 선택된 값 아이템 (선택된 기존 데이터 + 생성될 에정 데이터)
 * @param onClickXButton - 선택 취소 버튼 클릭 핸들러
 * @param text
 * @constructor
 */
const Item: React.FC<ItemProps> = ({ onClickXButton, text }) => {
  return (
    <li className={'tag flex-center-center gap-2'}>
      {text}
      <button type={'button'} onClick={onClickXButton} aria-label={'선택 취소'}>
        <XMarkIcon className={'w-4 h-4'} />
      </button>
    </li>
  );
};

/**
 * 선택된 값 리스트 wrapper (선택된 기존 데이터 + 생성될 에정 데이터)
 * @param children
 * @constructor
 */
const DisplayValuesTitleListComp: React.FC<DisplayValuesTitleListProps> = ({ children }) => {
  return <ul className={'flex gap-1 flex-wrap'}>{children}</ul>;
};

type DisplayValuesTitleList = typeof DisplayValuesTitleListComp & {
  Item: typeof Item;
};
const DisplayValuesTitleList = DisplayValuesTitleListComp as DisplayValuesTitleList;
DisplayValuesTitleList.Item = Item;

export default DisplayValuesTitleList;
