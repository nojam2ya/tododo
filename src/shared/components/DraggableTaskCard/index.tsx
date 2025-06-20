import TaskCard from '@components/TaskCard';
import type { Task } from '@/types/global';
import { useSortable } from '@dnd-kit/sortable';
import { useRectPosStrWithContext } from '@/shared/providers/PointermoveProvider/usePointermoveContext.ts';

interface DraggableTaskCardProps {
  draggableId: string;
  task: Task;
}

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({ draggableId, task }) => {
  const { isDragging, isOver, setNodeRef, listeners, attributes } = useSortable({
    id: draggableId,
    data: task,
  });

  const { posStr, ref } = useRectPosStrWithContext(isOver);

  const style = {
    // visibility: isDragging ? 'hidden' : undefined,
    opacity: isDragging ? '.3' : undefined,
    borderTop: isOver && posStr === 'top' ? '4px solid #5a5ad3' : undefined,
    borderBottom: isOver && posStr === 'bottom' ? '4px solid #5a5ad3' : undefined,
    transition: isDragging ? 'none' : undefined,
  };

  return (
    <TaskCard
      task={task}
      ref={el => {
        setNodeRef(el);
        ref.current = el;
      }}
      data-id={draggableId}
      style={style}
      {...listeners}
      {...attributes}
    />
  );
};

export default DraggableTaskCard;
