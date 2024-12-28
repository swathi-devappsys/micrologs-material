import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawLogsComponent } from './raw-logs.component';

describe('RawLogsComponent', () => {
  let component: RawLogsComponent;
  let fixture: ComponentFixture<RawLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
