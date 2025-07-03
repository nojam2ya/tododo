import { Bars3BottomLeftIcon, BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/solid';
import type { ButtonHTMLAttributes } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import type { SortOrder } from '@shared/constants/constants.tsx';

interface SortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  order?: SortOrder;
}

/**
 * 정렬 버튼 컴포넌트
 * @param order - 정렬 순서
 * @param className
 * @param children
 * @param props
 * @constructor
 */
const SortButton: React.FC<SortButtonProps> = ({ order, className, children, ...props }) => {
  const icon = !order ? (
    <Bars3BottomLeftIcon aria-label={'정렬'} />
  ) : order === 'asc' ? (
    <BarsArrowUpIcon aria-label={'오름차순'} />
  ) : order === 'desc' ? (
    <BarsArrowDownIcon aria-label={'내림차순'} />
  ) : null;

  return (
    <button className={clsx(className, 'w-20', order ? 'line-button-sm-active' : 'line-button-sm')} {...props}>
      {icon}
      {children}
    </button>
  );
};

export default SortButton;
