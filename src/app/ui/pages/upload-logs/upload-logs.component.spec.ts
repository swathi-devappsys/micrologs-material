import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLogsComponent } from './upload-logs.component';

describe('UploadLogsComponent', () => {
  let component: UploadLogsComponent;
  let fixture: ComponentFixture<UploadLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
