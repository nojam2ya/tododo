import OverlayPopup from '@shared/components/OverlayPopup';
import type { EditTaskPopupProps } from '@components/_popups/EditTaskPopup/EditTaskPopup.types.ts';
import type { FC } from 'react';
import EditTaskForm from '@components/_popups/EditTaskPopup/EditTaskForm';

/**
 * 작업 추가/수정 팝업 컴포넌트
 * @param task - 작업
 * @param status - 작업 상태
 * @constructor
 */
const EditTaskPopup: FC<EditTaskPopupProps> = ({ task, status }) => {
  const isNew = !task;

  const title = isNew ? '새 작업 추가' : '작업 수정';
  const description = isNew
    ? '새 작업을 생성 합니다. 상세 내용을 입력해 주세요.'
    : '기존 작업의 내용을 수정합니다. 수정할 내용을 입력해 주세요.';

  return (
    <div className={'w-[28dvw]'}>
      <OverlayPopup.Title>{title}</OverlayPopup.Title>
      <OverlayPopup.Description>{description}</OverlayPopup.Description>
      <EditTaskForm status={status} task={task} />
    </div>
  );
};

export default EditTaskPopup;
