import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdquiridosComponent } from './lista-adquiridos.component';

describe('ListaAdquiridosComponent', () => {
  let component: ListaAdquiridosComponent;
  let fixture: ComponentFixture<ListaAdquiridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAdquiridosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAdquiridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
