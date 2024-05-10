import { inject } from '@angular/core';
import { Task } from '@models';
import { HotToastService } from '@ngneat/hot-toast';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TaskService } from '@services';
import { pipe, switchMap } from 'rxjs';

import { TaskState } from './task.state';

export function withTasksMethods() {
  return signalStoreFeature(
    { state: type<TaskState>() },
    withMethods(
      (
        store,
        taskService = inject(TaskService),
        hotToast = inject(HotToastService)
      ) => ({
        loadAllTasks: rxMethod<void>(
          pipe(
            switchMap(() => {
              patchState(store, { loading: true });

              return taskService.getTasks().pipe(
                tapResponse({
                  next: (tasks) => patchState(store, { tasks }),
                  error: console.error,
                  finalize: () => patchState(store, { loading: false }),
                })
              );
            })
          )
        ),

        async loadAllTasksByPromise() {
          patchState(store, { loading: true });
          const tasks = await taskService.getTasksAsPromise();
          patchState(store, { tasks, loading: false });
        },

        addTask: rxMethod<string>(
          pipe(
            switchMap((description) => {
              patchState(store, { loading: true });

              return taskService.addTask(description).pipe(
                tapResponse({
                  next: (res) => {
                    if (res.success) {
                      const addedTask: Task = {
                        id: res.id,
                        description,
                        completed: false,
                      };

                      patchState(store, {
                        tasks: [...store.tasks(), addedTask],
                      });

                      hotToast.success(res.message);
                    } else {
                      const { message, errors } = res;

                      hotToast.error(`
                        <strong>${message}</strong>
                        ${errors?.map((e) => `<p>${e}</p>`)}
                      `);
                    }
                  },
                  error: console.error,
                  finalize: () => patchState(store, { loading: false }),
                })
              );
            })
          )
        ),

        updateTask: rxMethod<Task>(
          pipe(
            switchMap((updatedTask) => {
              patchState(store, { loading: true });

              return taskService.updateTask(updatedTask).pipe(
                tapResponse({
                  next: (task) => {
                    const allTasks = [...store.tasks()];
                    const index = allTasks.findIndex(
                      (t) => t.id === updatedTask.id
                    );

                    allTasks[index] = updatedTask;

                    patchState(store, { tasks: allTasks });
                  },
                  error: console.error,
                  finalize: () => patchState(store, { loading: false }),
                })
              );
            })
          )
        ),

        deleteTask: rxMethod<Task>(
          pipe(
            switchMap((task) => {
              patchState(store, { loading: true });

              return taskService.deleteTask(task).pipe(
                tapResponse({
                  next: () => {
                    patchState(store, {
                      tasks: [...store.tasks().filter((t) => t.id !== task.id)],
                    });
                  },
                  error: console.error,
                  finalize: () => patchState(store, { loading: false }),
                })
              );
            })
          )
        ),
      })
    )
  );
}
