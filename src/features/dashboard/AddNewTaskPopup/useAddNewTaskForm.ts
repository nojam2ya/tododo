import { useInitAndCreatedDataList } from '@shared/hooks/useInitAndCreatedDataList.ts';
import type { Task, TempTag } from '@/types/global';
import { type SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import { useTaskStore } from '@stores/taskStore.ts';
import { useTagStore } from '@stores/tagStore.ts';

type AddFormTask = Omit<Task, 'id' | 'tags'>;

export const useAddNewTaskForm = (close: () => void) => {
  const createTask = useTaskStore(state => state.createTask);
  const tags = useTagStore(state => state.tags);
  const createTag = useTagStore(state => state.createTag);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormTask>({
    defaultValues: {
      priority: 'low',
      date: dayjs().format(DATE_FORMAT),
      status,
    },
  });

  const {
    dataList: selectedTags,
    addData,
    removeData,
    createData,
  } = useInitAndCreatedDataList({
    allDataList: tags as TempTag[],
    idName: 'id',
    labelName: 'title',
  });

  const onValid: SubmitHandler<AddFormTask> = data => {
    const tags = [];

    for (const tag of selectedTags) {
      // 기존 태그 추가
      if (tag?.id) tags.push(tag.id);
      // 새 태그 추가
      else {
        const newTag = createTag(tag.title);
        if (newTag) tags.push(newTag.id);
      }
    }

    createTask({ ...data, tags }); // 작업 생성
    close(); // 닫기
  };

  return {};
};
