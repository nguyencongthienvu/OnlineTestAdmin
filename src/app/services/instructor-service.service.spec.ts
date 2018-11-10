import { TestBed, inject } from '@angular/core/testing';

import { InstructorServiceService } from './instructor-service.service';

describe('InstructorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstructorServiceService]
    });
  });

  it('should be created', inject([InstructorServiceService], (service: InstructorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
