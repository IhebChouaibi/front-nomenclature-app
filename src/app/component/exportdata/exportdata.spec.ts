import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exportdata } from './exportdata';

describe('Exportdata', () => {
  let component: Exportdata;
  let fixture: ComponentFixture<Exportdata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exportdata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exportdata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
