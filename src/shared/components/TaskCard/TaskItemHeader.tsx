import MoreButton from 'src/shared/components/_buttons/MoreButton';

interface TaskItemHeaderProps {
  title: string;
}

const TaskItemHeader: React.FC<TaskItemHeaderProps> = ({ title }) => {
  return (
    <div className={'flex-between-center'}>
      <h6 className={'font-semibold'}>{title}</h6>
      <MoreButton type="button" aria-label="더보기" />
    </div>
  );
};

export default TaskItemHeader;
