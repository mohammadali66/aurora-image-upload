import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuroraImageUploadComponent } from './aurora-image-upload.component';

describe('AuroraImageUploadComponent', () => {
  let component: AuroraImageUploadComponent;
  let fixture: ComponentFixture<AuroraImageUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuroraImageUploadComponent]
    });
    fixture = TestBed.createComponent(AuroraImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
