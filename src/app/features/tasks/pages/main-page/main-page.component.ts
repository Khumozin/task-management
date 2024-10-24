import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Task } from '../../models';
import { TaskStore } from '../../store';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  readonly store = inject(TaskStore);
  readonly fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    taskValue: ['', Validators.required],
    completed: [false, Validators.required],
  });

  addTask(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

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
