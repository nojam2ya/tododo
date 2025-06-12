import { useDarkMode } from '@stores/darkModeStore.ts';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ToggleDarkModeButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  const isDark = useDarkMode(state => state.isDark);
  const icon = isDark ? <MoonIcon className={'w-6 h-6'} /> : <SunIcon className={'w-6 h-6'} />;
  return (
    <button
      className={
        'flex-center-center fixed right-4 bottom-4 w-12 h-12 bg-background-secondary dark:bg-background-secondary-dark rounded-full'
      }
      {...props}
    >
      {icon}
    </button>
  );
};

export default ToggleDarkModeButton;
