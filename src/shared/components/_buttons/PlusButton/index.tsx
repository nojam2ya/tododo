import clsx from 'clsx';
import { PlusIcon } from '@heroicons/react/24/outline';

/**
 * 추가 아이콘 버튼 컴포넌트
 * @param className
 * @param props
 * @constructor
 */
const PlusButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button
      className={clsx('h-7 opacity-50  transition-opacity duration-300', 'hover:opacity-100', className)}
      {...props}
    >
      <PlusIcon className={'w-5 h-5'} />
    </button>
  );
};

export default PlusButton;
