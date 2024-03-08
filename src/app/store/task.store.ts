import { signalStore, withHooks, withState } from '@ngrx/signals';

import { withTasksMethods } from './task.methods';
import { withTaskSelectors } from './task.selectors';
import { initialState } from './task.state';

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withTaskSelectors(),
  withTasksMethods(),
  withHooks({
    onInit({ loadAllTasksByPromise: loadAllTasksByPromise }) {
      console.log('on init');

      loadAllTasksByPromise();
    },

    onDestroy() {
      console.log('on destroy');
    },
  })
);
