import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstListadoComponent } from './monst-listado.component';

describe('MonstListadoComponent', () => {
  let component: MonstListadoComponent;
  let fixture: ComponentFixture<MonstListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonstListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonstListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
