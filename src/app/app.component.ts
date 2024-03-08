import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Task } from './models';
import { TaskStore } from './store/task.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TaskStore],
})
export class AppComponent {
  readonly store = inject(TaskStore);

  form = new FormGroup({
    taskValue: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    completed: new FormControl<boolean>(false, { nonNullable: true }),
  });

  addTask(): void {
    const { taskValue } = this.form.value;

    this.store.addTask(taskValue!);

    this.form.reset();
  }

  updateTask(value: MatCheckboxChange, task: Task): void {
    task.completed = value.checked;

    this.store.updateTask(task);
  }

  deleteTask(task: Task): void {
    this.store.deleteTask(task);
  }
}
