import 'react-router';
import { type IndexRouteObject, type NonIndexRouteObject } from 'react-router';

declare module 'react-router' {
  interface Meta {
    title?: string;
    icon?: React.ReactNode | { default: React.ReactNode; active: React.ReactNode };
  }

  interface CustomIndexRouteObject extends IndexRouteObject {
    meta?: Meta;
  }

  interface CustomNonIndexRouteObject extends NonIndexRouteObject {
    meta?: Meta;
  }

  type CustomRouteObject = CustomIndexRouteObject | CustomNonIndexRouteObject;
}
