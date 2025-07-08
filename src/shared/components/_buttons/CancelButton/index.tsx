import { XCircleIcon } from '@heroicons/react/24/solid';
import type { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

const CancelButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button className={clsx('line-button w-24', className)} {...props}>
      <XCircleIcon />
      취소
    </button>
  );
};

export default CancelButton;
