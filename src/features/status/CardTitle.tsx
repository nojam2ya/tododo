import type { ChildrenProps } from '@/types/component';

const CardTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <h5 className={'text-sm text-gray-500'}>{children}</h5>;
};

export default CardTitle;
