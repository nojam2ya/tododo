import type { ReactNode } from 'react';
import type { PropsOf } from '@headlessui/react/dist/types';

/* children 사용 컴포넌트 프롭 */
export interface ChildrenProps {
  children: ReactNode;
}

export interface ClassNameProps<T = HTMLElement> {
  className?: PropsOf<T> & ['className'];
}
