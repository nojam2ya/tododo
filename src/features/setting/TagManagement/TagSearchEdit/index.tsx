import TextInput from '@shared/components/_form/_inputs/TextInput';
import { type FC } from 'react';
import clsx from 'clsx';
import { useTagStore } from '@stores/tagStore';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useQueryFilter } from '@shared/hooks/useQueryFilter.ts';
import { useTagSearchEditHandlers } from '@features/setting/TagManagement/TagSearchEdit/useTagSearchEditHandlers.ts';

interface TagSearchEditProps {
  className?: string;
}

const TagSearchEdit: FC<TagSearchEditProps> = ({ className }) => {
  const tags = useTagStore(state => state.tags);

  const {
    query,
    handleChangeQuery,
    filteredData: displayTags,
  } = useQueryFilter({
    targetData: tags,
    propName: 'title',
  });

  const { handleEditClick, handleDeleteClick } = useTagSearchEditHandlers();

  return (
    <div className={clsx('flex-grow card-base', className)}>
      <TextInput onChange={handleChangeQuery} value={query} placeholder={'태그를 입력하세요'} />
      <ul className={'flex flex-wrap gap-1'}>
        {displayTags.map(tag => (
          <li key={tag.id} className={'flex-between-center gap-2 text-sm tag'}>
            {tag.title}
            <button className={'ml-6'} aria-label={'태그 수정'} onClick={() => handleEditClick(tag)}>
              <PencilSquareIcon className={'w-4 h-4'} />
            </button>
            <button className={'text-red-500'} aria-label={'태그 삭제'} onClick={() => handleDeleteClick(tag)}>
              <TrashIcon className={'w-4 h-4'} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagSearchEdit;
