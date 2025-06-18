import TaskCard from '@components/TaskCard';
import { useDraggable } from '@dnd-kit/core';
import type { Task } from '@/types/global';
import clsx from 'clsx';

interface DraggableTaskCardProps {
  draggableId: string;
  task: Task;
}

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({ draggableId, task }) => {
  const { attributes, listeners, setNodeRef, transform, over } = useDraggable({
    id: draggableId,
    data: task,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  console.log(over);
  return (
    <TaskCard
      task={task}
      ref={setNodeRef}
      className={clsx(transform ? `transform translate-x-[${transform.x}px] translate-y-[${transform.y}px]` : '')}
      {...listeners}
      {...attributes}
    />
  );
};

export default DraggableTaskCard;
