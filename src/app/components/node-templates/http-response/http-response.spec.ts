import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpResponse } from './http-response';

describe('HttpResponse', () => {
  let component: HttpResponse;
  let fixture: ComponentFixture<HttpResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpResponse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpResponse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
