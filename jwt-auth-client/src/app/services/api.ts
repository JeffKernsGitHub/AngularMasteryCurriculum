import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getPublic(): Observable<string> {
    return this.http.get('/api/public', { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  getUser(): Observable<string> {
    return this.http.get('/api/user', { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  getAdmin(): Observable<string> {
    return this.http.get('/api/admin', { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
