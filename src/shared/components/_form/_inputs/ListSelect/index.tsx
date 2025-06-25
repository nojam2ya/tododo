import * as React from 'react';
import { useId, useRef } from 'react';
import type { ChildrenProps } from '@/types/global';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useRefElementSize } from '@shared/hooks/useRefElementSize.ts';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import Label from '@shared/components/_form/Label';

interface ListSelectProps extends ChildrenProps, InputProps {
  currentTitle: string;
  value: string;
  onChange: (value: string) => void;
  buttonClassName?: string;
}

interface ListSelectOptionProps {
  value: string;
  title: string;
  className?: string;
}

const ListSelectOption: React.FC<ListSelectOptionProps> = React.memo(({ title, value, className }) => {
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
});

const ListSelectComp: React.FC<ListSelectProps> = ({
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

type ListField = typeof ListSelectComp & { ListSelectOption: typeof ListSelectOption };
const ListField = ListSelectComp as ListField;
ListField.ListSelectOption = ListSelectOption;

export default ListField;
