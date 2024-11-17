import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiredPageComponent } from './acquired-page.component';

describe('AcquiredPageComponent', () => {
  let component: AcquiredPageComponent;
  let fixture: ComponentFixture<AcquiredPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcquiredPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcquiredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
