import clsx from 'clsx';
import type { ChildrenProps } from '@/types/global';

interface BaseCardProps extends ChildrenProps {
  hover?: boolean;
}

type BaseCardUnionProps =
  | (BaseCardProps & { isList?: false } & React.HTMLAttributes<HTMLDivElement>)
  | (BaseCardProps & { isList: true } & React.HTMLAttributes<HTMLLIElement>);

const BaseCard: React.FC<BaseCardUnionProps> = ({ hover, isList, children, className, ...props }) => {
  const base = 'border border-border-primary border-solid rounded-lg p-6 transition-bg duration-300';
  const dark = 'dark:border-border-primary-dark dark:bg-background-secondary-dark dark:border-white/10';
  const hoverBase = 'hover:bg-background-secondary/50 dark:hover:bg-background-secondary-dark-hover/50';

  if (isList)
    return (
      <li
        className={clsx(base, dark, hover ? hoverBase : '', className)}
        {...(props as React.HTMLAttributes<HTMLLIElement>)}
      >
        {children}
      </li>
    );

  return (
    <div
      className={clsx(base, dark, hover ? hoverBase : '', className)}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
};

export default BaseCard;
