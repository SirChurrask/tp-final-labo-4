import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImagesComponent } from './stock-images.component';

describe('StockImagesComponent', () => {
  let component: StockImagesComponent;
  let fixture: ComponentFixture<StockImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
