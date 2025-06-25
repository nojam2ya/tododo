import { useEffect, useRef, useState } from 'react';

export const useDisplayDataList = <T extends Record<string, any>>({
  allDataList,
  valueName,
  values,
}: {
  allDataList: T[];
  values: string[];
  valueName: keyof T;
}) => {
  const [displayDataList, setDisplayDataList] = useState<T[]>([]);

  const initDisplayDataList = useRef(false);

  useEffect(() => {
    if (initDisplayDataList.current || !values.length || !valueName) return;
    const nextDisplayDataList = [];
    for (const value of values) {
      const data = allDataList.find(data => data[valueName] === value);
      if (data) nextDisplayDataList.push(data);
    }
    setDisplayDataList(nextDisplayDataList);
    initDisplayDataList.current = true;
  }, [values, allDataList, valueName]);

  const addDisplayData = (data: T) => setDisplayDataList(prev => [...prev, data]);

  const removeDisplayData = (key: string, value: string) => {
    setDisplayDataList(prev => prev?.filter(prevData => prevData[key] !== value));
  };

  return {
    displayDataList,
    addDisplayData,
    removeDisplayData,
  };
};
