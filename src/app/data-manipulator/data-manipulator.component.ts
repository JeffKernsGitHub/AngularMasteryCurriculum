import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-data-manipulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-manipulator.component.html',
  styleUrl: './data-manipulator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // Important for Zoneless applications
})
export class DataManipulatorComponent implements OnInit {
  // Using a signal for the todos list. Signals are reactive values that Angular can track.
  // This is a key feature for Zoneless applications.
  todos = signal<Todo[]>([]);
  newTodoTitle = '';
  loading = signal(false); // Signal to track loading state
  error = signal<string | null>(null); // Signal to track errors

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef // Needed for manual change detection in Zoneless
  ) {
    // Subscribe to the todoService's todos$ observable.
    // `takeUntilDestroyed` is an RxJS interop function that automatically unsubscribes
    // when the component is destroyed, preventing memory leaks.
    this.todoService.todos$
      .pipe(takeUntilDestroyed())
      .subscribe(todos => {
        this.todos.set(todos); // Update the signal with new todos
        this.cdr.markForCheck(); // Manually trigger change detection for Zoneless
      });
  }

  ngOnInit(): void {
    // Initial load of todos (though the BehaviorSubject already provides initial data)
    // This is more for demonstration of an explicit load.
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading.set(true);
    this.error.set(null);
    // The subscription in the constructor already handles updates,
    // but this method could be used for a fresh fetch if the service
    // had a method that explicitly re-fetched from a backend.
    // For this mock service, the BehaviorSubject is always up-to-date.
    this.todoService.getTodos().subscribe({
      next: () => {
        this.loading.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error.set('Failed to load todos.');
        console.error(err);
        this.loading.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.loading.set(true);
      this.error.set(null);
      this.todoService.addTodo(this.newTodoTitle).subscribe({
        next: () => {
          this.newTodoTitle = ''; // Clear input
          this.loading.set(false);
          this.cdr.markForCheck(); // Signal update will trigger this, but good to be explicit
        },
        error: (err) => {
          this.error.set('Failed to add todo.');
          console.error(err);
          this.loading.set(false);
          this.cdr.markForCheck();
        }
      });
    }
  }

  toggleCompleted(todo: Todo): void {
    this.loading.set(true);
    this.error.set(null);
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        this.loading.set(false);
        this.cdr.markForCheck(); // Signal update will trigger this
      },
      error: (err) => {
        this.error.set('Failed to update todo status.');
        console.error(err);
        this.loading.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  deleteTodo(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.loading.set(false);
        this.cdr.markForCheck(); // Signal update will trigger this
      },
      error: (err) => {
        this.error.set('Failed to delete todo.');
        console.error(err);
        this.loading.set(false);
        this.cdr.markForCheck();
      }
    });
  }
}
