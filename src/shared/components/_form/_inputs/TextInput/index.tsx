import { useId } from 'react';
import type { InputProps } from '@shared/components/_form/_form.types.ts';
import clsx from 'clsx';
import Label from 'src/shared/components/_form/Label';
import ErrorMessage from '@shared/components/_form/ErrorMessage';

type TextInputProps = InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const TextInput: React.FC<TextInputProps> = ({
  label,
  labelClassName,
  containerClassName,
  required,
  error,
  ...inputAttrs
}) => {
  const id = useId();
  return (
    <div className={clsx('common-input-container relative', containerClassName)}>
      {label && (
        <Label htmlFor={id} required={required} className={labelClassName}>
          {label}
        </Label>
      )}
      <input id={id} type="text" {...inputAttrs} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default TextInput;
