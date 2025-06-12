import { create } from 'zustand/react';

interface DarkModeStore {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const useDarkMode = create<DarkModeStore>()(set => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const stored = localStorage.getItem('theme');
  const init = stored === 'dark' ? true : stored === 'light' ? false : prefersDark;

  if (init) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDark: init,
    toggleDarkMode: () => {
      set(state => {
        const next = !state.isDark;
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
        return { isDark: next };
      });
    },
  };
});
