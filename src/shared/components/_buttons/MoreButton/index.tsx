import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface MoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const MoreButton: React.FC<MoreButtonProps> = ({ active, className, ...props }) => {
  /* tailwindcss classes */
  const base = 'flex-center-center w-6 h-6 rounded-md transition-all duration-300';
  const hover = 'hover:bg-background-secondary-hover dark:hover:bg-background-secondary-dark-hover';
  const activeStyle =
    'bg-background-secondary-hover dark:bg-background-secondary-dark-hover dark:border dark:border-solid dark:border-white';

  return (
    <button className={clsx(base, hover, active && activeStyle, className)} {...props}>
      <EllipsisHorizontalIcon className={'w-5 h-5'} />
    </button>
  );
};

export default MoreButton;
