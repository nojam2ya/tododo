import { useContext, useEffect, useRef } from 'react';
import { PointermoveContext } from '@shared/providers/PointermoveProvider/PointermoveContext.ts';

export const useRectPosYStrWithContext = (ref: React.RefObject<HTMLElement | null>, isOver: boolean) => {
  const context = useContext(PointermoveContext);
  const posYRef = useRef<'top' | 'bottom'>('bottom');

  useEffect(() => {
    if (!isOver || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    posYRef.current = context.position.y < rect.top + rect.height / 2 ? 'top' : 'bottom';
  }, [ref, context.position, isOver]);

  return posYRef.current;
};
