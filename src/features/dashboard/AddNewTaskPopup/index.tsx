import OverlayPopup from '@components/OverlayPopup';
import TextField from '@components/_inputs/TextField';
import TextAreaField from '@components/_inputs/TextAreaField';
import ListField from 'src/components/_inputs/ListField';
import { TASK_Priority, type TaskPriorityKey } from '@shared/constants/taskConstants.tsx';
import { getPriorityStyle } from '@shared/utils/utils.ts';
import { Controller, type SubmitErrorHandler, type SubmitHandler, useForm } from 'react-hook-form';
import type { Task } from '@/types/global';
import DatePicker from 'src/components/_inputs/DatePickerInput';
import clsx from 'clsx';
import dayjs from 'dayjs';

const AddNewTaskPopup: React.FC<any> = () => {
  const { register, control, handleSubmit } = useForm<Omit<Task, 'id'>>({
    defaultValues: {
      priority: 'low',
      date: dayjs().format('YYYY-MM-DD'),
    },
  });

  const onValid: SubmitHandler<Omit<Task, 'id'>> = data => {};
  const onInvalid: SubmitErrorHandler<Omit<Task, 'id'>> = errors => {};

  return (
    <>
      <OverlayPopup.Title>새 작업 추가</OverlayPopup.Title>
      <OverlayPopup.Description>새 작업을 생성 합니다. 상세 내용을 입력해 주세요.</OverlayPopup.Description>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={'mt-6'}>
        <TextField label={'작업명'} placeholder={'새 작업 제목을 입력 하세요.'} {...register('title')} />
        <TextAreaField label={'작업 설명'} placeholder={'작업 설명을 입력 하세요.'} {...register('content')} />
        <div className={'flex gap-4'}>
          <Controller
            render={({ field }) => (
              <ListField
                label={'우선순위'}
                currentTitle={field.value}
                value={field.value}
                onChange={value => field.onChange(value as TaskPriorityKey)}
                containerClassName={'w-1/2'}
                buttonClassName={clsx(getPriorityStyle(field.value, { text: true }))}
              >
                {Object.values(TASK_Priority).map(i => (
                  <ListField.ListFieldOption
                    key={i.KEY}
                    value={i.KEY}
                    title={i.TITLE}
                    className={getPriorityStyle(i.KEY, { text: true })}
                  />
                ))}
              </ListField>
            )}
            name="priority"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <DatePicker
                label={'기한'}
                containerClassName={'w-1/2'}
                onChange={value => field.onChange(dayjs(value).format('YYYY-MM-DD'))}
              />
            )}
            name={'date'}
            control={control}
          />
        </div>
      </form>
    </>
  );
};

export default AddNewTaskPopup;
