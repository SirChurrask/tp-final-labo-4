import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSetsComponent } from './armor-sets.component';

describe('ArmorSetsComponent', () => {
  let component: ArmorSetsComponent;
  let fixture: ComponentFixture<ArmorSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorSetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
