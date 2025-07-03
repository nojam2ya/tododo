import { useDarkMode } from '@stores/darkModeStore.ts';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import type { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

/**
 * 다크모드 토글 버튼
 * @param props
 * @constructor
 */
const ToggleDarkModeButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  const isDark = useDarkMode(state => state.isDark);
  const iconBase = 'w-6 h-6';
  return (
    <button
      className={clsx(
        'flex-center-center fixed right-4 bottom-4 w-12 h-12 bg-background-secondary rounded-full',
        'dark:bg-background-secondary-dark',
      )}
      {...props}
    >
      {isDark ? <MoonIcon className={iconBase} /> : <SunIcon className={iconBase} />}
    </button>
  );
};

export default ToggleDarkModeButton;
