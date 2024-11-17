import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSetPageComponent } from './armor-set-page.component';

describe('ArmorSetPageComponent', () => {
  let component: ArmorSetPageComponent;
  let fixture: ComponentFixture<ArmorSetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorSetPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorSetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
