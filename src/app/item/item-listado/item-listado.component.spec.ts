import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListadoComponent } from './item-listado.component';

describe('ItemListadoComponent', () => {
  let component: ItemListadoComponent;
  let fixture: ComponentFixture<ItemListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
