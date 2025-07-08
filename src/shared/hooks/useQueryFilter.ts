import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

export const useQueryFilter = <T>({
  propName,
  targetData,
  filterCb,
}: {
  targetData: T[];
  propName: keyof T;
  filterCb?: (data: T[]) => T[];
}) => {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!query) return filterCb ? filterCb(targetData) : targetData;
    const filtered = targetData.filter(item => {
      const value = item[propName] as string;
      return value.toLocaleLowerCase().includes(query.toLowerCase());
    });
    return filterCb ? filterCb(filtered) : filtered;
  }, [query, targetData]);

  const handleChangeQuery = useCallback((params: string | ChangeEvent<HTMLInputElement>) => {
    // string 파라미터
    if (typeof params === 'string') setQuery(params);
    // ChangeEvent 파라미터
    else setQuery(params.currentTarget.value);
  }, []);

  return {
    query,
    filteredData,
    handleChangeQuery,
  };
};
