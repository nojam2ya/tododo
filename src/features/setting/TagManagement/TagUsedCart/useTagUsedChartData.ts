import { useEffect, useState } from 'react';
import { useTagStore } from '@stores/tagStore';
import { useTaskStore } from '@stores/taskStore';
import { chain } from 'lodash';
import { SHOW_MAX_COUNT } from '@features/setting/TagManagement/TagUsedCart/TagUsedCart.constants.ts';

interface ChartData {
  labels: string[];
  data: number[];
}

export const useTagUsedChartData = () => {
  const [topUsed, setTopUsed] = useState<ChartData>();
  const [leastUsed, setLeastUsed] = useState<ChartData>();
  const tags = useTagStore(state => state.tags);
  const tasks = useTaskStore(state => state.tasks);

  useEffect(() => {
    if (!tags.length || !tasks.length) return;

    const used = tags.map(tag => ({
      title: tag.title,
      count: tasks.filter(task => task.tags.includes(tag.id)).length,
    }));

    const topUsed = chain(used).orderBy('count', 'desc').take(SHOW_MAX_COUNT).value();
    const leastUsed = chain(used).orderBy('count', 'asc').take(SHOW_MAX_COUNT).value();

    setTopUsed({ labels: topUsed.map(t => t.title), data: topUsed.map(t => t.count) });
    setLeastUsed({ labels: leastUsed.map(l => l.title), data: leastUsed.map(t => t.count) });
  }, [tags, tasks]);

  return {
    topUsed,
    leastUsed,
  };
};
