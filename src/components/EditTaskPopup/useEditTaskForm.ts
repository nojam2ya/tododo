import { useInitAndCreatedDataList } from '@shared/hooks/useInitAndCreatedDataList.ts';
import type { Task, TempTag } from '@/types/global';
import { type SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import { useTaskStore } from '@stores/taskStore.ts';
import { useTagStore } from '@stores/tagStore.ts';
import { useContext } from 'react';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import type { AddFormTask } from '@components/EditTaskPopup/EditTaskPopup.types.ts';

export const useEditTaskForm = (status: TaskStatusKey, task?: Task) => {
  const { close } = useContext(OverlayPopupDispatchContext);
  const createTask = useTaskStore(state => state.createTask);
  const updateTask = useTaskStore(state => state.updateTask);
  const tags = useTagStore(state => state.tags);
  const createTag = useTagStore(state => state.createTag);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormTask>({
    defaultValues: task
      ? task
      : {
          priority: 'low',
          date: dayjs().format(DATE_FORMAT),
          status,
        },
  });

  const {
    dataList: selectedTags,
    addData: addTag,
    removeData: removeTag,
    createData: createTempTag,
  } = useInitAndCreatedDataList({
    allDataList: tags as TempTag[],
    idName: 'id',
    labelName: 'title',
    initIds: task?.tags,
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

    const nextTask = { ...data, tags };

    if (!task) {
      createTask(nextTask); // 작업 생성
    } else {
      updateTask({ id: task.id, ...nextTask });
    }

    close(); // 닫기
  };

  return {
    handleSubmit: handleSubmit(onValid),
    register,
    control,
    errors,
    selectedTags,
    addTag,
    removeTag,
    createTempTag,
  };
};
