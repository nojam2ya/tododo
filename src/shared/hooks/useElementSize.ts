import { useEffect, useState } from 'react';

export const useElementSize = (ref: React.RefObject<HTMLElement | null>) => {
  const [size, setSize] = useState({ width: '0', height: '0' });

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width: `${width}px`, height: `${height}px` });
    }
  }, [ref]);

  return size;
};
