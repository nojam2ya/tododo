import { Suspense, useContext } from 'react';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { GridLoader } from 'react-spinners';
import clsx from 'clsx';
import type { ChildrenProps } from '@/types/component';

interface OverlayPopupContentProps extends ChildrenProps {
  $width?: string;
  $height?: string;
}

const FallbackComp = () => {
  return (
    <div className={'flex-center-center w-full h-full'}>
      <GridLoader color={'#5a5ad3'} loading={true} size={20} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};

const OverlayPopupContent: React.FC<OverlayPopupContentProps> = ({ children, $width, $height }) => {
  const { close } = useContext(OverlayPopupDispatchContext);
  const base = 'relative border border-primary/10 border-solid bg-white rounded-lg text-foreground p-7 ';
  const dark = 'dark:bg-background-primary-dark dark:text-foreground-dark';
  return (
    <div
      className={
        'flex-center-center fixed  top-0 left-0 bottom-0 right-0 overflow-hidden w-dvw h-dvh backdrop-blur-sm bg-black/30'
      }
      onClick={close}
    >
      <Suspense fallback={<FallbackComp />}>
        <div style={{ width: $width, height: $height }} className={clsx(base, dark)} onClick={e => e.stopPropagation()}>
          <button className={'absolute right-6 top-6'} onClick={close}>
            <XMarkIcon className={'w-6 h-6 opacity-50'} />
          </button>
          {children}
        </div>
      </Suspense>
    </div>
  );
};

export default OverlayPopupContent;
