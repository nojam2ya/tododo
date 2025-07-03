import type { Task } from '@/types/global';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { NewTask } from '@components/EditTaskPopup/EditTaskPopup.types.ts';

/* 작업 추가/수정 필드 컴포넌트 프롭 - register 사용 */
export interface EditTaskFormFieldProps {
  register: UseFormRegister<NewTask | Task>; // 작업 추가/수정 form register
  errors: FieldErrors<NewTask | Task>; // 작업 추가/수정 form errors
}

/* 작업 추가/수정 필드 컴포넌트 프롭 - control 사용 */
export interface EditTaskFormControlFieldProps {
  control: Control<NewTask | Task>; // 작업 추가/수정 form control
}
