import TextInput from '@shared/components/_form/_inputs/TextInput';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTagStore } from '@stores/tagStore';
import { useTaskStore } from '@stores/taskStore';
import flatColors from 'nice-color-palettes';

const flatColorList = flatColors.flat(); // string[]

const TagManagement = () => {
  const [query, setQuery] = useState('');

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const tags = useTagStore(state => state.tags);
  const tasks = useTaskStore(state => state.tasks);

  useEffect(() => {
    if (tags.length) {
      const newLabels = [];
      const newData = [];
      for (const tag of tags) {
        const count = tasks.filter(t => t.tags.includes(tag.id)).length;
        newLabels.push(tag.title);
        newData.push(count);
      }

      setLabels(newLabels);
      setData(newData);
    }
  }, [tags, tasks]);

  return (
    <div className={'flex'}>
      <div className={'flex-grow'}>
        <TextInput onChange={e => setQuery(e.currentTarget.value)} value={query} />
      </div>
      <div className={'w-1/3 p-2'}>
        {data.length && (
          <Bar
            className={'w-full h-[120px]'}
            data={{
              labels: labels,
              datasets: [
                {
                  label: '# of Votes',
                  data: data,
                  borderWidth: 1,
                  backgroundColor: labels.map((_, i) => flatColorList[i]),
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
              animation: {
                duration: 500,
                easing: 'easeOutQuart',
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TagManagement;
