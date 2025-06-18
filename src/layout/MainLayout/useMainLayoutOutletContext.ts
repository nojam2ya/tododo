import { useOutletContext } from 'react-router';

export const useMainLayoutOutletContext = () => {
  const context = useOutletContext<{ containerRef: React.RefObject<HTMLDivElement | null> }>();

  if (context === undefined || context.containerRef === undefined)
    throw Error("This hook must be used in MainLayout's Outlet Component.");

  return {
    ...context,
  };
};
