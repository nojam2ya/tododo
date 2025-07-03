import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

/**
 * 쿼리 필터 옵션 및 쿼리 컨트롤 훅
 * @param allDataList
 * @param selectedDataList
 * @param labelName
 * @param valueName
 */
export const useQueryFilteredOptions = <T extends Record<string, any>>({
  allDataList,
  selectedDataList,
  labelName,
  valueName,
}: {
  allDataList: T[];
  selectedDataList: T[];
  labelName: keyof T;
  valueName: keyof T;
}) => {
  const [query, setQuery] = useState(''); // query

  const options: T[] = useMemo(() => {
    const options = allDataList.filter(data => !selectedDataList.some(d => data[valueName] === d[valueName]));
    if (!query) return options;
    return options.filter(item => item[labelName].toLowerCase().includes(query.toLowerCase())); // 쿼리 포함 아이템
  }, [allDataList, labelName, valueName, selectedDataList, query]);

  const resetQuery = useCallback(() => setQuery(''), []);

  const handleChangeQuery = useCallback((params: string | ChangeEvent<HTMLInputElement>) => {
    // string 파라미터
    if (typeof params === 'string') setQuery(params);
    // ChangeEvent 파라미터
    else setQuery(params.currentTarget.value);
  }, []);

  return {
    query,
    options,
    resetQuery,
    handleChangeQuery,
  };
};
