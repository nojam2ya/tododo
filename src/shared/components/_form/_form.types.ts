/* 입력 컴포넌트 프롭 */
import type { PropsOf } from '@headlessui/react/dist/types';

export interface InputProps {
  label?: string;
  containerClassName?: PropsOf<T> & ['className'];
  labelClassName?: PropsOf<HTMLLabelElement> & ['className'];
  required?: boolean;
  error?: string;
}
