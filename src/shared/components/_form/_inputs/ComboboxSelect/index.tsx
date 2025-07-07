import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import * as React from 'react';
import { memo, useId, useRef } from 'react';
import { useRefElementSize } from '@shared/hooks/useRefElementSize.ts';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import Label from '@shared/components/_form/Label';
import type { ChildrenProps } from '@/types/component';
import type { PropsOf } from '@headlessui/react/dist/types';

interface ComboboxSelectProps extends ChildrenProps, InputProps {
  value: string; // 콤보 박스 값
  onChangeCombobox: (value: string) => void; // 콤보박스 변경 이벤트 핸들러 함수
  onCloseCombobox?: () => void; // 콤보박스 닫기 이벤트 핸들러 함수
  onChangeComboboxInput: (e: React.ChangeEvent<HTMLInputElement>) => void; // input 변경 이벤트 핸들러 함수
  displayValue?: (item: any) => string; // input 값
  midChildren?: React.ReactNode; // 중간 children
  buttonClassName?: PropsOf<HTMLButtonElement> & ['className'];
}

interface OptionProps {
  value: string;
  title: string;
  className?: PropsOf<HTMLElement> & ['className'];
  disabled?: boolean;
}

/**
 * 콤보 박스(셀렉트) 옵션 컴포넌트
 * @param value
 * @param title
 * @param className
 * @param disabled
 * @constructor
 */
const Option: React.FC<OptionProps> = ({ value, title, className, disabled }) => {
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
};

/**
 * 콤보 박스(셀렉트) 컨테이너 컴포넌트
 * @param value - 콤보 박스 값
 * @param label - 라벨
 * @param displayValue - input 값
 * @param onChangeCombobox - 콤보박스 변경 이벤트 핸들러 함수
 * @param onCloseCombobox - 콤보박스 닫기 이벤트 핸들러 함수
 * @param onChangeComboboxInput - input 변경 이벤트 핸들러 함수
 * @param midChildren - 중간 children
 * @param children - 하단 children
 * @param required - 필수값
 * @param buttonClassName
 * @param containerClassName
 * @param labelClassName
 * @constructor
 */
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

  /* 전체 wrapper dom ref */
  const wrapperRef = useRef<HTMLDivElement>(null);
  /* 콤보 박스 인풋(텍스트) dom ref */
  const inputRef = useRef<HTMLInputElement>(null);

  /* 전체 wrapper dom 사이즈 */
  const { width } = useRefElementSize(wrapperRef);

  const handleFocus = () => {
    wrapperRef.current?.classList.add('focus-active'); // focus 스타일 클래스 추가
  };

  const handleBlur = () => {
    wrapperRef.current?.classList.remove('focus-active'); // focus 스타일 클래스 제거
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
              'none-style text-sm text-left bg-white w-full justify-between items-center',
              'none-focus focus-visible:outline-none',
              'dark:border-primary/20 dark:bg-background-primary-dark',
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
ComboboxSelect.Option = memo(Option);

export default ComboboxSelect;
