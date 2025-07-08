import FilterPanel from '@features/setting/TaskManagement/FilterPanel.tsx';

const TaskManagement = () => {
  return (
    <div className={'flex gap-2'}>
      <FilterPanel className={'w-1/4'} />
      <div className={'flex-grow'}></div>
    </div>
  );
};

export default TaskManagement;
