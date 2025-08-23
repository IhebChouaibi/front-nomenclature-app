import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMesure } from './add-mesure';

describe('AddMesure', () => {
  let component: AddMesure;
  let fixture: ComponentFixture<AddMesure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMesure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMesure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
