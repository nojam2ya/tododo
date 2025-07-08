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

  const { handleEditClick, handleDeleteClick, handleDeleteUnusedTagClick } = useTagSearchEditHandlers();

  return (
    <div className={clsx('flex-grow card-base', className)}>
      <div className={'flex-between-center gap-2'}>
        <input
          type="text"
          className={'input-box flex-grow'}
          onChange={handleChangeQuery}
          value={query}
          placeholder={'태그를 입력하세요'}
        />
        <button
          className={'line-button-sm flex-shrink-0'}
          aria-label={'미사용 태그 삭제'}
          onClick={handleDeleteUnusedTagClick}
        >
          미사용 태그 삭제
        </button>
      </div>
      <ul className={'flex flex-wrap gap-2 mt-6'}>
        {displayTags.map(tag => (
          <li key={tag.id} className={'flex-between-center text-sm tag !pl-6'}>
            {tag.title}
            <button
              className={clsx(
                'ml-6 transition-colors duration-300 p-1',
                'hover:text-gray-700 dark:hover:text-gray-200',
              )}
              aria-label={'태그 수정'}
              onClick={() => handleEditClick(tag)}
            >
              <PencilSquareIcon className={'w-4 h-4'} />
            </button>
            <button
              className={clsx('  transition-colors duration-300 p-1', 'hover:text-gray-700 dark:hover:text-gray-200')}
              aria-label={'태그 삭제'}
              onClick={() => handleDeleteClick(tag)}
            >
              <TrashIcon className={'w-4 h-4'} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagSearchEdit;
