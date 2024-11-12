import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPendientesCardComponent } from './lista-pendientes-card.component';

describe('ListaPendientesCardComponent', () => {
  let component: ListaPendientesCardComponent;
  let fixture: ComponentFixture<ListaPendientesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPendientesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPendientesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
