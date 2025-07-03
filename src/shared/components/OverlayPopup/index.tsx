import { createPortal } from 'react-dom';
import { useContext } from 'react';
import { OverlayPopupProviderContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import OverlayPopupContent from '@shared/components/OverlayPopup/OverlayPopupContent.tsx';
import type { ChildrenProps } from '@/types/component';

interface OverlayPopupProps extends ChildrenProps {
  $width: string;
  $height: string;
}

/**
 * 오버레이 팝업 제목 컴포넌트
 * @param children
 * @constructor
 */
const Title: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <h3 className={'font-semibold text-xl border-b border-solid border-primary dark:border-white/20 pb-2'}>
      {children}
    </h3>
  );
};

/**
 * 오버레이 팝업 설명 컴로넌트
 * @param children
 * @constructor
 */
const Description: React.FC<ChildrenProps> = ({ children }) => {
  return <p className={'pt-2 pb-2 opacity-30 text-sm font-light'}>{children}</p>;
};

/**
 * 오버레이 팝업 컨테이너 컴포넌트
 * @param children
 * @param $width
 * @param $height
 * @constructor
 */
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
type OverlayPopup = typeof OverlayPopupComp & { Title: typeof Title; Description: typeof Description };

const OverlayPopup = OverlayPopupComp as OverlayPopup;
OverlayPopup.Title = Title;
OverlayPopup.Description = Description;

export default OverlayPopup;
