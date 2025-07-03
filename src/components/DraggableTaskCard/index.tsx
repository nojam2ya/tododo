import TaskCard from '@shared/components/TaskCard';
import type { Task } from '@/types/global';
import { useSortable } from '@dnd-kit/sortable';
import { useRectPosYStrWithContext } from '@shared/providers/PointermoveProvider/usePointermoveContext.ts';
import { type FC, memo, useMemo, useRef } from 'react';

interface DraggableTaskCardProps {
  draggableId: string; // 드래그 아이디
  task: Task; // 작업
}

/**
 * 드래그 가능한 작업 카드 컴포넌트
 * @param draggableId - 드래그 아이디
 * @param task - 작업
 */
const DraggableTaskCard: FC<DraggableTaskCardProps> = ({ draggableId, task }) => {
  const { isDragging, isOver, setNodeRef, listeners, attributes } = useSortable({
    id: draggableId,
    data: task,
  });

  const ref = useRef<HTMLLIElement | null>(null);

  // DOM 위치 기반으로 드래그 시 top/bottom 경계 판단 (drop 위치 가이드용)
  const posYStr = useRectPosYStrWithContext(ref, isOver); // 'top' | 'bottom'

  const style = useMemo(
    () => ({
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

export default memo(DraggableTaskCard);
