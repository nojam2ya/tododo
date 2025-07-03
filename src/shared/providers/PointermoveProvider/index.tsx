import { useEffect, useRef, useState } from 'react';
import { PointermoveProviderContext } from '@shared/providers/PointermoveProvider/PointermoveProvider.context.ts';
import type { ChildrenProps } from '@/types/component';

const PointermoveProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerDown = () => {
      isDragging.current = true;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const x = e.clientX;
      const y = e.clientY;

      if (x !== lastPosition.current.x || y !== lastPosition.current.y) {
        lastPosition.current = { x, y };
        setPosition({ x, y });
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);
  return <PointermoveProviderContext.Provider value={{ position }}>{children}</PointermoveProviderContext.Provider>;
};

export default PointermoveProvider;
