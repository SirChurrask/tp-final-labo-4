import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponListPageComponent } from './weapon-list-page.component';

describe('WeaponListPageComponent', () => {
  let component: WeaponListPageComponent;
  let fixture: ComponentFixture<WeaponListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
