import { create } from 'zustand/react';
import type { Work } from '@/types/global';
import { createJSONStorage, persist } from 'zustand/middleware/persist';
import dayjs from 'dayjs';
import { FULL_DATE_FORMAT } from '@/shared/constants/constants.tsx';

interface WorkStore {
  works: Work[];
  createWork: (work: Omit<Work, 'id' | 'createdDate' | 'updateDate'>) => void;
}

export const useWorkStore = create<WorkStore>()(
  persist(
    set => ({
      works: [],
      createWork(work) {
        const today = dayjs();
        const curDate = today.format(FULL_DATE_FORMAT);
        set(state => ({
          works: [
            ...state.works,
            {
              ...work,
              id: `${today}${work.status}`,
              createdDate: curDate,
              updateDate: curDate,
            },
          ],
        }));
      },
    }),
    {
      name: 'work',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
