import { createContext } from 'react';

export const PointermoveProviderContext = createContext({
  isDragging: false,
  position: { x: 0, y: 0 },
});
