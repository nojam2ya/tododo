import { createContext } from 'react';

export const PointermoveProviderContext = createContext({
  position: { x: 0, y: 0 },
});
