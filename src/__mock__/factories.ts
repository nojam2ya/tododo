// 랜덤 Tag 생성기
import type { Tag, Task } from '@/types/global';
import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { faker } from '@faker-js/faker/locale/ko';
import { TASK_PRIORITY, TASK_STATUS } from '@shared/constants/taskConstants.tsx';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';

export const generateTag = (): Tag => {
  const now = dayjs().format('YYYY-MM-DD');
  return {
    id: uuidV4(),
    title: faker.commerce.department(), // 예: "Electronics"
    createdDate: now,
    updateDate: now,
  };
};

// 랜덤 Task 생성기
export const generateTask = (tags: Tag[]): Task => {
  const now = dayjs().format(DATE_FORMAT);
  const shuffled = faker.helpers.shuffle(tags.map(t => t.id));
  const tagCount = faker.number.int({ min: 1, max: 3 });

  return {
    id: uuidV4(),
    status: faker.helpers.arrayElement(Object.values(TASK_STATUS)),
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    date: now,
    tags: shuffled.slice(0, tagCount),
    priority: faker.helpers.arrayElement(Object.values(TASK_PRIORITY)),
    createdDate: now,
    updateDate: now,
  };
};
