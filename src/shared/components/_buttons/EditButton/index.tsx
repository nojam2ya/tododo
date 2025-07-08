import type { ButtonHTMLAttributes, FC } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const EditButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button className={clsx('round-button w-24', className)} {...props}>
      <PencilSquareIcon />
      {children ?? '수정'}
    </button>
  );
};

export default EditButton;
