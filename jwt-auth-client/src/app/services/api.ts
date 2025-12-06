import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api'; // Use relative URL, proxy will redirect to port 8080

  constructor(private http: HttpClient) {}

  getPublic(): Observable<string> {
    return this.http.get('/api/public', { responseType: 'text' });
  }

  getUser(): Observable<string> {
    return this.http.get('/api/user', { responseType: 'text' });
  }

  getAdmin(): Observable<string> {
    return this.http.get('/api/admin', { responseType: 'text' });
  }
}
