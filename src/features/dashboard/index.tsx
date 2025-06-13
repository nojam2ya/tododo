import TaskStatusList from '@features/dashboard/TaskStatusList.tsx';
import { useTaskStore } from '@stores/taskStore.ts';
import { TASK_STATUS } from '@/shared/constants/taskConstants.tsx';

const DashboardPage = () => {
  const getTasksByStatus = useTaskStore(state => state.getTasksByStatus);

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('inProgress');
  const completedTasks = getTasksByStatus('completed');

  return (
    <TaskStatusList>
      <TaskStatusList.TaskStatusItem title={TASK_STATUS.TO_DO.TITLE} tasks={todoTasks} />
      <TaskStatusList.TaskStatusItem title={TASK_STATUS.IN_PROGRESS.TITLE} tasks={inProgressTasks} />
      <TaskStatusList.TaskStatusItem title={TASK_STATUS.COMPElTED.TITLE} tasks={completedTasks} />
    </TaskStatusList>
  );
};

export default DashboardPage;
