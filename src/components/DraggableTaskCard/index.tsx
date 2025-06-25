import TaskCard from '@shared/components/TaskCard';
import type { Task } from '@/types/global';
import { useSortable } from '@dnd-kit/sortable';
import { useRectPosYStrWithContext } from '@shared/providers/PointermoveProvider/usePointermoveContext.ts';
import { useMemo, useRef } from 'react';

interface DraggableTaskCardProps {
  draggableId: string;
  task: Task;
}

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({ draggableId, task }) => {
  const { isDragging, isOver, setNodeRef, listeners, attributes } = useSortable({
    id: draggableId,
    data: task,
  });

  const ref = useRef<HTMLLIElement | null>(null);

  const posYStr = useRectPosYStrWithContext(ref, isOver);

  const style = useMemo(
    () => ({
      // visibility: isDragging ? 'hidden' : undefined,
      opacity: isDragging ? '.3' : undefined,
      borderTop: isOver && posYStr === 'top' ? '4px solid #5a5ad3' : undefined,
      borderBottom: isOver && posYStr === 'bottom' ? '4px solid #5a5ad3' : undefined,
      transition: isDragging ? 'none' : undefined,
    }),
    [isOver, isDragging, posYStr],
  );

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
