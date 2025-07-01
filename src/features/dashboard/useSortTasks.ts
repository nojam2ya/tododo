import { useMemo, useState } from 'react';
import type { SortOrder } from '@shared/constants/constants.tsx';
import type { Task } from '@/types/global';

interface SortOption {
  key: 'date' | 'priority';
  order: SortOrder;
}

export const useSortTasks = (tasks: Task[]) => {
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      for (const option of sortOptions) {
        const { key, order } = option;

        let aValue, bValue;

        if (key === 'date') {
          aValue = a[key];
          bValue = b[key];
        } else if (key === 'priority') {
          aValue = a[key] === 'high' ? 3 : a[key] === 'medium' ? 2 : 1;
          bValue = b[key] === 'high' ? 3 : b[key] === 'medium' ? 2 : 1;
        }

        if (!aValue || !bValue) return 0;

        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [sortOptions, tasks]);

  const updateSortOption = (key: 'date' | 'priority') => {
    setSortOptions(prev => {
      const existing = prev.find(opt => opt.key === key);
      if (existing) {
        // desc -> null
        if (existing.order === 'asc') return prev.filter(p => p.key !== existing.key);

        // order 토글
        return prev.map(opt =>
          opt.key === key
            ? {
                ...opt,
                order: opt.order === 'asc' ? 'desc' : 'asc',
              }
            : opt,
        );
      } else {
        return [{ key, order: 'desc' }, ...prev];
      }
    });
  };

  const resetSortOption = () => setSortOptions([]);

  return {
    sortedTasks,
    updateSortOption,
    sortOptions,
    resetSortOption,
  };
};
