import { Outlet } from 'react-router';
import Gnb from './Gnb.tsx';
import clsx from 'clsx';
import ToggleGnbButton from './ToggleGnbButton.tsx';
import { useOpen } from '@shared/hooks/useOpen.ts';
import { useDarkMode } from '@stores/darkModeStore.ts';
import ToggleDarkModeButton from '@layout/MainLayout/ToggleDarkModeButton.tsx';
import { menus } from '@infra/router/routers.tsx';
import { useRef } from 'react';
import type { MainLayoutOutletContext } from '@layout/MainLayout/MainLayout.types.ts';
import { SkeletonTheme } from 'react-loading-skeleton';

/**
 * 메인 레이아웃 컴포넌트
 * @constructor
 */
const MainLayout = () => {
  const {
    isOpen, // GNB 열기 여부
    toggleOpen, // GNB 열기 토글
  } = useOpen();

  // 다크모드 토글
  const { isDark, toggleDarkMode } = useDarkMode();

  // 메인 레이아웃 컨텐츠 최상위 컨테이너 dom ref
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SkeletonTheme baseColor={isDark ? '#1b1b26' : '#e9e9ee'} highlightColor={isDark ? '#14141c' : '#dbdbe8'}>
      <div
        className={clsx(
          'w-full h-dvh bg-background-primary text-foreground relative overflow-hidden',
          'dark:bg-background-primary-dark dark:text-foreground-dark',
        )}
      >
        <ToggleGnbButton isOpen={isOpen} onClick={toggleOpen} />
        <Gnb isOpen={isOpen}>
          {menus.map(({ id, path, meta: { title, icon } }) => (
            <Gnb.GnbItem key={id} id={id} path={`/${path}`} title={title} icon={icon} />
          ))}
        </Gnb>
        <div
          className={clsx(
            'fixed h-dvh  p-20 right-0 top-0 overflow-auto transition-width duration-300',
            isOpen ? 'w-5/6' : 'w-dvw',
          )}
          ref={containerRef}
        >
          <ToggleDarkModeButton onClick={toggleDarkMode} aria-label={'다크모드 토글 버튼'} />
          <Outlet context={{ containerRef } as MainLayoutOutletContext} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MainLayout;
