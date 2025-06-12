import MoreButton from '@components/_buttons/MoreButton';

interface WorkItemHeaderProps {
  title: string;
}

const WorkItemHeader: React.FC<WorkItemHeaderProps> = ({ title }) => {
  return (
    <div className={'flex-between-center'}>
      <h6 className={'font-semibold'}>{title}</h6>
      <MoreButton type="button" aria-label="더보기" />
    </div>
  );
};

export default WorkItemHeader;
