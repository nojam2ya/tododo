import { useCallback, useMemo, useState } from 'react';

export const useQueryFilteredOptions = <T extends Record<string, any>>({
  allDataList,
  selectedDataList,
  labelName,
  valueName,
  // values,
}: {
  allDataList: T[];
  selectedDataList: T[];
  labelName: keyof T;
  valueName: keyof T;
  // values: string[];
}) => {
  const [query, setQuery] = useState(''); // query

  const options: T[] = useMemo(() => {
    const options = allDataList.filter(data => !selectedDataList.some(d => data[valueName] === d[valueName]));
    if (!query) return options;
    return options.filter(item => item[labelName].toLowerCase().includes(query.toLowerCase()));
  }, [allDataList, labelName, valueName, selectedDataList, query]);

  const resetQuery = useCallback(() => setQuery(''), []);

  const handleChangeQuery = useCallback((params: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof params === 'string') setQuery(params);
    else setQuery(params.currentTarget.value);
  }, []);

  return {
    query,
    options,
    resetQuery,
    handleChangeQuery,
  };
};
