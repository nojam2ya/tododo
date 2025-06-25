import * as React from 'react';
import { useId } from 'react';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import clsx from 'clsx';
import Label from '@shared/components/_form/Label';

type TextAreaProps = InputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({
  labelClassName,
  label,
  containerClassName,
  className,
  required,
  ...textAreaAttrs
}) => {
  const id = useId();

  return (
    <div className={clsx('common-input-container', containerClassName)}>
      {label && (
        <Label htmlFor={id} required={required} className={labelClassName}>
          {label}
        </Label>
      )}
      <textarea id={id} className={clsx('resize-none min-h-[80px]', className)} {...textAreaAttrs} />
    </div>
  );
};

export default TextArea;
