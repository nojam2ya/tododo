import MoreButton from '@shared/components/_buttons/MoreButton';
import DropDownMenuList from '@shared/components/DropDownMenuList';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

interface TaskItemHeaderProps {
  title: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const TaskItemHeader: React.FC<TaskItemHeaderProps> = ({ title, onClickDelete, onClickEdit }) => {
  return (
    <div className={'flex-between-center'}>
      <h6 className={'font-semibold'}>{title}</h6>
      <DropDownMenuList buttonChildren={({ open }) => <MoreButton type="button" aria-label="더보기" active={open} />}>
        <DropDownMenuList.Item as="button" onClick={onClickEdit}>
          <PencilSquareIcon className={'w-4 h-4'} />
          수정
        </DropDownMenuList.Item>
        <DropDownMenuList.Item as="button" onClick={onClickDelete}>
          <TrashIcon className={'w-4 h-4'} />
          삭제
        </DropDownMenuList.Item>
      </DropDownMenuList>
    </div>
  );
};

export default TaskItemHeader;
