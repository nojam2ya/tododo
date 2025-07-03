import type { FC } from 'react';
import AutocompleteSelect from '@shared/components/_form/_inputs/AutocompleteSelect';
import type { NewTag } from '@/types/global';

interface TagsFieldProps {
  addTag: (data: NewTag) => void; // 태그 추가 함수
  tags: NewTag[]; // 실제 태그 리스트
  removeTag: (key: keyof NewTag, value: string) => void; // 태그 삭제 함수
  createTempTag: (label: string) => void; // 임시 태그 생성 함수
  selectedTags: NewTag[]; // 택된 태그 리스트
}

/**
 * 태그 아이디 리스트 필드 컴포넌트
 * @param addTag - 태그 추가 함수
 * @param tags - 실제 태그 리스트
 * @param removeTag - 태그 삭제 함수
 * @param createTempTag - 임시 태그 생성 함수
 * @param selectedTags -선택된 태그 리스트
 * @constructor
 */
const TagsField: FC<TagsFieldProps> = ({ addTag, tags, removeTag, createTempTag, selectedTags }) => {
  return (
    <AutocompleteSelect
      label="태그"
      allDataList={tags}
      valueName={'id'}
      labelName={'title'}
      addData={addTag}
      createData={createTempTag}
      removeData={removeTag}
      selectedDataList={selectedTags}
    />
  );
};

export default TagsField;
