import type { ChildrenProps } from '@/types/component';

const CardLargeTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <h5 className={'font-bold text-lg'}>{children}</h5>;
};

export default CardLargeTitle;
