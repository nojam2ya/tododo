import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import * as React from 'react';
import { useId, useRef } from 'react';
import { useRefElementSize } from '@shared/hooks/useRefElementSize.ts';
import type { ChildrenProps } from '@/types/global';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import Label from '@shared/components/_form/Label';

interface ComboboxSelectProps extends ChildrenProps, InputProps {
  buttonClassName?: string;
  value: string;
  onChangeCombobox: (value: string) => void;
  onCloseCombobox?: () => void;
  onChangeComboboxInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayValue?: (item: any) => string;
  midChildren?: React.ReactNode;
}

interface OptionProps {
  value: string;
  title: string;
  className?: string;
  disabled?: boolean;
}

const Option: React.FC<OptionProps> = React.memo(({ value, title, className, disabled }) => {
  return (
    <ComboboxOption
      value={value}
      disabled={disabled}
      className={({ selected, focus }) =>
        clsx(
          'rounded-md p-1 text-sm relative',
          selected && !className ? 'font-bold text-primary' : 'text-foreground dark:text-foreground-dark',
          focus && 'bg-black/5 dark:bg-white/10',
          disabled && 'opacity-50',
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
    </ComboboxOption>
  );
});

const ComboboxSelectComp: React.FC<ComboboxSelectProps> = ({
  value,
  buttonClassName,
  containerClassName,
  labelClassName,
  label,
  displayValue,
  onChangeCombobox,
  onCloseCombobox,
  onChangeComboboxInput,
  children,
  midChildren,
  required,
}) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { width } = useRefElementSize(wrapperRef);

  const handleFocus = () => {
    wrapperRef.current?.classList.add('focus-active');
  };

  const handleBlur = () => {
    wrapperRef.current?.classList.remove('focus-active');
  };

  return (
    <div className={clsx('common-input-container', containerClassName)}>
      {label && (
        <Label htmlFor={id} required={required} className={labelClassName}>
          {label}
        </Label>
      )}
      {midChildren}
      <Combobox value={value} onChange={onChangeCombobox} onClose={onCloseCombobox}>
        <div className={'input-box flex items-center gap-1'} ref={wrapperRef}>
          <ComboboxInput
            id={id}
            ref={inputRef}
            displayValue={displayValue}
            className={clsx(
              'none-style none-focus focus-visible:outline-none text-sm text-left bg-white dark:border-primary/20 dark:bg-background-primary-dark w-full justify-between items-center',
              buttonClassName,
            )}
            aria-label={label}
            onChange={onChangeComboboxInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <ComboboxButton className={clsx('flex justify-between items-center', buttonClassName)}>
            <ChevronDownIcon className={'w-4 h-4'} />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          style={{ width }}
          className={({ open }) => clsx('input-box translate-x-2.5 translate-y-2', open && 'focus:focus')}
          anchor="bottom"
        >
          {children}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
type ComboboxSelect = typeof ComboboxSelectComp & { Option: typeof Option };
const ComboboxSelect = ComboboxSelectComp as ComboboxSelect;
ComboboxSelect.Option = Option;

export default ComboboxSelect;
