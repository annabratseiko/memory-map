import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthMapComponent } from './birth-map.component';

describe('BirthMapComponent', () => {
  let component: BirthMapComponent;
  let fixture: ComponentFixture<BirthMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
