import { useLayoutEffect, useState } from 'react';

export const useRefElementSize = (ref: React.RefObject<HTMLElement | null>) => {
  const [size, setSize] = useState({ width: '0', height: '0', top: '0', left: '0' });

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height, top, left } = ref.current.getBoundingClientRect();
      setSize({ width: `${width}px`, height: `${height}px`, top: `${top + height}px`, left: `${left}px` });
    }
  }, [ref]);

  return size;
};
