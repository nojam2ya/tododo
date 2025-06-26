import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Tag } from '@/types/global';

interface TagStore {
  tags: Tag[];
  createTag: (title: string) => Tag | undefined;
  createTags: (titles: string[]) => Tag[] | undefined;
  getTagMap: () => Map<string, Tag>;
}

export const tags: Tag[] = [
  { id: '1', title: 'Design' },
  { id: '2', title: 'UI/UX' },
  { id: '3', title: 'Backend' },
  { id: '4', title: 'Auth' },
  { id: '5', title: 'Frontend' },
  { id: '6', title: 'Dashboard' },
  { id: '7', title: 'Setup' },
];

export const useTagStore = create<TagStore>()(
  persist(
    (set, get) => ({
      tags: tags,
      createTag: title => {
        let newTag;
        set(state => {
          if (state.tags.some(tag => tag.title === title)) return state;
          newTag = { id: `tag-${new Date()}`, title };
          return { tags: [...state.tags, newTag] };
        });
        return newTag;
      },
      createTags: titles => {
        const newTags: Tag[] = [];
        set(state => {
          for (const title of titles) {
            const tag = state.createTag(title);
            if (tag) {
              newTags.push(tag);
            }
          }
          return { tags: [...state.tags, ...newTags] };
        });
        return newTags?.length ? newTags : undefined;
      },
      getTagMap: () => new Map(get().tags.map(tag => [tag.id, tag])),
    }),
    {
      name: 'tag',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
