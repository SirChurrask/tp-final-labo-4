import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorListComponent } from './armor-list.component';

describe('ArmorListComponent', () => {
  let component: ArmorListComponent;
  let fixture: ComponentFixture<ArmorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
