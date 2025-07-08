import type { Tag } from '@/types/global';
import { useTagStore } from '@stores/tagStore';
import { useContext } from 'react';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';

export const useTagSearchEditHandlers = () => {
  const { open } = useContext(OverlayPopupDispatchContext);
  const deleteTag = useTagStore(state => state.deleteTag);
  const deleteUnusedTags = useTagStore(state => state.deleteUnusedTags);

  return {
    handleDeleteClick: (tag: Tag) =>
      open({
        key: 'CONFIRM_POPUP',
        props: {
          onOk: () => deleteTag(tag),
          title: '삭제 하시겠습니까?',
          content: '태그를 삭제합니다.',
        },
      }),

    handleEditClick: (tag: Tag) =>
      open({
        key: 'EDIT_TAG_POPUP',
        props: {
          tag,
        },
      }),

    handleDeleteUnusedTagClick: () =>
      open({
        key: 'CONFIRM_POPUP',
        props: {
          onOk: deleteUnusedTags,
          title: '미사용 태그를 일괄 삭제 하시겠습니까?',
          content: '작업에 등록되지 않은 태그를 모두 삭제합니다.',
        },
      }),
  };
};
