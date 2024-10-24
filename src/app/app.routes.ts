import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('@feature/tasks').then((c) => c.TASKS_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
];
