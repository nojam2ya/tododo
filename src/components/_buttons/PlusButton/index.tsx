import clsx from 'clsx';
import { PlusIcon } from '@heroicons/react/24/outline';

const PlusButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  /* tailwindcss classes */
  const base = 'absolute right-0 top-0 h-7 opacity-50  transition-opacity duration-300';
  const hover = 'hover:opacity-100';

  return (
    <button className={clsx(base, hover)} {...props}>
      <PlusIcon className={'w-5 h-5'} />
    </button>
  );
};

export default PlusButton;
