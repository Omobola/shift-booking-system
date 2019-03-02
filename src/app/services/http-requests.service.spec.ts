import { TestBed } from '@angular/core/testing';

import { HttpRequestsService } from './http-requests.service';
import { HttpClientModule } from '@angular/common/http';

describe('HttpRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: HttpRequestsService = TestBed.get(HttpRequestsService);
    expect(service).toBeTruthy();
  });
});
