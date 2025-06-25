import {
  OverlayPopupDispatchContext,
  OverlayPopupProviderContext,
} from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import type { ChildrenProps } from '@/types/global';
import { type ComponentType, type LazyExoticComponent, useMemo, useState } from 'react';
import {
  OVERLAY_POPUP_REGISTRY,
  type OverlayPopupKey,
  type OverlayPopupPropsMap,
} from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.constants.ts';
import { useEscKeydown } from '@shared/providers/OverlayPopupProvider/useKeypress.ts';
import OverlayPopup from '@shared/components/OverlayPopup';

interface PopupOverlayContent {
  Component: LazyExoticComponent<ComponentType<any>>;
  props?: unknown;
}

const OverlayPopupProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [size, setSize] = useState<{ $width: string; $height: string }>({ $width: 'auto', $height: 'auto' });
  const [isOpen, setIsOpen] = useState(false);
  const [overlayPopupContent, setOverlayPopupContent] = useState<PopupOverlayContent>();

  const open = <K extends OverlayPopupKey>({ key, props }: { key: K; props?: OverlayPopupPropsMap[K] }) => {
    setOverlayPopupContent({ Component: OVERLAY_POPUP_REGISTRY[key], props });
    setIsOpen(true);
  };

  const close = () => {
    setOverlayPopupContent(undefined);
    setIsOpen(false);
  };

  const handleSize = (props: { $width?: string; $height?: string }) => {
    setSize(prev => ({
      ...prev,
      ...props,
    }));
  };

  const dispatch = useMemo(() => ({ open, close, handleSize }), []);

  useEscKeydown(dispatch.close);

  return (
    <OverlayPopupProviderContext.Provider value={{ isOpen, size }}>
      <OverlayPopupDispatchContext.Provider value={dispatch}>
        {children}
        {isOpen && overlayPopupContent && (
          <OverlayPopup {...size}>
            {overlayPopupContent.props ? (
              <overlayPopupContent.Component {...(overlayPopupContent.props as object)} />
            ) : (
              <overlayPopupContent.Component />
            )}
          </OverlayPopup>
        )}
      </OverlayPopupDispatchContext.Provider>
    </OverlayPopupProviderContext.Provider>
  );
};

export default OverlayPopupProvider;
