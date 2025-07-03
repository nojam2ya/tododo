import { menus } from '@infra/router/routers.tsx';
import clsx from 'clsx';
import { useCurrentRoute } from '@shared/hooks/useCurrentRoute.tsx';
import { Link } from 'react-router';
import type { ChildrenProps } from '@/types/component';
import type { FC, ReactNode } from 'react';

interface GnbItemProps {
  id: string;
  path: string;
  icon: { default: ReactNode; active: ReactNode };
  title: string;
}

interface GnbProps extends ChildrenProps {
  isOpen: boolean;
}

/**
 * GNB 아이템 컴포넌트
 * @param id - 라우트 아이디
 * @param path - 라우트 패스
 * @param icon - 아이콘
 * @param title - 라우트명
 * @constructor
 */
const GnbItem: FC<GnbItemProps> = ({ id, path, icon, title }) => {
  const currentRoute = useCurrentRoute(menus);
  const isActive = currentRoute?.route.id === id;

  return (
    <li>
      <Link
        className={clsx(
          'flex items-center gap-3 pl-4 pr-4 p-2 rounded-lg ',
          'hover:bg-background-secondary-hover hover:dark:bg-background-secondary-dark-hover',
          isActive && 'bg-background-secondary-hover dark:bg-background-secondary-dark-hover',
        )}
        to={path}
      >
        {isActive ? icon.active : icon.default}
        <span className={isActive ? 'font-bold' : 'font-medium'}>{title}</span>
      </Link>
    </li>
  );
};

/**
 * GNB 컴포넌트
 * @param isOpen - GNB 열기 여부
 * @param children
 * @constructor
 */
const GnbComponent: FC<GnbProps> = ({ isOpen, children }) => {
  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 h-full w-1/6 bg-background-secondary transition-transform duration-300 pt-20 pl-2 pr-2 pb-4',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'dark:bg-background-secondary-dark',
      )}
    >
      <ul>{children}</ul>
    </nav>
  );
};

type GnbType = typeof GnbComponent & { GnbItem: typeof GnbItem };
const Gnb = GnbComponent as GnbType;
Gnb.GnbItem = GnbItem;

export default Gnb;
