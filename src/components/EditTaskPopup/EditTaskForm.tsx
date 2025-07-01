import TextInput from '@shared/components/_form/_inputs/TextInput';
import TextArea from '@shared/components/_form/_inputs/TextArea';
import { type Control, Controller, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import ListSelect from '@shared/components/_form/_inputs/ListSelect';
import {
  TASK_PRIORITY,
  TASK_PRIORITY_TITLE_MAP,
  TASK_STATUS,
  TASK_STATUS_TITLE_MAP,
  type TaskPriorityKey,
  type TaskStatusKey,
} from '@shared/constants/taskConstants.tsx';
import clsx from 'clsx';
import { getPriorityStyle } from '@shared/utils/utils.ts';
import DatePicker from '@shared/components/_form/_inputs/DayPickerComp';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import AutocompleteSelect from '@shared/components/_form/_inputs/AutocompleteSelect';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useEditTaskForm } from '@components/EditTaskPopup/useEditTaskForm.ts';
import { useTagStore } from '@stores/tagStore.ts';
import type { AddFormTask } from '@components/EditTaskPopup/EditTaskPopup.types.ts';
import type { Task, TempTag } from '@/types/global';

interface AddNewTaskFormProps {
  status: TaskStatusKey;
  task?: Task;
}

interface AddNewTaskFormFieldProps {
  register: UseFormRegister<AddFormTask>;
  errors: FieldErrors<AddFormTask>;
}

interface AddNewTaskFormContollerFieldProps {
  control: Control<AddFormTask>;
}

interface TagsFieldProps {
  tags: TempTag[];
  selectedTags: TempTag[];
  addTag: (data: TempTag) => void;
  removeTag: (key: keyof TempTag, value: string) => void;
  createTempTag: (label: string) => void;
}

const TitleField: React.FC<AddNewTaskFormFieldProps> = ({ register, errors }) => {
  return (
    <TextInput
      label={'작업명'}
      placeholder={'새 작업 제목을 입력 하세요.'}
      required
      {...register('title', {
        required: '작업명을 입력하세요.',
      })}
      error={errors.title?.message}
    />
  );
};

const ContentField: React.FC<AddNewTaskFormFieldProps> = ({ register, errors }) => {
  return (
    <TextArea
      label={'작업 설명'}
      placeholder={'작업 설명을 입력 하세요.'}
      required
      {...register('content', {
        required: '작업 설명을 입력하세요.',
      })}
      error={errors.content?.message}
    />
  );
};

const PriorityField: React.FC<AddNewTaskFormContollerFieldProps> = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <ListSelect
          label={'우선순위'}
          currentTitle={field.value}
          value={field.value}
          onChange={value => field.onChange(value as TaskPriorityKey)}
          containerClassName={'w-1/3'}
          buttonClassName={clsx(getPriorityStyle(field.value, { text: true }))}
        >
          {Object.values(TASK_PRIORITY).map(priority => (
            <ListSelect.Option
              key={priority}
              value={priority}
              title={TASK_PRIORITY_TITLE_MAP[priority]}
              className={getPriorityStyle(priority, { text: true })}
            />
          ))}
        </ListSelect>
      )}
      name="priority"
      control={control}
    />
  );
};

const DateField: React.FC<AddNewTaskFormContollerFieldProps> = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <DatePicker
          label={'기한'}
          selectedDate={dayjs(field.value).toDate()}
          containerClassName={'w-2/3'}
          onChange={value => field.onChange(dayjs(value).format(DATE_FORMAT))}
        />
      )}
      name={'date'}
      control={control}
    />
  );
};

const StatusField: React.FC<AddNewTaskFormContollerFieldProps> = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <ListSelect
          label={'작업유형'}
          currentTitle={TASK_STATUS_TITLE_MAP[field.value] as string}
          value={field.value}
          onChange={value => field.onChange(value)}
        >
          {Object.values(TASK_STATUS).map(status => (
            <ListSelect.Option key={status} value={status} title={TASK_STATUS_TITLE_MAP[status]} />
          ))}
        </ListSelect>
      )}
      name={'status'}
      control={control}
    />
  );
};

const TagsField: React.FC<TagsFieldProps> = ({ addTag, tags, removeTag, createTempTag, selectedTags }) => {
  return (
    <AutocompleteSelect
      label="태그"
      allDataList={tags}
      valueName={'id'}
      labelName={'title'}
      addData={addTag}
      createData={createTempTag}
      removeData={removeTag}
      selectedDataList={selectedTags}
    />
  );
};

const EditTaskForm: React.FC<AddNewTaskFormProps> = ({ task, status }) => {
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
