import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';

import { Task } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskList: Task[] = [
    { id: '1', value: 'Learn NgRx/SignalStore', completed: true },
    { id: '2', value: 'Read a book', completed: true },
    { id: '3', value: 'Learn Angular', completed: false },
  ];

  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(this.taskList);
  }

  getTasksAsPromise() {
    return lastValueFrom(this.getTasks());
  }

  getTask(id: string): Observable<Task | undefined> {
    const task = this.taskList.find((t) => t.id === id);
    return of(task);
  }

  addTask(value: string): Observable<Task> {
    const newtask: Task = {
      id: (this.taskList.length + 1).toString(),
      value,
      completed: false,
    };

    this.taskList = [...this.taskList, newtask];

    return of(newtask);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const index = this.taskList.findIndex((t) => t.id === updatedTask.id);

    if (index !== -1) {
      this.taskList[index] = updatedTask;
    }

    return of(updatedTask);
  }

  deleteTask(task: Task): Observable<Task> {
    this.taskList = [...this.taskList.filter((t) => t.id !== task.id)];

    return of(task);
  }
}
