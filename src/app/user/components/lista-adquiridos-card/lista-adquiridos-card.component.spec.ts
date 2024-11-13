import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdquiridosCardComponent } from './lista-adquiridos-card.component';

describe('ListaAdquiridosCardComponent', () => {
  let component: ListaAdquiridosCardComponent;
  let fixture: ComponentFixture<ListaAdquiridosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAdquiridosCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAdquiridosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
