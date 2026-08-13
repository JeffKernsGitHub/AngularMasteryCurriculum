import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

/**
 * =========================================================================================
 * DataManipulatorComponent - CRUD Operations & Fine-Grained Reactivity with Signals
 * =========================================================================================
 *
 * This component demonstrates full CRUD (Create, Read, Update, Delete) state manipulation
 * using Angular Signals, computed derived state, and native Zoneless change detection.
 *
 * Key Concepts Demonstrated:
 *
 * 1. Idiomatic Service Injection (`inject()`):
 *    - Injects `TodoService` using class property initializer.
 *
 * 2. Fine-Grained Signals (`signal()` & `computed()`):
 *    - `todos`: Reactive collection of todo items.
 *    - `newTodoTitle`: Reactive signal bound to the creation form input.
 *    - `loading`, `error`: Reactive signals managing UI feedback states.
 *    - `totalCount`, `completedCount`, `pendingCount`: Memoized `computed()` signals that
 *      recalculate automatically only when `todos()` changes.
 *
 * 3. Native Zoneless Reactivity (`provideZonelessChangeDetection()`):
 *    - When `.set()` or `.update()` is invoked on a Signal, Angular automatically schedules
 *      fine-grained change detection for this specific component.
 *    - Manual calls to `ChangeDetectorRef.markForCheck()` are no longer necessary.
 *
 * 4. Automatic Stream Lifecycle Management (`takeUntilDestroyed()`):
 *    - Automatically unsubscribes from `todoService.todos$` when the component is destroyed.
 *    - Invoked directly in the field initializer within the component's injection context.
 */
@Component({
  selector: 'app-data-manipulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-manipulator.component.html',
  styleUrl: './data-manipulator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataManipulatorComponent implements OnInit {
  /**
   * 🌐 Service Injection using idiomatic `inject()`
   */
  private readonly todoService = inject(TodoService);

  /**
   * 🚦 Primary State Signal:
   * Holds the current collection of Todo items.
   */
  readonly todos = signal<Todo[]>([]);

  /**
   * 📝 Form Input State Signal:
   * Tracks user input in the "Add New Todo" field.
   */
  readonly newTodoTitle = signal<string>('');

  /**
   * ⏳ UI Loading State Signal:
   * Indicates whether an asynchronous simulated persistence operation is in flight.
   */
  readonly loading = signal<boolean>(false);

  /**
   * 🚨 Error Message Signal:
   * Holds transient error notifications if any operation fails.
   */
  readonly error = signal<string | null>(null);

  /**
   * 📊 Computed Derived Signals (Memoized State):
   * Efficiently calculated synchronously from `todos()`.
   */
  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(() => this.todos().filter(t => t.completed).length);
  readonly pendingCount = computed(() => this.todos().filter(t => !t.completed).length);

  constructor() {
    // 📡 Reactive Subscription with takeUntilDestroyed:
    // Syncs the local component signal whenever the service emits a updated todos list.
    this.todoService.todos$
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (items) => {
          this.todos.set(items);
        },
        error: (err) => {
          this.error.set('Failed to synchronize todos with service.');
          console.error(err);
        }
      });
  }

  ngOnInit(): void {
    // Explicitly load initial todos
    this.loadTodos();
  }

  /**
   * Fetches todos from the service.
   */
  loadTodos(): void {
    this.loading.set(true);
    this.error.set(null);

    this.todoService.getTodos().subscribe({
      next: (items) => {
        this.todos.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load todos from backend.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  /**
   * ➕ Create: Adds a new Todo item to the collection.
   */
  addTodo(): void {
    const title = this.newTodoTitle().trim();
    if (!title) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.todoService.addTodo(title).subscribe({
      next: () => {
        // Clear input form signal upon success
        this.newTodoTitle.set('');
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to create new todo item.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  /**
   * 🔄 Update: Toggles the completion status of a Todo item.
   *
   * @param todo The todo item to toggle.
   */
  toggleCompleted(todo: Todo): void {
    this.loading.set(true);
    this.error.set(null);

    const updated: Todo = { ...todo, completed: !todo.completed };

    this.todoService.updateTodo(updated).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(`Failed to update status for todo #${todo.id}.`);
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  /**
   * ❌ Delete: Removes a Todo item by ID.
   *
   * @param id The ID of the item to delete.
   */
  deleteTodo(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(`Failed to delete todo #${id}.`);
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  /**
   * Helper method for template input event binding.
   *
   * @param event DOM input event
   */
  onTitleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newTodoTitle.set(input.value);
  }
}

