import { menus } from '@infra/router/routers.tsx';
import clsx from 'clsx';
import { useCurrentRoute } from '@shared/hooks/useCurrentRoute.tsx';
import { Link } from 'react-router';
import type { ChildrenProps } from '@/types/global';

interface GnbItemProps {
  id: string;
  path: string;
  icon: { default: React.ReactNode; active: React.ReactNode };
  title: string;
}

interface GnbProps extends ChildrenProps {
  isOpen: boolean;
}

const GnbItem: React.FC<GnbItemProps> = ({ id, path, icon, title }) => {
  const currentRoute = useCurrentRoute(menus);
  const isActive = currentRoute?.route.id === id;

  /* tailwindcss classes */
  const base = 'flex items-center gap-3 pl-4 pr-4 p-2 rounded-lg ';
  const hover = 'hover::bg-background-secondary-hover hover:dark:bg-background-secondary-dark-hover';
  const active = isActive && 'bg-background-secondary-hover dark:bg-background-secondary-dark-hover';
  const titleActive = isActive ? 'font-bold' : 'font-medium';

  return (
    <li>
      <Link className={clsx(base, hover, active)} to={path}>
        {isActive ? icon.active : icon.default}
        <span className={titleActive}>{title}</span>
      </Link>
    </li>
  );
};

const GnbComponent: React.FC<GnbProps> = ({ isOpen, children }) => {
  /* tailwindcss classes */
  const base =
    'fixed top-0 left-0 h-full w-1/6 bg-background-secondary transition-transform duration-300 pt-20 pl-2 pr-2 pb-4';
  const dark = 'dark:bg-background-secondary-dark';
  const active = isOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <nav className={clsx(base, active, dark)}>
      <ul>{children}</ul>
    </nav>
  );
};

type GnbType = typeof GnbComponent & { GnbItem: typeof GnbItem };
const Gnb = GnbComponent as GnbType;
Gnb.GnbItem = GnbItem;

export default Gnb;
