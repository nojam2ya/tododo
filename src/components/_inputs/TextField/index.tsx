import { useId } from 'react';
import type { FieldProps } from '@components/_inputs/_inputs.types.ts';
import clsx from 'clsx';

type TextFieldProps = FieldProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const TextField: React.FC<TextFieldProps> = ({ label, labelClassName, containerClassName, ...inputAttrs }) => {
  const id = useId();
  return (
    <div className={clsx('common-input-container', containerClassName)}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input id={id} type="text" {...inputAttrs} />
    </div>
  );
};

export default TextField;
