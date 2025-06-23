import { Outlet } from 'react-router';
import Gnb from './Gnb.tsx';
import clsx from 'clsx';
import ToggleGnbButton from './ToggleGnbButton.tsx';
import { useOpen } from '@shared/hooks/useOpen.ts';
import { useDarkMode } from '@stores/darkModeStore.ts';
import ToggleDarkModeButton from '@layout/MainLayout/ToggleDarkModeButton.tsx';
import { menus } from '@infra/router/routers.tsx';
import { useRef } from 'react';

const MainLayout = () => {
  const { isOpen, toggleOpen } = useOpen();
  const toggleDarkMode = useDarkMode(state => state.toggleDarkMode);

  /* tailwindcss classes */
  const wrapBase = 'w-full h-dvh bg-background-primary text-foreground relative overflow-hidden';
  const wrapDark = 'dark:bg-background-primary-dark dark:text-foreground-dark';
  const contentBase = 'fixed h-dvh  p-20 right-0 top-0 overflow-auto transition-width duration-300';
  const contentActive = isOpen ? 'w-5/6' : 'w-dvw';

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(wrapBase, wrapDark)}>
      <ToggleGnbButton isOpen={isOpen} onClick={toggleOpen} />
      <Gnb isOpen={isOpen}>
        {menus.map(({ id, path, meta: { title, icon } }) => (
          <Gnb.GnbItem key={id} id={id} path={`/${path}`} title={title} icon={icon} />
        ))}
      </Gnb>
      <div className={clsx(contentBase, contentActive)} ref={containerRef}>
        <ToggleDarkModeButton onClick={toggleDarkMode} aria-label={'다크모드 토글 버튼'} />
        <Outlet context={{ containerRef }} />
      </div>
    </div>
  );
};

export default MainLayout;
