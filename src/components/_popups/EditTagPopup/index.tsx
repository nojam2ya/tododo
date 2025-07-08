import { type FC, useContext, useEffect, useRef, useState } from 'react';
import type { EditTagPopupProps } from '@components/_popups/EditTagPopup/EditTagPopup.types.ts';
import TextInput from '@shared/components/_form/_inputs/TextInput';
import OverlayPopup from '@shared/components/OverlayPopup';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import CancelButton from '@shared/components/_buttons/CancelButton';
import EditButton from '@shared/components/_buttons/EditButton';
import { useTagStore } from '@stores/tagStore';

/**
 * 태그 수정 팝업 컴포넌트
 * @param tag
 * @constructor
 */
const EditTagPopup: FC<EditTagPopupProps> = ({ tag }) => {
  const { close } = useContext(OverlayPopupDispatchContext);
  const [title, setTitle] = useState(tag.title);

  const updateTag = useTagStore(state => state.updateTag);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleUpdateTag = () => {
    updateTag({ ...tag, title });
    close();
  };

  return (
    <div className={'w-[20dvw]'}>
      <OverlayPopup.Title>태그 수정</OverlayPopup.Title>
      <OverlayPopup.Description>태그 내용을 수정합니다.</OverlayPopup.Description>
      <TextInput ref={inputRef} value={title} onChange={e => setTitle(e.currentTarget.value)} />

      <div className={'mt-6 flex gap-2 justify-end'}>
        <CancelButton onClick={close} />
        <EditButton onClick={handleUpdateTag} />
      </div>
    </div>
  );
};

export default EditTagPopup;
