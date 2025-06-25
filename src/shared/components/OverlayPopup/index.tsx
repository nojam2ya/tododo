import { createPortal } from 'react-dom';
import type { ChildrenProps } from '@/types/global';
import { useContext } from 'react';
import { OverlayPopupProviderContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import OverlayPopupContent from '@shared/components/OverlayPopup/OverlayPopupContent.tsx';

interface OverlayPopupProps extends ChildrenProps {
  $width: string;
  $height: string;
}

const OverlayPopupComp: React.FC<OverlayPopupProps> = ({ children, $width, $height }) => {
  const { isOpen } = useContext(OverlayPopupProviderContext);
  return (
    isOpen &&
    createPortal(
      <OverlayPopupContent $width={$width} $height={$height}>
        {children}
      </OverlayPopupContent>,
      document.body,
    )
  );
};

const Title: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <h3 className={'font-semibold text-xl border-b border-solid border-primary dark:border-white/20 pb-2'}>
      {children}
    </h3>
  );
};

const Description: React.FC<ChildrenProps> = ({ children }) => {
  return <p className={'pt-2 pb-2 opacity-30 text-sm font-light'}>{children}</p>;
};

type OverlayPopup = typeof OverlayPopupComp & { Title: typeof Title; Description: typeof Description };

const OverlayPopup = OverlayPopupComp as OverlayPopup;
OverlayPopup.Title = Title;
OverlayPopup.Description = Description;

export default OverlayPopup;
