import type { FC } from 'react';
import type { EditTaskFormControlFieldProps } from '@components/EditTaskPopup/EditTaskForm/EditTaskForm.types.ts';
import { Controller } from 'react-hook-form';
import ListSelect from '@shared/components/_form/_inputs/ListSelect';
import { TASK_STATUS, TASK_STATUS_TITLE_MAP } from '@shared/constants/taskConstants.tsx';

/**
 * 작업 상태 필드 컴포넌트
 * @param control - 작업 추가/수정 form control
 * @constructor
 */
const StatusField: FC<EditTaskFormControlFieldProps> = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <ListSelect
          label={'작업 상태'}
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

export default StatusField;
