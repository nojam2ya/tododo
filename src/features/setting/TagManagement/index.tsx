import TagUsedCart from '@features/setting/TagManagement/TagUsedCart';
import TagSearchEdit from '@features/setting/TagManagement/TagSearchEdit';

const TagManagement = () => {
  return (
    <div className={'flex gap-2'}>
      <TagSearchEdit className={'flex-grow'} />
      <TagUsedCart className={'w-1/3 h-[320px]'} />
    </div>
  );
};

export default TagManagement;
