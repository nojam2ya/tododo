import { createPortal } from 'react-dom';
import type { ChildrenProps } from '@/types/global';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface OverlayPopup extends ChildrenProps {
  isOpen: boolean;
  close: () => void;
  $width?: string;
  $height?: string;
}

const OverlayPopup: React.FC<OverlayPopup> = ({ isOpen, close, children, $width = '40%', $height = '50%' }) => {
  return (
    isOpen &&
    createPortal(
      <div
        className={
          'flex-center-center fixed  top-0 left-0 bottom-0 right-0 overflow-hidden w-dvw h-dvh backdrop-blur-sm bg-black/30'
        }
        onClick={close}
      >
        <div
          style={{ width: $width, height: $height }}
          className={
            'relative border border-primary/10 border-solid bg-background-primary dark:bg-background-primary-dark rounded-lg text-foreground dark:text-foreground-dark p-4 '
          }
          onClick={e => e.stopPropagation()}
        >
          <button className={'absolute right-6 top-6'} onClick={close}>
            <XMarkIcon className={'w-6 h-6 opacity-50'} />
          </button>
          {children}
        </div>
      </div>,
      document.body,
    )
  );
};

export default OverlayPopup;
