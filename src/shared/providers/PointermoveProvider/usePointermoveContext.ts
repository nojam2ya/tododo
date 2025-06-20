import { useContext, useEffect, useRef, useState } from 'react';
import { getPosYStr } from '@/shared/utils/utils.ts';
import { PointermoveContext } from '@/shared/providers/PointermoveProvider/PointermoveContext.ts';

export const useRectPosStrWithContext = (isOver: boolean) => {
  const ref = useRef<HTMLElement | null>(null);
  const [posStr, setPosStr] = useState<'top' | 'bottom' | null>(null);

  const { position } = useContext(PointermoveContext);

  useEffect(() => {
    if (!isOver) {
      setPosStr(null);
      return;
    }

    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosStr(getPosYStr(position.y, rect));
  }, [isOver, position]);

  return { ref, posStr };
};
