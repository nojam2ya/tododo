import { type FC, useContext } from 'react';
import type { ConfirmPopupProps } from '@components/_popups/ConfirmPopup/ConfirmPopup.types.ts';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import CancelButton from '@shared/components/_buttons/CancelButton';
import EditButton from '@shared/components/_buttons/EditButton';

/**
 * 확인 팝업 컴포넌트
 * @param title - 제목
 * @param content - 내용
 * @param onOk - 확인 콜백
 * @param onCancel - 취소 콜백
 * @constructor
 */
const ConfirmPopup: FC<ConfirmPopupProps> = ({ onCancel, title, onOk, content }) => {
  const { close } = useContext(OverlayPopupDispatchContext);

  const handleCancel = () => {
    onCancel?.();
    close();
  };

  const handleOk = () => {
    onOk();
    close();
  };

  return (
    <div className={'w-[20dvw]'}>
      {title && <h4 className={'font-semibold'}>{title}</h4>}
      {content && <p className={'text-sm font-light opacity-50 mt-2'}>{content}</p>}
      <div className={'mt-6 flex gap-2 '}>
        <CancelButton className={'flex-1'} onClick={handleCancel} />
        <EditButton className={'flex-1'} onClick={handleOk}>
          확인
        </EditButton>
      </div>
    </div>
  );
};

export default ConfirmPopup;
