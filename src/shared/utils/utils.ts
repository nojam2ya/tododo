import { type Modifier } from '@dnd-kit/core';
import { TASK_PRIORITY, type TaskPriorityKey } from '@shared/constants/taskConstants.tsx';
import clsx from 'clsx';

export const createBoundaryModifier = (boundaryRef: React.RefObject<HTMLElement | null>): Modifier => {
  return ({ transform, draggingNodeRect }) => {
    if (!boundaryRef.current || !draggingNodeRect) return transform;

    const boundaryRect = boundaryRef.current.getBoundingClientRect();

    const newTop = draggingNodeRect.top + transform.y;
    const newBottom = draggingNodeRect.bottom + transform.y;
    const newLeft = draggingNodeRect.left + transform.x;
    const newRight = draggingNodeRect.right + transform.x;

    let x = transform.x;
    let y = transform.y;

    if (newTop < boundaryRect.top) {
      y = boundaryRect.top - draggingNodeRect.top;
    }
    if (newBottom > boundaryRect.bottom) {
      y = boundaryRect.bottom - draggingNodeRect.bottom;
    }
    if (newLeft < boundaryRect.left) {
      x = boundaryRect.left - draggingNodeRect.left;
    }
    if (newRight > boundaryRect.right) {
      x = boundaryRect.right - draggingNodeRect.right;
    }

    return { ...transform, x, y };
  };
};

export const getPosYStr = (clientY: number, rect: { top: number; height: number }): 'top' | 'bottom' => {
  const midY = rect.top + rect.height / 2; // half top or half bottom
  return clientY < midY ? 'top' : 'bottom';
};

export const getPriorityStyle = (
  key: TaskPriorityKey,
  targetStyle: {
    text?: boolean;
    bg?: boolean;
    border?: boolean;
    tag?: boolean;
  },
): string => {
  const { text, border, bg, tag } = targetStyle;
  switch (key) {
    case TASK_PRIORITY.HIGH:
      return clsx({
        'high-text': text,
        'high-bg': bg,
        'high-border': border,
        'high-tag': tag,
      });
    case TASK_PRIORITY.MEDIUM:
      return clsx({
        'medium-text': text,
        'medium-bg': bg,
        'medium-border': border,
        'medium-tag': tag,
      });
    case TASK_PRIORITY.LOW:
      return clsx({
        'low-text': text,
        'low-bg': bg,
        'low-border': border,
        'low-tag': tag,
      });
    default:
      return '';
  }
};
