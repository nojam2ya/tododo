import { useEffect } from 'react';

export const useEscKeydown = (callback: () => void) => {
  useEffect(() => {
    const handleEscKeypress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') callback();
    };

    window.addEventListener('keydown', handleEscKeypress);

    return () => {
      window.removeEventListener('keydown', handleEscKeypress);
    };
  }, []);
};
