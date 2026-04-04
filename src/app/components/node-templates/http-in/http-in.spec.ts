import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpIn } from './http-in';

describe('HttpIn', () => {
  let component: HttpIn;
  let fixture: ComponentFixture<HttpIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
