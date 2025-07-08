import type { FC } from 'react';
import type { EditTaskFormFieldProps } from '@components/_popups/EditTaskPopup/EditTaskForm/EditTaskForm.types.ts';
import TextArea from '@shared/components/_form/_inputs/TextArea';

/**
 * 작업 내용 필드 컴포넌트
 * @param register - 작업 추가/수정 form register
 * @param errors - 작업 추가/수정 form errors
 * @constructor
 */
const ContentField: FC<EditTaskFormFieldProps> = ({ register, errors }) => {
  return (
    <TextArea
      label={'작업 내용'}
      placeholder={'작업 내용을 입력 하세요.'}
      // required
      {...register('content', {
        // required: '작업 내용을 입력하세요.',
      })}
      error={errors.content?.message}
    />
  );
};

export default ContentField;
