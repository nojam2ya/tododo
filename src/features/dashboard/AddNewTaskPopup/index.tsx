import OverlayPopup from '@shared/components/OverlayPopup';
import { type TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import AddNewTaskForm from '@features/dashboard/AddNewTaskPopup/AddNewTaskForm.tsx';

export interface ListFieldProps {
  status: TaskStatusKey;
}

const AddNewTaskPopup: React.FC<ListFieldProps> = ({ status }) => {
  return (
    <div className={'w-[28dvw]'}>
      <OverlayPopup.Title>새 작업 추가</OverlayPopup.Title>
      <OverlayPopup.Description>새 작업을 생성 합니다. 상세 내용을 입력해 주세요.</OverlayPopup.Description>
      <AddNewTaskForm status={status} />
    </div>
  );
};

export default AddNewTaskPopup;
