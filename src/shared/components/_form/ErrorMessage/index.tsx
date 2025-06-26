import type { ChildrenProps } from '@/types/global';

const ErrorMessage: React.FC<ChildrenProps> = ({ children }) => {
  return <p className={'text-red-500 text-xs font-semibold absolute bottom-0'}>{children}</p>;
};

export default ErrorMessage;
