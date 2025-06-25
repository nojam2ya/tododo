import clsx from 'clsx';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ required, children, className, ...labelProps }) => {
  return (
    <label {...labelProps} className={clsx('font-semibold break-keep', className)}>
      {children}
      {required && <span className={'inline-flex text-red-500 justify-center items-center w-4 h-4'}>*</span>}
    </label>
  );
};

export default Label;
