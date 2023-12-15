import { TestBed } from '@angular/core/testing';

import { AuroraImageUploadService } from './aurora-image-upload.service';

describe('AuroraImageUploadService', () => {
  let service: AuroraImageUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuroraImageUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
