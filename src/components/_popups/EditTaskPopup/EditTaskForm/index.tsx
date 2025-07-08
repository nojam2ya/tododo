import { useEditTaskForm } from '@components/_popups/EditTaskPopup/useEditTaskForm.ts';
import { type FC, useContext } from 'react';
import TitleField from '@components/_popups/EditTaskPopup/EditTaskForm/TitleField.tsx';
import ContentField from '@components/_popups/EditTaskPopup/EditTaskForm/ContentField.tsx';
import PriorityField from '@components/_popups/EditTaskPopup/EditTaskForm/PriorityField.tsx';
import DateField from '@components/_popups/EditTaskPopup/EditTaskForm/DateField.tsx';
import StatusField from '@components/_popups/EditTaskPopup/EditTaskForm/StatusField.tsx';
import TagsField from '@components/_popups/EditTaskPopup/EditTaskForm/TagsField.tsx';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import type { Task } from '@/types/global';
import { useTagStore } from '@stores/tagStore';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import CancelButton from '@shared/components/_buttons/CancelButton';
import EditButton from '@shared/components/_buttons/EditButton';

export interface EditTaskFormProps {
  status: TaskStatusKey; // 작업
  task?: Task; // 작업 상태
}

/**
 * 작업 추가/수정 form 컴포넌트
 * @param task - 작업
 * @param status - 작업 상태
 * @constructor
 */
const EditTaskForm: FC<EditTaskFormProps> = ({ task, status }) => {
  const { close } = useContext(OverlayPopupDispatchContext);
  const { handleSubmit, addTag, selectedTags, createTempTag, removeTag, control, register, errors } = useEditTaskForm(
    status,
    task,
  );
  const tags = useTagStore(state => state.tags);

  return (
    <form onSubmit={handleSubmit} className={'mt-6'}>
      <TitleField register={register} errors={errors} />
      <ContentField register={register} errors={errors} />
      <div className={'flex gap-4'}>
        <PriorityField control={control} />
        <DateField control={control} />
      </div>
      <StatusField control={control} />
      <TagsField
        addTag={addTag}
        tags={tags}
        removeTag={removeTag}
        createTempTag={createTempTag}
        selectedTags={selectedTags}
      />

      <div className={'mt-6 flex gap-2 justify-end'}>
        <CancelButton type="button" onClick={close} />
        <EditButton type="submit">{task ? '수정' : '생성'}</EditButton>
      </div>
    </form>
  );
};

export default EditTaskForm;
