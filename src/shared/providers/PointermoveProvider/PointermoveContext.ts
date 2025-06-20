import { createContext } from 'react';

export const PointermoveContext = createContext({
  position: { x: 0, y: 0 },
});