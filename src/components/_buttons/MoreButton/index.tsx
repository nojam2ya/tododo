import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const MoreButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  /* tailwindcss classes */
  const base = 'flex-center-center w-6 h-6 rounded-md transition-all duration-300';
  const hover = 'hover:bg-background-secondary-hover dark:hover:bg-background-secondary-dark-hover';

  return (
    <button className={clsx(base, hover)} {...props}>
      <EllipsisHorizontalIcon className={'w-5 h-5'} />
    </button>
  );
};

export default MoreButton;
