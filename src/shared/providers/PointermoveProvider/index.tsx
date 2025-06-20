import { useEffect, useState } from 'react';
import type { ChildrenProps } from '@/types/global';
import { PointermoveContext } from '@/shared/providers/PointermoveProvider/PointermoveContext.ts';

export const PointermoveProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);
  return <PointermoveContext value={{ position }}>{children}</PointermoveContext>;
};
