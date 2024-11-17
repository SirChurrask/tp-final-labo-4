import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListPageComponent } from './monster-list-page.component';

describe('MonsterListPageComponent', () => {
  let component: MonsterListPageComponent;
  let fixture: ComponentFixture<MonsterListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
