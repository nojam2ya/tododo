import type { Task } from '@/types/global';
import type { TaskStatusKey } from '@shared/constants/taskConstants.tsx';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { FULL_DATE_FORMAT } from '@shared/constants/constants.tsx';
import type { FromId, ToId } from '@stores/taskStore/taskStore.types.ts';
import { resortTask } from '@stores/taskStore/taskStore.service.ts';
import { v4 as uuidV4 } from 'uuid';

interface TaskStore {
  tasks: Task[]; // 작업 리스트
  getTasksByStatus: (status: TaskStatusKey) => Task[]; // 작업 상태별 작업 리스트 get 함수
  createTask: (task: Omit<Task, 'id' | 'createdDate' | 'updateDate'>) => Task; // 작업 생성 함수
  resortTask: (props: FromId | (FromId & ToId)) => void; // 작업 재정렬 함수
  deleteTask: (task: Task) => void; // 작업 삭제 함수
  updateTask: (task: Task) => void; // 작업 수정 함수
}

const isTest = process.env.NODE_ENV === 'test';

/* 작업 스토어 */
export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      /* 작업 리스트 */
      tasks: [],

      /* 작업 상태별 작업 리스트 get */
      getTasksByStatus: status => get().tasks.filter(task => task.status === status),

      /* 작업 생성 */
      createTask: task => {
        const now = dayjs().format(FULL_DATE_FORMAT);
        const newTask: Task = {
          ...task,
          id: uuidV4(),
          createdDate: now,
          updateDate: now,
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
        return newTask;
      },

      /* 작업 재정렬 */
      resortTask: props => {
        set(state => ({
          tasks: resortTask(state.tasks, props),
        }));
      },

      /* 작업 삭제 */
      deleteTask: task => {
        set(state => ({ tasks: state.tasks.filter(t => t.id !== task.id) }));
      },

      /* 작업 수정 */
      updateTask: task => {
        const now = dayjs().format(FULL_DATE_FORMAT);
        set(state => ({ tasks: state.tasks.map(t => (t.id !== task.id ? t : { ...task, updateDate: now })) }));
      },
    }),
    {
      name: 'task',
      storage: isTest ? undefined : createJSONStorage(() => localStorage),
    },
  ),
);
