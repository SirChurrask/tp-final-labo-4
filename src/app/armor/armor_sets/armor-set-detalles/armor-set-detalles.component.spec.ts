import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSetDetallesComponent } from './armor-set-detalles.component';

describe('ArmorSetDetallesComponent', () => {
  let component: ArmorSetDetallesComponent;
  let fixture: ComponentFixture<ArmorSetDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorSetDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorSetDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
