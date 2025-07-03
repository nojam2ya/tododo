import { useInitAndCreatedDataList } from '@shared/hooks/useInitAndCreatedDataList.ts';
import type { NewTag, Tag, Task } from '@/types/global';
import { type SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@shared/constants/constants.tsx';
import { useContext } from 'react';
import { OverlayPopupDispatchContext } from '@shared/providers/OverlayPopupProvider/OverlayPopupProvider.context.ts';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import type { NewTask } from '@components/EditTaskPopup/EditTaskPopup.types.ts';
import { useTaskStore } from '@stores/taskStore';
import { useTagStore } from '@stores/tagStore';

/**
 * 작업 추가/수정 form 훅
 * @param status - 작업 상태
 * @param task - 작업
 */
export const useEditTaskForm = (status: TaskStatusKey, task?: Task) => {
  const { close } = useContext(OverlayPopupDispatchContext); // 팝업 닫기 함수

  const createTask = useTaskStore(state => state.createTask); // 작업 생성 함수
  const updateTask = useTaskStore(state => state.updateTask); // 작업 수정 함수

  const tags = useTagStore(state => state.tags); // 태그 리스트
  const createTag = useTagStore(state => state.createTag); // 태그 생성 함수

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTask | Task>({
    defaultValues: task
      ? task // task 파라미터가 있으면 -> 수정
      : {
          priority: 'low',
          date: dayjs().format(DATE_FORMAT),
          status,
        }, // task 파라미터가 없으면 -> 추가 (task id X)
  });

  const {
    dataList: selectedTags, // 선택된 태그
    addData: addTag, // 태그 추가 함수
    removeData: removeTag, // 태그 삭제 함수
    createData: createTempTag, // 임시 태그 생성 함수
  } = useInitAndCreatedDataList({
    allDataList: tags as (NewTag | Tag)[],
    idName: 'id',
    labelName: 'title',
    initIds: task?.tags,
  });

  const onValid: SubmitHandler<NewTask | Task> = data => {
    const tags = [];

    for (const tag of selectedTags) {
      // 기존 태그 추가
      if ('id' in tag && tag.id) {
        tags.push(tag.id);
      }
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
      updateTask({ id: task.id, ...nextTask }); // 작업 수정
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
