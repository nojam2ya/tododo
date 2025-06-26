import * as React from 'react';
import { useId } from 'react';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import clsx from 'clsx';
import Label from '@shared/components/_form/Label';
import ErrorMessage from '@shared/components/_form/ErrorMessage';

type TextAreaProps = InputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({
  labelClassName,
  label,
  containerClassName,
  className,
  required,
  error,
  ...textAreaAttrs
}) => {
  const id = useId();

  return (
    <div className={clsx('common-input-container relative', containerClassName)}>
      {label && (
        <Label htmlFor={id} required={required} className={labelClassName}>
          {label}
        </Label>
      )}
      <textarea id={id} className={clsx('resize-none min-h-[80px]', className)} {...textAreaAttrs} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default TextArea;
