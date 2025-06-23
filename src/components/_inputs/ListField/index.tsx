import { useId, useRef } from 'react';
import type { ChildrenProps } from '@/types/global';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useElementSize } from '@shared/hooks/useElementSize.ts';
import type { FieldProps } from '@components/_inputs/_inputs.types.ts';

interface ListFieldProps extends ChildrenProps, FieldProps {
  label?: string;
  currentTitle: string;
  value: string;
  onChange: (value: string) => void;
  buttonClassName?: string;
}

interface ListFieldOptionProps {
  key: string;
  value: string;
  title: string;
  className: string;
}

const ListFieldOption: React.FC<ListFieldOptionProps> = ({ key, title, value, className }) => {
  return (
    <ListboxOption
      key={key}
      value={value}
      className={({ selected, focus }) =>
        clsx(
          'rounded-md p-1 pl-8 text-sm relative',
          selected && !className && 'text-primary',
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

const ListFieldComp: React.FC<ListFieldProps> = ({
  label,
  currentTitle,
  value,
  onChange,
  children,
  labelClassName,
  containerClassName,
  buttonClassName,
}) => {
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);
  const { width } = useElementSize(ref);
  return (
    <div className={clsx('common-input-container', containerClassName)}>
      <Listbox value={value} onChange={onChange}>
        {label && (
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
        )}
        <ListboxButton
          ref={ref}
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

type ListField = typeof ListFieldComp & { ListFieldOption: typeof ListFieldOption };
const ListField = ListFieldComp as ListField;
ListField.ListFieldOption = ListFieldOption;

export default ListField;
