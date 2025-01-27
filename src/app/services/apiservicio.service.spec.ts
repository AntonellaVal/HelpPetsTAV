import { TestBed } from '@angular/core/testing';

import { ApiservicioService } from './apiservicio.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ApiservicioService', () => {
  let service: ApiservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(ApiservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
