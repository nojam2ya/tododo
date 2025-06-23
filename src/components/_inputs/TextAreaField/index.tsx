import { useId } from 'react';
import type { FieldProps } from '@components/_inputs/_inputs.types.ts';
import clsx from 'clsx';

type TextAreaField = FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaField: React.FC<TextAreaField> = ({
  labelClassName,
  label,
  containerClassName,
  className,
  ...textAreaAttrs
}) => {
  const id = useId();

  return (
    <div className={clsx('common-input-container', containerClassName)}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <textarea id={id} className={clsx('resize-none min-h-[80px]', className)} {...textAreaAttrs} />
    </div>
  );
};

export default TextAreaField;
