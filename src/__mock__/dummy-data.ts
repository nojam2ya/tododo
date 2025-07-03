import { generateTag, generateTask } from './factories';

export const dummyTags = Array.from({ length: 7 }, () => generateTag());
export const dummyTasks = Array.from({ length: 10 }, () => generateTask(dummyTags));
