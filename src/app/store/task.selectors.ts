import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';

import { TaskState } from './task.state';

export function withTaskSelectors() {
  return signalStoreFeature(
    { state: type<TaskState>() },
    withComputed(({ tasks }) => ({
      completedCount: computed(() => tasks().filter((t) => t.completed).length),
      pendingCount: computed(() => tasks().filter((t) => !t.completed).length),
      totalCount: computed(() => tasks().length),
      percentageCount: computed(() => {
        const completed = tasks().filter((t) => t.completed).length;
        const total = tasks().length;

        if (total === 0) return 0;

        const perc = (completed / total) * 100;

        return Math.ceil(perc);
      }),
    }))
  );
}
