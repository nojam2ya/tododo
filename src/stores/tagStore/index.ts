import type { Tag } from '@/types/global';
import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { DATE_FORMAT, FULL_DATE_FORMAT, isTest } from '@shared/constants/constants.tsx';
import { v4 as uuidV4 } from 'uuid';

interface TagStore {
  tags: Tag[];
  getTagMap: () => Map<string, Tag>;
  createTag: (title: string) => Tag | undefined;
  updateTag: (tag: Tag) => void;
  deleteTag: (tag: Tag) => void;
}

/* 태그 스토어 */
export const useTagStore = create<TagStore>()(
  persist(
    (set, get) => ({
      /* 태그 리스트 */
      tags: [],

      /* 태그 맵 get */
      getTagMap: () => new Map(get().tags.map(tag => [tag.id, tag])),

      /* 태그 생성 */
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

      /* 태그 수정 */
      updateTag: tag => {
        const now = dayjs().format(FULL_DATE_FORMAT);
        set(state => ({
          tags: state.tags.map(t =>
            t.id !== tag.id
              ? t
              : {
                  ...t,
                  ...tag,
                  updateDate: now,
                },
          ),
        }));
      },

      /* 태그 삭제 */
      deleteTag: tag => {
        set(state => ({ tags: state.tags.filter(t => t.id !== tag.id) }));
      },
    }),
    {
      name: 'tag',
      storage: isTest ? undefined : createJSONStorage(() => localStorage),
    },
  ),
);
