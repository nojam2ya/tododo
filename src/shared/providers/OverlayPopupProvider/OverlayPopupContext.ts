import { createContext } from 'react';
import type { OverlayPopupKey, OverlayPopupPropsMap } from '@shared/providers/OverlayPopupProvider/constants.ts';

interface OverlayPopupDispatchContext {
  open: <K extends OverlayPopupKey>({ key, props }: { key: K; props?: OverlayPopupPropsMap[K] }) => void;
  close: () => void;
  handleSize: (props: { $width?: string; $height?: string }) => void;
}

export const OverlayPopupContext = createContext({ isOpen: false, size: { $width: '40%', $height: '50%' } });

export const OverlayPopupDispatchContext = createContext<OverlayPopupDispatchContext>({
  open: () => {},
  close: () => {},
  handleSize: () => {},
});
