import type { WorkStatus } from '@/types/global';
import WorkStatusList from '@features/dashboard/WorkStatusList.tsx';

const data: WorkStatus[] = [
  {
    type: 'To do',
    works: [
      {
        id: '1',
        title: 'Design new landing page',
        content: 'Create wireframes and mockups for the new landing page',
        date: '2025-12-15',
        tags: ['Design', 'UI/UX'],
        importance: 'medium',
      },
      {
        id: '2',
        title: 'Set up authentication',
        content: 'Implement user login and registration system',
        date: '2025-12-15',
        tags: ['Backend', 'Auth'],
        importance: 'high',
      },
      {
        id: '3',
        title: 'Design new landing page',
        content: 'Create wireframes and mockups for the new landing page',
        date: '2025-12-15',
        tags: ['Design', 'UI/UX'],
        importance: 'low',
      },
    ],
  },
  {
    type: 'In progress',
    works: [
      {
        id: '1',
        title: 'Implement user dashboard',
        content: 'Build the main dashboard with analytics and user data',
        date: '2025-12-15',
        tags: ['Frontend', 'Dashboard'],
        importance: 'medium',
      },
      {
        id: '2',
        title: 'Database optimization',
        content: 'Optimize database queries and add proper indexing\n' + '\n',
        date: '2025-12-14',
        tags: ['Design', 'UI/UX'],
        importance: 'high',
      },
      {
        id: '3',
        title: 'Design new landing page',
        content: 'Create wireframes and mockups for the new landing page',
        date: '2025-12-12',
        tags: ['Design', 'UI/UX'],
        importance: 'low',
      },
    ],
  },
  {
    type: 'Completed',
    works: [
      {
        id: '1',
        title: 'Project setup',
        content: 'Initialize project structure and dependencies',
        date: '2025-12-01',
        tags: ['Setup'],
        importance: 'medium',
      },
      {
        id: '2',
        title: 'Design system',
        content: 'Create component library and design tokens',
        date: '2025-12-05',
        tags: ['Design', 'UI/UX'],
        importance: 'high',
      },
    ],
  },
];

const DashboardPage = () => {
  return (
    <WorkStatusList>
      {data.map(workStatus => (
        <WorkStatusList.WorkStatusItem title={workStatus.type} works={workStatus.works} />
      ))}
    </WorkStatusList>
  );
};

export default DashboardPage;
