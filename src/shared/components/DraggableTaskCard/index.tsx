import TaskCard from '@components/TaskCard';
import type { Task } from '@/types/global';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface DraggableTaskCardProps {
  draggableId: string;
  task: Task;
}

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({ draggableId, task }) => {
  const { attributes, listeners, setNodeRef: setDragRef, transform } = useDraggable({ id: draggableId, data: task });
  const { isOver, setNodeRef: setDropRef } = useDroppable({ id: draggableId, data: task });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    borderTop: isOver ? '4px solid #5a5ad3' : undefined,
  };

  // 드래그와 드롭 ref를 같이 연결
  const setNodeRef = (el: HTMLLIElement | null) => {
    if (el) {
      setDragRef(el);
      setDropRef(el);
    }
  };

  return <TaskCard task={task} ref={setNodeRef} style={style} {...listeners} {...attributes} />;
};

export default DraggableTaskCard;
