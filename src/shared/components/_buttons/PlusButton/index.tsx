import clsx from 'clsx';
import { PlusIcon } from '@heroicons/react/24/outline';

const PlusButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  /* tailwindcss classes */
  const base = 'h-7 opacity-50  transition-opacity duration-300';
  const hover = 'hover:opacity-100';

  return (
    <button className={clsx(base, hover, className)} {...props}>
      <PlusIcon className={'w-5 h-5'} />
    </button>
  );
};

export default PlusButton;
