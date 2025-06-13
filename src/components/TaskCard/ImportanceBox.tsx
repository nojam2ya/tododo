import type { Importance } from '@/types/global';
import clsx from 'clsx';

interface ImportanceBoxProps {
  importance: Importance;
}

const ImportanceBox: React.FC<ImportanceBoxProps> = ({ importance }) => {
  /* tailwindcss classes */
  const base = 'text-xs font-bold w-fit border-solid rounded-full pl-2 pr-2 p-1';
  const types = {
    'text-red-500 bg-red-600/10 border border-red-500': importance === 'high',
    'text-yellow-500 bg-yellow-600/10 border border-yellow-500': importance === 'medium',
    'text-blue-500 bg-blue-600/10 border border-blue-500': importance === 'low',
  };
  const darkTypes = {
    'dark:text-red-400 dark:bg-red-600/20 dark:border border-red-600/70': importance === 'high',
    'dark:text-yellow-400 dark:bg-yellow-600/20 dark:border border-yellow-600/70': importance === 'medium',
    'dark:text-blue-400 dark:bg-blue-600/20 dark:border border-blue-600/70': importance === 'low',
  };
  
  return <p className={clsx(base, types, darkTypes)}>{importance}</p>;
};

export default ImportanceBox;
