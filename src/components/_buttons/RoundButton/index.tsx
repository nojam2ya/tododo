import clsx from 'clsx';
import type { ChildrenProps } from '@/types/global';

const RoundButton: React.FC<ChildrenProps & React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'rounded-lg bg-primary/80 w-full p-2 text-white text-sm hover:bg-primary-hover/80 transition-bg duration-300',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default RoundButton;
