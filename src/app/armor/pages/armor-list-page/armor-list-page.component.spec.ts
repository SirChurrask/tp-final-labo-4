import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorListPageComponent } from './armor-list-page.component';

describe('ArmorListPageComponent', () => {
  let component: ArmorListPageComponent;
  let fixture: ComponentFixture<ArmorListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
