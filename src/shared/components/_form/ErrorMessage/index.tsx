import type { ChildrenProps } from '@/types/component';

/**
 * 에러 메세지 컴포넌트
 * @param children
 * @constructor
 */
const ErrorMessage: React.FC<ChildrenProps> = ({ children }) => {
  return <p className={'text-red-500 text-xs font-semibold absolute bottom-0'}>{children}</p>;
};

export default ErrorMessage;
