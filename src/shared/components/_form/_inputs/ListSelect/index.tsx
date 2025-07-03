import { type FC, memo, useId, useRef } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useRefElementSize } from '@shared/hooks/useRefElementSize.ts';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import Label from '@shared/components/_form/Label';
import type { ChildrenProps } from '@/types/component';

interface ListSelectProps extends ChildrenProps, InputProps {
  currentTitle: string; // 현재 라벨 타이틀
  value: string; // 값
  onChange: (value: string) => void; // 변경 핸들러 함수
  buttonClassName?: string;
}

interface OptionProps {
  value: string;
  title: string;
  className?: string;
}

/**
 * 리스트 셀렉트 옵션 컴포넌트
 * @param title
 * @param value
 * @param className
 * @constructor
 */
const Option: FC<OptionProps> = ({ title, value, className }) => {
  return (
    <ListboxOption
      value={value}
      className={({ selected, focus }) =>
        clsx(
          'rounded-md p-1 pl-8 text-sm relative',
          selected && !className ? 'font-bold text-primary' : 'text-foreground dark:text-foreground-dark',
          focus && 'bg-black/5 dark:bg-white/10',
          className,
        )
      }
    >
      {({ selected }) => (
        <>
          {selected && <CheckIcon className="w-3 h-3 absolute left-3 top-2" />}
          {title}
        </>
      )}
    </ListboxOption>
  );
};

/**
 * 리스트 셀렉트 컨테이너 컴포넌트
 * @param label - 라벨
 * @param currentTitle - 현재 라벨 타이틀
 * @param value - 값
 * @param onChange - 변경 핸들러 함수
 * @param required - 필수값
 * @param children
 * @param labelClassName
 * @param containerClassName
 * @param buttonClassName
 * @constructor
 */
const ListSelectComp: FC<ListSelectProps> = ({
  label,
  currentTitle,
  value,
  onChange,
  children,
  labelClassName,
  containerClassName,
  buttonClassName,
  required,
}) => {
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);
  const { width } = useRefElementSize(ref);

  return (
    <div className={clsx('common-input-container', containerClassName)}>
      <Listbox value={value} onChange={onChange}>
        {label && (
          <Label htmlFor={id} required={required} className={labelClassName}>
            {label}
          </Label>
        )}
        <ListboxButton
          ref={ref}
          id={id}
          className={clsx('w-full h-9 input-box flex justify-between items-center', buttonClassName)}
        >
          {currentTitle}
          <ChevronDownIcon className={'w-4 h-4'} />
        </ListboxButton>
        <ListboxOptions
          style={{ width }}
          className={({ open }) => clsx('input-box', open && 'focus:focus')}
          anchor="bottom"
        >
          {children}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

type ListField = typeof ListSelectComp & { Option: typeof Option };
const ListField = ListSelectComp as ListField;
ListField.Option = memo(Option);

export default ListField;
