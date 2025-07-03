import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useEditTaskForm } from '@components/EditTaskPopup/useEditTaskForm.ts';
import type { FC } from 'react';
import TitleField from '@components/EditTaskPopup/EditTaskForm/TitleField.tsx';
import ContentField from '@components/EditTaskPopup/EditTaskForm/ContentField.tsx';
import PriorityField from '@components/EditTaskPopup/EditTaskForm/PriorityField.tsx';
import DateField from '@components/EditTaskPopup/EditTaskForm/DateField.tsx';
import StatusField from '@components/EditTaskPopup/EditTaskForm/StatusField.tsx';
import TagsField from '@components/EditTaskPopup/EditTaskForm/TagsField.tsx';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import type { Task } from '@/types/global';
import { useTagStore } from '@stores/tagStore';

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
        <button className={'line-button w-24'} type="button" onClick={close}>
          <XCircleIcon />
          취소
        </button>
        <button className={'round-button w-24'} type="submit">
          <PencilSquareIcon />
          {task ? '수정' : '생성'}
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
