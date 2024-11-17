import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSetDetailsComponent } from './armor-set-details.component';

describe('ArmorSetDetailsComponent', () => {
  let component: ArmorSetDetailsComponent;
  let fixture: ComponentFixture<ArmorSetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorSetDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorSetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
