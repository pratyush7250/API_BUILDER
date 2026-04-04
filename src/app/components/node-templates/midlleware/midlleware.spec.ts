import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Midlleware } from './midlleware';

describe('Midlleware', () => {
  let component: Midlleware;
  let fixture: ComponentFixture<Midlleware>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Midlleware]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Midlleware);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
