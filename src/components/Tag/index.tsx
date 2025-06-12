import clsx from 'clsx';

interface TagProps {
  title: string;
}

type TagUnionProps =
  | (TagProps & { isList?: false } & React.HTMLAttributes<HTMLDivElement>)
  | (TagProps & {
      isList: true;
    } & React.HTMLAttributes<HTMLLIElement>);

const Tag: React.FC<TagUnionProps> = ({ isList, title, className, ...props }) => {
  /* tailwindcss classes */
  const base = 'text-xs font-medium text-black/50 bg-background-secondary pl-3 pr-3 p-1 rounded-full';
  const dark = 'dark:text-white/60 dark:bg-black/50';

  if (isList)
    return (
      <li className={clsx(base, dark, className)} {...(props as React.HTMLAttributes<HTMLLIElement>)}>
        {title}
      </li>
    );

  return (
    <p className={clsx(base, dark, className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
      {title}
    </p>
  );
};

export default Tag;
