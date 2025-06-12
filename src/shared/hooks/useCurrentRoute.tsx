import { type CustomRouteObject, matchRoutes, useLocation } from 'react-router';

export const useCurrentRoute = (targetRoutes: CustomRouteObject[]) => {
  const location = useLocation();
  const routes = matchRoutes(targetRoutes, location);
  return routes?.[0];
};
