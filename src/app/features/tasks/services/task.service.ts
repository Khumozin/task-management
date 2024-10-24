import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';

import { CreateApiResponse, Task } from '../../tasks/models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly #URL = environment.apiUrl;
  readonly #http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.#http.get<Task[]>(`${this.#URL}/tasks`);
  }

  getTasksAsPromise() {
    return lastValueFrom(this.getTasks());
  }

  getTask(id: string): Observable<Task | undefined> {
    return this.#http.get<Task>(`${this.#URL}/tasks/${id}`);
  }

  addTask(value: string): Observable<CreateApiResponse> {
    const newtask: Partial<Task> = {
      description: value,
      completed: false,
    };

    return this.#http.post<CreateApiResponse>(`${this.#URL}/tasks`, newtask);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.#http.put<Task>(
      `${this.#URL}/tasks/${updatedTask.id}`,
      updatedTask
    );
  }

  deleteTask(task: Task): Observable<Task> {
    return this.#http.delete<Task>(`${this.#URL}/tasks/${task.id}`);
  }
}
