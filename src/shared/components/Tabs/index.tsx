import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Children, type FC, Suspense, useRef } from 'react';
import type { ChildrenProps, ClassNameProps } from '@/types/component';
import clsx from 'clsx';
import { useEqualTabWidth } from '@shared/components/Tabs/useEqualTabWidth.ts';
import Skeleton from 'react-loading-skeleton';

const TabListItem: FC<ChildrenProps> = ({ children }) => {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          'flex-center-center gap-2 flex-1 min-w-0 p-2 rounded-md transition-colors duration-300 font-semibold ',
          'focus:ring-0',
          selected && 'text-primary outline-none ring-0',
          selected ? 'dark:text-primary-light' : 'text-gray-400 dark:text-gray-500',
        )
      }
    >
      {children}
    </Tab>
  );
};

const TabListComp: FC<ChildrenProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const tabCount = Children.count(children);
  const tabWidth = useEqualTabWidth(ref, tabCount);

  return (
    <TabList
      ref={ref}
      className={clsx('flex relative pb-2 border-solid border-b border-b-gray-200', 'dark:border-b-gray-600')}
    >
      {({ selectedIndex }) => (
        <>
          {children}
          <span
            className={clsx(
              'h-[3px] bg-primary absolute bottom-0 left-0 transition-transform duration-300',
              'dark:bg-primary-light',
            )}
            style={{
              width: `${tabWidth}px`,
              transform: `translateX(${tabWidth * selectedIndex}px)`,
            }}
          />
        </>
      )}
    </TabList>
  );
};

const TabPanelsItem: FC<ChildrenProps> = ({ children }) => {
  return (
    <TabPanel>
      <Suspense
        fallback={
          <>
            <Skeleton className={'h-10 mb-4'} />
            <Skeleton count={5} />
          </>
        }
      >
        {children}
      </Suspense>
    </TabPanel>
  );
};

const TabPanelsComp: FC<ClassNameProps & ChildrenProps> = ({ className, children }) => {
  return <TabPanels className={clsx('scroll-container flex-grow', className)}>{children}</TabPanels>;
};

const TabWrapComp: FC<ClassNameProps & ChildrenProps> = ({ className, children }) => {
  return <TabGroup className={clsx('flex flex-col gap-2', className)}>{children}</TabGroup>;
};

type PanelsType = typeof TabPanelsComp & { Item: typeof TabPanelsItem };
type TabListType = typeof TabListComp & { Item: typeof TabListItem };
type Tabs = typeof TabWrapComp & {
  TabList: TabListType;
  Panels: PanelsType;
};

const Tabs = TabWrapComp as Tabs;
Tabs.TabList = TabListComp as TabListType;
Tabs.TabList.Item = TabListItem;
Tabs.Panels = TabPanelsComp as PanelsType;
Tabs.Panels.Item = TabPanelsItem;

export default Tabs;
