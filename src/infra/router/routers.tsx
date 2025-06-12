import type { CustomRouteObject, NonIndexRouteObject } from 'react-router';
import DashboardPage from '@features/dashboard';
import MainLayout from '@layout/MainLayout';
import StatusPage from '@features/status';
import { ChartBarIcon, RectangleGroupIcon } from '@heroicons/react/24/outline';
import {
  ChartBarIcon as ChartBarSolidIcon,
  RectangleGroupIcon as RectangleGroupSolidIcon,
} from '@heroicons/react/24/solid';

export interface Menu extends NonIndexRouteObject {
  id: string;
  meta: { title: string; icon: { default: React.ReactNode; active: React.ReactNode } };
}

export const menus: Menu[] = [
  {
    id: 'dashboard',
    path: '',
    element: <DashboardPage />,
    meta: {
      title: 'Dashboard',
      icon: {
        default: <RectangleGroupIcon className={'w-6 h-6'} />,
        active: <RectangleGroupSolidIcon className={'w-6 h-6'} />,
      },
    },
  },
  {
    id: 'status',
    path: 'status',
    element: <StatusPage />,
    meta: {
      title: 'Status',
      icon: {
        default: <ChartBarIcon className={'w-6 h-6'} />,
        active: <ChartBarSolidIcon className={'w-6 h-6'} />,
      },
    },
  },
];

export const routers: CustomRouteObject[] = [
  {
    path: '',
    element: <MainLayout />,
    children: menus,
  },
];
