import type { FC } from 'react';
import type { EditTaskFormFieldProps } from '@components/_popups/EditTaskPopup/EditTaskForm/EditTaskForm.types.ts';
import TextInput from '@shared/components/_form/_inputs/TextInput';

/**
 * 작업명 필드
 * @param register - 작업 추가/수정 form register
 * @param errors - 작업 추가/수정 form errors
 * @constructor
 */
const TitleField: FC<EditTaskFormFieldProps> = ({ register, errors }) => {
  return (
    <TextInput
      label={'작업명'}
      placeholder={'새 작업 제목을 입력 하세요.'}
      {...register('title', {
        required: '작업명을 입력하세요.',
      })}
      error={errors.title?.message}
      required
    />
  );
};

export default TitleField;
