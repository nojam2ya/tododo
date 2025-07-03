import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface GnbToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * GNB 토글 버튼
 * @param onClick
 * @param isOpen
 * @constructor
 */
const ToggleGnbButton: React.FC<GnbToggleButtonProps> = ({ onClick, isOpen }) => {
  /* tailwindcss clasess*/
  const base = 'absolute left-4 top-4 z-20 text-black';
  const iconBase = 'w-6 h-6 dark:text-white';

  return (
    <button className={base} type="button" onClick={onClick} aria-label="메뉴 열기">
      {isOpen ? <ArrowLeftIcon className={iconBase} /> : <Bars3Icon className={iconBase} />}
    </button>
  );
};

export default ToggleGnbButton;
