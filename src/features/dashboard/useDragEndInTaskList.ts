import { useContext } from 'react';
import { PointermoveContext } from '@shared/providers/PointermoveProvider/PointermoveContext.ts';
import type { DragEndEvent } from '@dnd-kit/core';
import { TASK_DROPPABLE_ID_PREFIX } from '@features/dashboard/constants.ts';
import { getPosYStr } from '@shared/utils/utils.ts';
import { useTaskStore } from '@stores/taskStore.ts';

export const useDragEndInTaskList = (callback?: () => void) => {
  const resortTask = useTaskStore(state => state.resortTask);
  const { position } = useContext(PointermoveContext);

  return (event: DragEndEvent) => {
    callback?.();
    const { active, over } = event;
    if (!over) return;

    if (over.id.toString().includes(TASK_DROPPABLE_ID_PREFIX)) {
      // list
      const status = over.data.current!.id;
      resortTask({
        fromId: active.id as string,
        status,
      });
    } else {
      if (!over.data.current) return;
      // item
      const overRect = over.rect;
      const posYStr = getPosYStr(position.y, overRect);
      resortTask({
        fromId: active.id as string,
        toId: over.id as string,
        status: over.data.current.status,
        posYStr,
      });
    }
  };
};
