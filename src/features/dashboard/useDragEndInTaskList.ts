import { useContext } from 'react';
import { PointermoveProviderContext } from '@shared/providers/PointermoveProvider/PointermoveProvider.context.ts';
import type { DragEndEvent } from '@dnd-kit/core';
import { TASK_DROPPABLE_ID_PREFIX } from '@features/dashboard/dashboard.constants.ts';
import { getPosYStr } from '@shared/utils/utils.ts';

import { useTaskStore } from '@stores/taskStore';

/**
 * 작업 카드 드래그 종료 이벤트 핸들러 함수 훅
 * @param callback
 */
export const useDragEndInTaskList = (callback?: () => void) => {
  const resortTask = useTaskStore(state => state.resortTask); // 작업 재정렬
  const { position } = useContext(PointermoveProviderContext); // 마지막 pointermove 좌표

  return ({ active, over }: DragEndEvent) => {
    callback?.();

    if (
      !over || // 유효하지 않은 범위에 있는 경우
      active.id === over.id // 드래그 이동이 없는 경우
    )
      return;

    // 작업 리스트 영역에 드롭
    if (over.id.toString().includes(TASK_DROPPABLE_ID_PREFIX)) {
      const status = over.data.current!.id;
      resortTask({
        fromId: active.id as string,
        status,
      });
      return;
    }

    if (!over.data.current) return;

    // 다른 작업 영역에 드롭
    const overRect = over.rect;
    const posYStr = getPosYStr(position.y, overRect); // 오버된 작업 영역의 위, 아래 여부('top' | 'bottom')
    resortTask({
      fromId: active.id as string,
      toId: over.id as string,
      status: over.data.current.status,
      posYStr,
    });
  };
};
