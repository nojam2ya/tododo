import type { Task } from '@/types/global';
import TaskItemHeader from './TaskItemHeader.tsx';
import TaskItemFooter from './TaskItemFooter.tsx';
import { forwardRef, memo, useContext } from 'react';
import clsx from 'clsx';
import { useTagStore } from '@stores/tagStore.ts';
import { useTaskStore } from '@stores/taskStore.ts';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';

interface TaskCardProps extends React.HTMLAttributes<HTMLLIElement> {
  task: Task;
}

const TaskCard = memo(
  forwardRef<HTMLLIElement, TaskCardProps>(({ task, className, ...props }, ref) => {
    const { open } = useContext(OverlayPopupDispatchContext);
    const tagMap = useTagStore(state => state.getTagMap)();
    const deleteTask = useTaskStore(state => state.deleteTask);
    const handleDelete = () => {
      deleteTask(task);
    };
    const handleEdit = () => {
      open({ key: 'EDIT_TASK_POPUP', props: { status: task.status, task } });
    };
    return (
      <li className={clsx('card-base card-hover flex flex-col gap-2', className)} {...props} ref={ref}>
        <TaskItemHeader title={task.title} onClickEdit={handleEdit} onClickDelete={handleDelete} />
        <p className={'opacity-70 text-sm font-light'}>{task.content}</p>
        <ul className={'flex gap-1'}>
          {task.tags.map(tagId => (
            <li className={'tag'} key={tagId}>
              {tagMap.get(tagId)?.title}
            </li>
          ))}
        </ul>
        <TaskItemFooter priority={task.priority} date={task.date} />
      </li>
    );
  }),
);

export default TaskCard;
