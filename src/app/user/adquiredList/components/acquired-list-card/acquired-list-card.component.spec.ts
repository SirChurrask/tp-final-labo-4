import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiredListCardComponent } from './acquired-list-card.component';

describe('AcquiredListCardComponent', () => {
  let component: AcquiredListCardComponent;
  let fixture: ComponentFixture<AcquiredListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcquiredListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcquiredListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
