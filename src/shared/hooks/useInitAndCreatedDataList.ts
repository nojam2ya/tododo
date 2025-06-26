import { useEffect, useRef, useState } from 'react';

export const useInitAndCreatedDataList = <T extends Record<string, any>>({
  allDataList,
  initIds,
  idName,
  labelName,
}: {
  allDataList: T[];
  initIds?: T[keyof T][] | string[];
  idName: keyof T;
  labelName: keyof T;
}) => {
  const [dataList, setDataList] = useState<T[]>([]);
  const initDataListDone = useRef(false);

  useEffect(() => {
    if (initDataListDone.current) return;
    if (initIds === undefined) {
      initDataListDone.current = true;
      return;
    }

    const initDataList: T[] = [];
    for (const id of initIds) {
      const data = allDataList.find(data => data[idName] === id);
      if (data) initDataList.push(data);
    }
    setDataList(initDataList);

    initDataListDone.current = true;
  }, [allDataList, initIds, idName]);

  const addData = (data: T) => setDataList(prev => [...prev, data]);

  const createData = (label: string) =>
    setDataList(prev => [
      ...prev,
      {
        [idName]: null,
        [labelName]: label,
      } as T,
    ]);

  const removeData = (key: keyof T, value: string) => {
    setDataList(prev => prev?.filter(prevData => prevData[key] !== value));
  };

  return {
    dataList,
    addData,
    createData,
    removeData,
  };
};
