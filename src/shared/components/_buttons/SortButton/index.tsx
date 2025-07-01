import { Bars3BottomLeftIcon, BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/solid';
import type { ButtonHTMLAttributes } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import type { SortOrder } from '@shared/constants/constants.tsx';

interface SortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  order?: SortOrder;
}

const SortButton: React.FC<SortButtonProps> = ({ order, className, children, ...props }) => {
  return (
    <button className={clsx(className, 'w-20', order ? 'line-button-sm-active' : 'line-button-sm')} {...props}>
      {!order && <Bars3BottomLeftIcon aria-label={'정렬'} />}
      {order === 'asc' && <BarsArrowUpIcon aria-label={'오름차순'} />}
      {order === 'desc' && <BarsArrowDownIcon aria-label={'내림차순'} />}
      {children}
    </button>
  );
};

export default SortButton;
