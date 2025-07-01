import { lazy } from 'react';
import type { EditTaskPopupProps } from '@components/EditTaskPopup/EditTaskPopup.types.ts';

export const OVERLAY_POPUP_REGISTRY = {
  EDIT_TASK_POPUP: lazy(() => import('@components/EditTaskPopup')),
} as const;

export type OverlayPopupKey = keyof typeof OVERLAY_POPUP_REGISTRY;

export type OverlayPopupPropsMap = {
  EDIT_TASK_POPUP: EditTaskPopupProps;
};
