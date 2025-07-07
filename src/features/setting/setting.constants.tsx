import { RectangleStackIcon, TagIcon } from '@heroicons/react/24/solid';
import { lazy } from 'react';

export const SETTINGS_TABS = [
  {
    title: '태그 관리',
    icon: <TagIcon className={'w-5 h-5'} />,
    Component: lazy(() => import('@features/setting/TagManagement')),
  },
  {
    title: '작업 관리',
    icon: <RectangleStackIcon className={'w-5 h-5'} />,
    Component: lazy(() => import('@features/setting/TaskManagement')),
  },
];
