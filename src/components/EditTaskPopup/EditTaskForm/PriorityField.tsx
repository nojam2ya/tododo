import type { FC } from 'react';
import type { EditTaskFormControlFieldProps } from '@components/EditTaskPopup/EditTaskForm/EditTaskForm.types.ts';
import { Controller, type ControllerRenderProps } from 'react-hook-form';
import ListSelect from '@shared/components/_form/_inputs/ListSelect';
import { TASK_PRIORITY, TASK_PRIORITY_TITLE_MAP, type TaskPriorityKey } from '@shared/constants/taskConstants.tsx';
import clsx from 'clsx';
import { getPriorityStyle } from '@shared/utils/utils.ts';
import type { NewTask } from '@components/EditTaskPopup/EditTaskPopup.types.ts';
import type { Task } from '@/types/global';

/**
 * 중요도 필드 내용 컴포넌트
 * @param field - 중요도 필드
 * @constructor
 */
const RenderContent: FC<{ field: ControllerRenderProps<NewTask | Task, 'priority'> }> = ({ field }) => {
  return (
    <ListSelect
      label={'중요도'}
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
  );
};

/**
 * 중요도 필드 컴포넌트
 * @param control - 작업 추가/수정 form control
 * @constructor
 */
const PriorityField: FC<EditTaskFormControlFieldProps> = ({ control }) => {
  return <Controller render={({ field }) => <RenderContent field={field} />} name="priority" control={control} />;
};

export default PriorityField;
