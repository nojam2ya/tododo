import { forwardRef, useId } from 'react';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import clsx from 'clsx';
import Label from '@shared/components/_form/Label';
import ErrorMessage from '@shared/components/_form/ErrorMessage';

type TextInputProps = InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * input 컴포넌트
 * @param label
 * @param labelClassName
 * @param containerClassName
 * @param required
 * @param error
 * @param inputAttrs
 * @constructor
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, labelClassName, containerClassName, required, error, ...inputAttrs }, ref) => {
    const id = useId();
    return (
      <div className={clsx('common-input-container relative', containerClassName)}>
        {label && (
          <Label htmlFor={id} required={required} className={labelClassName}>
            {label}
          </Label>
        )}
        <input ref={ref} id={id} type="text" {...inputAttrs} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

export default TextInput;
