import OverlayPopup from '@shared/components/OverlayPopup';
import EditTaskForm from '@components/EditTaskPopup/EditTaskForm.tsx';
import type { EditTaskPopupProps } from '@components/EditTaskPopup/EditTaskPopup.types.ts';

const EditTaskPopup: React.FC<EditTaskPopupProps> = ({ task, status }) => {
  const isNew = !task;
  return (
    <div className={'w-[28dvw]'}>
      <OverlayPopup.Title>{isNew ? '새 작업 추가' : '작업 수정'}</OverlayPopup.Title>
      <OverlayPopup.Description>
        {isNew
          ? '새 작업을 생성 합니다. 상세 내용을 입력해 주세요.'
          : '기존 작업의 내용을 수정합니다. 수정할 내용을 입력해 주세요.'}
      </OverlayPopup.Description>
      <EditTaskForm status={status} task={task} />
    </div>
  );
};

export default EditTaskPopup;
