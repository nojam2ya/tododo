import OverlayPopup from '@shared/components/OverlayPopup';
import TextInput from 'src/shared/components/_form/_inputs/TextInput';
import ListSelect from 'src/shared/components/_form/_inputs/ListSelect';
import {
  TASK_PRIORITY,
  TASK_PRIORITY_TITLE_MAP,
  TASK_STATUS,
  TASK_STATUS_TITLE_MAP,
  type TaskPriorityKey,
  type TaskStatusKey,
} from '@shared/constants/taskConstants.tsx';
import { getPriorityStyle } from '@shared/utils/utils.ts';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import type { Task, TempTag } from '@/types/global';
import DatePicker from 'src/shared/components/_form/_inputs/DayPickerComp';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import AutocompleteSelect from 'src/shared/components/_form/_inputs/AutocompleteSelect';
import TextArea from 'src/shared/components/_form/_inputs/TextArea';
import { useTagStore } from '@stores/tagStore.ts';
import { useTaskStore } from '@stores/taskStore.ts';
import { useInitAndCreatedDataList } from '@shared/hooks/useInitAndCreatedDataList.ts';

export interface ListFieldProps {
  status: TaskStatusKey;
}

type AddFormTask = Omit<Task, 'id' | 'tags'>;

const AddNewTaskPopup: React.FC<ListFieldProps> = ({ status }) => {
  const { close } = useContext(OverlayPopupDispatchContext);

  const createTask = useTaskStore(state => state.createTask);
  const tags = useTagStore(state => state.tags);
  const createTag = useTagStore(state => state.createTag);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormTask>({
    defaultValues: {
      priority: 'low',
      date: dayjs().format(DATE_FORMAT),
      status,
    },
  });

  const {
    dataList: selectedTags,
    addData,
    removeData,
    createData,
  } = useInitAndCreatedDataList({
    allDataList: tags as TempTag[],
    idName: 'id',
    labelName: 'title',
  });

  const onValid: SubmitHandler<AddFormTask> = data => {
    const tags = [];

    for (const tag of selectedTags) {
      // 기존 태그 추가
      if (tag?.id) tags.push(tag.id);
      // 새 태그 추가
      else {
        const newTag = createTag(tag.title);
        if (newTag) tags.push(newTag.id);
      }
    }

    createTask({ ...data, tags }); // 작업 생성
    close(); // 닫기
  };

  return (
    <div className={'w-[28dvw]'}>
      <OverlayPopup.Title>새 작업 추가</OverlayPopup.Title>
      <OverlayPopup.Description>새 작업을 생성 합니다. 상세 내용을 입력해 주세요.</OverlayPopup.Description>
      <form onSubmit={handleSubmit(onValid)} className={'mt-6'}>
        <TextInput
          label={'작업명'}
          placeholder={'새 작업 제목을 입력 하세요.'}
          required
          {...register('title', {
            required: '작업명을 입력하세요.',
          })}
          error={errors.title?.message}
        />
        <TextArea
          label={'작업 설명'}
          placeholder={'작업 설명을 입력 하세요.'}
          required
          {...register('content', {
            required: '작업 설명을 입력하세요.',
          })}
          error={errors.content?.message}
        />
        <div className={'flex gap-4'}>
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
                  <ListSelect.ListSelectOption
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
        </div>
        <Controller
          render={({ field }) => (
            <ListSelect
              label={'작업유형'}
              currentTitle={TASK_STATUS_TITLE_MAP[field.value]}
              value={field.value}
              onChange={value => field.onChange(value)}
            >
              {Object.values(TASK_STATUS).map(status => (
                <ListSelect.ListSelectOption key={status} value={status} title={TASK_STATUS_TITLE_MAP[status]} />
              ))}
            </ListSelect>
          )}
          name={'status'}
          control={control}
        />
        <AutocompleteSelect
          label="태그"
          allDataList={tags}
          valueName={'id'}
          labelName={'title'}
          addData={addData}
          createData={createData}
          removeData={removeData}
          selectedDataList={selectedTags}
        />

        <div className={'mt-6 flex gap-2 justify-end'}>
          <button className={'line-button w-24'} type="button" onClick={close}>
            <XCircleIcon />
            취소
          </button>
          <button className={'round-button w-24'} type="submit">
            <PencilSquareIcon />새 작업
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTaskPopup;
