// tests/DraggableTaskCard.test.tsx
import { render } from '@testing-library/react';
import DraggableTaskCard from '@/components/DraggableTaskCard';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    isDragging: false,
    isOver: false,
    setNodeRef: vi.fn(),
    listeners: {},
    attributes: {},
  }),
}));

describe('DraggableTaskCard', () => {
  it('renders without crashing', () => {
    const task = { id: '1', title: 'Test Task', tags: [] } as any;
    const { getByText } = render(<DraggableTaskCard draggableId="task-1" task={task} />);
    // @ts-expect-error
    expect(getByText('Test Task')).toBeInTheDocument();
  });
});
