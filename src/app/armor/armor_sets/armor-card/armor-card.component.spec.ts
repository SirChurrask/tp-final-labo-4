import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorCardComponent } from './armor-card.component';

describe('ArmorCardComponent', () => {
  let component: ArmorCardComponent;
  let fixture: ComponentFixture<ArmorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
