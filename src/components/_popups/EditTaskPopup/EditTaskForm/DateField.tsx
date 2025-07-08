import type { FC } from 'react';
import type { EditTaskFormControlFieldProps } from '@components/_popups/EditTaskPopup/EditTaskForm/EditTaskForm.types.ts';
import { Controller, type ControllerRenderProps } from 'react-hook-form';
import DatePicker from '@shared/components/_form/_inputs/DayPickerComp';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import type { Task } from '@/types/global';
import type { NewTask } from '@components/_popups/EditTaskPopup/EditTaskPopup.types.ts';

/**
 * 작업 날짜 필드 내용 컴포넌트
 * @param field  작업 날짜 필드
 * @constructor
 */
const RenderContent: FC<{ field: ControllerRenderProps<Task | NewTask, 'date'> }> = ({ field }) => {
  return (
    <DatePicker
      label={'기한'}
      selectedDate={dayjs(field.value).toDate()}
      containerClassName={'w-2/3'}
      onChange={value => field.onChange(dayjs(value).format(DATE_FORMAT))}
    />
  );
};

/**
 * 작업 날짜 필드 컴포넌트
 * @param control - 작업 추가/수정 form control
 * @constructor
 */
const DateField: FC<EditTaskFormControlFieldProps> = ({ control }) => {
  return <Controller render={({ field }) => <RenderContent field={field} />} name={'date'} control={control} />;
};
export default DateField;
