import type { Tag } from '@/types/global';
import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import { v4 as uuidV4 } from 'uuid';

interface TagStore {
  tags: Tag[];
  createTag: (title: string) => Tag | undefined;
  getTagMap: () => Map<string, Tag>;
}

const isTest = process.env.NODE_ENV === 'test';

export const useTagStore = create<TagStore>()(
  persist(
    (set, get) => ({
      tags: [],
      createTag: title => {
        let newTag;
        set(state => {
          if (state.tags.some(tag => tag.title === title)) return state;
          const now = dayjs().format(DATE_FORMAT);
          newTag = { id: uuidV4(), title, createdDate: now, updateDate: now } as Tag;
          return { tags: [...state.tags, newTag] };
        });
        return newTag;
      },
      getTagMap: () => new Map(get().tags.map(tag => [tag.id, tag])),
    }),
    {
      name: 'tag',
      storage: isTest ? undefined : createJSONStorage(() => localStorage),
    },
  ),
);
