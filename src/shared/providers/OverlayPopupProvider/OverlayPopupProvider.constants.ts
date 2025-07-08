import { lazy } from 'react';
import type { EditTaskPopupProps } from '@components/_popups/EditTaskPopup/EditTaskPopup.types.ts';
import type { ConfirmPopupProps } from '@components/_popups/ConfirmPopup/ConfirmPopup.types.ts';
import type { EditTagPopupProps } from '@components/_popups/EditTagPopup/EditTagPopup.types.ts';

export const OVERLAY_POPUP_REGISTRY = {
  CONFIRM_POPUP: lazy(() => import('src/components/_popups/ConfirmPopup')),
  EDIT_TASK_POPUP: lazy(() => import('@components/_popups/EditTaskPopup')),
  EDIT_TAG_POPUP: lazy(() => import('@components/_popups/EditTagPopup')),
} as const;

export type OverlayPopupKey = keyof typeof OVERLAY_POPUP_REGISTRY;

export type OverlayPopupPropsMap = {
  CONFIRM_POPUP: ConfirmPopupProps;
  EDIT_TASK_POPUP: EditTaskPopupProps;
  EDIT_TAG_POPUP: EditTagPopupProps;
};
