import { useOutletContext } from 'react-router';
import type { MainLayoutOutletContext } from '@layout/MainLayout/MainLayout.types.ts';

/**
 * 메인 레이아웃 outlet context 제공 훅
 */
export const useMainLayoutOutletContext = () => {
  const context = useOutletContext<MainLayoutOutletContext>();

  if (context === undefined || context.containerRef === undefined)
    throw Error("This hook must be used in MainLayout's Outlet Component.");

  return {
    ...context,
  };
};
