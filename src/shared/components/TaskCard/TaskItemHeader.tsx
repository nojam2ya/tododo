import MoreButton from 'src/shared/components/_buttons/MoreButton';
import DropDownMenuList from '@shared/components/DropDownMenuList';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

interface TaskItemHeaderProps {
  title: string;
}

const TaskItemHeader: React.FC<TaskItemHeaderProps> = ({ title }) => {
  return (
    <div className={'flex-between-center'}>
      <h6 className={'font-semibold'}>{title}</h6>
      <DropDownMenuList buttonChildren={({ open }) => <MoreButton type="button" aria-label="더보기" active={open} />}>
        <DropDownMenuList.Item as="button">
          <PencilSquareIcon className={'w-4 h-4'} />
          수정
        </DropDownMenuList.Item>
        <DropDownMenuList.Item as="button">
          <TrashIcon className={'w-4 h-4'} />
          삭제
        </DropDownMenuList.Item>
      </DropDownMenuList>
    </div>
  );
};

export default TaskItemHeader;
