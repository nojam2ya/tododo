import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface GnbToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ToggleGnbButton: React.FC<GnbToggleButtonProps> = ({ onClick, isOpen }) => {
  /* tailwindcss clasess*/
  const base = 'absolute left-4 top-4 z-20 text-black';
  const iconBase = 'w-6 h-6';
  const iconDark = 'dark:text-white';

  const icon = isOpen ? (
    <ArrowLeftIcon className={clsx(iconBase, iconDark)} />
  ) : (
    <Bars3Icon className={clsx(iconBase, iconDark)} />
  );

  return (
    <button className={base} type="button" onClick={onClick} aria-label="메뉴 열기">
      {icon}
    </button>
  );
};

export default ToggleGnbButton;
