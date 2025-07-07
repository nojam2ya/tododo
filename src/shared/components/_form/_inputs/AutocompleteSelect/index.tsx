import type { InputProps } from '@shared/components/_form/_form.types.ts';
import DisplayValuesTitleList from '@shared/components/_form/_inputs/AutocompleteSelect/DisplayValuesTitleList.tsx';
import ComboboxSelect from '@shared/components/_form/_inputs/ComboboxSelect';
import { useQueryFilteredOptions } from '@shared/components/_form/_inputs/AutocompleteSelect/useQueryFilteredOptions.ts';
import { NEW_LABEL } from '@shared/components/_form/_inputs/AutocompleteSelect/AutocompleteSelect.constatns.ts';
import type { PropsOf } from '@headlessui/react/dist/types';

interface AutocompleteSelectProps<T extends Record<string, any>> extends InputProps {
  allDataList: T[]; // 전체 데이터
  addData: (data: T) => void; // 데이터 추가
  selectedDataList: T[]; // 선택된 데이터
  removeData: (key: keyof T, value: string) => void; // 데이터 삭제
  createData: (label: string) => void; // 새 데이터 생성  (기존 추가 X, 새로 생성 O)
  labelName: keyof T; // 라벨 prop name
  valueName: keyof T | string; // 아이디(값) prop name
  optionClassName?: PropsOf<HTMLElement> & ['className'];
}

/**
 * 자동완성 텍스트 인풋 + 셀렉트 박스 컴포넌트
 * @param allDataList - 전체 데이터
 * @param addData - 데이터 추가
 * @param removeData - 데이터 삭제
 * @param createData - 새 데이터 생성 (기존 추가 X, 새로 생성 O)
 * @param selectedDataList - 선택된 데이터
 * @param valueName - 아이디(값) prop name
 * @param labelName - 라벨 prop name
 * @param label
 * @param labelClassName
 * @param containerClassName
 * @param optionClassName
 * @constructor
 */
const AutocompleteSelect = <T extends Record<string, any>>({
  allDataList,
  addData,
  removeData,
  createData,
  selectedDataList,
  valueName,
  labelName,
  label,
  labelClassName,
  containerClassName,
  optionClassName,
}: AutocompleteSelectProps<T>) => {
  const { query, options, resetQuery, handleChangeQuery } = useQueryFilteredOptions({
    allDataList,
    labelName,
    valueName,
    selectedDataList,
  });

  // 데이터 생성 조건
  const isQueryNew =
    query &&
    allDataList.every(data => data[labelName] !== query) &&
    selectedDataList.every(data => data[labelName] !== query);

  const handleAddValue = (value: string) => {
    // 새 데이터 생성
    if (value === NEW_LABEL && query && !selectedDataList.some(d => d[labelName] === query)) {
      createData(query);
      return;
    }

    // 기존 데이터 선택
    const hasValue = selectedDataList.some(data => data[valueName] === value);

    if (hasValue) return; // 이미 선택된 데이터에 생성되어 있으면 return

    const data = allDataList.find(data => data[valueName] === value);

    if (data) {
      addData(data);
    }
  };

  const handleRemoveValue = (data: T) => {
    // 실제 데이터 삭제
    if (data[valueName]) {
      removeData(valueName, data[valueName]);
      return;
    }

    // 새 데이터 삭제
    removeData(labelName, data[labelName]);
  };

  return (
    <ComboboxSelect
      value={query}
      onChangeCombobox={handleAddValue}
      onCloseCombobox={resetQuery}
      onChangeComboboxInput={handleChangeQuery}
      label={label}
      labelClassName={labelClassName}
      containerClassName={containerClassName}
      midChildren={
        <DisplayValuesTitleList>
          {selectedDataList.map((data, i) => (
            <DisplayValuesTitleList.Item
              key={data[valueName] ?? `new-${i}`}
              text={data[labelName]}
              onClickXButton={() => handleRemoveValue(data)}
            />
          ))}
        </DisplayValuesTitleList>
      }
    >
      {query && !options?.length && !isQueryNew && (
        <ComboboxSelect.Option value={''} title={'옵션이 없습니다.'} disabled />
      )}
      {isQueryNew && <ComboboxSelect.Option value={NEW_LABEL} title={`${query} 생성`} />}
      {options.map(option => (
        <ComboboxSelect.Option
          key={option[valueName]}
          value={option[valueName]}
          title={option[labelName]}
          className={optionClassName}
        />
      ))}
    </ComboboxSelect>
  );
};

export default AutocompleteSelect;
