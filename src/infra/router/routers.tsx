import type { CustomRouteObject, NonIndexRouteObject } from 'react-router';
import DashboardPage from '@features/dashboard';
import MainLayout from '@layout/MainLayout';
import StatusPage from '@features/status';
import { ChartBarIcon, Cog8ToothIcon, RectangleGroupIcon } from '@heroicons/react/24/outline';
import {
  ChartBarIcon as ChartBarSolidIcon,
  Cog8ToothIcon as Cog8ToothSolidIcon,
  RectangleGroupIcon as RectangleGroupSolidIcon,
} from '@heroicons/react/24/solid';
import PointermoveProvider from '@shared/providers/PointermoveProvider';
import OverlayPopupProvider from '@shared/providers/OverlayPopupProvider';
import SettingPage from '@features/setting';

export interface Menu extends NonIndexRouteObject {
  id: string;
  meta: { title: string; icon: { default: React.ReactNode; active: React.ReactNode } };
}

export const menus: Menu[] = [
  {
    id: 'dashboard',
    path: '',
    element: (
      <PointermoveProvider>
        <DashboardPage />
      </PointermoveProvider>
    ),
    meta: {
      title: '대시보드',
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
      title: '현황',
      icon: {
        default: <ChartBarIcon className={'w-6 h-6'} />,
        active: <ChartBarSolidIcon className={'w-6 h-6'} />,
      },
    },
  },
  {
    id: 'setting',
    path: 'setting',
    element: <SettingPage />,
    meta: {
      title: '설정',
      icon: {
        default: <Cog8ToothIcon className={'w-6 h-6'} />,
        active: <Cog8ToothSolidIcon className={'w-6 h-6'} />,
      },
    },
  },
];

export const routers: CustomRouteObject[] = [
  {
    path: '',
    element: (
      <OverlayPopupProvider>
        <MainLayout />
      </OverlayPopupProvider>
    ),
    children: menus,
  },
];
