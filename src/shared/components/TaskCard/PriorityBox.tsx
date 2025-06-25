import clsx from 'clsx';
import type { TaskPriorityKey } from '@shared/constants/taskConstants.tsx';

interface PriorityBoxProps {
  priority: TaskPriorityKey;
}

const PriorityBox: React.FC<PriorityBoxProps> = ({ priority }) => {
  /* tailwindcss classes */
  const base = 'text-xs font-bold w-fit border-solid rounded-full pl-2 pr-2 p-1';
  const types = {
    'high-tag': priority === 'high',
    'medium-tag': priority === 'medium',
    'low-tag': priority === 'low',
  };

  return <p className={clsx(base, types)}>{priority}</p>;
};

export default PriorityBox;
