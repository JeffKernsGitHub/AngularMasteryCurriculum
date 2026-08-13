import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, iif, of, Observable, EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Post } from '../post';
import { User } from '../user';

/**
 * Interface representing the structured aggregate data model
 * combined from multiple concurrent API endpoints via forkJoin.
 */
export interface CombinedData {
  posts: Post[];
  users: User[];
}

/**
 * =========================================================================================
 * DataLoaderComponent - Asynchronous Reactive Streams & Declarative Template Rendering
 * =========================================================================================
 *
 * This component demonstrates advanced asynchronous stream manipulation using RxJS
 * in a native Zoneless Angular 22 architecture.
 *
 * Key Concepts Demonstrated:
 *
 * 1. Idiomatic Dependency Injection (`inject()`):
 *    - Injects ApiService directly into a class field initializer without constructor clutter.
 *
 * 2. OnPush & Zoneless Change Detection (`ChangeDetectionStrategy.OnPush`):
 *    - In native Zoneless Angular (`provideZonelessChangeDetection()`), change detection is
 *      fine-grained and reactive.
 *    - The `async` pipe automatically subscribes to the Observable, unwraps values, and
 *      schedules localized rendering whenever a new emission occurs.
 *
 * 3. RxJS Operator Pipeline:
 *    - `switchMap`: Dynamically switches from the trigger stream to an inner data stream.
 *    - `iif`: Evaluates a condition at subscription time to conditionally fetch or return empty defaults.
 *    - `forkJoin`: Runs parallel HTTP GET requests and waits for all of them to complete (similar to Promise.all).
 *    - `map`: Transforms the emitted tuple `[posts, users]` into a strongly typed `CombinedData` object.
 *    - `catchError`: Intercepts failures, updates error state, and recovers gracefully with `EMPTY`.
 *
 * 4. Modern Control Flow in Template:
 *    - Utilizes `@if`, `@else`, `@let` local template variables, `@for` with `track`, and `@empty` fallback blocks.
 */
@Component({
  selector: 'app-data-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-loader.component.html',
  styleUrl: './data-loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataLoaderComponent implements OnInit {
  /**
   * 🌐 Modern Service Injection using `inject()`
   */
  private readonly apiService = inject(ApiService);

  /**
   * 📡 Primary Data Stream:
   * Holds the Observable pipeline that emits aggregated posts and users.
   */
  data$!: Observable<CombinedData>;

  /**
   * 🎛️ Reactive Flag for Conditional Fetching:
   * Used with `iif` to demonstrate conditional asynchronous fetching.
   */
  readonly shouldFetchPosts = true;

  /**
   * 🚦 Error State Signal:
   * Uses Angular Signal for reactive, synchronous error message display.
   */
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    // Construct the declarative RxJS pipeline
    this.data$ = of(this.shouldFetchPosts).pipe(
      // Switch based on whether data fetching is enabled
      switchMap(shouldFetch =>
        iif(
          () => shouldFetch,
          // 🚀 IF TRUE: Fetch Posts and Users in parallel using forkJoin
          forkJoin([
            this.apiService.getPosts(),
            this.apiService.getUsers()
          ]).pipe(
            // Map tuple array [Post[], User[]] into a structured CombinedData object
            map(([posts, users]): CombinedData => ({ posts, users })),

            // Graceful error handling in the stream
            catchError(err => {
              this.error.set('Failed to load API data. Please verify network connectivity.');
              console.error('DataLoaderComponent error caught:', err);
              // In native Zoneless Angular, setting the error signal automatically marks view dirty
              return EMPTY;
            })
          ),

          // ⏸️ IF FALSE: Emit empty fallback collections immediately
          of({ posts: [], users: [] } as CombinedData)
        )
      )
    );
  }
}

