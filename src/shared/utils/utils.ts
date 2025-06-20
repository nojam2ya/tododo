import { type Modifier } from '@dnd-kit/core';

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
  const midY = rect.top + rect.height / 2;
  return clientY < midY ? 'top' : 'bottom';
};
