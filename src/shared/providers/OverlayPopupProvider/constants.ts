import { lazy } from 'react';

export const OVERLAY_POPUP_REGISTRY = {
  ADD_NEW_TASK_POPUP: lazy(() => import('src/features/dashboard/AddNewTaskPopup')),
} as const;

export type OverlayPopupKey = keyof typeof OVERLAY_POPUP_REGISTRY;
export type OverlayPopupPropsMap = {
  ADD_NEW_TASK_POPUP: null;
};
