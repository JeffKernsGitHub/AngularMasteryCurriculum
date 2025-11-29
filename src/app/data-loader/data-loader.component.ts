import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, iif, of, Observable, EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Post } from '../post';
import { User } from '../user';

// Define a simple interface for the data we expect to receive.
// This helps with type safety and makes the code easier to read.
interface Data {
  posts: Post[];
  users: User[];
}

@Component({
  selector: 'app-data-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-loader.component.html'
})
export class DataLoaderComponent implements OnInit {
  // Declare an Observable that will hold our data.
  // The '$' suffix is a common convention for Observables.
  data$!: Observable<Data>;

  // A simple boolean to demonstrate conditional data fetching.
  shouldFetchPosts = true;

  // A property to hold any error messages.
  error: string | null = null;

  // Inject the ApiService and ChangeDetectorRef.
  // ApiService is used to fetch data from the API.
  // ChangeDetectorRef is needed to manually trigger change detection in a Zoneless application.
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // This is the main logic for fetching data.
    // We use a series of RxJS operators to create a reactive data pipeline.
    this.data$ = of(this.shouldFetchPosts).pipe(
      // `switchMap` is used to switch to a new Observable based on the value of the previous one.
      // In this case, we're switching based on the value of `shouldFetchPosts`.
      switchMap(shouldFetch =>
        // `iif` is a conditional operator. It takes a condition function and two Observables.
        // If the condition is true, it subscribes to the first Observable. Otherwise, it subscribes to the second.
        iif(
          () => shouldFetch,
          // If `shouldFetch` is true, we'll fetch the data.
          // `forkJoin` is used to wait for multiple Observables to complete.
          // It takes an array of Observables and emits an array of their last values.
          forkJoin([
            this.apiService.getPosts(),
            this.apiService.getUsers()
          ]).pipe(
            // `map` is used to transform the emitted value.
            // In this case, we're transforming the array of results into an object.
            map(([posts, users]) => ({ posts, users })),
            // `catchError` is used to handle any errors that occur in the pipeline.
            catchError(err => {
              // Set the error message.
              this.error = 'Failed to load data. Please try again later.';
              // Log the error to the console for debugging.
              console.error(err);
              // In a Zoneless application, we need to manually trigger change detection
              // when an asynchronous operation outside of the `async` pipe updates the component's state.
              this.cdr.markForCheck();
              // Return an empty Observable to complete the stream.
              return EMPTY;
            })
          ),
          // If `shouldFetch` is false, we'll return an Observable that emits an empty data object.
          of({ posts: [], users: [] })
        )
      )
    );
  }
}
