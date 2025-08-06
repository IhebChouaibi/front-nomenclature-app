import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextField } from './text-field';

describe('TextField', () => {
  let component: TextField;
  let fixture: ComponentFixture<TextField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
