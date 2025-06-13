import CardTitle from '@features/status/CardTitle.tsx';

interface CardProps {
  title: React.ReactNode;
  content: string;
  footer: React.ReactNode;
}

const ValueCard: React.FC<CardProps> = ({ content, footer, title }) => {
  return (
    <div className={'card-base'}>
      <CardTitle>{title}</CardTitle>
      <p className={'font-bold text-2xl mt-1.5'}>{content}</p>
      <p className={'text-sm  text-gray-500'}>{footer}</p>
    </div>
  );
};

export default ValueCard;
