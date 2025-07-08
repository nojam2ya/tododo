import { type RefObject, useEffect, useState } from 'react';

export const useEqualTabWidth = (ref: RefObject<HTMLDivElement | null>, tabCount: number) => {
  const [tabWidth, setTabWidth] = useState(0);

  useEffect(() => {
    if (ref.current && tabCount > 0) {
      const containerWidth = ref.current.offsetWidth;
      setTabWidth(containerWidth / tabCount);
    }
  }, [tabCount, ref]);

  return tabWidth;
};
