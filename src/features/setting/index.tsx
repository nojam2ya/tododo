import Tabs from '@shared/components/Tabs';
import { SETTINGS_TABS } from '@features/setting/setting.constants.tsx';

const SettingPage = () => {
  return (
    <Tabs className={'h-full'}>
      <Tabs.TabList>
        {SETTINGS_TABS.map(tab => (
          <Tabs.TabList.Item key={tab.title}>
            {tab.icon} {tab.title}
          </Tabs.TabList.Item>
        ))}
      </Tabs.TabList>
      <Tabs.Panels>
        {SETTINGS_TABS.map(({ title, Component }) => (
          <Tabs.Panels.Item key={title}>
            <Component />
          </Tabs.Panels.Item>
        ))}
      </Tabs.Panels>
    </Tabs>
  );
};

export default SettingPage;
