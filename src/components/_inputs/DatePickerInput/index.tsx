import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useId, useRef, useState } from 'react';
import clsx from 'clsx';
import type { FieldProps } from '@components/_inputs/_inputs.types.ts';
import { useElementSize } from '@shared/hooks/useElementSize.ts';
import { DayPicker } from 'react-day-picker';
import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';

interface DatePickerInputProps extends FieldProps {
  label?: string;
  month?: Date;
  onChange: (date: Date) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  month,
  onChange,
  containerClassName,
  labelClassName,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(ref);
  const [inputValue, setInputValue] = useState(dayjs(month).format('YYYY-MM-DD'));
  const handleChangeDate = (date: Date) => {
    setInputValue(dayjs(date).format('YYYY-MM-DD'));
    onChange(date);
    buttonRef.current?.click();
  };

  return (
    <div className={clsx('common-input-container', containerClassName)} ref={ref}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <Popover className={'relative'}>
        <PopoverButton
          as="input"
          ref={buttonRef}
          placeholder={'YYYY/MM/DD'}
          className={'input-box'}
          value={inputValue}
        />
        <PopoverPanel
          className="absolute left-0 mt-1 z-10 bg-white shadow-lg rounded w-[300px] p-4 input-box"
          style={{ width }}
        >
          <DayPicker
            month={month}
            selected={month}
            onDayClick={handleChangeDate}
            mode="single"
            classNames={{
              today: 'bg',
              selected: 'bg-primary',
            }}
            locale={ko}
          />
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default DatePickerInput;
