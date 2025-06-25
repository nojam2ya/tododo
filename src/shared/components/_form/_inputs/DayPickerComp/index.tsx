import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useId, useRef, useState } from 'react';
import clsx from 'clsx';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import { useRefElementSize } from '@shared/hooks/useRefElementSize.ts';
import { DayPicker } from 'react-day-picker';
import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import Label from 'src/shared/components/_form/Label';

interface DatePickerInputProps extends InputProps {
  label?: string;
  selectedDate?: Date;
  onChange: (date: Date) => void;
}

const DayPickerComp: React.FC<DatePickerInputProps> = ({
  label,
  selectedDate,
  onChange,
  containerClassName,
  labelClassName,
  required,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useRefElementSize(ref);
  const [inputValue, setInputValue] = useState(dayjs(selectedDate).format(DATE_FORMAT));
  const handleChangeDate = (date: Date) => {
    setInputValue(dayjs(date).format(DATE_FORMAT));
    onChange(date);
    buttonRef.current?.click(); // 닫기
  };

  return (
    <div className={clsx('common-input-container', containerClassName)} ref={ref}>
      {label && (
        <Label htmlFor={id} required={required} className={labelClassName}>
          {label}
        </Label>
      )}
      <Popover className={'relative'}>
        <PopoverButton ref={buttonRef} className={'input-box cursor-pointer flex-between-center'}>
          {inputValue ?? DATE_FORMAT}
          <CalendarDaysIcon className={'w-5 h-5 text-primary'} />
        </PopoverButton>
        <PopoverPanel
          className="absolute left-0 mt-1 z-10 bg-white shadow-lg rounded w-[300px] p-4 input-box"
          style={{ width }}
        >
          <DayPicker
            selected={selectedDate}
            onDayClick={handleChangeDate}
            mode="single"
            classNames={{
              today: 'today-styles',
              button_next: 'button-styles',
              button_previous: 'button-styles',
              selected: 'selected-styles',
            }}
            locale={ko}
          />
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default DayPickerComp;
