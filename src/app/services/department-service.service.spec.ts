import { TestBed, inject } from '@angular/core/testing';

import { DepartmentServiceService } from './department-service.service';

describe('DepartmentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentServiceService]
    });
  });

  it('should be created', inject([DepartmentServiceService], (service: DepartmentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
