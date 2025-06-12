import { useState } from 'react';

export const useOpen = (defaultValue: boolean = true) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  return {
    isOpen,
    toggleOpen: () => setIsOpen(prev => !prev),
  };
};
