import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiredListComponent } from './acquired-list.component';

describe('AcquiredListComponent', () => {
  let component: AcquiredListComponent;
  let fixture: ComponentFixture<AcquiredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcquiredListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcquiredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
