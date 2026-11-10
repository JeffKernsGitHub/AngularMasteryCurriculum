import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create reactive http resources', () => {
    const publicRes = service.getPublicResource();
    const userRes = service.getUserResource();
    const adminRes = service.getAdminResource();

    expect(publicRes).toBeTruthy();
    expect(userRes).toBeTruthy();
    expect(adminRes).toBeTruthy();
  });
});
