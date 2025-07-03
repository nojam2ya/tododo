import { beforeEach, describe, expect, it } from 'vitest';
import { useTagStore } from './index.ts';
import { dummyTags } from '@/__mock__/dummy-data.ts';

describe('useTagStore (no localStorage in test mode)', () => {
  beforeEach(() => {
    // 테스트 시작 전 상태 초기화
    useTagStore.setState({ tags: dummyTags });
  });

  it('createTag는 새로운 태그를 추가해야 한다', () => {
    const title = 'Test Tag';
    const newTag = useTagStore.getState().createTag(title);

    expect(newTag).toBeDefined();
    expect(newTag?.title).toBe(title);

    const tags = useTagStore.getState().tags;
    expect(tags.some(tag => tag.title === title)).toBe(true);
  });

  it('동일한 제목의 태그는 중복 추가되지 않아야 한다', () => {
    const title = dummyTags[0].title;
    const beforeLen = useTagStore.getState().tags.length;

    const result = useTagStore.getState().createTag(title);
    const afterLen = useTagStore.getState().tags.length;

    expect(result).toBeUndefined();
    expect(afterLen).toBe(beforeLen);
  });

  it('getTagMap은 id -> Tag 형태의 Map을 반환해야 한다', () => {
    const map = useTagStore.getState().getTagMap();
    const sample = dummyTags[0];
    expect(map.get(sample.id)).toEqual(sample);
  });
});
