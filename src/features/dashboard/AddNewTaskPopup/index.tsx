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
import { Controller, type SubmitErrorHandler, type SubmitHandler, useForm } from 'react-hook-form';
import type { Task } from '@/types/global';
import DatePicker from 'src/shared/components/_form/_inputs/DayPickerComp';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useContext, useState } from 'react';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import AutocompleteSelect from 'src/shared/components/_form/_inputs/AutocompleteSelect';
import TextArea from 'src/shared/components/_form/_inputs/TextArea';
import { useTagStore } from '@stores/tagStore.ts';

export interface ListFieldProps {
  status: TaskStatusKey;
}

const AddNewTaskPopup: React.FC<ListFieldProps> = ({ status }) => {
  const { close } = useContext(OverlayPopupDispatchContext);
  const tags = useTagStore(state => state.tags);
  const [newTags, setNewTags] = useState<string[]>([]);
  const { register, control, handleSubmit } = useForm<Omit<Task, 'id'>>({
    defaultValues: {
      priority: 'low',
      date: dayjs().format(DATE_FORMAT),
      tags: [],
      status,
    },
  });

  const onValid: SubmitHandler<Omit<Task, 'id'>> = data => {};
  const onInvalid: SubmitErrorHandler<Omit<Task, 'id'>> = errors => {};

  return (
    <div className={'w-[28dvw]'}>
      <OverlayPopup.Title>새 작업 추가</OverlayPopup.Title>
      <OverlayPopup.Description>새 작업을 생성 합니다. 상세 내용을 입력해 주세요.</OverlayPopup.Description>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={'mt-6'}>
        <TextInput
          label={'작업명'}
          placeholder={'새 작업 제목을 입력 하세요.'}
          required
          {...register('title', {
            required: '작업명을 입력해주세요.',
          })}
        />
        <TextArea label={'작업 설명'} placeholder={'작업 설명을 입력 하세요.'} {...register('content')} />
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
        <Controller
          render={({ field }) => (
            <AutocompleteSelect
              label="태그"
              allDataList={tags}
              values={field.value}
              valueName={'id'}
              labelName={'title'}
              onAddValue={value => field.onChange([...field.value, value])}
              onRemoveValue={value => field.onChange(field.value.filter(fieldValue => fieldValue !== value))}
              onAddNewLabel={label => setNewTags(prev => [...prev, label])}
              onRemoveNewLabel={label => setNewTags(prev => prev.filter(prevTag => prevTag === label))}
            />
          )}
          name={'tags'}
          control={control}
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
