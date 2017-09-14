import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathMapComponent } from './death-map.component';

describe('DeathMapComponent', () => {
  let component: DeathMapComponent;
  let fixture: ComponentFixture<DeathMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
