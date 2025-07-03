import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';

interface MoreButtonCommonProps {
  active?: boolean;
}

interface MoreButtonHTMLProps extends ButtonHTMLAttributes<HTMLButtonElement>, MoreButtonCommonProps {
  as?: 'button';
}

interface MoreButtonUIDivProps extends HTMLAttributes<HTMLDivElement>, MoreButtonCommonProps {
  as: 'div';
}

/**
 * 더보기 아이콘 버튼 컴포넌트
 * @param active
 * @param propClassName
 * @param as
 * @param props
 * @constructor
 */
const MoreButton: FC<MoreButtonHTMLProps | MoreButtonUIDivProps> = ({
  active,
  className: propClassName,
  as = 'button',
  ...props
}) => {
  const className = clsx(
    'flex-center-center w-6 h-6 rounded-md transition-all duration-300',
    'hover:bg-background-secondary-hover dark:hover:bg-background-secondary-dark-hover',
    active &&
      'bg-background-secondary-hover dark:bg-background-secondary-dark-hover dark:border dark:border-solid dark:border-white',
    propClassName,
  );
  const iconClassName = 'w-5 h-5';

  if (as === 'div')
    return (
      <div className={className} {...(props as HTMLAttributes<HTMLDivElement>)}>
        <EllipsisHorizontalIcon className={iconClassName} />
      </div>
    );

  return (
    <button className={className} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <EllipsisHorizontalIcon className={iconClassName} />
    </button>
  );
};

export default MoreButton;
