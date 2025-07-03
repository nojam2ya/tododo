import { useState } from 'react';

/**
 * 여닫기 상태, 핸들러 훅
 * @param defaultValue - 초기값 (기본값:true)
 */
export const useOpen = (defaultValue: boolean = true) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  return {
    isOpen,
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
    toggleOpen: () => setIsOpen(prev => !prev),
  };
};
