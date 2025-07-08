import ListSelect from '@shared/components/_form/_inputs/ListSelect';
import { TASK_PRIORITY, TASK_STATUS_TITLE_MAP } from '@shared/constants/taskConstants.tsx';
import type { FC } from 'react';
import clsx from 'clsx';
import type { ChildrenProps, ClassNameProps } from '@/types/component';

const Article: FC<
  {
    title: string;
  } & ChildrenProps &
    ClassNameProps
> = ({ title, className, children }) => {
  return (
    <div
      className={clsx(
        'pt-6 pb-6 border-b border-solid border-b-gray-600',
        'first:border-t first:border-t-gray-600',
        className,
      )}
    >
      <h5 className={'text-sm'}>{title}</h5>
      {children}
    </div>
  );
};

const FilterPanel: FC<ClassNameProps> = ({ className }) => {
  return (
    <div className={clsx('card-base', className)}>
      <h4 className={'opacity-50 text-sm font-bold'}>필터</h4>
      <div className={'mt-6'}>
        <Article title={'검색'}>
          <ListSelect currentTitle={'1'} value={'1'} onChange={() => {}}>
            <ListSelect.Option value={'1'} title={'1'} />
            <ListSelect.Option value={'2'} title={'2'} />
            <ListSelect.Option value={'3'} title={'3'} />
          </ListSelect>
          <input type="text" className={'input-box'} placeholder={'검색할 키워드를 입력하세요'} />
        </Article>

        <Article title={'작업상태'}>
          {Object.values(TASK_STATUS_TITLE_MAP).map(value => (
            <p>{value}</p>
          ))}
        </Article>

        <Article title={'중요도'}>
          {Object.values(TASK_PRIORITY).map(value => (
            <p className={`${value}-tag`}>{value}</p>
          ))}
        </Article>

        <Article title={'태그'}></Article>

        <div title={'날짜'}></div>
      </div>
    </div>
  );
};

export default FilterPanel;
