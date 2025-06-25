import type { InputProps } from '@shared/components/_form/_form.types.ts';
import DisplayValuesTitleList from '@shared/components/_form/_inputs/AutocompleteSelect/DisplayValuesTitleList.tsx';
import ComboboxSelect from '@shared/components/_form/_inputs/ComboboxSelect';
import { useDisplayDataList } from '@shared/components/_form/_inputs/AutocompleteSelect/useDisplayDataList.ts';
import { useQueryFilteredOptions } from '@shared/components/_form/_inputs/AutocompleteSelect/useQueryFilteredOptions.ts';
import { NEW_LABEL } from '@shared/components/_form/_inputs/AutocompleteSelect/AutocompleteSelect.constatns.ts';

interface AutocompleteSelectProps<T extends Record<string, any>> extends InputProps {
  allDataList: T[]; // 전체 데이터
  values: string[]; // 선택된 데이터 아이디(값)(value)

  labelName: keyof T; // 라벨 prop name
  valueName: keyof T; // 아이디(값) prop name

  onAddValue: (value: string) => void; // 아이디(값) 추가
  onRemoveValue: (value: string) => void; // 아이디(값) 삭제
  onAddNewLabel: (label: string) => void; // 새 라벨 추가
  onRemoveNewLabel: (label: string) => void; // 새 라벨 삭제

  optionClassName?: string;
}

const AutocompleteSelect = <T extends Record<string, any>>({
  values,
  allDataList,
  valueName,
  labelName,
  onAddValue,
  onRemoveValue,
  onAddNewLabel,
  onRemoveNewLabel,
  label,
  labelClassName,
  containerClassName,
  optionClassName,
}: AutocompleteSelectProps<T>) => {
  const { displayDataList, addDisplayData, removeDisplayData } = useDisplayDataList({
    allDataList,
    values,
    valueName,
  });

  const { query, options, resetQuery, handleChangeQuery } = useQueryFilteredOptions({
    allDataList,
    labelName,
    valueName,
    values,
  });

  const isQueryNew =
    query &&
    allDataList.every(data => data[labelName] !== query) &&
    allDataList.every(data => data[labelName] !== query);

  const handleAddValue = (value: string) => {
    // 새 데이터 생성
    if (value === NEW_LABEL && query && !displayDataList.some(d => d[labelName] === query)) {
      onAddNewLabel(query);
      addDisplayData({ [valueName]: null, [labelName]: query } as T);
      return;
    }

    // 기존 데이터 선택
    const hasValue = values.includes(value);
    const data = allDataList.find(data => data[valueName] === value);

    if (!hasValue && data) {
      onAddValue(value);
      addDisplayData(data);
    }
  };

  const handleRemoveValue = (data: T) => {
    // 실제 데이터 삭제
    if (data[valueName]) {
      removeDisplayData(valueName as string, data[valueName]);
      onRemoveValue(data[valueName]);
      return;
    }

    // 새 데이터 삭제
    removeDisplayData(labelName as string, data[labelName]);
    onRemoveNewLabel(data[labelName]);
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
          {displayDataList.map((data, i) => (
            <DisplayValuesTitleList.DisplayValuesTitleItem
              key={data[valueName] ?? `new-${i}`}
              text={data[labelName]}
              onClickXButton={() => handleRemoveValue(data)}
            />
          ))}
        </DisplayValuesTitleList>
      }
    >
      {query && !options?.length && !isQueryNew && (
        <ComboboxSelect.ComboboxSelectOption value={''} title={'옵션이 없습니다.'} disabled />
      )}
      {isQueryNew && <ComboboxSelect.ComboboxSelectOption value={NEW_LABEL} title={`${query} 생성`} />}
      {options.map(option => (
        <ComboboxSelect.ComboboxSelectOption
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
